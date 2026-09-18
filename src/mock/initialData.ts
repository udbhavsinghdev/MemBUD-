import { Memory, SourceIntegration, TimelineEvent, ChatMessage, UserProfile, UserSettings, GraphNode, GraphEdge } from '../types';

export const initialMemories: Memory[] = [
  {
    id: 'mem-1',
    title: 'Started learning React component architecture',
    description: 'Notes about reusable components, props, state management and project structure.',
    content: `React architecture revolves around component modularity, single-responsibility principle, and unidirectional data flow. Key principles learned:
1. Prefer functional components with hooks.
2. Keep state lifting strictly to common ancestors.
3. Decouple domain logic using custom hooks.
4. Use context providers for global cross-cutting concerns like Auth, Theme, and Memory state.`,
    category: 'Personal',
    tags: ['React', 'Coding', 'Frontend', 'Architecture'],
    createdAt: '2 hours ago',
    updatedAt: '1 hour ago',
    source: 'Personal Note',
    aiSummary: 'Synthesis of React component design principles, state lifting strategies, and clean code practices.',
    relatedMemoryIds: ['mem-2', 'mem-5'],
    connectedConcepts: ['Frontend Development', 'Component Patterns', 'State Management'],
    importance: 'high'
  },
  {
    id: 'mem-2',
    title: 'Project idea: AI Study Assistant',
    description: 'Concept for an autonomous agent that creates custom quizzes and flashcards from lecture PDFs.',
    content: `An intelligent agent system that ingests course PDFs (physics, computer science), parses textbook chapters, builds a vector index, and generates adaptive flashcards.
Features:
- Spaced repetition algorithm (SuperMemo-2).
- Automatic diagram parsing via vision model.
- Knowledge graph tracking student mastery per topic.`,
    category: 'Idea',
    tags: ['AI', 'Study', 'EdTech', 'Hackathon'],
    createdAt: 'Yesterday',
    source: 'Personal Note',
    aiSummary: 'Autonomous agent design for automated flashcard generation and adaptive spaced repetition study routines.',
    relatedMemoryIds: ['mem-1', 'mem-3', 'mem-7'],
    connectedConcepts: ['Spaced Repetition', 'LLM Agents', 'Vector Indexing'],
    importance: 'high'
  },
  {
    id: 'mem-3',
    title: 'Physics semiconductor notes (PHY175)',
    description: 'Summary of p-n junction physics, Fermi levels, energy band diagrams, and diode characteristics.',
    content: `Key points from PHY175 Lecture 8:
- Intrinsic vs extrinsic semiconductors (doping with group III or V elements).
- Depletion region formation at p-n interface due to carrier diffusion.
- Built-in potential equation: V_bi = (k*T/q) * ln(N_A * N_D / n_i^2).
- Forward bias reduces potential barrier, causing exponential current flow.`,
    category: 'Study',
    tags: ['Physics', 'Semiconductors', 'College', 'ExamPrep'],
    createdAt: '2 days ago',
    source: 'Document PDF',
    fileName: 'PHY175_Semiconductors_Lecture8.pdf',
    fileSize: '2.4 MB',
    aiSummary: 'Detailed derivation of p-n junction carrier dynamics, energy band diagrams, and diode equations.',
    relatedMemoryIds: ['mem-2', 'mem-8'],
    connectedConcepts: ['Solid State Physics', 'Semiconductors', 'Fermi Levels'],
    importance: 'medium'
  },
  {
    id: 'mem-4',
    title: 'Vector Database Benchmarks for Memory Systems',
    description: 'Comparison of Qdrant, Pinecone, and Chroma for low-latency similarity search.',
    content: `Evaluated 3 vector databases for local and hybrid RAG applications:
- Qdrant: Excellent Rust performance, native hybrid search (sparse + dense vectors), self-hostable.
- Chroma: Lightweight Python/JS native DB, ideal for local prototyping.
- Pinecone: Fully managed cloud solution with low operational overhead.
Conclusion: Qdrant is optimal for production scale with strict p99 latency SLAs under 20ms.`,
    category: 'Research',
    tags: ['VectorDB', 'RAG', 'AI Systems', 'Performance'],
    createdAt: '3 days ago',
    source: 'Web Link',
    sourceUrl: 'https://github.com/qdrant/qdrant',
    aiSummary: 'Performance benchmark analysis of vector stores for AI retrieval and context memory backends.',
    relatedMemoryIds: ['mem-2', 'mem-6'],
    connectedConcepts: ['Vector Databases', 'Semantic Search', 'RAG'],
    importance: 'high'
  },
  {
    id: 'mem-5',
    title: 'Tailwind CSS Glassmorphism & UI Patterns',
    description: 'Design system tokens and CSS backdrop-filter snippets for modern dark theme UIs.',
    content: `Creating premium glass UI in Tailwind:
- Backdrop blur: backdrop-blur-md / backdrop-blur-xl.
- Border translucency: border border-white/10.
- Glow accents: box-shadow with colored cyan/purple glows.
- Dark charcoal backgrounds (#090A0F) prevent harsh contrast while highlighting glowing elements.`,
    category: 'Work',
    tags: ['Tailwind', 'DesignSystem', 'CSS', 'UI/UX'],
    createdAt: '4 days ago',
    source: 'Browser Extension',
    aiSummary: 'Design guidelines for building dark-themed, glassmorphic interfaces with glowing accents and subtle borders.',
    relatedMemoryIds: ['mem-1'],
    connectedConcepts: ['UI/UX Design', 'Design Systems', 'Dark Mode Aesthetics'],
    importance: 'medium'
  },
  {
    id: 'mem-6',
    title: 'Prompt Engineering Strategies for Long-term Context',
    description: 'Techniques for summarization, sliding window attention, and hierarchical memory trees.',
    content: `To maintain persistent context across long AI chat sessions:
1. Hierarchical Summarization: Periodically compress conversation turns into bulleted topic summaries.
2. Episodic Memory Store: Tag user statements with entity-attribute triples (e.g. User -> learns -> React).
3. Context Re-ranking: Use cross-encoders to fetch top-k relevant memories prior to generation.`,
    category: 'Research',
    tags: ['PromptEngineering', 'LLM', 'ContextWindow', 'AI'],
    createdAt: '5 days ago',
    source: 'Notion',
    aiSummary: 'Architectural research on context compression, memory indexing, and retrieval-augmented prompt construction.',
    relatedMemoryIds: ['mem-4', 'mem-7'],
    connectedConcepts: ['LLM Context', 'Prompt Design', 'Memory Compression'],
    importance: 'high'
  },
  {
    id: 'mem-7',
    title: 'Memory Agent Hackathon Pitch & Architecture Plan',
    description: 'Outline for building the ultimate personal second brain AI application.',
    content: `Hackathon Objective:
Build "The Memory Agent" (MemBUD) — an AI system that captures, connects, and recalls every thought, note, link, and file.
Key USP:
- Visual knowledge graph displaying memory interconnections.
- Conversational grounding where AI answers display explicit memory source citations.
- Instant ⌘K global command palette search.
- Dark startup aesthetic with glowing AI orb identity.`,
    category: 'Projects',
    tags: ['Hackathon', 'Pitch', 'MemBUD', 'ProductDesign'],
    createdAt: '6 days ago',
    source: 'Google Drive',
    aiSummary: 'Strategic roadmap and architectural specification for the MemBUD Hackathon submission.',
    relatedMemoryIds: ['mem-1', 'mem-2', 'mem-4'],
    connectedConcepts: ['Product Strategy', 'Hackathon Projects', 'AI Second Brain'],
    importance: 'high'
  },
  {
    id: 'mem-8',
    title: 'Quantum Mechanics Schrödinger Equation Notes',
    description: 'Time-dependent vs time-independent Schrödinger wave equation derivations.',
    content: `Formulation:
i * ħ * (∂Ψ/∂t) = H_hat * Ψ
Where H_hat = -(ħ² / 2m) * ∇² + V(r,t).
Applications: Particle in a 1D infinite potential well, harmonic oscillator, and tunneling probabilities in nano-scale transistors.`,
    category: 'Study',
    tags: ['Physics', 'Quantum', 'Math', 'College'],
    createdAt: '1 week ago',
    source: 'Document PDF',
    fileName: 'Quantum_Mechanics_Ch3.pdf',
    fileSize: '4.1 MB',
    aiSummary: 'Mathematical foundations of wave function mechanics, Hamiltonian operators, and quantum boundary conditions.',
    relatedMemoryIds: ['mem-3'],
    connectedConcepts: ['Quantum Physics', 'Wave Equations', 'Math Methods'],
    importance: 'medium'
  },
  {
    id: 'mem-9',
    title: 'TypeScript 5.7 Feature Overview & Best Practices',
    description: 'Notes on checks for uninitialized variables, path mapping enhancements, and strict type safety.',
    content: `TypeScript 5.7 enhancements:
- Smart narrowing for uninitialized variables inside function closures.
- Improved build tools integration with project references.
- Best Practice: Always enforce 'noImplicitAny', 'strictNullChecks', and explicit return types on public API interfaces.`,
    category: 'Work',
    tags: ['TypeScript', 'Coding', 'WebDev'],
    createdAt: '1 week ago',
    source: 'GitHub',
    sourceUrl: 'https://github.com/microsoft/TypeScript',
    aiSummary: 'Summary of compiler optimizations and type system safety improvements in TypeScript 5.7.',
    relatedMemoryIds: ['mem-1'],
    connectedConcepts: ['TypeScript', 'Type Systems', 'Developer Tools'],
    importance: 'medium'
  },
  {
    id: 'mem-10',
    title: 'Weekly Workout & Fitness Tracking Routine',
    description: 'Hypertrophy weight training split, cardio targets, and daily protein goals.',
    content: `Push/Pull/Legs 6-day split:
- Monday (Push): Bench press, overhead press, incline dumbbells, tricep dips.
- Tuesday (Pull): Lat pulldowns, barbell rows, face pulls, bicep curls.
- Wednesday (Legs): Squats, Romanian deadlifts, calf raises, leg extensions.
Nutrition Target: 160g protein daily, 3L water hydration.`,
    category: 'Personal',
    tags: ['Fitness', 'Health', 'Habits'],
    createdAt: '2 weeks ago',
    source: 'Personal Note',
    aiSummary: 'Personal workout split schedule and nutritional macro targets.',
    relatedMemoryIds: [],
    connectedConcepts: ['Health & Wellness', 'Habit Tracking'],
    importance: 'low'
  },
  {
    id: 'mem-11',
    title: 'Distributed Systems & Raft Consensus Algorithm',
    description: 'Understanding leader election, log replication, and split-brain prevention.',
    content: `Raft decomposes consensus into three independent sub-problems:
1. Leader Election: Select one node as cluster leader via randomized election timeouts.
2. Log Replication: Leader accepts log entries from clients and replicates them across followers.
3. Safety: If any server has applied a log entry at a given index, no other server will apply a different value for that index.`,
    category: 'Research',
    tags: ['DistributedSystems', 'Raft', 'Backend', 'CS'],
    createdAt: '2 weeks ago',
    source: 'Web Link',
    sourceUrl: 'https://raft.github.io/',
    aiSummary: 'In-depth break down of fault-tolerant distributed consensus mechanisms using Raft.',
    relatedMemoryIds: ['mem-4', 'mem-9'],
    connectedConcepts: ['Distributed Systems', 'Consensus Algorithms', 'Fault Tolerance'],
    importance: 'medium'
  },
  {
    id: 'mem-12',
    title: 'Favorite AI & Neuroscience Podcast Episode Summaries',
    description: 'Insights from Huberman Lab on focus mechanisms, dopamine regulation, and deep work.',
    content: `Key takeaways on cognitive performance:
- Non-sleep deep rest (NSDR) for rapid cognitive reset.
- 90-minute ultradian cycles for peak focused coding sessions.
- Delaying caffeine 90 minutes post-waking to avoid afternoon adenosine crash.`,
    category: 'Personal',
    tags: ['Neuroscience', 'Productivity', 'Podcasts'],
    createdAt: '3 weeks ago',
    source: 'Chat History',
    aiSummary: 'Actionable protocols for optimizing focus, energy, and deep work cycles.',
    relatedMemoryIds: ['mem-10'],
    connectedConcepts: ['Cognitive Performance', 'Deep Work', 'Habits'],
    importance: 'low'
  }
];

