/**
 * Web Audio synthesizer for cute sound effects & dreamy music box background vibe
 */

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMusicPlaying = false;
  private musicInterval: any = null;
  private customAudio: HTMLAudioElement | null = null;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Cute bubble pop sound
  playPop() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // Audio not permitted or supported
    }
  }

  // Sparkling cute chime
  playSparkle() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        const start = this.ctx.currentTime + i * 0.06;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.1, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.3);
      });
    } catch {
      // Audio not permitted or supported
    }
  }

  // Celebration fanfare sound
  playCelebration() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
      notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        const start = this.ctx.currentTime + i * 0.08;
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.15, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Audio not permitted or supported
    }
  }

  // Toggle Dreamy Music Box / Custom Audio
  toggleMusic(customUrl?: string, onStateChange?: (playing: boolean) => void) {
    if (this.isMusicPlaying) {
      this.stopMusic();
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      this.startMusic(customUrl);
      if (onStateChange) onStateChange(true);
      return true;
    }
  }

  startMusic(customUrl?: string) {
    this.initCtx();
    this.isMusicPlaying = true;

    if (customUrl) {
      if (!this.customAudio) {
        this.customAudio = new Audio(customUrl);
        this.customAudio.loop = true;
      }
      this.customAudio.play().catch(() => {
        // Fallback to synth if custom url fails
        this.startMusicBoxSynth();
      });
    } else {
      this.startMusicBoxSynth();
    }
  }

  private startMusicBoxSynth() {
    if (!this.ctx) return;
    const melody = [
      // Sweet romantic lullaby notes (freq in Hz)
      523.25, 659.25, 783.99, 659.25, // C, E, G, E
      587.33, 698.46, 880.00, 698.46, // D, F, A, F
      493.88, 659.25, 783.99, 659.25, // B, E, G, E
      523.25, 659.25, 1046.50, 783.99 // C, E, C6, G
    ];

    let noteIndex = 0;
    const playNext = () => {
      if (!this.isMusicPlaying || !this.ctx) return;
      const freq = melody[noteIndex % melody.length];
      noteIndex++;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';

      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.85);
    };

    playNext();
    this.musicInterval = setInterval(playNext, 480);
  }

  stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  getIsPlaying() {
    return this.isMusicPlaying;
  }
}

export const soundManager = new SoundManager();
