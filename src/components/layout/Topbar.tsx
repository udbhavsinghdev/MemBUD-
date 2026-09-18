import React, { useState } from 'react';
import { Search, Bell, Plus, User, Sparkles } from 'lucide-react';
import { useMemory } from '../../context/MemoryContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Topbar: React.FC = () => {
  const { setCommandPaletteOpen, setAddMemoryModalOpen, memories } = useMemory();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#090A0F]/80 backdrop-blur-md border-b border-white/10">
      {/* Search Input trigger */}
      <div
        onClick={() => setCommandPaletteOpen(true)}
        className="flex items-center gap-3 w-full max-w-md px-3.5 py-2 rounded-xl glass-input cursor-pointer hover:border-sky-500/40 transition-all group"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-sky-400 transition-colors" />
        <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
          Search your memory...
        </span>
        <div className="ml-auto flex items-center gap-1">
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 rounded">
            K
          </kbd>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Notifications Popup */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 p-3 rounded-2xl glass-panel border border-sky-500/30 shadow-2xl z-50 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                <span className="font-semibold text-slate-200">Memory Agent Updates</span>
                <span className="text-[10px] font-mono text-sky-400">3 New</span>
              </div>
              <div className="space-y-2">
                <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20">
                  <span className="font-semibold text-sky-300 block">Smart Connection Identified</span>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    "React Architecture" linked with "AI Assistant Idea".
                  </p>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="font-medium text-slate-200 block">Weekly Memory Digest</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    12 new memories indexed across 4 sources.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Add Memory Button */}
        <button
          onClick={() => setAddMemoryModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/20 border border-sky-500/40 hover:bg-sky-500/30 text-sky-300 font-medium text-xs transition-all shadow-glow-cyan"
        >
          <Plus className="w-4 h-4 text-sky-400" />
          <span>Add Memory</span>
        </button>

        {/* User Avatar */}
        <button
          onClick={() => navigate('/app/profile')}
          className="flex items-center gap-2 p-1 rounded-full border border-sky-500/30 hover:border-sky-400 transition-all"
        >
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-7 h-7 rounded-full object-cover"
          />
        </button>
      </div>
    </header>
  );
};
