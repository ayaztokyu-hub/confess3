import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, MessageCircleHeart } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface ConfessionIntroStageProps {
  onNext: () => void;
}

export const ConfessionIntroStage: React.FC<ConfessionIntroStageProps> = ({ onNext }) => {
  const fullText = "I need to tell you something.";
  const [typedText, setTypedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setTypedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, 60);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    soundManager.playPop();
    onNext();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto text-center bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(244,114,182,0.2)] border border-pink-200/90"
      >
        <div className="inline-flex p-3 rounded-2xl bg-pink-100 text-pink-500 mb-4 shadow-inner">
          <MessageCircleHeart className="w-8 h-8" />
        </div>

        {/* Lead in */}
        <h3 className="text-xl sm:text-2xl font-bold text-pink-900 mb-2">
          Okay {confessionConfig.herName}...
        </h3>

        {/* Typewriter text */}
        <div className="min-h-[2.5rem] flex items-center justify-center mb-5">
          <p className="text-xl sm:text-2xl font-extrabold text-rose-600 font-cute tracking-wide">
            {typedText}
            {!typingDone && (
              <span className="inline-block w-2 h-5 bg-rose-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>

        {/* Subsequent lines after typing completes */}
        {typingDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-3.5 text-slate-700"
          >
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm sm:text-base font-semibold"
            >
              And before you say anything...
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-base sm:text-lg font-bold text-pink-600"
            >
              “Yes, I know this is ridiculously cute.” 😭
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="text-sm sm:text-base font-medium text-slate-600"
            >
              But there's a reason I made this.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.0 }}
              className="pt-4"
            >
              <motion.button
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-extrabold text-base shadow-md shadow-pink-400/50 hover:shadow-lg transition-all duration-300 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <span>Tell me alreadyyy 😭</span>
                <Sparkles className="w-4 h-4" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};
