import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AiOrb } from '../components/ui/AiOrb';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, exploreDemo } = useAuth();

  const [email, setEmail] = useState('alex.rivera@antigravity.ai');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate('/app/dashboard');
  };

  const handleSocialClick = () => {
    login('alex.rivera@antigravity.ai');
    navigate('/app/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#090A0F] flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md glass-panel p-8 rounded-3xl border border-sky-500/30 shadow-2xl relative z-10 bg-[#0D0F1A]/90"
      >
        {/* Header / Logo */}
        <div className="flex flex-col items-center text-center mb-8">
          <AiOrb size="md" state="idle" />
          <h2 className="text-2xl font-extrabold text-slate-100 mt-4">Welcome back</h2>
          <p className="text-xs text-slate-400 mt-1">Sign in to access your AI memory agent</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Email address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-slate-100"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded bg-black/40 border-white/10 text-sky-500 focus:ring-0" />
              <span>Remember me</span>
            </label>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-sky-400 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-sky-500/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <span className="relative px-3 bg-[#0D0F1A] text-[10px] font-mono text-slate-500 uppercase">
            OR
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleSocialClick}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <Chrome className="w-4 h-4 text-rose-400" />
            <span>Google</span>
          </button>

          <button
            onClick={handleSocialClick}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-medium text-slate-300 transition-colors"
          >
            <Github className="w-4 h-4 text-slate-200" />
            <span>GitHub</span>
          </button>
        </div>

        <div className="text-center mt-6 text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-sky-400 font-semibold hover:underline">
            Create account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};
