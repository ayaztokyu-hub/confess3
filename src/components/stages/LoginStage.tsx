import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Heart, Sparkles, KeyRound } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface LoginStageProps {
  onSuccess: () => void;
}

export const LoginStage: React.FC<LoginStageProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = password.trim().toLowerCase();

    if (cleanInput === confessionConfig.secretPassword.toLowerCase()) {
      soundManager.playSparkle();
      setUnlocked(true);
      setErrorMsg('');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      soundManager.playPop();
      setShake(true);
      setTimeout(() => setShake(false), 500);

      // Random cute message
      const randomMsg =
        confessionConfig.wrongPasswordMessages[
          Math.floor(Math.random() * confessionConfig.wrongPasswordMessages.length)
        ];
      setErrorMsg(randomMsg);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto text-center"
      >
        {/* Header greeting */}
        <div className="mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/90 text-pink-700 text-sm font-semibold border border-pink-200 shadow-xs mb-3"
          >
            <Sparkles className="w-4 h-4 text-pink-500 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Psst... {confessionConfig.herName} 👀💗</span>
          </motion.div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-900 tracking-tight">
            I made something for you.
          </h1>
        </div>

        {/* Envelope Styled Card */}
        <motion.div
          animate={shake ? { x: [-10, 10, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="relative bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(244,114,182,0.2)] border border-pink-200/90 overflow-hidden"
        >
          {/* Top envelope flap fold illusion */}
          <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-pink-200 via-rose-200 to-pink-200 opacity-60" />

          {/* Cute envelope icon / seal */}
          <div className="relative mx-auto mb-5 w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-300/50">
            {unlocked ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.4 }}
              >
                <Heart className="w-9 h-9 fill-white" />
              </motion.div>
            ) : (
              <Lock className="w-8 h-8 text-white" />
            )}
          </div>

          <p className="text-pink-700 text-sm sm:text-base font-medium mb-1">
            This little thing is only for one person...
          </p>
          <div className="text-2xl sm:text-3xl font-black text-rose-500 tracking-wide mb-3 flex items-center justify-center gap-1.5">
            <span>{confessionConfig.herName}</span>
            <span className="inline-block animate-bounce">💗</span>
          </div>
          <p className="text-slate-600 text-xs sm:text-sm mb-6">
            So obviously... you need the secret password 🤭
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secret word..."
                disabled={unlocked}
                autoFocus
                className="w-full px-5 py-3.5 pl-11 rounded-2xl bg-pink-50/70 border-2 border-pink-200 focus:border-rose-400 focus:bg-white text-pink-900 placeholder-pink-300 font-medium text-center text-base sm:text-lg outline-none transition-all duration-200 shadow-inner"
              />
              <KeyRound className="w-5 h-5 text-pink-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Error message with soft animation */}
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm font-semibold"
                >
                  {errorMsg}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={unlocked}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 text-white font-bold text-base shadow-md shadow-pink-400/40 hover:shadow-lg hover:shadow-pink-400/60 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {unlocked ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin" />
                  <span>Unlocking for you... 💗</span>
                </>
              ) : (
                <>
                  <span>Unlock my little secret</span>
                  <span className="text-lg">💌</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Cute subtle hint */}
          <p className="mt-4 text-[11px] text-pink-400/80 italic">
            (Psst: Who is this website made for? Exactly that!)
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
