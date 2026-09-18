import React from 'react';
import { motion } from 'framer-motion';

interface AiOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  state?: 'idle' | 'processing' | 'thinking' | 'responding' | 'saved';
  showLabel?: boolean;
}

export const AiOrb: React.FC<AiOrbProps> = ({
  size = 'md',
  state = 'idle',
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  const glowSizeClasses = {
    sm: 'blur-md',
    md: 'blur-xl',
    lg: 'blur-2xl',
    xl: 'blur-3xl',
  };

  const stateColors = {
    idle: {
      core: 'from-sky-400 via-cyan-500 to-indigo-600',
      glow: 'bg-sky-500/40',
      border: 'border-sky-400/40',
      pulseSpeed: 4,
      text: 'AI Agent Idle',
    },
    processing: {
      core: 'from-amber-400 via-sky-500 to-cyan-500',
      glow: 'bg-amber-500/50',
      border: 'border-amber-400/50',
      pulseSpeed: 1.5,
      text: 'Processing Memory...',
    },
    thinking: {
      core: 'from-purple-500 via-indigo-500 to-sky-400',
      glow: 'bg-purple-600/50',
      border: 'border-purple-400/50',
      pulseSpeed: 1.2,
      text: 'Synthesizing Knowledge...',
    },
    responding: {
      core: 'from-emerald-400 via-cyan-400 to-sky-500',
      glow: 'bg-emerald-500/50',
      border: 'border-emerald-400/50',
      pulseSpeed: 0.8,
      text: 'Generating Insight...',
    },
    saved: {
      core: 'from-teal-400 via-emerald-500 to-sky-400',
      glow: 'bg-teal-400/60',
      border: 'border-teal-300/60',
      pulseSpeed: 2,
      text: 'Memory Saved!',
    },
  };

  const current = stateColors[state] || stateColors.idle;

  return (
    <div className="flex flex-col items-center justify-center gap-3 select-none">
      <div className={`relative flex items-center justify-center ${sizeClasses[size]}`}>
        {/* Outer Pulsing Aura */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: current.pulseSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`absolute inset-0 rounded-full ${current.glow} ${glowSizeClasses[size]}`}
        />

        {/* Rotating Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-[-4px] rounded-full border border-dashed ${current.border} opacity-70`}
        />

        {/* Inner Counter-Rotating Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-[-8px] rounded-full border border-dotted border-white/20"
        />

        {/* Core Glowing Orb */}
        <motion.div
          animate={{
            scale: state === 'thinking' ? [0.95, 1.05, 0.95] : [1, 1.03, 1],
          }}
          transition={{
            duration: current.pulseSpeed,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className={`relative w-full h-full rounded-full bg-gradient-to-br ${current.core} shadow-2xl overflow-hidden p-[1px]`}
        >
          {/* Internal Shimmer / Specular Highlight */}
          <div className="w-full h-full rounded-full bg-black/20 backdrop-blur-[2px] relative overflow-hidden flex items-center justify-center">
            <div className="absolute top-1 left-2 w-1/3 h-1/3 rounded-full bg-white/40 blur-[2px]" />
            <div className="absolute bottom-1 right-2 w-1/4 h-1/4 rounded-full bg-sky-300/30 blur-[4px]" />

            {/* Particle effect inside orb */}
            {state === 'thinking' && (
              <motion.div
                animate={{ rotate: 360, scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1/2 h-1/2 rounded-full border border-white/40 border-t-transparent animate-spin"
              />
            )}
          </div>
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-mono tracking-wider text-sky-300/80 uppercase font-semibold">
          {current.text}
        </span>
      )}
    </div>
  );
};
