import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';
import { CommandPalette } from '../ui/CommandPalette';
import { ToastContainer } from '../ui/Toast';
import { AddMemoryModal } from '../memory/AddMemoryModal';
import { MemoryDetailModal } from '../memory/MemoryDetailModal';
import { BotpressChatWidget } from '../chat/BotpressChatWidget';

export const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-[#090A0F] text-slate-100 font-sans">
      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <MobileNav />

      {/* Modals & Overlays */}
      <CommandPalette />
      <AddMemoryModal />
      <MemoryDetailModal />
      <ToastContainer />
      <BotpressChatWidget />
    </div>
  );
};

