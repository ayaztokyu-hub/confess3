import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';
import celebrationImg from '../../assets/images/sweet_celebration_1791491170131.jpg';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface CelebrationStageProps {
  isExtraYes: boolean;
  onNext: () => void;
}

export const CelebrationStage: React.FC<CelebrationStageProps> = ({ isExtraYes, onNext }) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Fire celebratory confetti cannons!
    const fireConfetti = () => {
      // Side bursts
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6, x: 0.2 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a', '#ffffff'],
      });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6, x: 0.8 },
        colors: ['#f472b6', '#fb7185', '#fda4af', '#fef08a', '#ffffff'],
      });
      // Center burst
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5, x: 0.5 },
        colors: ['#ec4899', '#f43f5e', '#f9a8d4', '#fed7aa', '#ffffff'],
      });
    };

    fireConfetti();
    const interval = setInterval(fireConfetti, 2200);

    // Timed reveals:
    // Step 1: "WAIT..."
    // Step 2: "SHE SAID YES?!?! 😭💗"
    // Step 3: "IT'S OFFICIAL!!!" + names + image
    const t1 = setTimeout(() => setStep(2), 1600);
    const t2 = setTimeout(() => setStep(3), 3200);

    return () => {
      clearInterval(interval);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const handleNext = () => {
    soundManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto text-center bg-white/95 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 shadow-[0_25px_60px_rgba(244,114,182,0.3)] border-2 border-pink-200/90 relative overflow-hidden"
      >
        {/* Soft celebratory glow background overlay */}
        <div className="absolute inset-0 bg-radial from-pink-100/60 to-transparent pointer-events-none" />

        {step === 1 && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            className="py-12"
          >
            <h2 className="text-4xl sm:text-5xl font-black text-slate-700 tracking-wider animate-pulse">
              WAIT...
            </h2>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="py-12 space-y-4"
          >
            <div className="text-5xl sm:text-6xl animate-bounce">😭💗</div>
            <h2 className="text-3xl sm:text-5xl font-black text-rose-600 leading-tight">
              SHE SAID YES?!?!
            </h2>
            {isExtraYes && (
              <p className="text-pink-600 font-bold text-lg sm:text-xl">
                (AND IT WAS “YES, OBVIOUSLY”!! 🥹)
              </p>
            )}
          </motion.div>
        )}

        {step >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-5 relative z-10"
          >
            {/* Mascot art */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
              <img
                src={celebrationImg}
                alt="Two cute bunnies celebrating"
                className="w-full h-full object-contain rounded-3xl drop-shadow-lg"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -top-2 -right-2 text-2xl animate-spin" style={{ animationDuration: '4s' }}>
                ✨
              </span>
            </div>

            <div className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 font-extrabold text-sm sm:text-base tracking-wide uppercase">
              🎉 IT'S OFFICIAL!!! 🎉
            </div>

            {/* Names with animated pulsing heart */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 text-2xl sm:text-4xl font-black text-rose-600">
              <span>{confessionConfig.herName}</span>
              <motion.span
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="text-red-500 inline-block drop-shadow-md"
              >
                ❤️
              </motion.span>
              <span>{confessionConfig.senderName}</span>
            </div>

            <p className="text-pink-600 font-bold text-base sm:text-lg">
              I FINALLY ASKED PROPERLY. 😭💗
            </p>

            <div className="pt-2">
              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-300/60 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Aww, there's more?</span>
                <span className="text-lg">🥹</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
