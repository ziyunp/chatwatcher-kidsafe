
import { supabase } from "@/integrations/supabase/client";
import { AlertSeverity, ChatAlert, Message } from "@/types";

// Parse chat history from the database string format
const parseChatHistory = (chatHistoryStr: string | null): Message[] => {
  if (!chatHistoryStr) return [];
  
  try {
    return JSON.parse(chatHistoryStr);
  } catch (error) {
    console.error("Error parsing chat history:", error);
    return [];
  }
};

// Map alert data from Supabase to match the ChatAlert model structure from mockData
const mapDbAlertToAppAlert = (dbAlert: any): ChatAlert => {
  // Parse the chat history
  const conversation = parseChatHistory(dbAlert.chatHistory);
  
  // Determine severity based on alertReason or default to medium
  let severity: AlertSeverity = "medium";
  const alertReason = dbAlert.alertReason?.toLowerCase() || "";
  
  if (alertReason.includes("dangerous") || alertReason.includes("harmful")) {
    severity = "high";
  } else if (alertReason.includes("concern") || alertReason.includes("sensitive")) {
    severity = "medium";
  } else {
    severity = "low";
  }
  
  // Find or create the flagged message - preference for a message that contains the alert reason
  let flaggedMessage: Message;
  
  // Try to find an AI message that contains the alert reason
  const aiMessageWithReason = conversation.find(msg => 
    msg.sender === "ai" && alertReason && msg.content.toLowerCase().includes(alertReason.toLowerCase())
  );
  
  // If not found, try to find the last user message before the last AI message
  if (!aiMessageWithReason && conversation.length > 1) {
    // Find the index of the last AI message
    const lastAiIndex = [...conversation].reverse().findIndex(msg => msg.sender === "ai");
    if (lastAiIndex !== -1 && lastAiIndex < conversation.length - 1) {
      // Get the user message that came before it
      const userMessageIndex = conversation.length - lastAiIndex - 2;
      if (userMessageIndex >= 0 && conversation[userMessageIndex].sender === "user") {
        flaggedMessage = {
          ...conversation[userMessageIndex],
          flagged: true,
          flagReason: dbAlert.alertReason
        };
      } else {
        // Fallback to a default flagged message
        flaggedMessage = createDefaultFlaggedMessage(dbAlert);
      }
    } else {
      // Fallback to a default flagged message
      flaggedMessage = createDefaultFlaggedMessage(dbAlert);
    }
  } else if (aiMessageWithReason) {
    // Use the AI message that contains the alert reason
    flaggedMessage = {
      ...aiMessageWithReason,
      flagged: true,
      flagReason: dbAlert.alertReason
    };
  } else {
    // Fallback to a default flagged message
    flaggedMessage = createDefaultFlaggedMessage(dbAlert);
  }
  
  return {
    id: dbAlert.id,
    childName: dbAlert.childName || "Unknown Child",
    childId: dbAlert.childId,
    aiPlatform: dbAlert.topic || "AI Chat",
    severity,
    timestamp: dbAlert.sessionEnd || dbAlert.sessionStart || new Date().toISOString(),
    flaggedMessage,
    conversation,
    reviewed: false // Default value as it's not in the database
  };
};

// Helper function to create a default flagged message when none can be found
const createDefaultFlaggedMessage = (dbAlert: any): Message => {
  return {
    id: `flagged-${Date.now()}`,
    sender: "ai",
    content: "Content flagged but specific message not identified",
    timestamp: dbAlert.sessionEnd || new Date().toISOString(),
    flagged: true,
    flagReason: dbAlert.alertReason
  };
};

export const fetchAlerts = async (): Promise<ChatAlert[]> => {
  try {
    const { data, error } = await supabase
      .from('Alert')
      .select('*')
      .order('sessionEnd', { ascending: false });
    
    if (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
    
    return data.map(mapDbAlertToAppAlert);
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
};
