import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useMemory } from '../context/MemoryContext';
import { User, Mail, MapPin, Calendar, Layers, HardDrive, Network, Edit3 } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const { memories, sources } = useMemory();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 relative overflow-hidden bg-gradient-to-r from-sky-950/40 via-[#0F111D] to-[#090A0F]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-24 h-24 rounded-full border-2 border-sky-400 shadow-glow-cyan object-cover"
          />

          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-100">{user.name}</h1>
                <p className="text-xs font-mono text-sky-400 mt-0.5">{user.title}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-xs font-mono text-sky-300 w-fit mx-auto sm:mx-0">
                PRO MEMORY PLAN
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 max-w-xl leading-relaxed">
              {user.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {user.email}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {user.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                Joined {user.joinedDate}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Memory Statistics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-white/10 text-center">
          <Layers className="w-6 h-6 text-sky-400 mx-auto mb-2" />
          <span className="text-2xl font-extrabold text-slate-100 block">{memories.length}</span>
          <span className="text-xs text-slate-400 font-mono">Indexed Memories</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 text-center">
          <HardDrive className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <span className="text-2xl font-extrabold text-slate-100 block">
            {sources.filter((s) => s.connected).length}
          </span>
          <span className="text-xs text-slate-400 font-mono">Connected Sources</span>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-white/10 text-center">
          <Network className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
          <span className="text-2xl font-extrabold text-slate-100 block">73</span>
          <span className="text-xs text-slate-400 font-mono">Graph Concepts</span>
        </div>
      </div>
    </div>
  );
};
