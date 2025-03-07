
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

// Map alert data from Supabase to our application's format
const mapDbAlertToAppAlert = (dbAlert: any): ChatAlert => {
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
  
  // Parse the chat history
  const conversation = parseChatHistory(dbAlert.chatHistory);
  
  // Find the flagged message - assuming it's the last AI message
  const flaggedMessage = conversation.find(msg => 
    msg.sender === "ai" && msg.content.toLowerCase().includes(alertReason.toLowerCase())
  ) || {
    id: `flagged-${Date.now()}`,
    sender: "ai",
    content: "Content flagged but specific message not identified",
    timestamp: dbAlert.sessionEnd || new Date().toISOString(),
    flagged: true,
    flagReason: dbAlert.alertReason
  };
  
  return {
    id: dbAlert.id,
    childName: dbAlert.childName || "Unknown Child",
    childId: dbAlert.childId,
    aiPlatform: dbAlert.topic || "AI Chat",
    severity,
    timestamp: dbAlert.sessionEnd || dbAlert.sessionStart || new Date().toISOString(),
    flaggedMessage: {
      ...flaggedMessage,
      flagReason: dbAlert.alertReason
    },
    conversation,
    reviewed: false // Default value as it's not in the database
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
