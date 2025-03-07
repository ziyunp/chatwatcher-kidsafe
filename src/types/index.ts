
export type AlertSeverity = 'low' | 'medium' | 'high';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  flagged?: boolean;
  flagReason?: string;
}

export interface ChatAlert {
  id: string;
  childName: string;
  childId: string;
  aiPlatform: string;
  severity: AlertSeverity;
  timestamp: string;
  flaggedMessage: Message;
  conversation: Message[];
  reviewed: boolean;
}
