import React from 'react';
import { motion } from 'motion/react';
import bunnyImg from '../../assets/images/cute_bunny_mascot_1791491145094.jpg';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface WelcomeStageProps {
  onNext: () => void;
}

export const WelcomeStage: React.FC<WelcomeStageProps> = ({ onNext }) => {
  const handleClick = () => {
    soundManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto text-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(244,114,182,0.2)] border border-pink-200/90"
      >
        {/* Cute Mascot with gentle floating animation */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto mb-4"
        >
          <img
            src={bunnyImg}
            alt="Cute bunny holding a heart"
            className="w-full h-full object-contain rounded-2xl drop-shadow-md select-none pointer-events-none"
            referrerPolicy="no-referrer"
          />
          {/* Sparkles on mascot */}
          <span className="absolute top-2 right-2 text-xl animate-bounce">✨</span>
          <span className="absolute bottom-4 left-2 text-lg animate-pulse">💗</span>
        </motion.div>

        {/* Text Sequence with Stagger */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-3"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700 tracking-tight">
            YAYYY! You made it! 🥹💗
          </h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg sm:text-xl font-bold text-slate-700"
          >
            Hi {confessionConfig.herName}.
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-pink-600 font-semibold text-sm sm:text-base italic"
          >
            Okay... don't judge me.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0 }}
            className="text-slate-600 font-medium text-xs sm:text-sm"
          >
            I may have spent way too much time making this 😭
          </motion.p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          className="mt-6"
        >
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-300/60 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>Continue</span>
            <span>👉🏻👈🏻</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
