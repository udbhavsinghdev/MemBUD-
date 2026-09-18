import React, { useState, useEffect, useRef } from 'react';
import { useMemory } from '../../context/MemoryContext';
import { Search, FileText, Hash, HardDrive, Plus, Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const CommandPalette: React.FC = () => {
  const {
    commandPaletteOpen,
    setCommandPaletteOpen,
    memories,
    sources,
    setActiveMemory,
    setAddMemoryModalOpen
  } = useMemory();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [commandPaletteOpen]);

  if (!commandPaletteOpen) return null;

  const filteredMemories = query.trim()
    ? memories.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.description.toLowerCase().includes(query.toLowerCase()) ||
          m.tags.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
          m.category.toLowerCase().includes(query.toLowerCase())
      )
    : memories.slice(0, 5);

  const filteredSources = query.trim()
    ? sources.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : sources.slice(0, 3);

  const topics = Array.from(new Set(memories.flatMap((m) => m.tags)));
  const filteredTopics = query.trim()
    ? topics.filter((t) => t.toLowerCase().includes(query.toLowerCase()))
    : topics.slice(0, 6);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          className="relative w-full max-w-2xl bg-[#0F111A] border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden glass-panel"
        >
          {/* Top Search Input */}
          <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
            <Search className="w-5 h-5 text-sky-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your memory by title, tag, topic, or source... (ESC to close)"
              className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none"
            />
            {query && (
              <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
              ESC
            </kbd>
          </div>

          {/* Result Sections */}
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {/* Quick Actions */}
            <div>
              <div className="text-xs font-mono font-semibold text-sky-400 tracking-wider uppercase mb-2">
                Quick Actions
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setCommandPaletteOpen(false);
                    setAddMemoryModalOpen(true);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-slate-200 text-xs font-medium transition-colors text-left"
                >
                  <Plus className="w-4 h-4 text-sky-400" />
                  <span>+ Add New Memory</span>
                </button>
                <button
                  onClick={() => {
                    setCommandPaletteOpen(false);
                  }}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-slate-200 text-xs font-medium transition-colors text-left"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Ask AI Assistant</span>
                </button>
              </div>
            </div>

            {/* Memories Results */}
            <div>
              <div className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase mb-2">
                Memories ({filteredMemories.length})
              </div>
              {filteredMemories.length === 0 ? (
                <div className="text-xs text-slate-500 italic p-3">No matching memories found.</div>
              ) : (
                <div className="space-y-1.5">
                  {filteredMemories.map((mem) => (
                    <div
                      key={mem.id}
                      onClick={() => {
                        setCommandPaletteOpen(false);
                        setActiveMemory(mem);
                      }}
                      className="group flex items-center justify-between p-2.5 rounded-xl hover:bg-sky-500/10 border border-transparent hover:border-sky-500/30 cursor-pointer transition-all"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <FileText className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                        <div className="min-w-0">
                          <h5 className="text-xs font-semibold text-slate-100 group-hover:text-sky-300 truncate">
                            {mem.title}
                          </h5>
                          <p className="text-[11px] text-slate-400 truncate mt-0.5">
                            {mem.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-slate-300 font-mono">
                          {mem.category}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Topics */}
            {filteredTopics.length > 0 && (
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase mb-2">
                  Matching Topics
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {filteredTopics.map((tag) => (
                    <span
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 text-xs text-slate-300 hover:text-sky-300 cursor-pointer transition-colors"
                    >
                      <Hash className="w-3 h-3 text-sky-400" />
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sources */}
            {filteredSources.length > 0 && (
              <div>
                <div className="text-xs font-mono font-semibold text-slate-400 tracking-wider uppercase mb-2">
                  Sources & Integrations
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {filteredSources.map((src) => (
                    <div
                      key={src.id}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-300"
                    >
                      <HardDrive className="w-4 h-4 text-purple-400 shrink-0" />
                      <div className="min-w-0">
                        <span className="font-medium text-slate-200 block truncate">{src.name}</span>
                        <span className="text-[10px] text-slate-400">{src.itemCount} items synced</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-2.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-slate-500">
            <span>Search powered by MemBUD local vector index</span>
            <div className="flex items-center gap-2 font-mono">
              <span>Press ESC to exit</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
