import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  Memory,
  SourceIntegration,
  TimelineEvent,
  ChatMessage,
  GraphNode,
  GraphEdge,
  MemoryCategory
} from '../types';
import {
  initialMemories,
  initialSources,
  initialTimelineEvents,
  initialChatMessages,
  initialGraphNodes,
  initialGraphEdges
} from '../mock/initialData';
import { useToast } from './ToastContext';

interface MemoryContextType {
  memories: Memory[];
  sources: SourceIntegration[];
  timelineEvents: TimelineEvent[];
  chatMessages: ChatMessage[];
  graphNodes: GraphNode[];
  graphEdges: GraphEdge[];
  activeMemory: Memory | null;
  addMemoryModalOpen: boolean;
  commandPaletteOpen: boolean;
  searchQuery: string;
  selectedCategory: string;
  aiOrbState: 'idle' | 'processing' | 'thinking' | 'responding' | 'saved';
  
  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setActiveMemory: (memory: Memory | null) => void;
  setAddMemoryModalOpen: (open: boolean) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setAiOrbState: (state: 'idle' | 'processing' | 'thinking' | 'responding' | 'saved') => void;
  
  addMemory: (newMem: Omit<Memory, 'id' | 'createdAt' | 'aiSummary' | 'relatedMemoryIds' | 'connectedConcepts'> & { aiSummary?: string; connectedConcepts?: string[] }) => Memory;
  updateMemory: (id: string, updated: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
  toggleSourceConnection: (id: string) => void;
  sendChatMessage: (text: string) => void;
  clearChatHistory: () => void;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export const MemoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  const [memories, setMemories] = useState<Memory[]>(() => {
    const saved = localStorage.getItem('membud_memories');
    return saved ? JSON.parse(saved) : initialMemories;
  });

  const [sources, setSources] = useState<SourceIntegration[]>(() => {
    const saved = localStorage.getItem('membud_sources');
    return saved ? JSON.parse(saved) : initialSources;
  });

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>(() => {
    const saved = localStorage.getItem('membud_timeline');
    return saved ? JSON.parse(saved) : initialTimelineEvents;
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('membud_chat');
    return saved ? JSON.parse(saved) : initialChatMessages;
  });

  const [graphNodes, setGraphNodes] = useState<GraphNode[]>(() => {
    const saved = localStorage.getItem('membud_graph_nodes');
    return saved ? JSON.parse(saved) : initialGraphNodes;
  });

  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>(() => {
    const saved = localStorage.getItem('membud_graph_edges');
    return saved ? JSON.parse(saved) : initialGraphEdges;
  });

  const [activeMemory, setActiveMemory] = useState<Memory | null>(null);
  const [addMemoryModalOpen, setAddMemoryModalOpen] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [aiOrbState, setAiOrbState] = useState<'idle' | 'processing' | 'thinking' | 'responding' | 'saved'>('idle');

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('membud_memories', JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem('membud_sources', JSON.stringify(sources));
  }, [sources]);

  useEffect(() => {
    localStorage.setItem('membud_timeline', JSON.stringify(timelineEvents));
  }, [timelineEvents]);

  useEffect(() => {
    localStorage.setItem('membud_chat', JSON.stringify(chatMessages));
  }, [chatMessages]);

  useEffect(() => {
    localStorage.setItem('membud_graph_nodes', JSON.stringify(graphNodes));
  }, [graphNodes]);

  useEffect(() => {
    localStorage.setItem('membud_graph_edges', JSON.stringify(graphEdges));
  }, [graphEdges]);

