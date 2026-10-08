import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { confessionConfig } from '../../config/confessionData';

interface LoadingStageProps {
  onComplete: () => void;
}

export const LoadingStage: React.FC<LoadingStageProps> = ({ onComplete }) => {
  const [filledHeart, setFilledHeart] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFilledHeart(true);
    }, 900);

    const timer2 = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center select-none">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center max-w-sm"
      >
        {/* Heart transformation ♡ to ♥ */}
        <motion.div
          animate={{ scale: filledHeart ? [1, 1.35, 1.1] : 1 }}
          transition={{ duration: 0.4 }}
          className="text-6xl sm:text-7xl text-pink-500 mb-6 drop-shadow-md cursor-pointer select-none"
          onClick={() => setFilledHeart(true)}
        >
          {filledHeart ? '♥' : '♡'}
        </motion.div>

        {/* Text */}
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-xl sm:text-2xl font-bold text-pink-800 tracking-wide mb-2"
        >
          Making something for {confessionConfig.herName}... 💗
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-pink-500/90 text-sm sm:text-base font-medium italic"
        >
          Please wait hehe...
        </motion.p>

        {/* Tiny soft loading dots */}
        <div className="flex gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full bg-pink-400"
              animate={{ y: [-4, 4, -4], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 0.9,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};
