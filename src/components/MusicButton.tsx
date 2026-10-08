import React, { useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { confessionConfig } from '../config/confessionData';

export const MusicButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    soundManager.playPop();
    const playing = soundManager.toggleMusic(confessionConfig.audioUrl, (active) => {
      setIsPlaying(active);
    });
    setIsPlaying(playing);
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-pink-600 border border-pink-200/80 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 text-xs sm:text-sm font-semibold cursor-pointer"
      title="Play our romantic vibe music"
    >
      {isPlaying ? (
        <>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
          </span>
          <Volume2 className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>⏸ Pause vibe 💗</span>
        </>
      ) : (
        <>
          <Music className="w-4 h-4 text-pink-500" />
          <span>🎵 Play our little vibe</span>
        </>
      )}
    </button>
  );
};
