import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Layers, Network, MessageSquareText, MoreHorizontal } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const navItems = [
    { label: 'Home', icon: LayoutDashboard, path: '/app/dashboard' },
    { label: 'Memories', icon: Layers, path: '/app/memories' },
    { label: 'Graph', icon: Network, path: '/app/graph' },
    { label: 'Chat', icon: MessageSquareText, path: '/app/chat' },
    { label: 'More', icon: MoreHorizontal, path: '/app/settings' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090A0F]/90 backdrop-blur-xl border-t border-white/10 px-2 py-2 flex items-center justify-around">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-[10px] font-medium transition-all ${
                isActive ? 'text-sky-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
