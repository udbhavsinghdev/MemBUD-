import React from 'react';
import { MemoryGraph } from '../components/memory/MemoryGraph';
import { Network, Sparkles } from 'lucide-react';

export const Graph: React.FC = () => {
  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <Network className="w-6 h-6 text-sky-400" />
            <span>Interactive Knowledge Graph</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Visualize relationships and semantic connections across your personal memory bank.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-mono text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>73 Active Neural Links</span>
        </div>
      </div>

      {/* Main Interactive Graph View */}
      <MemoryGraph heightClassName="h-[calc(100vh-13rem)]" />
    </div>
  );
};
