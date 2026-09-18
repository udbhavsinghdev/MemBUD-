export type MemoryCategory = 'Personal' | 'Idea' | 'Study' | 'Projects' | 'Research' | 'Work';

export type SourceType = 'Personal Note' | 'Web Link' | 'Document PDF' | 'Google Drive' | 'Notion' | 'GitHub' | 'Browser Extension' | 'Chat History';

export interface Memory {
  id: string;
  title: string;
  description: string;
  content: string;
  category: MemoryCategory;
  tags: string[];
  createdAt: string;
  updatedAt?: string;
  source: SourceType;
  sourceUrl?: string;
  fileName?: string;
  fileSize?: string;
  aiSummary: string;
  relatedMemoryIds: string[];
  connectedConcepts: string[];
  importance?: 'low' | 'medium' | 'high';
}

export interface GraphNode {
  id: string;
  label: string;
  category: MemoryCategory | 'Topic' | 'Root';
  val: number; // size magnitude
  memoryId?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
  strength?: number;
}

export interface SourceIntegration {
  id: string;
  name: string;
  description: string;
  iconName: string;
  connected: boolean;
  itemCount: number;
  lastSynced?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sourceMemories?: { id: string; title: string }[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  time: string;
  type: 'saved' | 'asked' | 'connected' | 'uploaded';
  title: string;
  description?: string;
  memoryId?: string;
  category: MemoryCategory | 'System';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  joinedDate: string;
  location: string;
  bio: string;
}

export interface UserSettings {
  autoSaveMemories: boolean;
  aiSuggestions: boolean;
  dailySummary: boolean;
  smartConnections: boolean;
  darkMode: boolean;
  privacyLevel: 'Private' | 'Strict' | 'Cloud Backed';
  storageQuotaMb: number;
}