export const initialSources: SourceIntegration[] = [
  {
    id: 'src-1',
    name: 'Google Drive',
    description: 'Import PDFs, documents, slide decks, and spreadsheets automatically.',
    iconName: 'HardDrive',
    connected: true,
    itemCount: 42,
    lastSynced: '10 mins ago'
  },
  {
    id: 'src-2',
    name: 'Notion',
    description: 'Sync your workspace databases, daily journals, and project wikis.',
    iconName: 'FileText',
    connected: true,
    itemCount: 28,
    lastSynced: '1 hour ago'
  },
  {
    id: 'src-3',
    name: 'GitHub',
    description: 'Ingest code repositories, pull requests, READMEs, and technical issues.',
    iconName: 'Github',
    connected: true,
    itemCount: 19,
    lastSynced: '3 hours ago'
  },
  {
    id: 'src-4',
    name: 'Browser Extension',
    description: 'Capture web pages, articles, text snippets, and bookmarks with 1-click.',
    iconName: 'Globe',
    connected: true,
    itemCount: 86,
    lastSynced: 'Just now'
  },
  {
    id: 'src-5',
    name: 'Documents & Files',
    description: 'Upload local files (PDF, DOCX, TXT, images) directly into memory.',
    iconName: 'FolderUp',
    connected: true,
    itemCount: 14,
    lastSynced: 'Yesterday'
  },
  {
    id: 'src-6',
    name: 'Chat History',
    description: 'Automatically save AI conversation highlights and insights.',
    iconName: 'MessageSquare',
    connected: false,
    itemCount: 0
  }
];

