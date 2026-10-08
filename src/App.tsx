/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FloatingBackground } from './components/FloatingBackground';
import { MusicButton } from './components/MusicButton';
import { LoadingStage } from './components/stages/LoadingStage';
import { LoginStage } from './components/stages/LoginStage';
import { WelcomeStage } from './components/stages/WelcomeStage';
import { ConfessionIntroStage } from './components/stages/ConfessionIntroStage';
import { LetterStage } from './components/stages/LetterStage';
import { RealizationStage } from './components/stages/RealizationStage';
import { QuestionStage } from './components/stages/QuestionStage';
import { CelebrationStage } from './components/stages/CelebrationStage';
import { SweetPartStage } from './components/stages/SweetPartStage';
import { FinalMessageStage } from './components/stages/FinalMessageStage';

export default function App() {
  // Stage flow:
  // 0: Loading
  // 1: Secret Login
  // 2: Cute Welcome
  // 3: "I have something to say"
  // 4: The Little Letter
  // 5: The Realization
  // 6: The Big Question
  // 7: She Said Yes! (Celebration)
  // 8: The Sweet Part
  // 9: Final Cute Envelope Message & Certificate
  const [stage, setStage] = useState<number>(0);
  const [isExtraYes, setIsExtraYes] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-x-hidden selection:bg-pink-300 selection:text-pink-900">
      {/* Dreamy dynamic background with ambient lights & floating particles */}
      <FloatingBackground />

      {/* Floating Music player trigger */}
      <MusicButton />

      {/* Main interactive stage container */}
      <main className="w-full relative z-10 flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {stage === 0 && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LoadingStage onComplete={() => setStage(1)} />
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LoginStage onSuccess={() => setStage(2)} />
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <WelcomeStage onNext={() => setStage(3)} />
            </motion.div>
          )}

          {stage === 3 && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <ConfessionIntroStage onNext={() => setStage(4)} />
            </motion.div>
          )}

          {stage === 4 && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LetterStage onNext={() => setStage(5)} />
            </motion.div>
          )}

          {stage === 5 && (
            <motion.div
              key="realization"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <RealizationStage onNext={() => setStage(6)} />
            </motion.div>
          )}

          {stage === 6 && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <QuestionStage
                onYes={(extra) => {
                  setIsExtraYes(extra);
                  setStage(7);
                }}
              />
            </motion.div>
          )}

          {stage === 7 && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <CelebrationStage
                isExtraYes={isExtraYes}
                onNext={() => setStage(8)}
              />
            </motion.div>
          )}

          {stage === 8 && (
            <motion.div
              key="sweet"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <SweetPartStage onNext={() => setStage(9)} />
            </motion.div>
          )}

          {stage === 9 && (
            <motion.div
              key="final"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <FinalMessageStage onRestart={() => setStage(1)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
