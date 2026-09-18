import React, { useState } from 'react';
import { useMemory } from '../context/MemoryContext';
import { HardDrive, Check, Plus, RefreshCw, X, Sparkles } from 'lucide-react';
import { SourceIntegration } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const Sources: React.FC = () => {
  const { sources, toggleSourceConnection } = useMemory();
  const [selectedSourceModal, setSelectedSourceModal] = useState<SourceIntegration | null>(null);

  const handleConnectConfirm = () => {
    if (selectedSourceModal) {
      toggleSourceConnection(selectedSourceModal.id);
      setSelectedSourceModal(null);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <HardDrive className="w-6 h-6 text-purple-400" />
          <span>Connected Sources</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Integrate external knowledge bases into your Memory Agent local vector index.
        </p>
      </div>

      {/* Grid of Source Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sources.map((src) => (
          <div
            key={src.id}
            className={`glass-panel p-6 rounded-3xl border transition-all flex flex-col justify-between ${
              src.connected
                ? 'border-purple-500/30 bg-purple-950/20 shadow-glow-purple'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-purple-400">
                  <HardDrive className="w-6 h-6" />
                </div>
                <span
                  className={`px-3 py-1 text-xs font-mono font-semibold rounded-full border ${
                    src.connected
                      ? 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                      : 'bg-white/5 text-slate-400 border-white/10'
                  }`}
                >
                  {src.connected ? 'Connected' : 'Disconnected'}
                </span>
              </div>

              <h3 className="text-lg font-extrabold text-slate-100 mb-1">{src.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{src.description}</p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="text-[11px] font-mono text-slate-400">
                {src.connected ? (
                  <span>{src.itemCount} items synced • {src.lastSynced}</span>
                ) : (
                  <span>Not synced</span>
                )}
              </div>

              <button
                onClick={() => {
                  if (!src.connected) {
                    setSelectedSourceModal(src);
                  } else {
                    toggleSourceConnection(src.id);
                  }
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  src.connected
                    ? 'bg-white/5 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30'
                    : 'bg-purple-500 hover:bg-purple-400 text-black shadow-glow-purple'
                }`}
              >
                {src.connected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Connected</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Connect</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Demo Modal */}
      <AnimatePresence>
        {selectedSourceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md glass-panel p-6 rounded-3xl border border-purple-500/40 bg-[#0F111A] text-center"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <span className="text-xs font-mono text-purple-400 uppercase font-semibold">
                  Demo Source Connection
                </span>
                <button
                  onClick={() => setSelectedSourceModal(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 w-fit mx-auto text-purple-400 mb-3">
                <Sparkles className="w-8 h-8" />
              </div>

              <h3 className="text-xl font-bold text-slate-100">
                Connect {selectedSourceModal.name}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                This is a simulated demo integration. In production, backend OAuth integration will authorize real-time synchronization.
              </p>

              <div className="flex gap-3 mt-6 pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedSourceModal(null)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 text-slate-300 text-xs font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConnectConfirm}
                  className="flex-1 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-black text-xs font-bold shadow-glow-purple"
                >
                  Simulate Connect
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
