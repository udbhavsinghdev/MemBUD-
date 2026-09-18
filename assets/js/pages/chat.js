// MemBUD RAG AI Chatbot Component

import { store } from '../services/store.js';
import { mockAiService } from '../services/mockAiService.js';
import { openSourceModal } from '../components/sourceModal.js';
import { renderActionModal, bindActionModalEvents } from '../components/actionModal.js';
import { showToast } from '../components/toast.js';

export function renderChatPage(queryParam = '') {
  const state = store.getState();
  const activeConv = state.conversations[0] || store.createConversation();

  return `
    <div class="h-[calc(100vh-4rem)] flex overflow-hidden">
      <!-- Conversation History Sidebar -->
      <aside class="w-64 bg-[var(--sidebar-bg)] border-r border-[var(--bg-card-border)] flex flex-col justify-between hidden md:flex">
        <div class="p-3 space-y-3">
          <button id="new-chat-btn" class="w-full btn-primary py-2 text-xs font-semibold justify-start">
            <span>+ New Chat</span>
          </button>

          <div class="space-y-1">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-2">History</span>
            ${state.conversations.map(c => `
              <div class="conv-item flex items-center justify-between p-2 rounded-lg text-xs hover:bg-[var(--bg-surface-hover)] cursor-pointer ${c.id === activeConv.id ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-bold border border-[var(--accent-border)]' : 'text-[var(--text-secondary)]'}" data-id="${c.id}">
                <span class="truncate">💬 ${c.title}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-3 border-t border-[var(--bg-card-border)] text-[10px] font-mono text-[var(--text-muted)] text-center">
          GROUNDED MEMORY MODEL ACTIVE
        </div>
      </aside>

      <!-- Main Chat Area -->
      <main class="flex-1 flex flex-col justify-between bg-[var(--bg-app)] relative">
        <!-- Chat Header -->
        <div class="h-14 border-b border-[var(--bg-card-border)] px-6 flex items-center justify-between bg-[var(--header-bg)] backdrop-blur-md">
          <div class="flex items-center gap-3">
            <span class="text-xl">🧠</span>
            <div>
              <h2 class="font-bold text-sm text-[var(--text-primary)]">${activeConv.title}</h2>
              <p class="text-[10px] text-[var(--text-muted)]">Grounded in ${state.documents.length} uploaded documents</p>
            </div>
          </div>
          <button id="clear-chat-btn" class="btn-secondary text-xs py-1 px-2.5">Clear Chat</button>
        </div>

        <!-- Chat Messages Timeline -->
        <div id="chat-messages-container" class="flex-1 p-4 lg:p-8 overflow-y-auto space-y-6">
          ${activeConv.messages.map(msg => renderChatMessage(msg)).join('')}
        </div>

        <!-- Action Confirmation Modal Anchor -->
        <div id="action-modal-container">
          ${renderActionModal(state.activeAction)}
        </div>

        <!-- Chat Input Form & Suggested Chips -->
        <div class="p-4 border-t border-[var(--bg-card-border)] bg-[var(--bg-surface)] space-y-3">
          <!-- Suggested Chips -->
          <div class="flex flex-wrap gap-2 text-xs">
            ${state.suggestedQuestions.slice(0, 3).map(q => `
              <button class="chat-chip px-3 py-1 rounded-full bg-[var(--bg-input)] hover:bg-[var(--accent-subtle)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] border border-[var(--bg-card-border)] transition-all" data-query="${q}">
                ${q}
              </button>
            `).join('')}
          </div>

          <form id="chat-form" class="flex items-center gap-3 card-surface p-2 border border-[var(--accent-border)]">
            <input id="chat-input" type="text" value="${queryParam}" placeholder="Ask your personal memory... (e.g. When is my physics exam?)" class="w-full bg-transparent px-3 text-sm text-[var(--text-primary)] focus:outline-none" />
            <button type="submit" id="send-btn" class="btn-primary text-xs px-5 py-2.5 shrink-0">Send ➤</button>
          </form>
        </div>
      </main>
    </div>
  `;
}

function renderChatMessage(msg) {
  const isUser = msg.role === 'user';

  return `
    <div class="flex gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fadeIn">
      ${!isUser ? `<div class="w-8 h-8 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">🧠</div>` : ''}

      <div class="max-w-2xl space-y-3">
        <div class="p-4 rounded-xl ${isUser ? 'bg-[var(--accent-primary)] text-white font-medium text-sm' : 'card-surface text-sm text-[var(--text-primary)] border border-[var(--bg-card-border)]'}">
          <div class="prose dark:prose-invert text-xs lg:text-sm whitespace-pre-wrap leading-relaxed">${msg.content}</div>

          <!-- Conflict Warning Alert Box inside message -->
          ${msg.hasConflict ? `
            <div class="mt-4 p-3 rounded-lg bg-[var(--warning-bg)] border border-[var(--warning-border)] text-xs space-y-2">
              <div class="flex items-center gap-2 text-[var(--warning-text)] font-bold">
                <span>⚠️ Conflicting Information Detected</span>
              </div>
              <p class="text-[var(--text-secondary)]">Multiple uploaded sources provide conflicting dates/data for this query. Silently picking one is prohibited.</p>
            </div>
          ` : ''}
        </div>

        <!-- Sources Section for Assistant Messages -->
        ${!isUser && msg.sources && msg.sources.length > 0 ? `
          <div class="space-y-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">Source References:</span>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              ${msg.sources.map(src => `
                <div class="p-2.5 rounded-lg bg-[var(--bg-input)] border border-[var(--bg-card-border)] hover:border-[var(--accent-border)] flex items-center justify-between text-xs transition-all">
                  <div class="truncate pr-2">
                    <p class="font-bold text-[var(--text-primary)] truncate">📄 ${src.docName}</p>
                    <p class="text-[10px] text-[var(--text-muted)]">Page ${src.page}</p>
                  </div>
                  <button class="open-source-btn text-[11px] text-[var(--accent-primary)] font-bold hover:underline shrink-0" data-doc="${src.docName}" data-page="${src.page}" data-excerpt="${src.excerpt}">
                    View →
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}
      </div>

      ${isUser ? `<div class="w-8 h-8 rounded-lg bg-[var(--bg-surface-hover)] border border-[var(--bg-card-border)] text-[var(--text-primary)] flex items-center justify-center font-bold text-xs shrink-0">👤</div>` : ''}
    </div>
  `;
}

export function bindChatEvents() {
  bindActionModalEvents();

  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const container = document.getElementById('chat-messages-container');

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    const state = store.getState();
    const conv = state.conversations[0];

    // Append user message
    store.addMessage(conv.id, 'user', userText);
    input.value = '';
    container.innerHTML = conv.messages.map(m => renderChatMessage(m)).join('');
    container.scrollTop = container.scrollHeight;

    // Show Typing Indicator
    const typingElem = document.createElement('div');
    typingElem.id = 'typing-indicator';
    typingElem.className = 'flex gap-3 items-center text-xs text-[var(--text-muted)] p-2 animate-pulse';
    typingElem.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-[var(--accent-primary)] text-white flex items-center justify-center font-bold text-xs">🧠</div>
      <span>Memory Agent is retrieving memories...</span>
    `;
    container.appendChild(typingElem);
    container.scrollTop = container.scrollHeight;

    // Call Mock AI Service
    const aiRes = await mockAiService.askQuestion(userText);
    typingElem.remove();

    // Append Assistant response
    store.addMessage(conv.id, 'assistant', aiRes.answer, {
      sources: aiRes.sources,
      hasConflict: aiRes.hasConflict,
      conflictData: aiRes.conflictData
    });

    container.innerHTML = conv.messages.map(m => renderChatMessage(m)).join('');
    container.scrollTop = container.scrollHeight;

    // Action Modal update if action planned
    if (aiRes.actionRequired) {
      const modalContainer = document.getElementById('action-modal-container');
      if (modalContainer) {
        modalContainer.innerHTML = renderActionModal(aiRes.actionRequired);
        bindActionModalEvents();
      }
    }

    bindSourceModalClick();
  };

  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      sendMessage(input.value);
    };
  }

  // Auto-send if initial queryParam passed
  if (input && input.value.trim()) {
    sendMessage(input.value);
  }

  document.querySelectorAll('.chat-chip').forEach(chip => {
    chip.onclick = () => {
      sendMessage(chip.getAttribute('data-query'));
    };
  });

  const newChatBtn = document.getElementById('new-chat-btn');
  if (newChatBtn) {
    newChatBtn.onclick = () => {
      store.createConversation();
      window.location.hash = '#/chat';
    };
  }

  const clearBtn = document.getElementById('clear-chat-btn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      const conv = store.getState().conversations[0];
      if (conv) conv.messages = [];
      store.persist();
      showToast('Chat cleared.', 'info');
      window.location.hash = '#/chat';
    };
  }

  bindSourceModalClick();
}

function bindSourceModalClick() {
  document.querySelectorAll('.open-source-btn').forEach(btn => {
    btn.onclick = () => {
      openSourceModal(
        btn.getAttribute('data-doc'),
        btn.getAttribute('data-page'),
        btn.getAttribute('data-excerpt')
      );
    };
  });
}