  // Global Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addMemory = useCallback(
    (newMemData: Omit<Memory, 'id' | 'createdAt' | 'aiSummary' | 'relatedMemoryIds' | 'connectedConcepts'> & { aiSummary?: string; connectedConcepts?: string[] }) => {
      setAiOrbState('processing');

      const id = `mem-${Date.now()}`;
      const generatedSummary = newMemData.aiSummary || `AI Insights: Synthesized key concept of "${newMemData.title}" into connected personal knowledge.`;
      const concepts = newMemData.connectedConcepts || [newMemData.category, ...newMemData.tags.slice(0, 2)];

      const createdMemory: Memory = {
        ...newMemData,
        id,
        createdAt: 'Just now',
        aiSummary: generatedSummary,
        relatedMemoryIds: memories.slice(0, 2).map((m) => m.id),
        connectedConcepts: concepts
      };

      // Add to memories
      setMemories((prev) => [createdMemory, ...prev]);

      // Add timeline event
      const newTimeline: TimelineEvent = {
        id: `tle-${Date.now()}`,
        date: 'TODAY',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: newMemData.source === 'Document PDF' ? 'uploaded' : 'saved',
        title: `Saved: "${createdMemory.title}"`,
        memoryId: id,
        category: createdMemory.category
      };
      setTimelineEvents((prev) => [newTimeline, ...prev]);

      // Add Graph Node
      const newNode: GraphNode = {
        id: id,
        label: createdMemory.title.length > 20 ? createdMemory.title.substring(0, 18) + '...' : createdMemory.title,
        category: createdMemory.category,
        val: 14,
        memoryId: id,
        x: (Math.random() - 0.5) * 350,
        y: (Math.random() - 0.5) * 350
      };

      setGraphNodes((prev) => [...prev, newNode]);

      // Add Edges to root or matching topic
      const newEdge: GraphEdge = {
        source: 'root',
        target: id,
        strength: 1
      };
      setGraphEdges((prev) => [...prev, newEdge]);

      setTimeout(() => {
        setAiOrbState('saved');
        showToast('Memory saved successfully', `Captured into ${createdMemory.category} knowledge bank.`, 'success');
      }, 500);

      setTimeout(() => {
        setAiOrbState('idle');
      }, 2000);

      return createdMemory;
    },
    [memories, showToast]
  );

  const updateMemory = useCallback((id: string, updated: Partial<Memory>) => {
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...updated, updatedAt: 'Just now' } : m))
    );
    showToast('Memory updated', 'Changes persisted locally.', 'info');
  }, [showToast]);

  const deleteMemory = useCallback((id: string) => {
    setMemories((prev) => prev.filter((m) => m.id !== id));
    setGraphNodes((prev) => prev.filter((n) => n.id !== id && n.memoryId !== id));
    setGraphEdges((prev) => prev.filter((e) => e.source !== id && e.target !== id));
    if (activeMemory?.id === id) {
      setActiveMemory(null);
    }
    showToast('Memory deleted', 'Removed from second brain.', 'warning');
  }, [activeMemory, showToast]);

  const toggleSourceConnection = useCallback((id: string) => {
    setSources((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.connected;
          showToast(
            nextState ? `${s.name} Connected` : `${s.name} Disconnected`,
            nextState ? 'Indexing knowledge items locally...' : 'Sync paused.',
            nextState ? 'success' : 'info'
          );
          return {
            ...s,
            connected: nextState,
            lastSynced: nextState ? 'Just now' : s.lastSynced,
            itemCount: nextState ? (s.itemCount > 0 ? s.itemCount : 12) : 0
          };
        }
        return s;
      })
    );
  }, [showToast]);

  const sendChatMessage = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsgId = `msg-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setAiOrbState('thinking');

    // Generate smart mock grounded response
    setTimeout(() => {
      setAiOrbState('responding');

      const lower = text.toLowerCase();
      let responseText = '';
      let matchedMemories: { id: string; title: string }[] = [];

      if (lower.includes('learn') || lower.includes('studied') || lower.includes('recent')) {
        responseText = `Based on your recent memories, you've been actively learning React component architecture, studying p-n junction physics for PHY175, and researching vector database benchmarks for low-latency memory systems.`;
        matchedMemories = memories.slice(0, 3).map((m) => ({ id: m.id, title: m.title }));
      } else if (lower.includes('project') || lower.includes('idea') || lower.includes('assistant')) {
        responseText = `You recorded a project idea for an "AI Study Assistant" that creates flashcards from lecture PDFs, as well as your hackathon pitch plan for "The Memory Agent" (MemBUD).`;
        matchedMemories = memories
          .filter((m) => m.category === 'Idea' || m.category === 'Projects')
          .slice(0, 2)
          .map((m) => ({ id: m.id, title: m.title }));
      } else if (lower.includes('physics') || lower.includes('quantum') || lower.includes('semiconductor')) {
        responseText = `Your physics repository contains notes on p-n junction Fermi levels (V_bi equations) and Schrödinger wave equation derivations for 1D potential wells.`;
        matchedMemories = memories
          .filter((m) => m.tags.includes('Physics') || m.category === 'Study')
          .slice(0, 2)
          .map((m) => ({ id: m.id, title: m.title }));
      } else if (lower.includes('topic') || lower.includes('connected') || lower.includes('most')) {
        responseText = `Your highest density topics are Frontend Development (React, TypeScript), Artificial Intelligence (RAG, Vector DBs, Prompting), and Physics. You have 128 total indexed concepts.`;
        matchedMemories = memories.slice(0, 3).map((m) => ({ id: m.id, title: m.title }));
      } else {
        responseText = `I analyzed your 128 stored memories. Key relevant insights: ${memories[0]?.title || 'React Architecture'} and ${memories[1]?.title || 'AI Study Assistant'}. Let me know if you would like me to synthesize these further.`;
        matchedMemories = memories.slice(0, 2).map((m) => ({ id: m.id, title: m.title }));
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sourceMemories: matchedMemories.length > 0 ? matchedMemories : undefined
      };

      setChatMessages((prev) => [...prev, aiMsg]);

      setTimeout(() => {
        setAiOrbState('idle');
      }, 1000);
    }, 1200);
  }, [memories]);

  const clearChatHistory = useCallback(() => {
    setChatMessages([]);
    showToast('Chat cleared', 'Conversation history reset.', 'info');
  }, [showToast]);

  return (
    <MemoryContext.Provider
      value={{
        memories,
        sources,
        timelineEvents,
        chatMessages,
        graphNodes,
        graphEdges,
        activeMemory,
        addMemoryModalOpen,
        commandPaletteOpen,
        searchQuery,
        selectedCategory,
        aiOrbState,
        setSearchQuery,
        setSelectedCategory,
        setActiveMemory,
        setAddMemoryModalOpen,
        setCommandPaletteOpen,
        setAiOrbState,
        addMemory,
        updateMemory,
        deleteMemory,
        toggleSourceConnection,
        sendChatMessage,
        clearChatHistory
      }}
    >
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemory = () => {
  const context = useContext(MemoryContext);
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider');
  }
  return context;
};
