// MemBUD Document Source Viewer Modal

import { store } from '../services/store.js';

export function openSourceModal(docName, page = 1, excerpt = '') {
  let modal = document.getElementById('source-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'source-modal';
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop hidden';
    document.body.appendChild(modal);
  }

  const state = store.getState();
  const doc = state.documents.find(d => d.filename === docName) || {
    filename: docName,
    fileType: 'pdf',
    sourceType: 'Uploaded Document',
    content: excerpt || 'Source snippet extracted from user knowledge base.'
  };

  modal.innerHTML = `
    <div class="card-surface w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl border border-[var(--accent-border)] animate-fadeIn">
      <div class="p-4 border-b border-[var(--bg-card-border)] flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-[var(--accent-primary)] font-bold">
            ${doc.fileType === 'pdf' ? '📄' : doc.fileType === 'image' ? '📸' : '📝'}
          </div>
          <div>
            <h3 class="font-bold text-base text-[var(--text-primary)]">${doc.filename}</h3>
            <p class="text-xs text-[var(--text-secondary)]">Page ${page} • ${doc.sourceType || 'Document Source'}</p>
          </div>
        </div>
        <button id="close-source-btn" class="p-2 rounded-md hover:bg-[var(--bg-surface-hover)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-lg">✕</button>
      </div>

      <div class="p-6 overflow-y-auto space-y-4 flex-1">
        <div class="p-4 rounded-lg bg-[var(--warning-bg)] border border-[var(--warning-border)]">
          <span class="text-xs font-bold uppercase tracking-wider text-[var(--warning-text)] block mb-1">Grounded Excerpt Highlighted in Source</span>
          <p class="text-sm font-medium text-[var(--text-primary)] bg-yellow-500/10 p-2 rounded border border-yellow-500/20">${excerpt || doc.content.substring(0, 200)}</p>
        </div>

        <div>
          <h4 class="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2">Full Document Text Context</h4>
          <div class="p-4 rounded-lg bg-[var(--bg-input)] text-xs font-mono text-[var(--text-secondary)] whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto border border-[var(--bg-card-border)]">
            ${doc.content}
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-[var(--bg-card-border)] bg-[var(--bg-surface)] flex justify-end gap-2">
        <button id="close-source-btn-2" class="btn-secondary text-sm">Close Viewer</button>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');

  const closeFn = () => modal.classList.add('hidden');
  modal.querySelector('#close-source-btn').onclick = closeFn;
  modal.querySelector('#close-source-btn-2').onclick = closeFn;
  modal.onclick = (e) => { if (e.target === modal) closeFn(); };
}
