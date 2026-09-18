import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Brain,
  LayoutDashboard,
  Layers,
  Network,
  MessageSquareText,
  HardDrive,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMemory } from '../../context/MemoryContext';
import { AiOrb } from '../ui/AiOrb';

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { setAddMemoryModalOpen, aiOrbState } = useMemory();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/app/dashboard' },
    { label: 'Memories', icon: Layers, path: '/app/memories' },
    { label: 'Knowledge Graph', icon: Network, path: '/app/graph' },
    { label: 'AI Chat', icon: MessageSquareText, path: '/app/chat' },
    { label: 'Sources', icon: HardDrive, path: '/app/sources' },
    { label: 'Timeline', icon: Clock, path: '/app/timeline' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#090A0F] text-slate-300 h-screen sticky top-0 shrink-0 z-30 select-none">
      {/* App Header / Logo */}
      <div className="p-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/app/dashboard')}>
          <div className="relative">
            <AiOrb size="sm" state={aiOrbState} />
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white block">
              Mem<span className="text-sky-400">BUD</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
              The Memory Agent
            </span>
          </div>
        </div>
      </div>

      {/* Quick Add Button */}
      <div className="p-4 pb-2">
        <button
          onClick={() => setAddMemoryModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all group"
        >
          <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          <span>+ Add Memory</span>
        </button>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-mono font-semibold text-slate-500 uppercase px-3 py-2">
          Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 font-semibold shadow-inner'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/10 space-y-1">
        <NavLink
          to="/app/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              isActive ? 'bg-sky-500/15 text-sky-400' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
            }`
          }
        >
          <Settings className="w-4 h-4 shrink-0" />
          <span>Settings</span>
        </NavLink>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-100 hover:bg-white/5 transition-all"
        >
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Help & Docs</span>
        </a>

        {/* User Card */}
        <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between px-2 py-1.5">
          <div
            onClick={() => navigate('/app/profile')}
            className="flex items-center gap-2.5 cursor-pointer min-w-0 group"
          >
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-sky-400/40 object-cover"
            />
            <div className="min-w-0">
              <span className="text-xs font-semibold text-slate-200 group-hover:text-sky-300 block truncate">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-400 block truncate">
                {user.email}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            title="Sign out"
            className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
