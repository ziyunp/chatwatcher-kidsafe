
import { AlertSeverity } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

interface AlertBadgeProps {
  severity: AlertSeverity;
  className?: string;
}

const AlertBadge = ({ severity, className }: AlertBadgeProps) => {
  const getIcon = () => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
      case 'medium':
        return <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      case 'low':
        return <Info className="h-3.5 w-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge 
      className={cn(
        "flex items-center",
        severity === 'high' && "bg-alert-high text-white animate-pulse-slow",
        severity === 'medium' && "bg-alert-medium text-white",
        severity === 'low' && "bg-alert-low text-white",
        className
      )}
    >
      {getIcon()}
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>
  );
};

export default AlertBadge;
