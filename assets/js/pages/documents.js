// MemBUD Document Management & Drag-Drop Uploader Component

import { store } from '../services/store.js';
import { showToast } from '../components/toast.js';
import { openSourceModal } from '../components/sourceModal.js';

export function renderDocumentsPage() {
  const state = store.getState();

  return `
    <div class="p-6 lg:p-10 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-2xl font-extrabold text-[var(--text-primary)]">Document Ingestion & Management</h1>
          <p class="text-xs text-[var(--text-secondary)]">Upload PDFs, screenshots, notes, DOCX, and exported chat files.</p>
        </div>

        <button id="trigger-upload-btn" class="btn-primary text-xs px-4 py-2">
          <span>+ Upload Document</span>
        </button>
      </div>

      <!-- Drag & Drop Upload Zone Card -->
      <div id="drop-zone" class="card-surface p-8 border-2 border-dashed border-[var(--accent-border)] hover:border-[var(--accent-primary)] rounded-2xl text-center space-y-4 cursor-pointer transition-all bg-[var(--accent-subtle)]">
        <input type="file" id="file-input" class="hidden" multiple accept=".pdf,.docx,.txt,.png,.jpg,.jpeg" />
        
        <div class="w-16 h-16 rounded-2xl bg-[var(--accent-primary)] text-white mx-auto flex items-center justify-center text-3xl shadow-lg">
          📄
        </div>

        <div class="space-y-1">
          <h3 class="font-bold text-base text-[var(--text-primary)]">Drag & drop files here, or click to browse</h3>
          <p class="text-xs text-[var(--text-secondary)]">Supported formats: PDF, DOCX, TXT, PNG, JPG, JPEG (Max 25MB)</p>
        </div>

        <div class="flex items-center justify-center gap-3 text-xs text-[var(--text-muted)] font-mono pt-2">
          <span>🔒 User Memory Isolated</span>
          <span>•</span>
          <span>⚡ Automatic OCR & Chunking</span>
        </div>
      </div>

      <!-- Simulated Upload Status Container -->
      <div id="upload-status-container" class="space-y-3 hidden"></div>

      <!-- Document List Table -->
      <div class="card-surface overflow-hidden border border-[var(--bg-card-border)]">
        <div class="p-4 border-b border-[var(--bg-card-border)] flex items-center justify-between">
          <h3 class="font-bold text-sm text-[var(--text-primary)]">Uploaded Knowledge Documents (${state.documents.length})</h3>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-[var(--bg-surface-hover)] border-b border-[var(--bg-card-border)] text-[var(--text-muted)] uppercase tracking-wider font-semibold">
              <tr>
                <th class="p-3.5">Filename</th>
                <th class="p-3.5">Type</th>
                <th class="p-3.5">Size</th>
                <th class="p-3.5">Chunks</th>
                <th class="p-3.5">Status</th>
                <th class="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--bg-card-border)]" id="doc-table-body">
              ${state.documents.map(doc => renderDocRow(doc)).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderDocRow(doc) {
  return `
    <tr class="hover:bg-[var(--bg-surface-hover)] transition-all">
      <td class="p-3.5 font-bold text-[var(--text-primary)] flex items-center gap-2">
        <span>${doc.fileType === 'pdf' ? '📄' : doc.fileType === 'image' ? '📸' : '📝'}</span>
        <span>${doc.filename}</span>
      </td>
      <td class="p-3.5 uppercase text-[var(--text-secondary)] font-mono">${doc.fileType}</td>
      <td class="p-3.5 text-[var(--text-muted)] font-mono">${doc.fileSize}</td>
      <td class="p-3.5"><span class="px-2 py-0.5 rounded bg-[var(--bg-input)] border border-[var(--bg-card-border)] font-mono font-bold">${doc.chunkCount} chunks</span></td>
      <td class="p-3.5"><span class="badge">✓ ${doc.status}</span></td>
      <td class="p-3.5 text-right space-x-2">
        <button class="open-doc-btn btn-secondary text-[11px] px-2.5 py-1" data-doc="${doc.filename}" data-excerpt="${doc.content}">Preview</button>
        <button class="delete-doc-btn text-xs text-red-500 hover:text-red-400 p-1" data-id="${doc.id}">🗑️</button>
      </td>
    </tr>
  `;
}

export function bindDocumentsEvents() {
  const dropZone = document.getElementById('drop-zone');
  const fileInput = document.getElementById('file-input');
  const statusContainer = document.getElementById('upload-status-container');
  const triggerBtn = document.getElementById('trigger-upload-btn');

  if (triggerBtn) triggerBtn.onclick = () => fileInput.click();
  if (dropZone) dropZone.onclick = () => fileInput.click();

  if (dropZone) {
    dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); };
    dropZone.ondragleave = () => dropZone.classList.remove('drag-over');
    dropZone.ondrop = (e) => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      handleFiles(e.dataTransfer.files);
    };
  }

  if (fileInput) {
    fileInput.onchange = () => handleFiles(fileInput.files);
  }

  const handleFiles = (files) => {
    if (!files || files.length === 0) return;
    statusContainer.classList.remove('hidden');

    Array.from(files).forEach(file => {
      simulateUploadProgress(file);
    });
  };

  const simulateUploadProgress = (file) => {
    const card = document.createElement('div');
    card.className = 'card-surface p-4 border border-[var(--accent-border)] space-y-2 animate-fadeIn';
    card.innerHTML = `
      <div class="flex items-center justify-between text-xs font-bold text-[var(--text-primary)]">
        <span>📄 Processing ${file.name}...</span>
        <span class="status-phase text-[var(--accent-primary)] font-mono">Uploading (20%)...</span>
      </div>
      <div class="w-full h-2 rounded-full bg-[var(--bg-input)] overflow-hidden">
        <div class="progress-bar h-full bg-[var(--accent-primary)] transition-all duration-300" style="width: 20%"></div>
      </div>
    `;
    statusContainer.appendChild(card);

    const phases = [
      { width: '40%', text: 'Extracting text & page metadata...' },
      { width: '70%', text: 'Generating vector embeddings...' },
      { width: '90%', text: 'Extracting entities & memories...' },
      { width: '100%', text: 'Ready ✓' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < phases.length) {
        card.querySelector('.progress-bar').style.width = phases[step].width;
        card.querySelector('.status-phase').innerText = phases[step].text;
        step++;
      } else {
        clearInterval(interval);
        showToast(`✓ Document ${file.name} successfully indexed into memory!`, 'success');
        
        // Add to store
        store.addDocument({
          id: 'doc_' + Date.now(),
          filename: file.name,
          fileType: file.name.split('.').pop().toLowerCase(),
          fileSize: (file.size / 1024).toFixed(0) + ' KB',
          uploadDate: new Date().toISOString().split('T')[0],
          status: 'Ready',
          chunkCount: Math.floor(Math.random() * 8) + 3,
          sourceType: 'User Upload',
          content: `Content of uploaded file ${file.name}. Sample text memory chunk extracted during pipeline execution.`
        });

        setTimeout(() => {
          card.remove();
          if (statusContainer.children.length === 0) statusContainer.classList.add('hidden');
          window.location.hash = '#/documents';
        }, 800);
      }
    }, 600);
  };

  bindTableActions();
}

function bindTableActions() {
  document.querySelectorAll('.open-doc-btn').forEach(btn => {
    btn.onclick = () => {
      openSourceModal(
        btn.getAttribute('data-doc'),
        1,
        btn.getAttribute('data-excerpt')
      );
    };
  });

  document.querySelectorAll('.delete-doc-btn').forEach(btn => {
    btn.onclick = () => {
      const id = btn.getAttribute('data-id');
      store.deleteDocument(id);
      showToast('Document deleted.', 'info');
      window.location.hash = '#/documents';
    };
  });
}
