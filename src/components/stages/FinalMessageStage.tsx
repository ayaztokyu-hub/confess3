import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Heart, Award, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { confessionConfig } from '../../config/confessionData';
import { soundManager } from '../../utils/audio';

interface FinalMessageStageProps {
  onRestart: () => void;
}

export const FinalMessageStage: React.FC<FinalMessageStageProps> = ({ onRestart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleOpenEnvelope = () => {
    soundManager.playSparkle();
    setIsOpen(true);
  };

  const handleRestart = () => {
    soundManager.playPop();
    onRestart();
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg mx-auto text-center"
      >
        {!isOpen ? (
          /* Closed Envelope Card */
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-12 shadow-[0_20px_45px_rgba(244,114,182,0.22)] border-2 border-pink-200/90 cursor-pointer"
            onClick={handleOpenEnvelope}
          >
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="w-20 h-20 mx-auto mb-5 rounded-full bg-gradient-to-tr from-pink-400 to-rose-400 text-white flex items-center justify-center shadow-lg shadow-pink-300"
            >
              <Mail className="w-10 h-10 text-white animate-pulse" />
            </motion.div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-pink-900 mb-2">
              One last message... 💌
            </h3>
            <p className="text-slate-600 text-sm sm:text-base font-medium mb-6">
              Tap the envelope to open it!
            </p>

            <button
              onClick={handleOpenEnvelope}
              className="px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-sm shadow-md shadow-rose-300 hover:bg-rose-600 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <MailOpen className="w-4 h-4" />
              <span>Open my note</span>
            </button>
          </motion.div>
        ) : (
          /* Opened Note & Final Message */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-b from-[#fffafc] to-[#fff1f5] rounded-3xl p-6 sm:p-10 shadow-[0_25px_50px_rgba(244,114,182,0.25)] border-2 border-pink-200/90 relative text-left"
          >
            {/* Top decorative seal */}
            <div className="flex items-center justify-between border-b border-pink-200/80 pb-3 mb-5">
              <span className="text-xs font-bold text-pink-400 tracking-wider uppercase">
                Forever In Writing ✍️
              </span>
              <span className="text-lg">💖</span>
            </div>

            {/* Letter Content */}
            <div className="space-y-4 font-['Nunito'] text-slate-800">
              <div className="text-2xl sm:text-3xl font-black text-rose-500 font-cute">
                {confessionConfig.herName} 💗
              </div>

              <p className="text-base sm:text-lg font-semibold text-slate-700">
                You can officially stop saying I never asked you. 😭
              </p>

              <p className="text-sm sm:text-base font-medium text-slate-600">
                Because now...
              </p>

              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                className="py-2 text-center"
              >
                <span className="text-4xl sm:text-6xl font-black text-rose-600 font-cute tracking-wider drop-shadow-sm">
                  I DID. 💗
                </span>
              </motion.div>

              <div className="pt-2 text-center">
                <p className="text-xl sm:text-2xl font-black text-pink-700 font-cute">
                  Will you be my girlfriend?
                </p>
                <p className="text-xs sm:text-sm text-pink-500 font-bold italic mt-1">
                  ...again, just because I like asking. 👉🏻👈🏻😭
                </p>
              </div>

              {/* Sign off */}
              <div className="pt-6 border-t border-pink-200/60 mt-6 text-center space-y-1">
                <p className="text-xs sm:text-sm text-pink-600 font-bold">
                  Made with way too much love 💗
                </p>
                <p className="text-sm sm:text-base font-handwriting text-rose-600 font-black text-2xl">
                  — From {confessionConfig.senderName}
                </p>
              </div>
            </div>

            {/* Extra interactive buttons: Certificate & Restart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setShowCertificate(true);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-bold text-xs sm:text-sm transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Award className="w-4 h-4 text-rose-500" />
                <span>View Official Certificate 📜</span>
              </button>

              <button
                onClick={handleRestart}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white hover:bg-pink-50 text-pink-600 font-bold text-xs sm:text-sm border border-pink-200 transition-all duration-200 inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Experience it again</span>
              </button>
            </div>
          </motion.div>
        )}

        {/* Certificate Modal Popup */}
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
              onClick={() => setShowCertificate(false)}
            >
              <motion.div
                initial={{ scale: 0.85, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.85, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-[2rem] p-6 sm:p-8 max-w-md w-full border-4 border-pink-200 shadow-2xl relative text-center overflow-hidden"
              >
                {/* Decorative golden ribbons */}
                <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-200 via-pink-300 to-amber-200" />

                <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 shadow-inner">
                  <Award className="w-8 h-8" />
                </div>

                <div className="text-xs uppercase font-extrabold tracking-widest text-pink-500 mb-1">
                  Official Record of Cute Agreement
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-rose-600 font-cute mb-4">
                  Relationship Certificate 💕
                </h3>

                <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100 space-y-2 mb-4 text-xs sm:text-sm text-slate-700">
                  <p>This certifies that on</p>
                  <p className="font-bold text-rose-600 text-sm sm:text-base">
                    {todayStr}
                  </p>
                  <p>
                    <span className="font-extrabold text-pink-700">{confessionConfig.herName}</span> officially said{' '}
                    <span className="font-extrabold text-rose-600">YES</span> to being my girlfriend!
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-emerald-600 font-bold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Status: Asked properly & officially confirmed</span>
                  </div>
                </div>

                <p className="text-[11px] text-pink-400 italic mb-5">
                  Screenshots are legally binding in the court of cuteness ⚖️💗
                </p>

                <button
                  onClick={() => setShowCertificate(false)}
                  className="px-6 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-300 transition-all cursor-pointer"
                >
                  Close & Keep in Heart 💗
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
