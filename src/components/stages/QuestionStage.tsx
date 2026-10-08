import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface QuestionStageProps {
  onYes: (isExtra: boolean) => void;
}

export const QuestionStage: React.FC<QuestionStageProps> = ({ onYes }) => {
  const handleAnswer = (isExtra: boolean) => {
    soundManager.playCelebration();
    onYes(isExtra);
  };

  // Upward floating little hearts
  const floatingHearts = Array.from({ length: 14 }).map((_, i) => ({
    id: i,
    left: `${(i * 7 + 4) % 94}%`,
    duration: 5 + (i % 4) * 1.5,
    delay: (i * 0.45) % 4,
    size: 14 + (i % 3) * 6,
    char: i % 2 === 0 ? '💗' : '💕',
  }));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 overflow-hidden">
      {/* Gentle upward floating hearts specifically on this dream screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute select-none"
            style={{
              left: h.left,
              bottom: '-30px',
              fontSize: `${h.size}px`,
            }}
            animate={{
              y: [0, -window.innerHeight - 80],
              x: [-15, 15, -15],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: h.duration,
              delay: h.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {h.char}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto text-center relative z-20"
      >
        <div className="bg-white/85 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-12 shadow-[0_25px_60px_rgba(244,114,182,0.28)] border-2 border-pink-200/90 relative">
          {/* Subtle top crown aura */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 shadow-sm text-xs font-bold text-rose-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Moment</span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>

          {/* Name intro */}
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl sm:text-3xl font-extrabold text-pink-500 mb-2 font-cute tracking-wide"
          >
            {confessionConfig.herName}...
          </motion.p>

          {/* The Core Question */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="my-6"
          >
            <h1 className="text-3xl sm:text-5xl font-black text-rose-600 font-cute leading-tight tracking-tight drop-shadow-xs">
              Will you be my girlfriend?
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-pink-600 font-bold text-base sm:text-lg mb-8 italic"
          >
            Like... officially? 👉🏻👈🏻💗
          </motion.p>

          {/* Two Cute Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center">
            {/* Button 1 */}
            <motion.button
              onClick={() => handleAnswer(false)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-pink-400 to-rose-400 text-white font-black text-lg sm:text-xl shadow-lg shadow-pink-300/60 hover:shadow-xl hover:shadow-pink-400/80 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>YESSS</span>
              <span>💗</span>
            </motion.button>

            {/* Button 2 (Extra Yes!) */}
            <motion.button
              onClick={() => handleAnswer(true)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="flex-1 py-4 px-6 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white font-black text-lg sm:text-xl shadow-lg shadow-rose-400/60 hover:shadow-xl hover:shadow-rose-500/80 transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 border-2 border-white/60"
            >
              <span>YES, OBVIOUSLY</span>
              <span>😭💕</span>
            </motion.button>
          </div>

          {/* Playful hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="mt-6 text-xs sm:text-sm text-pink-400/90 font-medium"
          >
            Choose wisely... I made this whole website for this moment 😭
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
