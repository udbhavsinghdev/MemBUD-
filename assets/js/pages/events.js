// MemBUD Events & Timeline Component

import { store } from '../services/store.js';
import { openSourceModal } from '../components/sourceModal.js';

export function renderEventsPage() {
  const state = store.getState();

  return `
    <div class="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-[var(--text-primary)]">Event Schedule & Timeline</h1>
          <p class="text-xs text-[var(--text-secondary)]">Chronological view of exams, deadlines, meetings, and key dates.</p>
        </div>

        <div class="flex items-center gap-2">
          <span class="badge">SEPTEMBER 2026</span>
        </div>
      </div>

      <!-- Timeline Container -->
      <div class="relative pl-6 space-y-8 timeline-stem">
        ${state.events.map(evt => `
          <div class="relative flex items-start gap-6 group">
            <!-- Node Marker -->
            <div class="w-10 h-10 rounded-xl ${evt.hasConflict ? 'bg-amber-500 border-amber-300' : 'bg-[var(--accent-primary)] border-[var(--accent-light)]'} text-white flex items-center justify-center font-bold text-sm shadow-lg z-10 shrink-0">
              📅
            </div>

            <!-- Event Card Content -->
            <div class="card-surface p-5 flex-1 border border-[var(--bg-card-border)] card-hover space-y-3">
              <div class="flex items-start justify-between gap-4">
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <h3 class="font-extrabold text-base text-[var(--text-primary)]">${evt.title}</h3>
                    ${evt.hasConflict ? `<span class="px-2 py-0.5 rounded text-[10px] bg-[var(--warning-bg)] text-[var(--warning-text)] border border-[var(--warning-border)] font-bold">⚠️ RESCHEDULED CONFLICT</span>` : ''}
                  </div>
                  <p class="text-xs font-mono text-[var(--accent-primary)] font-bold">📆 Date: ${evt.date} • 🕒 ${evt.time}</p>
                </div>
                <button class="open-source-btn btn-secondary text-xs px-2.5 py-1 shrink-0" data-doc="${evt.sourceDoc}" data-page="1" data-excerpt="${evt.title}">
                  Source →
                </button>
              </div>

              <div class="text-xs text-[var(--text-secondary)] flex items-center gap-2 font-mono">
                <span>📍 Location: ${evt.location}</span>
              </div>

              ${evt.hasConflict ? `
                <div class="p-3 rounded-lg bg-[var(--warning-bg)] border border-[var(--warning-border)] text-xs text-[var(--warning-text)]">
                  ⚠️ <strong>Notice</strong>: ${evt.conflictNotice}
                </div>
              ` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

export function bindEventsEvents() {
  document.querySelectorAll('.open-source-btn').forEach(btn => {
    btn.onclick = () => {
      openSourceModal(
        btn.getAttribute('data-doc'),
        1,
        btn.getAttribute('data-excerpt')
      );
    };
  });
}
