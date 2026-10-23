/**
 * Web Audio API synthesizer for ethereal cosmic ambient soundscapes
 * and celestial star chimes. Self-contained, zero external mp3 dependencies.
 */

class CosmicSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private activeOscillators: OscillatorNode[] = [];
  private chordTimer: number | null = null;
  private currentChordIndex = 0;

  // Emotional, celestial chord progressions (Frequencies in Hz)
  // Cmaj9 -> Am9 -> Fmaj7 -> Gsus4/E
  private chords = [
    [130.81, 196.00, 246.94, 293.66, 329.63, 523.25], // Cmaj9
    [110.00, 164.81, 220.00, 261.63, 329.63, 440.00], // Am9
    [174.61, 220.00, 261.63, 329.63, 392.00, 659.25], // Fmaj7
    [146.83, 220.00, 293.66, 329.63, 440.00, 587.33]  // G6/D
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMusic(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx || this.isPlaying) return;
    this.isPlaying = true;
    this.playNextChord();
    // Transition chords every 6 seconds with smooth crossfade
    this.chordTimer = window.setInterval(() => {
      this.playNextChord();
    }, 6000);
  }

  public stopMusic() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.chordTimer) {
      clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    this.stopActiveOscillators(2.0);
  }

  private stopActiveOscillators(fadeTime: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    this.activeOscillators.forEach(osc => {
      try {
        osc.stop(now + fadeTime);
      } catch {
        // ignore
      }
    });
    this.activeOscillators = [];
  }

  private playNextChord() {
    if (!this.ctx || !this.ambientGain || !this.isPlaying) return;
    const chord = this.chords[this.currentChordIndex];
    this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;

    const now = this.ctx.currentTime;
    const fadeDuration = 3.0;

    // Filter to make it warm, cosmic, and spacey
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, now);
    filter.Q.setValueAtTime(1.2, now);
    filter.connect(this.ambientGain);

    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0, now);
    chordGain.gain.linearRampToValueAtTime(0.08, now + fadeDuration);
    chordGain.gain.setValueAtTime(0.08, now + 5.5);
    chordGain.gain.linearRampToValueAtTime(0, now + 7.5);
    chordGain.connect(filter);

    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Subtle detune for lush cosmic shimmer
      osc.detune.setValueAtTime((idx - 2) * 4, now);
      osc.frequency.setValueAtTime(freq, now);
      osc.connect(chordGain);
      osc.start(now);
      osc.stop(now + 8.0);
      this.activeOscillators.push(osc);
    });
  }

  /**
   * Play delicate, sparkling celestial starlight chime when opening a star
   */
  public playStarChime(pitchMultiplier = 1.0) {
    try {
      this.initContext();
      if (!this.ctx || !this.sfxGain) return;

      const now = this.ctx.currentTime;
      // Pentatonic twinkling notes
      const notes = [587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66, 1318.51].map(n => n * pitchMultiplier);

      notes.forEach((freq, i) => {
        if (!this.ctx || !this.sfxGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0, now + i * 0.05);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.05 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 1.2);

        osc.connect(gain);
        gain.connect(this.sfxGain);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 1.3);
      });
    } catch {
      // Audio not supported or blocked, fail silently
    }
  }

  public getMusicStatus(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicSoundEngine();
