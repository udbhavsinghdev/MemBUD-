import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOrb } from '../components/ui/AiOrb';
import {
  Brain,
  Sparkles,
  ArrowRight,
  FileText,
  Link2,
  UploadCloud,
  MessageSquare,
  Network,
  Clock,
  ShieldCheck,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BotpressChatWidget } from '../components/chat/BotpressChatWidget';


export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { exploreDemo } = useAuth();

  const handleExploreDemo = () => {
    exploreDemo();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 overflow-x-hidden selection:bg-sky-500/30 selection:text-sky-200">
      {/* Background Grids & Orbs */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-radial-gradient pointer-events-none" />

      {/* Top Navbar */}
      <header className="relative z-30 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AiOrb size="sm" state="idle" />
          <span className="font-extrabold text-lg tracking-tight text-white">
            Mem<span className="text-sky-400">BUD</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={handleExploreDemo}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-sky-500/10 hover:border-sky-500/30 text-xs font-semibold text-slate-200 hover:text-sky-300 transition-all"
          >
            Explore Demo
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
        {/* Top Tag Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-medium mb-8 shadow-glow-cyan"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Introducing MemBUD • The Memory Agent</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-100 max-w-4xl leading-[1.1]"
        >
          Your AI that <span className="gradient-text">remembers.</span>
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mt-6 leading-relaxed"
        >
          Capture your thoughts, connect your knowledge, and talk to an AI that understands your personal context. One place for everything you want your AI to remember.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <button
            onClick={() => navigate('/signup')}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-2xl shadow-sky-500/30 flex items-center gap-2 group transition-all"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleExploreDemo}
            className="px-8 py-4 rounded-2xl glass-panel hover:bg-white/10 border border-white/15 text-slate-200 font-bold text-sm transition-all"
          >
            Explore Interactive Demo
          </button>
        </motion.div>

        {/* Futuristic Memory Visualizer Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative w-full max-w-4xl mt-16 p-4 rounded-3xl glass-panel border border-sky-500/30 shadow-2xl bg-[#0C0E18]/80 overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 px-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-slate-400">membud.ai/memory-graph</span>
            </div>
            <span className="text-[10px] font-mono text-sky-400">128 Memories • Active Neural Graph</span>
          </div>

          <div className="relative h-[340px] flex items-center justify-center bg-black/40 rounded-2xl overflow-hidden p-6">
            {/* Center AI Orb */}
            <div className="relative z-10 flex flex-col items-center">
              <AiOrb size="xl" state="thinking" />
              <span className="mt-4 text-xs font-mono text-sky-300 font-semibold uppercase tracking-widest">
                Context Core Active
              </span>
            </div>

            {/* Orbiting Memory Cards */}
            <div className="absolute top-6 left-8 p-3 rounded-xl glass-panel border border-sky-500/30 text-left text-xs max-w-[180px] shadow-lg animate-float">
              <span className="text-[10px] text-sky-400 font-mono block">#React Architecture</span>
              <span className="font-semibold text-slate-200 block truncate">Component Patterns</span>
            </div>

            <div className="absolute bottom-8 left-12 p-3 rounded-xl glass-panel border border-purple-500/30 text-left text-xs max-w-[180px] shadow-lg animate-float" style={{ animationDelay: '1.5s' }}>
              <span className="text-[10px] text-purple-400 font-mono block">#Physics Notes</span>
              <span className="font-semibold text-slate-200 block truncate">Semiconductors PHY175</span>
            </div>

            <div className="absolute top-10 right-10 p-3 rounded-xl glass-panel border border-emerald-500/30 text-left text-xs max-w-[180px] shadow-lg animate-float" style={{ animationDelay: '2.5s' }}>
              <span className="text-[10px] text-emerald-400 font-mono block">#Project Idea</span>
              <span className="font-semibold text-slate-200 block truncate">AI Study Assistant</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 1: CAPTURE */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold block mb-2">
            01 • CAPTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Save anything worth remembering.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-3">
            Effortlessly ingest notes, links, PDFs, web snippets, and conversation highlights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Notes', icon: FileText, color: 'text-sky-400', desc: 'Instant markdown thoughts, lecture summaries, and daily journal logs.' },
            { title: 'Links', icon: Link2, color: 'text-cyan-400', desc: 'Web articles, GitHub repositories, research papers, and documentation.' },
            { title: 'Files', icon: UploadCloud, color: 'text-purple-400', desc: 'PDFs, DOCX files, code archives, and lecture slide decks with full OCR.' },
            { title: 'Conversations', icon: MessageSquare, color: 'text-emerald-400', desc: 'Save key highlights and answers directly from your AI chat sessions.' }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <div className={`p-3 rounded-xl bg-white/5 border border-white/10 w-fit mb-4 ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-100 mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: UNDERSTAND */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-semibold block mb-2">
              02 • UNDERSTAND
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 leading-tight">
              Your memories become connected knowledge.
            </h2>
            <p className="text-sm text-slate-400 mt-4 leading-relaxed">
              MemBUD automatically links related concepts across different formats. A physics note connects to a coding project, which connects to a saved vector DB research link.
            </p>

            <ul className="space-y-3 mt-6">
              {['Automatic concept graph extraction', 'Interactive node hover & visual inspection', 'Semantic similarity clustering'].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-xs font-medium text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-3xl glass-panel border border-purple-500/30 shadow-2xl bg-[#0A0C14]">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono text-purple-300">
              <Network className="w-4 h-4 text-purple-400" />
              <span>Connected Knowledge Graph Preview</span>
            </div>
            <div className="h-64 rounded-2xl bg-black/60 flex items-center justify-center border border-white/5 relative overflow-hidden">
              <AiOrb size="lg" state="thinking" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: ASK */}
      <section className="relative z-20 max-w-6xl mx-auto px-6 py-20 border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-semibold block mb-2">
            03 • ASK
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100">
            Talk to your memory.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-3">
            Ask complex questions. Every AI response includes exact memory source chips for ground truth verification.
          </p>
        </div>

        <div className="max-w-3xl mx-auto p-6 rounded-3xl glass-panel border border-sky-500/30 shadow-2xl bg-[#0A0D18]">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <span className="text-xs font-mono font-bold text-slate-200">AI Assistant Preview</span>
            <span className="text-[10px] font-mono text-sky-400">Grounded Mode</span>
          </div>

          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs text-sky-200 w-fit ml-auto">
              "What did I study about semiconductors earlier this week?"
            </div>

            <div className="p-4 rounded-2xl bg-slate-900 border border-white/10 text-xs text-slate-200 leading-relaxed max-w-xl">
              <p>
                You reviewed p-n junction physics for PHY175. Key points included Fermi levels, depletion region formation, and the built-in potential formula V_bi = (kT/q) * ln(N_A * N_D / n_i^2).
              </p>
              <div className="mt-3 pt-2 border-t border-white/10 flex items-center gap-2">
                <span className="text-[10px] font-mono text-sky-400 uppercase">Sources:</span>
                <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-sky-300">
                  PHY175_Semiconductors.pdf
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-20 max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="p-10 rounded-3xl bg-gradient-to-b from-sky-950/40 via-[#0E111D] to-[#090A0F] border border-sky-500/30 shadow-2xl">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100">
            Build your second brain.
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mt-4">
            Experience the future of personal knowledge retention with The Memory Agent.
          </p>

          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-sm shadow-2xl shadow-sky-500/30 transition-all"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-20 border-t border-white/10 py-8 text-center text-xs text-slate-500 font-mono">
        © 2026 MemBUD — The Memory Agent. All rights reserved.
      </footer>

      {/* Botpress Floating AI Chatbot Widget */}
      <BotpressChatWidget />
    </div>
  );
};