export const initialTimelineEvents: TimelineEvent[] = [
  {
    id: 'tle-1',
    date: 'TODAY',
    time: '10:32 AM',
    type: 'saved',
    title: 'Saved: "React component architecture"',
    memoryId: 'mem-1',
    category: 'Personal'
  },
  {
    id: 'tle-2',
    date: 'TODAY',
    time: '09:15 AM',
    type: 'asked',
    title: 'Asked AI: "What should I learn next in frontend development?"',
    category: 'System'
  },
  {
    id: 'tle-3',
    date: 'YESTERDAY',
    time: '04:45 PM',
    type: 'saved',
    title: 'Saved: "Project idea: AI Study Assistant"',
    memoryId: 'mem-2',
    category: 'Idea'
  },
  {
    id: 'tle-4',
    date: '2 DAYS AGO',
    time: '02:10 PM',
    type: 'uploaded',
    title: 'Uploaded File: "PHY175_Semiconductors_Lecture8.pdf"',
    memoryId: 'mem-3',
    category: 'Study'
  },
  {
    id: 'tle-5',
    date: '3 DAYS AGO',
    time: '11:20 AM',
    type: 'connected',
    title: 'Connected Source: Notion Workspace "Second Brain"',
    category: 'System'
  }
];

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'What was I working on last week?',
    timestamp: '10:14 AM'
  },
  {
    id: 'msg-2',
    sender: 'ai',
    text: 'You were actively working on your Memory Agent hackathon project plan, evaluating vector database benchmarks (Qdrant vs Pinecone), and reviewing React component architecture for your frontend implementation.',
    timestamp: '10:14 AM',
    sourceMemories: [
      { id: 'mem-7', title: 'Memory Agent Hackathon Pitch' },
      { id: 'mem-4', title: 'Vector Database Benchmarks' },
      { id: 'mem-1', title: 'React Component Architecture' }
    ]
  }
];

