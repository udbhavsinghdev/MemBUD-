import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMemory } from '../context/MemoryContext';
import { AiOrb } from '../components/ui/AiOrb';
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Lightbulb,
  User,
  FlaskConical,
  HardDrive,
  FileText,
  Github,
  Globe,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const { completeOnboarding, user } = useAuth();
  const { sources, toggleSourceConnection } = useMemory();

  const [step, setStep] = useState<number>(1);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(['Work', 'Study', 'Projects']);

  const topics = [
    { id: 'Work', label: 'Work', icon: Briefcase, desc: 'Meeting notes, tickets & PRs' },
    { id: 'Study', label: 'Study', icon: GraduationCap, desc: 'Lectures, textbooks & exams' },
    { id: 'Projects', label: 'Projects', icon: FolderGit2, desc: 'Hackathons, builds & code' },
    { id: 'Ideas', label: 'Ideas', icon: Lightbulb, desc: 'Brainstorms & inspiration' },
    { id: 'Personal', label: 'Personal', icon: User, desc: 'Fitness, goals & journals' },
    { id: 'Research', label: 'Research', icon: FlaskConical, desc: 'Papers, articles & bookmarks' },
  ];

  const handleTopicToggle = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    completeOnboarding();
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Progress Dots */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              step === i ? 'w-8 bg-sky-400' : step > i ? 'w-3 bg-sky-500/50' : 'w-3 bg-white/10'
            }`}
          />
        ))}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="w-full max-w-xl glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/30 shadow-2xl relative z-10 bg-[#0D0F1A]/95 text-center"
      >
        {/* STEP 1 */}
        {step === 1 && (
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <AiOrb size="xl" state="thinking" />
            </div>
            <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest block mb-2">
              Step 1 of 4
            </span>
            <h2 className="text-3xl font-extrabold text-slate-100">Meet your Memory Agent</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-3 leading-relaxed">
              "Hello {user.name.split(' ')[0]}! I'm your AI Memory Agent. I'm here to remember, connect, and retrieve the things that matter most to you."
            </p>

            <button
              onClick={() => setStep(2)}
              className="mt-8 px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 flex items-center gap-2"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest block mb-1">
              Step 2 of 4
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100">
              What should I help you remember?
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">Select all knowledge domains that apply</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full text-left">
              {topics.map((item) => {
                const Icon = item.icon;
                const selected = selectedTopics.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleTopicToggle(item.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                      selected
                        ? 'bg-sky-500/15 border-sky-400 text-sky-200 shadow-glow-cyan'
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-5 h-5 ${selected ? 'text-sky-400' : 'text-slate-400'}`} />
                      {selected && <Check className="w-4 h-4 text-sky-400" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold block text-slate-200">{item.label}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5 line-clamp-1">{item.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between w-full mt-8 pt-4 border-t border-white/10">
              <button
                onClick={() => setStep(1)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-glow-cyan"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="flex flex-col items-center">
            <span className="text-xs font-mono font-semibold text-sky-400 uppercase tracking-widest block mb-1">
              Step 3 of 4
            </span>
            <h2 className="text-2xl font-extrabold text-slate-100">Connect your knowledge</h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">Choose sources to connect for instant sync</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
              {sources.map((src) => (
                <div
                  key={src.id}
                  onClick={() => toggleSourceConnection(src.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    src.connected
                      ? 'bg-purple-500/15 border-purple-400 text-purple-200 shadow-glow-purple'
                      : 'bg-white/5 border-white/10 hover:border-white/20 text-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <HardDrive className="w-5 h-5 text-purple-400" />
                    <div>
                      <span className="text-xs font-bold block text-slate-200">{src.name}</span>
                      <span className="text-[10px] text-slate-400">{src.connected ? 'Connected' : 'Click to connect'}</span>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 text-[10px] rounded-md font-mono ${src.connected ? 'bg-purple-400/20 text-purple-300' : 'bg-white/5 text-slate-400'}`}>
                    {src.connected ? 'Active' : 'Connect'}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between w-full mt-8 pt-4 border-t border-white/10">
              <button
                onClick={() => setStep(2)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {step === 4 && (
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <AiOrb size="xl" state="saved" />
            </div>
            <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-widest block mb-2">
              Setup Complete!
            </span>
            <h2 className="text-3xl font-extrabold text-slate-100">You're ready.</h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mt-3 leading-relaxed">
              Your second brain is initialized and ready to grow. 128 initial memories indexed into your neural knowledge graph.
            </p>

            <button
              onClick={handleFinish}
              className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-cyan-400 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-slate-950 font-extrabold text-sm shadow-2xl shadow-sky-500/40 flex items-center gap-2"
            >
              <span>Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
