import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface RealizationStageProps {
  onNext: () => void;
}

export const RealizationStage: React.FC<RealizationStageProps> = ({ onNext }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Progressive comedic pacing
    const t1 = setTimeout(() => setStep(2), 1600); // "Like properly..."
    const t2 = setTimeout(() => setStep(3), 3200); // "Arooba, will you be my girlfriend?" appears
    const t3 = setTimeout(() => setStep(4), 5200); // Disappears! "Wait that doesn't count yet"
    const t4 = setTimeout(() => setStep(5), 6200); // "So... I'm fixing that today 💗"

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleClick = () => {
    soundManager.playSparkle();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto text-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(244,114,182,0.22)] border border-pink-200/90"
      >
        {/* Playful loud headline */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="mb-4"
        >
          <span className="inline-block px-4 py-1 rounded-full bg-rose-100 text-rose-600 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
            The Big Problem 🤦‍♂️
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-rose-600 tracking-tight leading-snug">
            I NEVER ACTUALLY ASKED YOU.
          </h2>
        </motion.div>

        {/* Step 2 lines */}
        {step >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2 text-slate-600 font-semibold text-base sm:text-lg mb-6"
          >
            <p>Like properly.</p>
            <p className="text-pink-600">No fancy confession.</p>
            <p className="text-pink-600">No dramatic question.</p>
            <p className="text-slate-500 italic">No...</p>
          </motion.div>
        )}

        {/* Step 3: The question appears, then at step 4 dissolves/gets crossed out! */}
        <div className="min-h-[4rem] flex items-center justify-center mb-6">
          <AnimatePresence>
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(6px)' }}
                transition={{ duration: 0.4 }}
                className="p-3 px-5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-500 font-bold text-lg sm:text-xl"
              >
                “{confessionConfig.herName}, will you be my girlfriend?”
              </motion.div>
            )}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-xs sm:text-sm font-semibold text-pink-400 italic"
              >
                (Wait that didn't count yet! It has to be done for real 🤭)
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Step 5: The resolution */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <p className="text-xl sm:text-2xl font-bold text-slate-800">
              So...
            </p>

            {/* Glowing Big Heart */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
              className="inline-flex p-4 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white shadow-lg shadow-pink-300"
            >
              <Heart className="w-12 h-12 fill-white" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-600">
              I'm fixing that today. 💗
            </h3>

            <div className="pt-3">
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Okay... ask me then</span>
                <span className="text-lg">👀</span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Skip wait button */}
        {step < 5 && (
          <div className="mt-4">
            <button
              onClick={() => setStep(5)}
              className="text-xs text-pink-400 hover:text-pink-600 underline cursor-pointer"
            >
              skip to the good part 🤭
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
