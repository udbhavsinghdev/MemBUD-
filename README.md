# 🧠 MemBUD — AI Personal Memory Assistant

> **"Your life. One searchable memory."**

MemBUD is a hackathon-ready AI-powered personal knowledge and memory assistant web application. It brings your PDFs, screenshots, chat exports, notes, emails, and calendars into one intelligent, grounded memory base.

---

## 🌟 Key Features

1. **Grounded AI RAG Chat**: Ask natural language questions about your personal documents. MemBUD cites exact source files and page numbers.
2. **Conflict Detection Engine**: Detects when multiple uploaded documents contradict each other (e.g., exam dates) and warns you explicitly instead of guessing.
3. **Autonomous AI Agent**: Plans and executes user-requested actions (e.g. creating calendar reminders 3 days before an exam) after explicit user confirmation.
4. **Drag & Drop Document Ingestion**: Simulates real-time 5-phase document processing (Uploading → Processing → Extracting → Vectorizing → Ready).
5. **Interactive Knowledge Graph**: Visualize relationships between people, projects, events, and documents.
6. **People Memory Profiles**: Automatically extracts people (e.g., Rahul Sharma) and groups linked decisions and memories.
7. **Event Timeline Schedule**: Chronological view of exams, project syncs, and deadlines.
8. **Dual Theme System**:
   - **Dark Theme (Default)**: Deep Obsidian Black & Emerald/Neon Green (`#10B981`)
   - **Light Theme**: Soft Slate White & Royal Blue (`#2563EB`)
9. **Command Palette (`Ctrl+K` / `⌘K`)**: Quick navigation, theme switching, and demo data re-seeding.
10. **Demo Mode**: Includes preloaded sample dataset and demo questions for hackathon presentation.

---

## 📐 Application Architecture

```text
                                 User Interface (SPA)
                                          │
            ┌─────────────────────────────┼─────────────────────────────┐
            ▼                             ▼                             ▼
   [ Landing & Auth ]             [ Personal Dashboard ]        [ AI Chat Interface ]
            │                             │                             │
            └─────────────────────────────┼─────────────────────────────┘
                                          ▼
                               [ Client-Side Router ]
                                          │
                         ┌────────────────┴────────────────┐
                         ▼                                 ▼
               [ Reactive Store ]               [ Simulated AI Engine ]
            (localStorage Persistence)        (RAG / Conflict / Action)
                         │                                 │
                         └────────────────┬────────────────┘
                                          ▼
                                [ Source & Graph UI ]
```

---

## 🚀 How to Run in VSCode

MemBUD is built with **zero external package dependencies** (pure HTML5, CSS3, ES Modules, Tailwind CDN, and Python). You can run it immediately in VSCode without `npm` or `node`.

### Method 1: VSCode Live Server (Recommended)
1. Open the `MemBUD` folder in VSCode.
2. Install the **Live Server** extension (if not already installed).
3. Right-click `index.html` and select **"Open with Live Server"**.

### Method 2: Python Development Server
Run the included Python server script:
```bash
python server.py
```
This will start a local server at `http://localhost:8080` and open it automatically in your default browser.

### Method 3: Direct File View
Simply double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, or Firefox.

---

## 🎯 Hackathon Demo & Presentation Guide

When presenting MemBUD to judges, follow this flow:

1. **Landing Page (`#/`)**: Show the product vision and click **"⚡ Explore Demo"**.
2. **Dashboard (`#/dashboard`)**: Show statistics, recent memories, and the **Active Memory Conflict** alert banner.
3. **AI Chat (`#/chat`)**: Click the suggested question:
   > *"When is my physics exam?"*
   - Observe how MemBUD detects a **conflict** between `Exam_Schedule.pdf` (Sept 19) and `Updated_Schedule.png` (Sept 20).
   - Click **"View →"** on any source card to inspect the highlighted excerpt in the source viewer modal.
4. **Autonomous AI Agent**: In chat, ask:
   > *"Remind me 3 days before my physics exam."*
   - Watch the agent plan a reminder for **16 September 2026** and prompt you with a **Confirm & Create** confirmation card.
5. **Interactive Connections Graph (`#/connections`)**: Click on the **Rahul** or **FastAPI** nodes to trigger context search.
6. **Theme Switcher**: Click the sun/moon icon on the top bar or press `Ctrl+K` and run **Toggle Dark/Light Theme**.

---

## 📂 Project Directory Structure

```text
MemBUD/
├── index.html                   # Main SPA entry point
├── server.py                    # Python HTTP server launcher
├── README.md                    # Documentation
└── assets/
    ├── css/
    │   └── styles.css           # Design system (Green/Black & Blue/Slate themes)
    └── js/
        ├── router.js            # Client-side hash router
        ├── data/
        │   └── mockData.js      # Mock dataset (Docs, Memories, People, Events, Conflicts)
        ├── services/
        │   ├── store.js         # Reactive store with localStorage persistence
        │   └── mockAiService.js # Simulated RAG & conflict engine
        ├── components/
        │   ├── navbar.html/js   # Header with theme toggle & search
        │   ├── sidebar.js       # Navigation sidebar
        │   ├── commandPalette.js# Ctrl+K modal
        │   ├── sourceModal.js   # Document source viewer
        │   ├── actionModal.js   # Autonomous agent confirmation card
        │   └── toast.js         # Notification system
        └── pages/
            ├── landing.js       # Marketing landing page
            ├── login.js         # Auth sign-in
            ├── signup.js        # Auth sign-up
            ├── dashboard.js     # Home dashboard
            ├── chat.js          # RAG AI Chatbot
            ├── memories.js      # Searchable memory library
            ├── documents.js     # Drag-and-drop uploader
            ├── people.js        # Extracted people profiles
            ├── events.js        # Event timeline
            ├── connections.js   # Interactive SVG relationship graph
            ├── profile.js       # Profile management
            └── settings.js      # Theme & AI response style settings
```
