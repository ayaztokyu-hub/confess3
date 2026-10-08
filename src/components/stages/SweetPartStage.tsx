import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface SweetPartStageProps {
  onNext: () => void;
}

export const SweetPartStage: React.FC<SweetPartStageProps> = ({ onNext }) => {
  const handleClick = () => {
    soundManager.playSparkle();
    onNext();
  };

  const { title, paragraphs } = confessionConfig.sweetMessage;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg mx-auto bg-gradient-to-b from-[#fffafd] to-[#fff3f7] backdrop-blur-md rounded-[2.5rem] p-7 sm:p-10 shadow-[0_20px_50px_rgba(244,114,182,0.22)] border-2 border-pink-200/90 relative"
      >
        {/* Soft Heart Header */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
            <Heart className="w-6 h-6 fill-rose-500" />
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-pink-900 text-center mb-6">
          {title}
        </h3>

        {/* Sweet message paragraphs */}
        <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base font-medium">
          {paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.4 }}
              className={
                idx === paragraphs.length - 1
                  ? 'text-rose-600 font-bold text-base sm:text-lg pt-1'
                  : ''
              }
            >
              {p}
            </motion.p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0 }}
          className="mt-8 text-center"
        >
          <motion.button
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-300/60 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center gap-2"
          >
            <span>One last message...</span>
            <span className="text-lg">💌</span>
            <Sparkles className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};
