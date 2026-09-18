import React from 'react';
import { useMemory } from '../context/MemoryContext';
import { Clock, FileText, Sparkles, UploadCloud, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';

export const Timeline: React.FC = () => {
  const { timelineEvents, memories, setActiveMemory } = useMemory();

  // Group events by date marker (TODAY, YESTERDAY, 2 DAYS AGO, etc.)
  const groupedEvents = timelineEvents.reduce((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = [];
    acc[ev.date].push(ev);
    return acc;
  }, {} as { [date: string]: typeof timelineEvents });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-4">
        <h1 className="text-2xl font-extrabold text-slate-100 flex items-center gap-2">
          <Clock className="w-6 h-6 text-sky-400" />
          <span>Chronological Timeline</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          History stream of captured notes, AI questions, file uploads, and source connections.
        </p>
      </div>

      {/* Timeline Stream */}
      <div className="space-y-8 relative before:absolute before:left-4 sm:before:left-6 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-sky-500 before:via-purple-500 before:to-transparent">
        {Object.entries(groupedEvents).map(([dateLabel, events]) => (
          <div key={dateLabel} className="space-y-4">
            {/* Date Group Pill */}
            <div className="relative z-10 flex items-center gap-3">
              <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 font-bold text-xs shadow-glow-cyan">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-mono font-bold tracking-widest text-sky-300 uppercase px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20">
                {dateLabel}
              </span>
            </div>

            {/* Events under this date */}
            <div className="pl-10 sm:pl-16 space-y-3">
              {events.map((ev, idx) => (
                <motion.div
                  key={ev.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => {
                    if (ev.memoryId) {
                      const mem = memories.find((m) => m.id === ev.memoryId);
                      if (mem) setActiveMemory(mem);
                    }
                  }}
                  className={`glass-panel p-4 rounded-2xl border border-white/10 hover:border-sky-500/40 transition-all ${
                    ev.memoryId ? 'cursor-pointer hover:bg-slate-900/80' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-sky-400 shrink-0 mt-0.5">
                        {ev.type === 'asked' ? (
                          <Sparkles className="w-4 h-4 text-purple-400" />
                        ) : ev.type === 'uploaded' ? (
                          <UploadCloud className="w-4 h-4 text-cyan-400" />
                        ) : ev.type === 'connected' ? (
                          <HardDrive className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <FileText className="w-4 h-4 text-sky-400" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-slate-100">{ev.title}</h4>
                        <span className="text-[10px] font-mono text-slate-400 block mt-1">
                          Category: {ev.category}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400 shrink-0 bg-white/5 px-2 py-0.5 rounded-md">
                      {ev.time}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
