// MemBUD Autonomous AI Action Confirmation Modal Component

import { store } from '../services/store.js';
import { showToast } from './toast.js';

export function renderActionModal(action) {
  if (!action) return '';

  return `
    <div id="action-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      <div class="card-surface w-full max-w-lg p-6 shadow-2xl border border-[var(--accent-border)] space-y-5">
        <div class="flex items-center gap-3 border-b border-[var(--bg-card-border)] pb-4">
          <div class="w-12 h-12 rounded-xl bg-[var(--accent-subtle)] border border-[var(--accent-border)] flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h3 class="font-extrabold text-base text-[var(--text-primary)]">Autonomous Agent Action Required</h3>
            <p class="text-xs text-[var(--text-secondary)]">MemBUD planned an action based on your request.</p>
          </div>
        </div>

        <div class="p-4 rounded-lg bg-[var(--bg-input)] border border-[var(--bg-card-border)] space-y-3 text-sm">
          <div class="flex justify-between items-center text-xs">
            <span class="text-[var(--text-muted)] font-medium">Action Type</span>
            <span class="px-2 py-0.5 rounded bg-[var(--accent-subtle)] text-[var(--accent-primary)] font-mono font-bold">${action.type}</span>
          </div>
          <div class="flex justify-between items-center text-xs">
            <span class="text-[var(--text-muted)] font-medium">Target</span>
            <span class="text-[var(--text-primary)] font-semibold">${action.target}</span>
          </div>
          <div>
            <span class="text-[var(--text-muted)] text-xs font-medium block mb-1">Title / Details</span>
            <p class="font-bold text-[var(--text-primary)]">${action.title}</p>
          </div>
          <div>
            <span class="text-[var(--text-muted)] text-xs font-medium block mb-1">Scheduled Date</span>
            <p class="font-mono text-[var(--accent-primary)] font-semibold">${action.date}</p>
          </div>
          <div>
            <span class="text-[var(--text-muted)] text-xs font-medium block mb-1">Reason / Context</span>
            <p class="text-xs text-[var(--text-secondary)]">${action.reason}</p>
          </div>
        </div>

        <div class="p-3 rounded-md bg-[var(--warning-bg)] border border-[var(--warning-border)] text-xs text-[var(--warning-text)] flex items-center gap-2">
          <span>🛡️</span>
          <span>Explicit user confirmation is required before modifying your schedule.</span>
        </div>

        <div class="flex items-center justify-end gap-3 pt-2">
          <button id="cancel-action-btn" class="btn-secondary text-xs">Cancel Action</button>
          <button id="confirm-action-btn" class="btn-primary text-xs">✓ Confirm & Create Reminder</button>
        </div>
      </div>
    </div>
  `;
}

export function bindActionModalEvents() {
  const confirmBtn = document.getElementById('confirm-action-btn');
  const cancelBtn = document.getElementById('cancel-action-btn');

  if (confirmBtn) {
    confirmBtn.onclick = () => {
      store.confirmAction();
      showToast('✓ Reminder successfully created in your schedule!', 'success');
      const modal = document.getElementById('action-modal');
      if (modal) modal.remove();
    };
  }

  if (cancelBtn) {
    cancelBtn.onclick = () => {
      store.setActiveAction(null);
      showToast('Action cancelled.', 'info');
      const modal = document.getElementById('action-modal');
      if (modal) modal.remove();
    };
  }
}
