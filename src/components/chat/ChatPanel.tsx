import React, { useState, useRef, useEffect } from 'react';
import { useMemory } from '../../context/MemoryContext';
import { ChatMessage } from './ChatMessage';
import { AiOrb } from '../ui/AiOrb';
import { Send, Paperclip, Mic, Sparkles, Trash2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ChatPanel: React.FC = () => {
  const { chatMessages, sendChatMessage, clearChatHistory, aiOrbState } = useMemory();
  const { showToast } = useToast();

  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'What did I learn recently?',
    'Show my project ideas',
    'What am I studying?',
    'What are my most connected topics?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, aiOrbState]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendChatMessage(input);
    setInput('');
  };

  const handlePromptClick = (prompt: string) => {
    sendChatMessage(prompt);
  };

  const handleVoiceClick = () => {
    setIsListening(true);
    showToast('Voice agent listening...', 'Speak now to query memory.', 'info');
    setTimeout(() => {
      setIsListening(false);
      sendChatMessage('What was I working on for the hackathon?');
    }, 2500);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8.5rem)] max-w-4xl mx-auto glass-panel border border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-[#090A0F]/90">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-3">
          <AiOrb size="sm" state={aiOrbState} />
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span>Memory Agent</span>
              <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
                Grounded AI
              </span>
            </h2>
            <p className="text-xs text-slate-400">Ask anything about your stored memories and notes</p>
          </div>
        </div>

        <button
          onClick={clearChatHistory}
          className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-white/5 transition-colors"
          title="Clear Chat"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Conversation Thread */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <AiOrb size="lg" state="idle" showLabel />
            <h3 className="text-lg font-bold text-slate-200 mt-4">Talk to your second brain</h3>
            <p className="text-xs text-slate-400 max-w-md mt-1 mb-6">
              Ask questions about your notes, research papers, project ideas, or lecture summaries.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
              {suggestedPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePromptClick(p)}
                  className="p-3 rounded-xl bg-white/5 hover:bg-sky-500/15 border border-white/10 hover:border-sky-500/30 text-xs text-slate-300 text-left transition-all font-medium flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{p}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {chatMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}

            {/* AI Typing Indicator */}
            {(aiOrbState === 'thinking' || aiOrbState === 'responding') && (
              <div className="flex items-center gap-3 mb-4">
                <AiOrb size="sm" state={aiOrbState} />
                <div className="p-3 rounded-2xl bg-slate-900 border border-sky-500/20 text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
                  <span>Searching 128 memories & vector indices...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Suggested Prompts Pill Bar */}
      {chatMessages.length > 0 && (
        <div className="px-6 py-2 border-t border-white/5 bg-black/20 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-500 uppercase shrink-0">Try asking:</span>
          {suggestedPrompts.map((p) => (
            <button
              key={p}
              onClick={() => handlePromptClick(p)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-sky-500/20 border border-white/10 hover:border-sky-500/30 text-[11px] text-slate-300 whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Sticky Bottom Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-white/10 bg-[#090A0F] flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => showToast('Attachment simulation', 'Upload files or notes via + Add Memory modal.', 'info')}
          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-colors"
          title="Attach memory"
        >
          <Paperclip className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={handleVoiceClick}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-400 animate-pulse'
              : 'bg-white/5 border-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200'
          }`}
          title="Voice input"
        >
          <Mic className="w-4 h-4" />
        </button>

        <div className="relative flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your memory anything... (e.g. 'What did I learn about React?')"
            className="w-full py-3 px-4 rounded-xl glass-input text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-sky-500/60 shadow-glow-cyan"
          />
        </div>

        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-30 text-white font-bold transition-all shadow-lg shadow-sky-500/20"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
