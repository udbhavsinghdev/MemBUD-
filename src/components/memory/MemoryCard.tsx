import React from 'react';
import { Memory } from '../../types';
import {
  FileText,
  Link2,
  FileCode,
  Sparkles,
  Tag,
  Clock,
  Trash2,
  Share2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useMemory } from '../../context/MemoryContext';
import { useNavigate } from 'react-router-dom';

interface MemoryCardProps {
  memory: Memory;
  viewMode?: 'grid' | 'list';
}

export const MemoryCard: React.FC<MemoryCardProps> = ({ memory, viewMode = 'grid' }) => {
  const { setActiveMemory, deleteMemory, sendChatMessage } = useMemory();
  const navigate = useNavigate();

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'Web Link':
        return <Link2 className="w-3.5 h-3.5 text-cyan-400" />;
      case 'Document PDF':
        return <FileCode className="w-3.5 h-3.5 text-rose-400" />;
      case 'Personal Note':
      default:
        return <FileText className="w-3.5 h-3.5 text-sky-400" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Idea':
        return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'Study':
        return 'bg-purple-500/15 text-purple-300 border-purple-500/30';
      case 'Research':
        return 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30';
      case 'Projects':
        return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
      case 'Work':
        return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30';
      case 'Personal':
      default:
        return 'bg-sky-500/15 text-sky-300 border-sky-500/30';
    }
  };

  if (viewMode === 'list') {
    return (
      <div className="group relative glass-panel p-4 rounded-2xl border border-white/10 hover:border-sky-500/40 hover:bg-slate-900/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0 flex-1 cursor-pointer" onClick={() => setActiveMemory(memory)}>
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
            {getSourceIcon(memory.source)}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${getCategoryColor(memory.category)}`}>
                {memory.category}
              </span>
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-500" />
                {memory.createdAt}
              </span>
            </div>
            <h4 className="text-sm font-semibold text-slate-100 group-hover:text-sky-300 transition-colors truncate">
              {memory.title}
            </h4>
            <p className="text-xs text-slate-400 truncate mt-0.5">{memory.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/10">
          <button
            onClick={() => {
              sendChatMessage(`Tell me more about memory: "${memory.title}"`);
              navigate('/app/chat');
            }}
            title="Chat about this memory"
            className="p-2 rounded-lg bg-white/5 hover:bg-purple-500/20 text-slate-400 hover:text-purple-300 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
          <button
            onClick={() => deleteMemory(memory.id)}
            title="Delete memory"
            className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative glass-panel p-5 rounded-2xl border border-white/10 hover:border-sky-500/40 hover:shadow-glow-cyan transition-all flex flex-col justify-between h-full">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-0.5 text-[10px] font-mono font-semibold rounded-full border ${getCategoryColor(memory.category)}`}>
            {memory.category}
          </span>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
            {getSourceIcon(memory.source)}
            <span>{memory.source}</span>
          </div>
        </div>

        {/* Title */}
        <h4
          onClick={() => setActiveMemory(memory)}
          className="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors cursor-pointer line-clamp-2 mb-2"
        >
          {memory.title}
        </h4>

        {/* Short Description */}
        <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
          {memory.description}
        </p>

        {/* AI Summary Badge */}
        {memory.aiSummary && (
          <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[11px] text-sky-200 mb-4 flex items-start gap-2">
            <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
            <span className="line-clamp-2">{memory.aiSummary}</span>
          </div>
        )}
      </div>

      <div>
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {memory.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] rounded-md bg-white/5 border border-white/10 text-slate-300 font-mono">
              #{tag}
            </span>
          ))}
          {memory.tags.length > 3 && (
            <span className="px-1.5 py-0.5 text-[10px] rounded-md bg-white/5 text-slate-400 font-mono">
              +{memory.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 font-mono">{memory.createdAt}</span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                sendChatMessage(`Can you explain the context of "${memory.title}"?`);
                navigate('/app/chat');
              }}
              title="Chat about this"
              className="p-1.5 rounded-lg text-slate-400 hover:text-sky-300 hover:bg-white/5 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveMemory(memory)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              title="View Detail"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteMemory(memory.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
