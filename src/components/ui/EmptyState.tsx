import React from 'react';
import { Layers, Plus } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Your second brain is empty.',
  description = 'Add your first memory and watch your knowledge graph grow.',
  actionText = 'Add Memory',
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center glass-panel rounded-3xl border border-white/10 my-8">
      <div className="p-4 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-4 shadow-glow-cyan">
        <Layers className="w-8 h-8" />
      </div>

      <h3 className="text-xl font-extrabold text-slate-100">{title}</h3>
      <p className="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">{description}</p>

      {onAction && (
        <button
          onClick={onAction}
          className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
      )}
    </div>
  );
};
