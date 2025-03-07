
import { useState } from "react";
import { ChatAlert } from "@/types";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronDown, ChevronUp, Eye, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import AlertBadge from "./AlertBadge";
import ChatHistory from "./ChatHistory";

interface AlertCardProps {
  alert: ChatAlert;
  onReviewToggle: (id: string, reviewed: boolean) => void;
}

const AlertCard = ({ alert, onReviewToggle }: AlertCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="w-full mb-4 transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold flex items-center gap-2">
              {alert.childName}
              <AlertBadge severity={alert.severity} />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {alert.aiPlatform} • <span className="inline-flex items-center"><Clock className="h-3 w-3 mr-1" />{formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            {alert.reviewed ? (
              <span className="text-xs inline-flex items-center text-green-600 dark:text-green-400">
                <CheckCircle2 className="h-3.5 w-3.5 mr-1" />Reviewed
              </span>
            ) : (
              <span className="text-xs inline-flex items-center text-amber-600 dark:text-amber-400">
                <Clock className="h-3.5 w-3.5 mr-1" />Pending
              </span>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className={`p-2 rounded-md ${alert.severity === 'high' ? 'highlight-high' : alert.severity === 'medium' ? 'highlight-medium' : 'highlight-low'}`}>
          <p className="text-sm font-medium">Flagged message:</p>
          <p className="text-sm">{alert.flaggedMessage.content}</p>
          <p className="text-xs mt-1 opacity-70">{alert.flaggedMessage.flagReason}</p>
        </div>
        
        {isExpanded && (
          <div className="mt-4">
            <ChatHistory conversation={alert.conversation} flaggedMessageId={alert.flaggedMessage.id} />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3.5 w-3.5 mr-1" /> Hide conversation
            </>
          ) : (
            <>
              <ChevronDown className="h-3.5 w-3.5 mr-1" /> View conversation
            </>
          )}
        </Button>
        <Button
          variant={alert.reviewed ? "outline" : "default"}
          size="sm"
          onClick={() => onReviewToggle(alert.id, !alert.reviewed)}
          className="text-xs"
        >
          {alert.reviewed ? (
            <>Mark as Unreviewed</>
          ) : (
            <><Eye className="h-3.5 w-3.5 mr-1" /> Mark as Reviewed</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AlertCard;
