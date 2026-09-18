import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types';
import { useMemory } from '../../context/MemoryContext';
import { Sparkles, FileText, User } from 'lucide-react';
import { AiOrb } from '../ui/AiOrb';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { memories, setActiveMemory } = useMemory();
  const isAi = message.sender === 'ai';

  return (
    <div className={`flex items-start gap-3 ${isAi ? 'justify-start' : 'justify-end'} mb-6`}>
      {isAi && (
        <div className="shrink-0 mt-1">
          <AiOrb size="sm" state="idle" />
        </div>
      )}

      <div className={`max-w-2xl flex flex-col ${isAi ? 'items-start' : 'items-end'}`}>
        <div className="flex items-center gap-2 mb-1 text-[10px] font-mono text-slate-400">
          <span>{isAi ? 'Memory Agent' : 'You'}</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        <div
          className={`p-4 rounded-2xl text-xs leading-relaxed ${
            isAi
              ? 'bg-slate-900/80 border border-sky-500/20 text-slate-100 rounded-tl-none shadow-xl'
              : 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white rounded-tr-none font-medium shadow-lg shadow-sky-500/20'
          }`}
        >
          {message.text}

          {/* Grounded Memory Sources Chips */}
          {isAi && message.sourceMemories && message.sourceMemories.length > 0 && (
            <div className="mt-3 pt-3 border-t border-white/10">
              <span className="text-[10px] font-mono font-semibold text-sky-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" />
                Grounded Memory Sources:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {message.sourceMemories.map((src) => (
                  <button
                    key={src.id}
                    onClick={() => {
                      const fullMem = memories.find((m) => m.id === src.id);
                      if (fullMem) setActiveMemory(fullMem);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 text-[11px] text-sky-300 font-mono transition-all"
                  >
                    <FileText className="w-3 h-3 text-sky-400" />
                    <span>{src.title}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {!isAi && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 flex items-center justify-center text-white shrink-0 mt-1 font-bold text-xs shadow-md">
          <User className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};
