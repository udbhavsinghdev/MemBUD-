import React, { useState } from 'react';
import { useMemory } from '../../context/MemoryContext';
import {
  X,
  Sparkles,
  Tag,
  Clock,
  HardDrive,
  Trash2,
  Edit3,
  MessageSquare,
  Network,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const MemoryDetailModal: React.FC = () => {
  const { activeMemory, setActiveMemory, deleteMemory, updateMemory, sendChatMessage } = useMemory();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  if (!activeMemory) return null;

  const handleStartEdit = () => {
    setEditTitle(activeMemory.title);
    setEditContent(activeMemory.content);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    updateMemory(activeMemory.id, {
      title: editTitle,
      content: editContent,
    });
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0F111A] border border-sky-500/30 rounded-3xl shadow-2xl overflow-hidden glass-panel"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-300">
                {activeMemory.category}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-purple-400" />
                {activeMemory.source}
              </span>
            </div>

            <button
              onClick={() => {
                setIsEditing(false);
                setActiveMemory(null);
              }}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title Section */}
            {isEditing ? (
              <div className="space-y-3">
                <label className="text-xs font-mono text-slate-400">Memory Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-base font-bold text-slate-100"
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-extrabold text-slate-100 leading-tight">
                  {activeMemory.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-2">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    Created {activeMemory.createdAt}
                  </span>
                  {activeMemory.updatedAt && (
                    <span>• Updated {activeMemory.updatedAt}</span>
                  )}
                </div>
              </div>
            )}

            {/* AI Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-purple-950/60 border border-sky-500/30">
              <div className="flex items-center gap-2 mb-1.5 text-xs font-mono font-semibold text-sky-300 uppercase">
                <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
                <span>AI Grounded Summary</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeMemory.aiSummary}
              </p>
            </div>

            {/* Main Content Body */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Memory Content & Notes
              </h4>
              {isEditing ? (
                <textarea
                  rows={6}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-4 rounded-xl glass-input text-xs font-mono text-slate-200 leading-relaxed focus:outline-none"
                />
              ) : (
                <div className="p-5 rounded-2xl bg-black/40 border border-white/5 text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {activeMemory.content}
                </div>
              )}
            </div>

            {/* Connected Concepts */}
            {activeMemory.connectedConcepts && activeMemory.connectedConcepts.length > 0 && (
              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Network className="w-4 h-4 text-purple-400" />
                  <span>Connected Knowledge Concepts</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeMemory.connectedConcepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-3 py-1 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-medium"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div>
              <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Associated Tags
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeMemory.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const title = activeMemory.title;
                  setActiveMemory(null);
                  sendChatMessage(`Can you analyze and explain memory: "${title}"?`);
                  navigate('/app/chat');
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/20 border border-purple-500/40 hover:bg-purple-500/30 text-purple-200 text-xs font-semibold transition-all"
              >
                <MessageSquare className="w-4 h-4 text-purple-400" />
                <span>Chat About This</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs hover:bg-emerald-400 transition-all"
                >
                  <Check className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              ) : (
                <button
                  onClick={handleStartEdit}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-200 text-xs font-medium transition-all"
                >
                  <Edit3 className="w-4 h-4 text-slate-400" />
                  <span>Edit</span>
                </button>
              )}

              <button
                onClick={() => deleteMemory(activeMemory.id)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-medium transition-all"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
