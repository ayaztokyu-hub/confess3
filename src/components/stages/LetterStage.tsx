import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Feather } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface LetterStageProps {
  onNext: () => void;
}

export const LetterStage: React.FC<LetterStageProps> = ({ onNext }) => {
  // Reveal lines progressively
  const [visibleCount, setVisibleCount] = useState(1);
  const lines = confessionConfig.letterLines;

  useEffect(() => {
    if (visibleCount < lines.length) {
      const delay = visibleCount === 6 ? 1200 : visibleCount === 7 ? 1400 : 900;
      const timer = setTimeout(() => {
        setVisibleCount((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, lines.length]);

  const allVisible = visibleCount >= lines.length;

  const handleNext = () => {
    soundManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto"
      >
        {/* Letter Card Styled like a cozy stationery paper */}
        <div className="relative bg-gradient-to-b from-[#fffafd] to-[#fff1f6] rounded-3xl p-6 sm:p-9 shadow-[0_20px_45px_rgba(244,114,182,0.22)] border-2 border-pink-200/90 overflow-hidden">
          {/* Subtle lined pattern */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: 'linear-gradient(rgba(244, 114, 182, 0.3) 1px, transparent 1px)',
              backgroundSize: '100% 2.2rem',
              marginTop: '5rem',
            }}
          />

          {/* Letter Stamp / Seal */}
          <div className="flex items-center justify-between border-b border-pink-200/70 pb-4 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-xs">
                <Feather className="w-4 h-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400">
                A Little Note
              </span>
            </div>
            <div className="w-9 h-9 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-300">
              <Heart className="w-5 h-5 fill-white" />
            </div>
          </div>

          {/* Salutation */}
          <h2 className="text-3xl sm:text-4xl font-handwriting font-bold text-pink-900 mb-6 tracking-wide">
            Dear {confessionConfig.herName} 💗
          </h2>

          {/* Lines */}
          <div className="space-y-3.5 font-handwriting text-2xl sm:text-3xl text-slate-800 leading-snug">
            {lines.slice(0, visibleCount).map((line, idx) => {
              const isSpecial = line.includes('really special');
              const isForgot = line.includes('forgot to do');

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center gap-2 flex-wrap"
                >
                  <span
                    className={
                      isSpecial
                        ? 'text-rose-600 font-extrabold text-3xl sm:text-4xl drop-shadow-xs'
                        : isForgot
                        ? 'text-pink-700 font-bold'
                        : ''
                    }
                  >
                    {line}
                  </span>
                  {isSpecial && (
                    <motion.span
                      animate={{ scale: [1, 1.4, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="inline-block"
                    >
                      💗
                    </motion.span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Action button once all lines appear */}
          <AnimatePresence>
            {allVisible && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 pt-4 border-t border-pink-200/60 text-center"
              >
                <motion.button
                  onClick={handleNext}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Wait, what thing?! 🥺</span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {!allVisible && (
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setVisibleCount(lines.length)}
                className="text-xs text-pink-400 hover:text-pink-600 underline cursor-pointer"
              >
                read faster ✨
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
