// MemBUD Landing Page Component

export function renderLandingPage() {
  return `
    <div class="min-h-screen bg-[var(--bg-app)] text-[var(--text-primary)] flex flex-col justify-between">
      <!-- Navbar -->
      <nav class="h-20 px-6 lg:px-16 border-b border-[var(--bg-card-border)] flex items-center justify-between backdrop-blur-md sticky top-0 z-30 bg-[var(--header-bg)]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center text-white font-extrabold text-xl shadow-lg">
            🧠
          </div>
          <span class="font-extrabold text-xl tracking-tight text-[var(--text-primary)]">MemBUD</span>
        </div>

        <div class="flex items-center gap-4">
          <a href="#/login" class="btn-secondary text-sm">Sign In</a>
          <a href="#/dashboard" id="landing-demo-btn" class="btn-primary text-sm">⚡ Explore Demo</a>
        </div>
      </nav>

      <!-- Hero Section -->
      <main class="flex-1 max-w-6xl mx-auto px-6 py-16 lg:py-24 flex flex-col items-center text-center space-y-8">
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-xs font-semibold text-[var(--accent-primary)] animate-pulse">
          <span>✨ AI PERSONAL MEMORY ASSISTANT</span>
        </div>

        <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight max-w-4xl">
          Your life. <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-light)]">One searchable memory.</span>
        </h1>

        <p class="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl font-normal leading-relaxed">
          MemBUD brings your PDFs, notes, screenshots, exported WhatsApp chats, emails, and events into one intelligent, grounded personal memory.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <a href="#/signup" class="btn-primary text-base px-8 py-3.5 rounded-xl shadow-xl">Get Started Free →</a>
          <a href="#/dashboard" class="btn-secondary text-base px-8 py-3.5 rounded-xl">⚡ Try Hackathon Demo</a>
        </div>

        <!-- Animated Brain & Memory Ingestion Mockup -->
        <div class="w-full max-w-4xl mt-12 p-6 rounded-2xl card-surface border border-[var(--accent-border)] shadow-2xl space-y-6 relative overflow-hidden">
          <div class="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[var(--accent-glow)] blur-3xl pointer-events-none"></div>
          
          <div class="flex items-center justify-between border-b border-[var(--bg-card-border)] pb-4 text-xs font-mono text-[var(--text-muted)]">
            <span class="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> MEMORY INGESTION ENGINE</span>
            <span>GROUNDED RAG ACTIVE</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--bg-card-border)] text-left space-y-2">
              <span class="text-2xl">📄</span>
              <p class="font-bold text-xs">Exam_Schedule.pdf</p>
              <span class="badge">Page 2 Extracted</span>
            </div>
            <div class="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--bg-card-border)] text-left space-y-2">
              <span class="text-2xl">📸</span>
              <p class="font-bold text-xs">Updated_Schedule.png</p>
              <span class="badge">OCR Processed</span>
            </div>
            <div class="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--bg-card-border)] text-left space-y-2">
              <span class="text-2xl">💬</span>
              <p class="font-bold text-xs">Rahul_Chat.txt</p>
              <span class="badge">People Linked</span>
            </div>
            <div class="p-4 rounded-xl bg-[var(--bg-input)] border border-[var(--bg-card-border)] text-left space-y-2">
              <span class="text-2xl">📧</span>
              <p class="font-bold text-xs">Internship_Email.txt</p>
              <span class="badge">Events Extracted</span>
            </div>
          </div>
        </div>

        <!-- Problem Section -->
        <section class="w-full pt-16 space-y-8 text-left">
          <h2 class="text-2xl font-bold text-[var(--text-primary)] text-center">Your information is scattered everywhere.</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 rounded-xl card-surface space-y-3">
              <span class="text-3xl">📄</span>
              <h3 class="font-bold text-base">Forgotten PDFs & Notes</h3>
              <p class="text-xs text-[var(--text-secondary)]">Important exam schedules, syllabus notes, and internship offers hidden in folders.</p>
            </div>
            <div class="p-6 rounded-xl card-surface space-y-3">
              <span class="text-3xl">💬</span>
              <h3 class="font-bold text-base">Chat Screenshots</h3>
              <p class="text-xs text-[var(--text-secondary)]">Critical decisions made in WhatsApp groups that you can never search by text.</p>
            </div>
            <div class="p-6 rounded-xl card-surface space-y-3">
              <span class="text-3xl">⚠️</span>
              <h3 class="font-bold text-base">Conflicting Updates</h3>
              <p class="text-xs text-[var(--text-secondary)]">Multiple rescheduled dates where traditional search fails to point out conflicts.</p>
            </div>
          </div>
        </section>

        <!-- Trust Section -->
        <section class="w-full py-12 p-8 rounded-2xl bg-[var(--bg-surface-hover)] border border-[var(--bg-card-border)] text-center space-y-4">
          <span class="text-xs font-mono font-bold tracking-widest text-[var(--accent-primary)] uppercase">NEVER GUESS GUARANTEE</span>
          <h2 class="text-3xl font-extrabold text-[var(--text-primary)]">Grounded Intelligence with Source Citations</h2>
          <p class="text-sm text-[var(--text-secondary)] max-w-xl mx-auto">
            If your memories disagree, MemBUD explicitly flags the conflict. If information is missing, MemBUD says "I don't have enough information" instead of inventing facts.
          </p>
        </section>
      </main>

      <!-- Footer -->
      <footer class="py-8 px-6 border-t border-[var(--bg-card-border)] text-center text-xs text-[var(--text-muted)]">
        <p>© 2026 MemBUD AI Assistant • Hackathon Edition • Remember Everything. Retrieve Intelligently.</p>
      </footer>
    </div>
  `;
}