export const initialGraphNodes: GraphNode[] = [
  { id: 'root', label: 'Memory Core', category: 'Root', val: 32, x: 0, y: 0 },
  { id: 'topic-ai', label: 'AI & Agents', category: 'Topic', val: 24, x: -140, y: -90 },
  { id: 'topic-coding', label: 'Frontend Dev', category: 'Topic', val: 22, x: 150, y: -80 },
  { id: 'topic-physics', label: 'Physics', category: 'Topic', val: 20, x: -120, y: 140 },
  { id: 'topic-hackathon', label: 'Hackathon', category: 'Topic', val: 18, x: 130, y: 130 },
  { id: 'mem-1', label: 'React Architecture', category: 'Personal', val: 14, memoryId: 'mem-1', x: 230, y: -130 },
  { id: 'mem-2', label: 'AI Study Assistant', category: 'Idea', val: 16, memoryId: 'mem-2', x: -60, y: -180 },
  { id: 'mem-3', label: 'Semiconductors', category: 'Study', val: 13, memoryId: 'mem-3', x: -210, y: 180 },
  { id: 'mem-4', label: 'VectorDB Benchmarks', category: 'Research', val: 15, memoryId: 'mem-4', x: -220, y: -30 },
  { id: 'mem-5', label: 'Tailwind Glassmorphism', category: 'Work', val: 12, memoryId: 'mem-5', x: 240, y: -20 },
  { id: 'mem-6', label: 'Prompt Engineering', category: 'Research', val: 15, memoryId: 'mem-6', x: -80, y: -80 },
  { id: 'mem-7', label: 'MemBUD Hackathon Pitch', category: 'Projects', val: 18, memoryId: 'mem-7', x: 40, y: 180 },
  { id: 'mem-8', label: 'Quantum Mechanics', category: 'Study', val: 12, memoryId: 'mem-8', x: -30, y: 220 },
  { id: 'mem-9', label: 'TypeScript 5.7', category: 'Work', val: 13, memoryId: 'mem-9', x: 260, y: 100 }
];

