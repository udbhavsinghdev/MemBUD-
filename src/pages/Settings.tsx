import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Settings as SettingsIcon, Moon, Bell, Shield, Sparkles, Database, RotateCcw, Check } from 'lucide-react';

export const Settings: React.FC = () => {
  const { settings, updateSettings, resetDemoData } = useAuth();
  const { showToast } = useToast();

  const handleToggle = (key: keyof typeof settings) => {
    const val = settings[key];
    if (typeof val === 'boolean') {
      updateSettings({ [key]: !val });
      showToast('Setting updated', `${key} changed to ${!val}`, 'info');
    }
  };

  const handleReset = () => {
    resetDemoData();
    showToast('Demo data reset', 'Local storage cleared and restored to default.', 'warning');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <SettingsIcon className="w-6 h-6 text-sky-400" />
          <span>System Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage your memory agent preferences, AI privacy, and local storage state.
        </p>
      </div>

      <div className="space-y-6">
        {/* MEMORY PREFERENCES */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>Memory & AI Preferences</span>
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-100 block">Auto-save memories</span>
                <span className="text-[11px] text-slate-400">Automatically capture notes and conversation highlights.</span>
              </div>
              <button
                onClick={() => handleToggle('autoSaveMemories')}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.autoSaveMemories ? 'bg-sky-500' : 'bg-white/10'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.autoSaveMemories ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div>
                <span className="text-xs font-semibold text-slate-100 block">AI Suggestions</span>
                <span className="text-[11px] text-slate-400">Receive proactive knowledge synthesis insights.</span>
              </div>
              <button
                onClick={() => handleToggle('aiSuggestions')}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.aiSuggestions ? 'bg-sky-500' : 'bg-white/10'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.aiSuggestions ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div>
                <span className="text-xs font-semibold text-slate-100 block">Smart Connections</span>
                <span className="text-[11px] text-slate-400">Automatically link related topics in graph view.</span>
              </div>
              <button
                onClick={() => handleToggle('smartConnections')}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.smartConnections ? 'bg-sky-500' : 'bg-white/10'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.smartConnections ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* APPEARANCE & NOTIFICATIONS */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
          <h3 className="text-sm font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Moon className="w-4 h-4 text-purple-400" />
            <span>Appearance & Notifications</span>
          </h3>

          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-100 block">Dark Mode</span>
                <span className="text-[11px] text-slate-400">Futuristic dark visual identity (Default).</span>
              </div>
              <button
                onClick={() => handleToggle('darkMode')}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.darkMode ? 'bg-purple-500' : 'bg-white/10'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.darkMode ? 'left-6' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between border-t border-white/5 pt-3">
              <div>
                <span className="text-xs font-semibold text-slate-100 block">Daily Memory Summary</span>
                <span className="text-[11px] text-slate-400">Receive daily digest notifications of your second brain growth.</span>
              </div>
              <button
                onClick={() => handleToggle('dailySummary')}
                className={`w-11 h-6 rounded-full transition-colors relative ${settings.dailySummary ? 'bg-purple-500' : 'bg-white/10'}`}
              >
                <span className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-transform ${settings.dailySummary ? 'left-6' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* DEMO STATE CONTROL */}
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 space-y-4 bg-rose-950/10">
          <h3 className="text-sm font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
            <Database className="w-4 h-4 text-rose-400" />
            <span>Local Storage & Reset</span>
          </h3>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-xs font-semibold text-slate-100 block">Reset Demo State</span>
              <span className="text-[11px] text-slate-400">Restore all initial 128 memories, initial sources, and chat.</span>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 text-xs font-bold transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
