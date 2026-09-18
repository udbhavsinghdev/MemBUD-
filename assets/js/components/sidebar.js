// MemBUD App Navigation Sidebar Component

import { store } from '../services/store.js';

export function renderSidebar(currentPath = '#/dashboard') {
  const state = store.getState();

  const links = [
    { path: '#/dashboard', label: 'Home', icon: '🏠' },
    { path: '#/chat', label: 'AI Chat', icon: '💬', badge: 'AI' },
    { path: '#/memories', label: 'Memories', icon: '🧠', count: state.memories.length },
    { path: '#/documents', label: 'Documents', icon: '📄', count: state.documents.length },
    { path: '#/people', label: 'People', icon: '👥', count: state.people.length },
    { path: '#/events', label: 'Events', icon: '📅', count: state.events.length },
    { path: '#/connections', label: 'Connections', icon: '🔗' },
    { path: '#/settings', label: 'Settings', icon: '⚙' },
  ];

  return `
    <aside id="app-sidebar" class="fixed lg:static top-0 bottom-0 left-0 z-40 w-64 bg-[var(--sidebar-bg)] border-r border-[var(--bg-card-border)] flex flex-col justify-between transition-transform duration-300 transform -translate-x-full lg:translate-x-0">
      <div>
        <!-- Brand Header -->
        <div class="h-16 px-6 border-b border-[var(--bg-card-border)] flex items-center justify-between">
          <a href="#/dashboard" class="flex items-center gap-3 group">
            <div class="w-9 h-9 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
              🧠
            </div>
            <div>
              <h1 class="font-extrabold text-lg tracking-tight text-[var(--text-primary)] leading-none">MemBUD</h1>
              <p class="text-[10px] font-mono text-[var(--text-muted)] tracking-wider uppercase mt-0.5">Personal AI Memory</p>
            </div>
          </a>
        </div>

        <!-- Nav Links -->
        <nav class="p-4 space-y-1.5">
          ${links.map(link => {
            const isActive = currentPath === link.path || (currentPath === '' && link.path === '#/dashboard');
            return `
              <a href="${link.path}" class="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive 
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-border)] font-semibold' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-hover)]'
              }">
                <div class="flex items-center gap-3">
                  <span class="text-base">${link.icon}</span>
                  <span>${link.label}</span>
                </div>
                ${link.badge ? `<span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[var(--accent-primary)] text-white">${link.badge}</span>` : ''}
                ${link.count !== undefined ? `<span class="text-xs font-mono text-[var(--text-muted)] px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--bg-card-border)]">${link.count}</span>` : ''}
              </a>
            `;
          }).join('')}
        </nav>
      </div>

      <!-- Footer User Summary -->
      <div class="p-4 border-t border-[var(--bg-card-border)] bg-[var(--bg-surface)]">
        <a href="#/profile" class="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-surface-hover)] transition-all">
          <div class="flex items-center gap-3">
            <img src="${state.currentUser.profilePicture}" alt="Avatar" class="w-9 h-9 rounded-full object-cover border border-[var(--accent-border)]" />
            <div class="overflow-hidden">
              <p class="text-xs font-bold text-[var(--text-primary)] truncate">${state.currentUser.name}</p>
              <p class="text-[11px] text-[var(--text-muted)] truncate">${state.currentUser.email}</p>
            </div>
          </div>
          <span class="text-xs text-[var(--text-muted)]">⚙</span>
        </a>
      </div>
    </aside>
  `;
}
