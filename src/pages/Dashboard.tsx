import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMemory } from '../context/MemoryContext';
import { MemoryCard } from '../components/memory/MemoryCard';
import { AiOrb } from '../components/ui/AiOrb';
import {
  Layers,
  HardDrive,
  Hash,
  Activity,
  Network,
  Sparkles,
  Plus,
  MessageSquare,
  UploadCloud,
  Link2,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const {
    memories,
    sources,
    setAddMemoryModalOpen,
    sendChatMessage,
    aiOrbState
  } = useMemory();

  const navigate = useNavigate();

  const stats = [
    { label: 'Total Memories', value: memories.length > 0 ? memories.length : 128, icon: Layers, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'Connected Sources', value: sources.filter((s) => s.connected).length || 5, icon: HardDrive, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Topics Indexed', value: 24, icon: Hash, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Recent Activity', value: 12, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  const recentMemories = memories.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
            <span>Good evening, {user.name.split(' ')[0]}.</span>
            <span className="inline-block animate-bounce text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Here's what your personal memory system looks like today.
          </p>
        </div>

        {/* AI Agent Status Pill */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl glass-panel border border-sky-500/30">
          <AiOrb size="sm" state={aiOrbState} />
          <div>
            <span className="text-xs font-mono font-bold text-sky-300 block">Agent Active</span>
            <span className="text-[10px] text-slate-400 block">128 memories synchronized</span>
          </div>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-sky-500/30 transition-all flex items-center justify-between"
            >
              <div>
                <span className="text-xs text-slate-400 font-mono block">{stat.label}</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-100 mt-1 block">
                  {stat.value}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} border border-white/5`}>
                <Icon className="w-5 h-5" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* QUICK ACTIONS BAR */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
          Quick Actions
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setAddMemoryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-semibold transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Memory</span>
          </button>
          <button
            onClick={() => navigate('/app/chat')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 text-xs font-semibold transition-all"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask Memory</span>
          </button>
          <button
            onClick={() => setAddMemoryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all"
          >
            <UploadCloud className="w-4 h-4 text-cyan-400" />
            <span>Upload File</span>
          </button>
          <button
            onClick={() => setAddMemoryModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all"
          >
            <Link2 className="w-4 h-4 text-sky-400" />
            <span>Save Link</span>
          </button>
          <button
            onClick={() => navigate('/app/graph')}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-medium transition-all"
          >
            <Network className="w-4 h-4 text-emerald-400" />
            <span>Explore Graph</span>
          </button>
        </div>
      </div>

      {/* FEATURED INSIGHT CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Memory Insight Card */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-sky-500/30 relative overflow-hidden bg-gradient-to-br from-[#0F1222] to-[#090A0F]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Network className="w-4 h-4 text-sky-400" />
              Memory Density & Connectivity
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              +18% this week
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-slate-100 mb-2">
            Your memory is becoming more connected.
          </h3>
          <p className="text-xs text-slate-400 max-w-lg mb-6 leading-relaxed">
            Neural graph density has reached 73 active semantic connections across 24 topic clusters.
          </p>

          {/* Mini Graph Overview Box */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Memories</span>
                <span className="text-lg font-bold text-sky-400">{memories.length}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Topics</span>
                <span className="text-lg font-bold text-purple-400">24</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Connections</span>
                <span className="text-lg font-bold text-emerald-400">73</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/app/graph')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 text-sky-300 text-xs font-bold transition-all"
            >
              <span>Explore Memory Graph</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* AI Insight Panel */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 flex flex-col justify-between bg-gradient-to-br from-[#120F24] to-[#090A0F]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-purple-400 uppercase tracking-wider mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Memory Agent Noticed...</span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 mb-4">
              <p className="text-xs text-purple-200 leading-relaxed font-medium">
                "You've saved 7 memories related to AI projects and vector databases this week. Would you like me to synthesize a project outline?"
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              sendChatMessage('Synthesize an outline from my recent AI project memories.');
              navigate('/app/chat');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
          >
            <span>Explore Connection →</span>
          </button>
        </div>
      </div>

      {/* RECENT MEMORIES GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-100">Recent Memories</h3>
            <p className="text-xs text-slate-400">Latest thoughts, notes, and uploaded files</p>
          </div>
          <button
            onClick={() => navigate('/app/memories')}
            className="text-xs font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1"
          >
            <span>View All ({memories.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentMemories.map((mem) => (
            <MemoryCard key={mem.id} memory={mem} />
          ))}
        </div>
      </div>
    </div>
  );
};
