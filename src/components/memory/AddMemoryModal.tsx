import React, { useState } from 'react';
import { useMemory } from '../../context/MemoryContext';
import { MemoryCategory, SourceType } from '../../types';
import {
  X,
  FileText,
  Link2,
  UploadCloud,
  HardDrive,
  Sparkles,
  Check,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AddMemoryModal: React.FC = () => {
  const { addMemoryModalOpen, setAddMemoryModalOpen, addMemory, sources, toggleSourceConnection } = useMemory();

  const [activeTab, setActiveTab] = useState<'note' | 'link' | 'file' | 'source'>('note');

  // Note form state
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<MemoryCategory>('Personal');
  const [noteTags, setNoteTags] = useState('');

  // Link form state
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [linkDescription, setLinkDescription] = useState('');

  // File upload simulation state
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string } | null>(null);

  if (!addMemoryModalOpen) return null;

  const resetForms = () => {
    setNoteTitle('');
    setNoteContent('');
    setNoteCategory('Personal');
    setNoteTags('');
    setLinkUrl('');
    setLinkTitle('');
    setLinkDescription('');
    setUploadedFile(null);
  };

  const handleClose = () => {
    resetForms();
    setAddMemoryModalOpen(false);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim()) return;

    const tagsArray = noteTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    addMemory({
      title: noteTitle,
      description: noteContent.substring(0, 120) + (noteContent.length > 120 ? '...' : ''),
      content: noteContent || noteTitle,
      category: noteCategory,
      tags: tagsArray.length > 0 ? tagsArray : ['Note', noteCategory],
      source: 'Personal Note',
      importance: 'high',
      aiSummary: `Note on ${noteTitle}: ${noteContent.substring(0, 80)}...`
    });

    handleClose();
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrl.trim()) return;

    const title = linkTitle.trim() || new URL(linkUrl.startsWith('http') ? linkUrl : `https://${linkUrl}`).hostname;

    addMemory({
      title: title,
      description: linkDescription || `Saved web article from ${linkUrl}`,
      content: `Web Resource URL: ${linkUrl}\n\nDescription:\n${linkDescription}`,
      category: 'Research',
      tags: ['Web', 'Link', 'Article'],
      source: 'Web Link',
      sourceUrl: linkUrl,
      aiSummary: `Captured web bookmark from ${linkUrl}. Summarized key takeaways.`
    });

    handleClose();
  };

  const handleSaveFile = () => {
    if (!uploadedFile) return;

    addMemory({
      title: uploadedFile.name,
      description: `Ingested document: ${uploadedFile.name} (${uploadedFile.size})`,
      content: `Extracted text payload from file ${uploadedFile.name}.\nSize: ${uploadedFile.size}\nProcessed via OCR and Local Vector Embeddings.`,
      category: 'Study',
      tags: ['File', 'Document', 'PDF'],
      source: 'Document PDF',
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      aiSummary: `File vector index created for ${uploadedFile.name}. Key concepts parsed.`
    });

    handleClose();
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setUploadedFile({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      });
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-[#0F111A] border border-sky-500/30 rounded-3xl shadow-2xl overflow-hidden glass-panel flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-100">Add to Your Memory</h3>
                <p className="text-xs text-slate-400">Expand your AI second brain knowledge</p>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-white/10 bg-black/40 px-6 pt-2">
            {[
              { id: 'note', label: 'Note', icon: FileText },
              { id: 'link', label: 'Link', icon: Link2 },
              { id: 'file', label: 'File', icon: UploadCloud },
              { id: 'source', label: 'Connect Source', icon: HardDrive }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
                    isActive
                      ? 'border-sky-400 text-sky-300 bg-white/5'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content */}
          <div className="p-6">
            {/* NOTE TAB */}
            {activeTab === 'note' && (
              <form onSubmit={handleSaveNote} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. React custom hook architectural pattern"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Category</label>
                    <select
                      value={noteCategory}
                      onChange={(e) => setNoteCategory(e.target.value as MemoryCategory)}
                      className="w-full px-3 py-2.5 rounded-xl glass-input text-xs text-slate-200 bg-[#0F111A]"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Idea">Idea</option>
                      <option value="Study">Study</option>
                      <option value="Projects">Projects</option>
                      <option value="Research">Research</option>
                      <option value="Work">Work</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, Coding, Architecture"
                      value={noteTags}
                      onChange={(e) => setNoteTags(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Content & Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write down your thoughts, notes, formulas, or takeaways..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    className="w-full p-4 rounded-xl glass-input text-xs text-slate-200 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-sky-500/20"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Save Memory</span>
                  </button>
                </div>
              </form>
            )}

            {/* LINK TAB */}
            {activeTab === 'link' && (
              <form onSubmit={handleSaveLink} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">URL Address</label>
                  <input
                    type="url"
                    required
                    placeholder="https://github.com/qdrant/qdrant"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Title (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Vector Database Benchmarks"
                    value={linkTitle}
                    onChange={(e) => setLinkTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">Description / Summary</label>
                  <textarea
                    rows={3}
                    placeholder="Why are you saving this link? Add context..."
                    value={linkDescription}
                    onChange={(e) => setLinkDescription(e.target.value)}
                    className="w-full p-4 rounded-xl glass-input text-xs text-slate-200"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-glow-cyan"
                  >
                    <Link2 className="w-4 h-4" />
                    <span>Save Link</span>
                  </button>
                </div>
              </form>
            )}

            {/* FILE TAB */}
            {activeTab === 'file' && (
              <div className="space-y-4">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDropFile}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                    dragOver
                      ? 'border-sky-400 bg-sky-500/10'
                      : 'border-white/10 bg-black/20 hover:border-sky-500/30'
                  }`}
                  onClick={() => {
                    setUploadedFile({
                      name: 'PHY175_Semiconductors_Lecture8.pdf',
                      size: '2.4 MB'
                    });
                  }}
                >
                  <div className="p-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400">
                    <UploadCloud className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-slate-200 block">
                      Drop your file here or click to browse
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">
                      Supported: PDF, DOCX, TXT, PNG, JPG (Simulated upload)
                    </span>
                  </div>
                </div>

                {uploadedFile && (
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-sky-500/15 border border-sky-500/30 text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-sky-400" />
                      <div>
                        <span className="font-semibold text-slate-100 block">{uploadedFile.name}</span>
                        <span className="text-[10px] text-slate-400">{uploadedFile.size} • Ready for vector indexing</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setUploadedFile(null)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    disabled={!uploadedFile}
                    onClick={handleSaveFile}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-black font-bold text-xs"
                  >
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload & Index File</span>
                  </button>
                </div>
              </div>
            )}

            {/* SOURCE TAB */}
            {activeTab === 'source' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Select an integration source to trigger local sync:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                  {sources.map((src) => (
                    <div
                      key={src.id}
                      onClick={() => toggleSourceConnection(src.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition-all ${
                        src.connected
                          ? 'bg-sky-500/10 border-sky-500/30 text-sky-200'
                          : 'bg-white/5 border-white/10 hover:border-sky-500/30 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                        <div className="min-w-0">
                          <span className="font-semibold text-xs text-slate-200 block truncate">{src.name}</span>
                          <span className="text-[10px] text-slate-400 truncate block">{src.description}</span>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${src.connected ? 'bg-sky-400/20 text-sky-300' : 'bg-white/5 text-slate-400'}`}>
                        {src.connected ? 'Connected' : 'Connect'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
