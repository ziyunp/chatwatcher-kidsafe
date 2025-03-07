
import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface ChatHistoryProps {
  conversation: Message[];
  flaggedMessageId: string;
}

const ChatHistory = ({ conversation, flaggedMessageId }: ChatHistoryProps) => {
  return (
    <div className="space-y-3 pb-2">
      <h3 className="text-sm font-medium">Chat History</h3>
      <div className="border rounded-lg overflow-hidden">
        {conversation.map((message) => {
          const isFlagged = message.id === flaggedMessageId;
          let flagClass = "";
          
          if (isFlagged) {
            flagClass = message.flagReason?.toLowerCase().includes("dangerous") ? "highlight-high" : 
                        message.flagReason?.toLowerCase().includes("concern") ? "highlight-medium" : 
                        "highlight-low";
          }
          
          return (
            <div 
              key={message.id}
              className={cn(
                "p-3 flex flex-col",
                message.sender === "user" ? "bg-muted/50" : "bg-background",
                isFlagged && flagClass,
                "border-b last:border-b-0"
              )}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-xs">
                  {message.sender === "user" ? "Child" : message.sender.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {format(new Date(message.timestamp), "h:mm a • MMM d, yyyy")}
                </span>
              </div>
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {isFlagged && (
                <div className="mt-2 text-xs font-medium flex items-center gap-1">
                  <span className={cn(
                    "px-2 py-0.5 rounded",
                    message.flagReason?.toLowerCase().includes("dangerous") ? "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" : 
                    message.flagReason?.toLowerCase().includes("concern") ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" : 
                    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                  )}>
                    {message.flagReason}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatHistory;
