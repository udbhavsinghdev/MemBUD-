// MemBUD Navbar Header Component

import { store } from '../services/store.js';
import { showToast } from './toast.js';

export function renderNavbar() {
  const state = store.getState();
  const isLight = state.theme === 'light';

  return `
    <header class="sticky top-0 z-30 h-16 bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--bg-card-border)] px-4 lg:px-8 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <!-- Mobile Sidebar Toggle -->
        <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]">
          ☰
        </button>
        
        <div class="hidden sm:flex items-center gap-2 text-xs font-mono bg-[var(--accent-subtle)] border border-[var(--accent-border)] text-[var(--accent-primary)] px-2.5 py-1 rounded-full font-semibold">
          <span class="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse"></span>
          <span>SYSTEM ACTIVE</span>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <!-- Global Command Search Button -->
        <button id="nav-cmd-btn" class="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[var(--bg-input)] border border-[var(--bg-card-border)] text-xs text-[var(--text-muted)] hover:border-[var(--accent-border)] transition-all">
          <span>🔍 Search memory...</span>
          <span class="font-mono bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--bg-card-border)] text-[10px]">⌘K</span>
        </button>

        <!-- Hackathon Demo Button -->
        <button id="demo-mode-btn" class="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-border)] font-semibold text-xs hover:bg-[var(--accent-primary)] hover:text-white transition-all">
          <span>⚡ Try Demo Data</span>
        </button>

        <!-- Theme Toggle -->
        <button id="theme-toggle-btn" title="Toggle Theme" class="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)] border border-[var(--bg-card-border)] text-base">
          ${isLight ? '🌙' : '☀️'}
        </button>

        <!-- User Profile Avatar -->
        <a href="#/profile" class="flex items-center gap-2.5 p-1 rounded-full hover:bg-[var(--bg-surface-hover)] border border-transparent hover:border-[var(--bg-card-border)] transition-all">
          <img src="${state.currentUser.profilePicture}" alt="Avatar" class="w-8 h-8 rounded-full object-cover border border-[var(--accent-border)]" />
          <span class="hidden md:inline text-xs font-semibold text-[var(--text-primary)]">${state.currentUser.name}</span>
        </a>
      </div>
    </header>
  `;
}

export function bindNavbarEvents() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      const newTheme = store.toggleTheme();
      showToast(`Switched to ${newTheme.toUpperCase()} theme`, 'info');
    };
  }

  const demoBtn = document.getElementById('demo-mode-btn');
  if (demoBtn) {
    demoBtn.onclick = () => {
      store.resetToDemo();
      showToast('Demo dataset preloaded!', 'success');
      window.location.hash = '#/dashboard';
    };
  }

  const cmdBtn = document.getElementById('nav-cmd-btn');
  if (cmdBtn) {
    cmdBtn.onclick = () => {
      const palette = document.getElementById('command-palette');
      if (palette) palette.classList.remove('hidden');
    };
  }

  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.onclick = () => {
      const sidebar = document.getElementById('app-sidebar');
      if (sidebar) sidebar.classList.toggle('-translate-x-full');
    };
  }
}
