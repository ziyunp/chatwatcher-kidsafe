
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

export const fetchAlerts = async (): Promise<ChatAlert[]> => {
  try {
    const { data, error } = await supabase
      .from('Alert')
      .select('*')
      .order('timestamp', { ascending: false });
    
    if (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
    
    // Map the data from Supabase to the ChatAlert model
    return data.map((dbAlert): ChatAlert => {
      // Parse the chat history from JSON string
      const conversation = parseChatHistory(dbAlert.chatHistory);
      
      // Find the flagged message in the conversation
      const flaggedMessage = conversation.find(msg => msg.flagged) || {
        id: `flagged-${Date.now()}`,
        sender: "ai",
        content: "Content flagged but specific message not identified",
        timestamp: dbAlert.timestamp || new Date().toISOString(),
        flagged: true,
        flagReason: dbAlert.alertReason
      };
      
      return {
        id: dbAlert.id,
        childName: dbAlert.childName || "Unknown Child",
        childId: dbAlert.childId,
        aiPlatform: dbAlert.aiPlatform || "AI Chat",
        severity: dbAlert.severity as AlertSeverity || "medium",
        timestamp: dbAlert.timestamp || new Date().toISOString(),
        flaggedMessage,
        conversation,
        reviewed: dbAlert.reviewed || false
      };
    });
  } catch (error) {
    console.error("Failed to fetch alerts:", error);
    return [];
  }
};

// Function to update the review status of an alert
export const updateAlertReviewStatus = async (id: string, reviewed: boolean): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('Alert')
      .update({ reviewed })
      .eq('id', id);
    
    if (error) {
      console.error("Error updating alert review status:", error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Failed to update alert review status:", error);
    return false;
  }
};
