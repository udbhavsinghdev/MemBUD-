// MemBUD Personal Dashboard Component

import { store } from '../services/store.js';
import { openSourceModal } from '../components/sourceModal.js';

export function renderDashboardPage() {
  const state = store.getState();

  return `
    <div class="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <!-- Greeting & Search Header -->
      <div class="space-y-4">
        <div>
          <h1 class="text-2xl lg:text-3xl font-extrabold text-[var(--text-primary)]">Good evening, ${state.currentUser.name.split(' ')[0]} 👋</h1>
          <p class="text-xs lg:text-sm text-[var(--text-secondary)]">What would you like to remember today?</p>
        </div>

        <!-- Main AI Search Input Card -->
        <div class="card-surface p-3 lg:p-4 border border-[var(--accent-border)] shadow-xl relative overflow-hidden group">
          <form id="dash-search-form" class="flex items-center gap-3">
            <span class="text-xl text-[var(--accent-primary)] font-bold">🔍</span>
            <input id="dash-search-input" type="text" placeholder="Ask anything about your personal memory... (e.g. When is my physics exam?)" class="w-full bg-transparent text-sm lg:text-base text-[var(--text-primary)] focus:outline-none" />
            <button type="submit" class="btn-primary text-xs lg:text-sm px-4 py-2 shrink-0">Ask AI ➤</button>
          </form>

          <!-- Suggested Query Chips -->
          <div class="flex flex-wrap gap-2 pt-3 border-t border-[var(--bg-card-border)] mt-3 text-xs">
            <span class="text-[var(--text-muted)] font-semibold uppercase tracking-wider text-[10px] self-center">Try Asking:</span>
            ${state.suggestedQuestions.map(q => `
              <button class="dash-chip px-2.5 py-1 rounded-full bg-[var(--bg-input)] hover:bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--bg-card-border)] hover:border-[var(--accent-border)] transition-all" data-query="${q}">
                ${q}
              </button>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Active Conflict Warning Alert Banner -->
      <div class="p-4 rounded-xl bg-[var(--warning-bg)] border border-[var(--warning-border)] flex items-start gap-4">
        <span class="text-2xl">⚠️</span>
        <div class="space-y-1 flex-1">
          <h3 class="font-bold text-sm text-[var(--warning-text)]">Active Memory Conflict Detected</h3>
          <p class="text-xs text-[var(--text-secondary)]">
            Your uploaded <strong>Exam_Schedule.pdf</strong> (Sept 19) conflicts with <strong>Updated_Schedule.png</strong> (Sept 20) regarding PHY175 Exam.
          </p>
        </div>
        <a href="#/chat" class="btn-secondary text-xs px-3 py-1.5 shrink-0">Review Conflict →</a>
      </div>

      <!-- Dashboard Statistics Cards Grid -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="#/memories" class="card-surface p-5 card-hover space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Memories</span>
            <span class="text-lg">🧠</span>
          </div>
          <p class="text-2xl font-extrabold text-[var(--text-primary)] font-mono">${state.stats.totalMemories.toLocaleString()}</p>
          <span class="text-[11px] text-[var(--accent-primary)] font-medium">Synced across all sources</span>
        </a>

        <a href="#/documents" class="card-surface p-5 card-hover space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Documents</span>
            <span class="text-lg">📄</span>
          </div>
          <p class="text-2xl font-extrabold text-[var(--text-primary)] font-mono">${state.documents.length}</p>
          <span class="text-[11px] text-[var(--text-secondary)] font-medium">PDF, DOCX, Images, TXT</span>
        </a>

        <a href="#/people" class="card-surface p-5 card-hover space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">People</span>
            <span class="text-lg">👥</span>
          </div>
          <p class="text-2xl font-extrabold text-[var(--text-primary)] font-mono">${state.people.length}</p>
          <span class="text-[11px] text-[var(--text-secondary)] font-medium">Extracted profiles</span>
        </a>

        <a href="#/events" class="card-surface p-5 card-hover space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Upcoming Events</span>
            <span class="text-lg">📅</span>
          </div>
          <p class="text-2xl font-extrabold text-[var(--text-primary)] font-mono">${state.events.length}</p>
          <span class="text-[11px] text-[var(--accent-primary)] font-medium">Next: PHY175 CA</span>
        </a>
      </div>

      <!-- Main Section: Recent Memories & Upcoming Events Timeline Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Recent Memories (2 Cols) -->
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span>🧠 Recent Memories</span>
            </h2>
            <a href="#/memories" class="text-xs text-[var(--accent-primary)] font-bold hover:underline">View All →</a>
          </div>

          <div class="space-y-3">
            ${state.memories.map(mem => `
              <div class="card-surface p-4 flex items-start justify-between gap-4 card-hover">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold text-sm text-[var(--text-primary)]">${mem.title}</h3>
                    ${mem.hasConflict ? `<span class="px-2 py-0.5 rounded text-[10px] bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)] font-bold">⚠️ CONFLICT</span>` : ''}
                  </div>
                  <p class="text-xs text-[var(--text-secondary)] line-clamp-2">${mem.content}</p>
                  <div class="flex items-center gap-3 pt-1 text-[11px] text-[var(--text-muted)] font-mono">
                    <span>📄 ${mem.sourceName}</span>
                    <span>•</span>
                    <span>${mem.date}</span>
                  </div>
                </div>
                <button class="open-source-btn btn-secondary text-xs px-2.5 py-1 shrink-0" data-doc="${mem.sourceName}" data-page="${mem.page || 1}" data-excerpt="${mem.content}">
                  Source →
                </button>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Upcoming Schedule Widget (1 Col) -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-extrabold text-[var(--text-primary)] flex items-center gap-2">
              <span>📅 Upcoming Schedule</span>
            </h2>
            <a href="#/events" class="text-xs text-[var(--accent-primary)] font-bold hover:underline">Timeline →</a>
          </div>

          <div class="card-surface p-4 space-y-4">
            ${state.events.map(evt => `
              <div class="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[var(--bg-surface-hover)] border-l-2 ${evt.hasConflict ? 'border-amber-500' : 'border-[var(--accent-primary)]'}">
                <div class="w-10 h-10 rounded-lg bg-[var(--bg-input)] border border-[var(--bg-card-border)] flex flex-col items-center justify-center font-mono text-[10px] font-bold text-[var(--accent-primary)]">
                  <span>${evt.date.split('-')[2] || '19'}</span>
                  <span class="uppercase">${evt.date.split('-')[1] || 'SEP'}</span>
                </div>
                <div>
                  <h4 class="text-xs font-bold text-[var(--text-primary)]">${evt.title}</h4>
                  <p class="text-[11px] text-[var(--text-muted)]">${evt.time} • ${evt.location}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindDashboardEvents() {
  const form = document.getElementById('dash-search-form');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const val = document.getElementById('dash-search-input').value.trim();
      if (val) {
        window.location.hash = `#/chat?q=${encodeURIComponent(val)}`;
      }
    };
  }

  document.querySelectorAll('.dash-chip').forEach(chip => {
    chip.onclick = () => {
      const q = chip.getAttribute('data-query');
      window.location.hash = `#/chat?q=${encodeURIComponent(q)}`;
    };
  });

  document.querySelectorAll('.open-source-btn').forEach(btn => {
    btn.onclick = () => {
      const doc = btn.getAttribute('data-doc');
      const page = btn.getAttribute('data-page');
      const excerpt = btn.getAttribute('data-excerpt');
      openSourceModal(doc, page, excerpt);
    };
  });
}
