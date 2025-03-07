
import { AlertSeverity, ChatAlert, Message } from "@/types";
import { mockAlerts } from "@/data/mockData";

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
  // Return the mock data directly
  return mockAlerts;
};

// Function to update the review status of an alert (mock implementation)
export const updateAlertReviewStatus = async (id: string, reviewed: boolean): Promise<boolean> => {
  console.log(`Mock update alert ${id} review status to ${reviewed}`);
  // In a real app, we would update Supabase here
  return true;
};
