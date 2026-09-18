// MemBUD Centralized Mock Dataset & State Seed

export const initialMockData = {
  currentUser: {
    id: "usr_01",
    name: "Udbhav Singh",
    email: "udbhav@membud.ai",
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
    timezone: "Asia/Kolkata (GMT+5:30)",
    dateJoined: "September 2026",
    aiResponseStyle: "Balanced",
    memorySettings: {
      useAllMemories: true,
      showSourceReferences: true,
      warnConflicts: true,
      upcomingNotifications: true
    }
  },

  stats: {
    totalMemories: 1284,
    totalDocuments: 24,
    totalPeople: 18,
    upcomingEvents: 12
  },

  documents: [
    {
      id: "doc_01",
      filename: "Exam_Schedule.pdf",
      fileType: "pdf",
      fileSize: "245 KB",
      uploadDate: "2026-09-15",
      status: "Ready",
      chunkCount: 8,
      sourceType: "Official University Portal",
      content: `LPU Semester Examination Schedule - Autumn 2026
Course: Bachelor of Technology (CSE)
1. PHY175 CA - Physics Mechanics & Optics: 19 September 2026, 10:00 AM (Hall B3)
2. MTH165 CA - Differential Equations: 22 September 2026, 02:00 PM (Hall A1)
3. CSE111 CA - Data Structures & Algorithms: 23 September 2026, 10:00 AM (Lab 4)
4. ECE120 CA - Digital Electronics: 25 September 2026, 09:00 AM (Hall C2)`
    },
    {
      id: "doc_02",
      filename: "Updated_Schedule.png",
      fileType: "image",
      fileSize: "842 KB",
      uploadDate: "2026-09-17",
      status: "Ready",
      chunkCount: 3,
      sourceType: "Class WhatsApp Group Notice",
      content: `[URGENT ANNOUNCEMENT FROM DEAN OFFICE]
Notice regarding PHY175 CA Rescheduling:
Due to lab maintenance on Sept 19th, PHY175 CA is officially shifted to 20 September 2026 at 11:30 AM in Auditorium Main.
Signed: Department Coordinator.`
    },
    {
      id: "doc_03",
      filename: "Project_Meeting.pdf",
      fileType: "pdf",
      fileSize: "1.2 MB",
      uploadDate: "2026-09-17",
      status: "Ready",
      chunkCount: 14,
      sourceType: "Team Meeting Minutes",
      content: `MemBUD Hackathon Architecture Sync - 17 Sep 2026
Attendees: Rahul Sharma, Aman, Priya, Udbhav Singh.
Key Decisions:
- Rahul strongly suggested using FastAPI and Python 3.14 for the backend API because of superior async performance and native integration with Google GenAI SDK.
- Aman will lead the frontend component system using modern utility styling and clean responsive cards.
- Priya is designing the SQLite/Postgres database schema for users, memories, document chunks, entities, and relationships.
- Hackathon Submission Target: 25 September 2026.`
    },
    {
      id: "doc_04",
      filename: "Rahul_WhatsApp_Discussion.txt",
      fileType: "text",
      fileSize: "18 KB",
      uploadDate: "2026-09-17",
      status: "Ready",
      chunkCount: 5,
      sourceType: "Exported Chat",
      content: `[17/09/26, 14:15] Rahul: Hey Udbhav, for MemBUD's vector search, ChromaDB is super fast for local persistence.
[17/09/26, 14:18] Rahul: Also make sure we extract entities (people, dates, events) during document ingestion so the graph view works smooth.
[17/09/26, 14:22] Udbhav: Sounds great Rahul! What about authentication?
[17/09/26, 14:25] Rahul: Use PyJWT with bcrypt. Isolated memory per user_id is mandatory for privacy.`
    },
    {
      id: "doc_05",
      filename: "Internship_Email.txt",
      fileType: "text",
      fileSize: "12 KB",
      uploadDate: "2026-09-14",
      status: "Ready",
      chunkCount: 4,
      sourceType: "Exported Email",
      content: `Subject: Google Summer Internship 2027 Application Confirmation
Dear Udbhav,
Thank you for submitting your application for the Software Engineering Internship position.
Important Dates:
- Online Assessment Deadline: 25 September 2026 (11:59 PM IST)
- Technical Interviews Window: October 10 - October 20, 2026.
Best regards,
Google Student Recruitment Team`
    },
    {
      id: "doc_06",
      filename: "Scholarship_Details.pdf",
      fileType: "pdf",
      fileSize: "512 KB",
      uploadDate: "2026-09-10",
      status: "Ready",
      chunkCount: 6,
      sourceType: "Financial Document",
      content: `Merit Scholarship Award Letter 2026-2027
Awardee: Udbhav Singh
Scholarship Tier: 80% Tuition Waiver
Requirement: Maintain minimum CGPA of 8.5 across all semesters. Verification due on 30 October 2026.`
    }
  ],

  memories: [
    {
      id: "mem_01",
      title: "PHY175 Exam Date (Schedule 1)",
      content: "PHY175 CA - Physics Mechanics & Optics is scheduled on 19 September 2026 at 10:00 AM in Hall B3.",
      category: "Events",
      sourceDocId: "doc_01",
      sourceName: "Exam_Schedule.pdf",
      page: 2,
      date: "19 Sep 2026",
      importance: "High",
      hasConflict: true
    },
    {
      id: "mem_02",
      title: "PHY175 Exam Rescheduled Date",
      content: "PHY175 CA shifted to 20 September 2026 at 11:30 AM in Auditorium Main due to lab maintenance.",
      category: "Events",
      sourceDocId: "doc_02",
      sourceName: "Updated_Schedule.png",
      page: 1,
      date: "20 Sep 2026",
      importance: "High",
      hasConflict: true
    },
    {
      id: "mem_03",
      title: "Backend Framework Decision",
      content: "Rahul suggested using FastAPI for the MemBUD backend API during the team sync on 17 Sep 2026.",
      category: "Projects",
      sourceDocId: "doc_03",
      sourceName: "Project_Meeting.pdf",
      page: 1,
      date: "17 Sep 2026",
      importance: "Medium",
      person: "Rahul Sharma"
    },
    {
      id: "mem_04",
      title: "Vector Search Implementation",
      content: "Rahul recommended ChromaDB for local vector persistence and metadata filtering by user_id.",
      category: "Notes",
      sourceDocId: "doc_04",
      sourceName: "Rahul_WhatsApp_Discussion.txt",
      page: 1,
      date: "17 Sep 2026",
      importance: "Medium",
      person: "Rahul Sharma"
    },
    {
      id: "mem_05",
      title: "Google Internship Assessment",
      content: "Google Internship Online Assessment deadline is 25 September 2026 (11:59 PM IST).",
      category: "Events",
      sourceDocId: "doc_05",
      sourceName: "Internship_Email.txt",
      page: 1,
      date: "25 Sep 2026",
      importance: "High"
    }
  ],

  people: [
    {
      id: "ppl_01",
      name: "Rahul Sharma",
      role: "Backend Lead / Teammate",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
      memoryCount: 12,
      memories: [
        "Suggested FastAPI for MemBUD backend API",
        "Recommended ChromaDB for vector database",
        "Emphasized PyJWT and user_id data isolation",
        "Participated in 17 Sep project meeting"
      ],
      documents: ["Project_Meeting.pdf", "Rahul_WhatsApp_Discussion.txt"]
    },
    {
      id: "ppl_02",
      name: "Aman",
      role: "Frontend Engineer / Teammate",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
      memoryCount: 8,
      memories: [
        "Leading frontend component system and styling",
        "Ensuring mobile responsiveness and clean micro-interactions"
      ],
      documents: ["Project_Meeting.pdf"]
    },
    {
      id: "ppl_03",
      name: "Priya",
      role: "Database Architect / Teammate",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      memoryCount: 5,
      memories: [
        "Designing relational schema for users, chunks, entities, and relationships"
      ],
      documents: ["Project_Meeting.pdf"]
    }
  ],

  events: [
    {
      id: "evt_01",
      title: "PHY175 CA (Physics)",
      date: "2026-09-19",
      time: "10:00 AM",
      location: "Hall B3 (Notice: Rescheduled to Auditorium Main)",
      sourceDoc: "Exam_Schedule.pdf & Updated_Schedule.png",
      hasConflict: true,
      conflictNotice: "Conflicting dates: Sept 19 in Exam_Schedule.pdf vs Sept 20 in Updated_Schedule.png"
    },
    {
      id: "evt_02",
      title: "MTH165 CA (Mathematics)",
      date: "2026-09-22",
      time: "02:00 PM",
      location: "Hall A1",
      sourceDoc: "Exam_Schedule.pdf",
      hasConflict: false
    },
    {
      id: "evt_03",
      title: "CSE111 CA (Data Structures)",
      date: "2026-09-23",
      time: "10:00 AM",
      location: "Lab 4",
      sourceDoc: "Exam_Schedule.pdf",
      hasConflict: false
    },
    {
      id: "evt_04",
      title: "Google Internship OA Deadline",
      date: "2026-09-25",
      time: "11:59 PM IST",
      location: "Online Portal",
      sourceDoc: "Internship_Email.txt",
      hasConflict: false
    }
  ],

  relationships: {
    nodes: [
      { id: "Rahul", label: "Rahul Sharma", type: "Person", color: "#10B981" },
      { id: "FastAPI", label: "FastAPI", type: "Project", color: "#3B82F6" },
      { id: "MemBUD", label: "MemBUD Agent", type: "Project", color: "#8B5CF6" },
      { id: "TeamMeeting", label: "Team Sync (17 Sep)", type: "Event", color: "#F59E0B" },
      { id: "PHY175", label: "PHY175 CA Exam", type: "Event", color: "#EF4444" },
      { id: "Google", label: "Google Internship", type: "Topic", color: "#06B6D4" }
    ],
    edges: [
      { source: "Rahul", target: "FastAPI", label: "recommended" },
      { source: "FastAPI", target: "MemBUD", label: "used for backend" },
      { source: "Rahul", target: "TeamMeeting", label: "attended" },
      { source: "TeamMeeting", target: "MemBUD", label: "discussed" },
      { source: "MemBUD", target: "PHY175", label: "remembers date" },
      { source: "MemBUD", target: "Google", label: "tracks deadline" }
    ]
  },

  conversations: [
    {
      id: "conv_01",
      title: "Physics Exam & Conflict Check",
      updatedAt: "Just now",
      messages: [
        {
          id: "msg_01",
          role: "user",
          content: "When is my physics exam?",
          createdAt: "10:14 AM"
        },
        {
          id: "msg_02",
          role: "assistant",
          content: "I checked your memories and detected **conflicting information** regarding your PHY175 Physics CA exam date.\n\n- According to your **Exam_Schedule.pdf** (Page 2), PHY175 CA is scheduled for **19 September 2026 at 10:00 AM**.\n- However, a newer notice in **Updated_Schedule.png** (Page 1) states that PHY175 CA has been rescheduled to **20 September 2026 at 11:30 AM** due to lab maintenance.\n\nSince both documents are in your memory, I cannot silently choose one, though the WhatsApp notice appears to be a newer update.",
          createdAt: "10:14 AM",
          hasConflict: true,
          conflictData: {
            topic: "PHY175 CA Exam Date",
            source1: { docName: "Exam_Schedule.pdf", page: 2, excerpt: "PHY175 CA - Physics Mechanics & Optics: 19 September 2026, 10:00 AM" },
            source2: { docName: "Updated_Schedule.png", page: 1, excerpt: "Notice: PHY175 CA is officially shifted to 20 September 2026 at 11:30 AM" }
          },
          sources: [
            { docId: "doc_01", docName: "Exam_Schedule.pdf", page: 2, excerpt: "PHY175 CA - 19 September 2026, 10:00 AM (Hall B3)" },
            { docId: "doc_02", docName: "Updated_Schedule.png", page: 1, excerpt: "PHY175 CA shifted to 20 September 2026 at 11:30 AM" }
          ]
        }
      ]
    },
    {
      id: "conv_02",
      title: "Rahul's Recommendations",
      updatedAt: "Yesterday",
      messages: [
        {
          id: "msg_03",
          role: "user",
          content: "What did Rahul say about the project?",
          createdAt: "Yesterday"
        },
        {
          id: "msg_04",
          role: "assistant",
          content: "Based on your meeting notes (**Project_Meeting.pdf**) and chat logs (**Rahul_WhatsApp_Discussion.txt**):\n\n1. **Backend Framework**: Rahul strongly recommended using **FastAPI** with Python 3.14 for high performance.\n2. **Vector Database**: He suggested **ChromaDB** for local vector search and metadata filtering by `user_id`.\n3. **Security**: He emphasized using **PyJWT** and bcrypt to guarantee complete data isolation per user.",
          createdAt: "Yesterday",
          sources: [
            { docId: "doc_03", docName: "Project_Meeting.pdf", page: 1, excerpt: "Rahul strongly suggested using FastAPI and Python 3.14..." },
            { docId: "doc_04", docName: "Rahul_WhatsApp_Discussion.txt", page: 1, excerpt: "ChromaDB is super fast for local persistence..." }
          ]
        }
      ]
    }
  ],

  suggestedQuestions: [
    "When is my physics exam?",
    "What did Rahul say about the project?",
    "What deadlines do I have?",
    "Show conflicting information.",
    "Remind me 3 days before my physics exam."
  ]
};
