
import { useState, useMemo, useEffect } from "react";
import Layout from "@/components/Layout";
import AlertCard from "@/components/AlertCard";
import FilterControls, { FilterState } from "@/components/FilterControls";
import { useToast } from "@/components/ui/use-toast";
import { ShieldAlert, Check, Clock, AlertTriangle, AlertCircle, Info } from "lucide-react";
import { ChatAlert } from "@/types";
import { fetchAlerts, updateAlertReviewStatus } from "@/services/alertService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    severity: ["high", "medium", "low"],
    showReviewed: true,
    showUnreviewed: true,
  });

  // Fetch alerts using React Query
  const { data: alerts = [], isLoading, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: fetchAlerts,
  });

  // Mutation for updating alert review status
  const updateReviewMutation = useMutation({
    mutationFn: ({ id, reviewed }: { id: string, reviewed: boolean }) => 
      updateAlertReviewStatus(id, reviewed),
    onSuccess: () => {
      // Invalidate and refetch alerts after a successful update
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
  });

  const handleAlertReviewToggle = (id: string, reviewed: boolean) => {
    // Optimistically update the UI
    const alertToUpdate = alerts.find(alert => alert.id === id);
    
    updateReviewMutation.mutate({ id, reviewed }, {
      onSuccess: () => {
        toast({
          title: reviewed ? "Alert marked as reviewed" : "Alert marked as pending",
          description: `Alert for ${alertToUpdate?.childName} has been updated`,
          duration: 3000,
        });
      },
      onError: () => {
        toast({
          title: "Update failed",
          description: "There was an error updating the alert status",
          variant: "destructive",
          duration: 3000,
        });
      },
    });
  };

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      // Filter by search term
      const searchMatch = 
        filters.search === "" ||
        alert.childName.toLowerCase().includes(filters.search.toLowerCase()) ||
        alert.flaggedMessage.content.toLowerCase().includes(filters.search.toLowerCase());
      
      // Filter by severity
      const severityMatch = filters.severity.includes(alert.severity);
      
      // Filter by review status
      const reviewStatusMatch = 
        (alert.reviewed && filters.showReviewed) || 
        (!alert.reviewed && filters.showUnreviewed);
      
      return searchMatch && severityMatch && reviewStatusMatch;
    });
  }, [alerts, filters]);

  // Count metrics
  const totalAlerts = alerts.length;
  const pendingAlerts = alerts.filter(a => !a.reviewed).length;
  const highSeverityAlerts = alerts.filter(a => a.severity === 'high').length;

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Alert Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage AI conversation alerts</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Total Alerts</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{totalAlerts}</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-amber-500" />
              <h3 className="text-sm font-medium">Pending Review</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{pendingAlerts}</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <h3 className="text-sm font-medium">High Severity</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{highSeverityAlerts}</p>
          </div>
          
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-medium">Reviewed</h3>
            </div>
            <p className="text-2xl font-bold mt-2">{totalAlerts - pendingAlerts}</p>
          </div>
        </div>

        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
          <div className="mb-4 flex flex-col gap-1">
            <h2 className="text-xl font-semibold">Recent Alerts</h2>
            <p className="text-sm text-muted-foreground">Review and manage flagged conversations</p>
          </div>
          
          <FilterControls onFilterChange={setFilters} />
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <p>Loading alerts...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-red-100 p-3 mb-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="font-medium mb-1">Error loading alerts</h3>
              <p className="text-sm text-muted-foreground">
                There was a problem fetching the alert data
              </p>
            </div>
          ) : filteredAlerts.length > 0 ? (
            <div className="space-y-4">
              {filteredAlerts.map((alert) => (
                <AlertCard
                  key={alert.id}
                  alert={alert}
                  onReviewToggle={handleAlertReviewToggle}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-3">
                <Check className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium mb-1">No alerts match your filters</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your filter criteria to see more results
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