export const initialGraphEdges: GraphEdge[] = [
  { source: 'root', target: 'topic-ai', strength: 2 },
  { source: 'root', target: 'topic-coding', strength: 2 },
  { source: 'root', target: 'topic-physics', strength: 2 },
  { source: 'root', target: 'topic-hackathon', strength: 2 },
  { source: 'topic-ai', target: 'mem-2' },
  { source: 'topic-ai', target: 'mem-4' },
  { source: 'topic-ai', target: 'mem-6' },
  { source: 'topic-coding', target: 'mem-1' },
  { source: 'topic-coding', target: 'mem-5' },
  { source: 'topic-coding', target: 'mem-9' },
  { source: 'topic-physics', target: 'mem-3' },
  { source: 'topic-physics', target: 'mem-8' },
  { source: 'topic-hackathon', target: 'mem-7' },
  { source: 'topic-hackathon', target: 'mem-2' },
  { source: 'mem-1', target: 'mem-7' },
  { source: 'mem-2', target: 'mem-4' },
  { source: 'mem-4', target: 'mem-6' },
  { source: 'mem-3', target: 'mem-8' }
];

export const defaultUserProfile: UserProfile = {
  name: 'Alex Rivera',
  email: 'alex.rivera@antigravity.ai',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
  title: 'AI Researcher & Frontend Engineer',
  joinedDate: 'September 2026',
  location: 'San Francisco, CA',
  bio: 'Building futuristic second brain systems, learning quantum physics, and exploring vector embeddings.'
};

export const defaultUserSettings: UserSettings = {
  autoSaveMemories: true,
  aiSuggestions: true,
  dailySummary: true,
  smartConnections: true,
  darkMode: true,
  privacyLevel: 'Strict',
  storageQuotaMb: 1024
};
