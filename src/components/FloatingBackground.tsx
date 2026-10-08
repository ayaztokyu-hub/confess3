import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  emoji: string;
}

export const FloatingBackground: React.FC = () => {
  const [clickParticles, setClickParticles] = useState<Particle[]>([]);

  // Subtle floating background symbols
  const backgroundItems = [
    { emoji: '💗', top: '8%', left: '10%', delay: 0, duration: 6, size: 'text-xl' },
    { emoji: '✨', top: '15%', left: '85%', delay: 1, duration: 5, size: 'text-lg' },
    { emoji: '🌸', top: '35%', left: '6%', delay: 2, duration: 7, size: 'text-2xl' },
    { emoji: '🤍', top: '45%', left: '92%', delay: 0.5, duration: 6.5, size: 'text-lg' },
    { emoji: '⭐', top: '75%', left: '12%', delay: 1.5, duration: 5.5, size: 'text-base' },
    { emoji: '💕', top: '82%', left: '88%', delay: 2.5, duration: 6, size: 'text-xl' },
    { emoji: '☁️', top: '12%', left: '50%', delay: 3, duration: 8, size: 'text-3xl opacity-40' },
    { emoji: '✨', top: '65%', left: '4%', delay: 1.2, duration: 4.8, size: 'text-sm' },
    { emoji: '💖', top: '25%', left: '78%', delay: 2.1, duration: 6.2, size: 'text-lg' },
  ];

  // Spawn tap / mouse sparkle
  useEffect(() => {
    let lastTime = 0;
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastTime < 120) return; // limit frequency
      lastTime = now;

      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      const emojis = ['💗', '✨', '🌸', '💕', '⭐'];
      const newParticle: Particle = {
        id: Math.random(),
        x: clientX,
        y: clientY,
        size: Math.floor(Math.random() * 8) + 14,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };

      setClickParticles((prev) => [...prev.slice(-12), newParticle]);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchstart', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchstart', handlePointerMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft gradient ambient lights */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-pink-200/30 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-rose-200/30 blur-3xl" />
      <div className="absolute top-[40%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-purple-100/30 blur-3xl" />

      {/* Persistent floating cute items */}
      {backgroundItems.map((item, index) => (
        <motion.div
          key={index}
          className={`absolute select-none pointer-events-none ${item.size}`}
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [-12, 12, -12],
            rotate: [-6, 6, -6],
            opacity: [0.65, 0.95, 0.65],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.div>
      ))}

      {/* Trailing cursor / tap particles */}
      {clickParticles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute pointer-events-none select-none text-pink-400"
          style={{
            left: p.x - 10,
            top: p.y - 10,
            fontSize: `${p.size}px`,
          }}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 1.2, y: -30 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          onAnimationComplete={() => {
            setClickParticles((prev) => prev.filter((item) => item.id !== p.id));
          }}
        >
          {p.emoji}
        </motion.span>
      ))}
    </div>
  );
};
