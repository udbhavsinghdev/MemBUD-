import React, { useState } from 'react';
import { useMemory } from '../context/MemoryContext';
import { MemoryCard } from '../components/memory/MemoryCard';
import { EmptyState } from '../components/ui/EmptyState';
import { Search, Filter, LayoutGrid, List, Plus, Layers, ArrowUpDown } from 'lucide-react';

export const Memories: React.FC = () => {
  const { memories, setAddMemoryModalOpen } = useMemory();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Personal', 'Idea', 'Study', 'Projects', 'Research', 'Work'];

  // Filter memories
  const filteredMemories = memories.filter((m) => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort memories
  const sortedMemories = [...filteredMemories].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    if (sortBy === 'oldest') return a.id.localeCompare(b.id);
    return b.id.localeCompare(a.id); // default newest
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
            <span>Your Memories</span>
            <span className="px-2.5 py-0.5 text-xs font-mono rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {memories.length} Indexed
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">Everything your Memory Agent knows and connected.</p>
        </div>

        <button
          onClick={() => setAddMemoryModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add Memory</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40 shadow-glow-cyan'
                : 'bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/10 border border-transparent'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl glass-input w-full sm:w-72 text-xs">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-slate-100 placeholder-slate-400 focus:outline-none w-full text-xs"
          />
        </div>

        {/* Sort & View Toggle */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl glass-panel text-xs text-slate-300">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent focus:outline-none text-xs cursor-pointer"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="oldest">Sort: Oldest First</option>
              <option value="title">Sort: Title (A-Z)</option>
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-sky-500/20 text-sky-300' : 'text-slate-400 hover:text-slate-200'}`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Memories Content */}
      {sortedMemories.length === 0 ? (
        <EmptyState
          title="No memories found"
          description="Your second brain doesn't have any memories matching this filter."
          actionText="Add Memory"
          onAction={() => setAddMemoryModalOpen(true)}
        />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-3'}>
          {sortedMemories.map((mem) => (
            <MemoryCard key={mem.id} memory={mem} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};
