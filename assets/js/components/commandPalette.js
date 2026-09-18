// MemBUD Ctrl+K Command Palette Component

import { store } from '../services/store.js';
import { showToast } from './toast.js';

export function initCommandPalette() {
  let modal = document.getElementById('command-palette');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'command-palette';
    modal.className = 'fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 modal-backdrop hidden';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="card-surface w-full max-w-xl shadow-2xl border border-[var(--accent-border)] overflow-hidden animate-fadeIn">
      <div class="p-3 border-b border-[var(--bg-card-border)] flex items-center gap-3">
        <span class="text-[var(--accent-primary)] font-bold text-lg">🔍</span>
        <input id="cmd-input" type="text" placeholder="Type a command or search memory... (Esc to close)" class="w-full bg-transparent text-sm text-[var(--text-primary)] focus:outline-none" />
        <span class="text-xs text-[var(--text-muted)] border border-[var(--bg-card-border)] px-1.5 py-0.5 rounded">ESC</span>
      </div>

      <div class="p-2 max-h-80 overflow-y-auto space-y-1 text-sm" id="cmd-results">
        <div class="px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Quick Actions</div>
        
        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="chat">
          <span class="flex items-center gap-2.5 text-[var(--text-primary)]">💬 Open AI Memory Chat</span>
          <span class="text-xs text-[var(--text-muted)]">⌘1</span>
        </button>

        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="upload">
          <span class="flex items-center gap-2.5 text-[var(--text-primary)]">📄 Upload Memory Document</span>
          <span class="text-xs text-[var(--text-muted)]">⌘2</span>
        </button>

        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="theme">
          <span class="flex items-center gap-2.5 text-[var(--text-primary)]">🎨 Toggle Dark/Light Theme</span>
          <span class="text-xs text-[var(--text-muted)]">⌘T</span>
        </button>

        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="demo">
          <span class="flex items-center gap-2.5 text-[var(--text-primary)]">⚡ Load Hackathon Demo Memories</span>
          <span class="text-xs text-[var(--accent-primary)] font-bold">DEMO</span>
        </button>

        <div class="px-3 py-1.5 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mt-2">Navigate</div>
        
        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="nav-memories">
          <span class="text-[var(--text-primary)]">🧠 Memory Library</span>
          <span class="text-xs text-[var(--text-muted)]">#/memories</span>
        </button>
        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="nav-events">
          <span class="text-[var(--text-primary)]">📅 Events & Timeline</span>
          <span class="text-xs text-[var(--text-muted)]">#/events</span>
        </button>
        <button class="cmd-item w-full flex items-center justify-between p-2.5 rounded-md hover:bg-[var(--bg-surface-hover)] text-left" data-action="nav-connections">
          <span class="text-[var(--text-primary)]">🔗 Visual Knowledge Graph</span>
          <span class="text-xs text-[var(--text-muted)]">#/connections</span>
        </button>
      </div>
    </div>
  `;

  // Global Keyboard Listener
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      modal.classList.toggle('hidden');
      if (!modal.classList.contains('hidden')) {
        setTimeout(() => modal.querySelector('#cmd-input').focus(), 50);
      }
    }
    if (e.key === 'Escape') {
      modal.classList.add('hidden');
    }
  });

  modal.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };

  // Click Action Handlers
  modal.querySelectorAll('.cmd-item').forEach(btn => {
    btn.onclick = () => {
      const act = btn.getAttribute('data-action');
      modal.classList.add('hidden');
      if (act === 'chat') window.location.hash = '#/chat';
      else if (act === 'upload') window.location.hash = '#/documents';
      else if (act === 'theme') {
        const theme = store.toggleTheme();
        showToast(`Theme switched to ${theme.toUpperCase()}`, 'info');
      }
      else if (act === 'demo') {
        store.resetToDemo();
        showToast('Demo dataset reloaded!', 'success');
        window.location.hash = '#/dashboard';
      }
      else if (act.startsWith('nav-')) {
        window.location.hash = `#/${act.replace('nav-', '')}`;
      }
    };
  });
}
