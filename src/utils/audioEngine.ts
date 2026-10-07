// Web Audio API ambient synthesizer & Sound FX engine

class AudioEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private timerId: number | null = null;
  private volume: number = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.bgmGain = this.ctx.createGain();
      this.bgmGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.bgmGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setTargetAtTime(this.volume * 0.4, this.ctx.currentTime, 0.05);
    }
  }

  public playSlideChime() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Pleasant light chime (E6 to G6)
      const now = this.ctx.currentTime;
      osc.frequency.setValueAtTime(1318.51, now); // E6
      osc.frequency.exponentialRampToValueAtTime(1567.98, now + 0.08); // G6

      gain.gain.setValueAtTime(0.12 * this.volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // Audio not permitted yet or failed silently
    }
  }

  public playCelebrationFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.12);
        gain.gain.linearRampToValueAtTime(0.15 * this.volume, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 0.85);
      });
    } catch {
      // Audio failed
    }
  }

  public startSynthBgm(preset: 'peaceful' | 'curious' | 'space' | 'energetic' = 'peaceful') {
    if (this.isBgmPlaying) return;
    this.initContext();
    if (!this.ctx || !this.bgmGain) return;

    this.isBgmPlaying = true;
    let step = 0;

    // Peaceful pentatonic science chords & arpeggios
    const peacefulPitches = [261.63, 329.63, 392.0, 523.25, 587.33, 659.25, 783.99]; // C4, E4, G4, C5, D5, E5, G5
    const spacePitches = [220.0, 261.63, 329.63, 440.0, 493.88, 659.25]; // Am scale
    const curiousPitches = [293.66, 369.99, 440.0, 587.33, 739.99]; // D major
    const energeticPitches = [261.63, 329.63, 392.0, 440.0, 523.25, 659.25];

    let pitchSet = peacefulPitches;
    if (preset === 'space') pitchSet = spacePitches;
    if (preset === 'curious') pitchSet = curiousPitches;
    if (preset === 'energetic') pitchSet = energeticPitches;

    const playTone = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const toneGain = this.ctx.createGain();

      const freqIndex = (step * 3 + Math.floor(Math.random() * 3)) % pitchSet.length;
      const freq = pitchSet[freqIndex];

      osc.type = step % 4 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      toneGain.gain.setValueAtTime(0, now);
      toneGain.gain.linearRampToValueAtTime(0.08, now + 0.1);
      toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(toneGain);
      toneGain.connect(this.bgmGain);

      osc.start(now);
      osc.stop(now + 1.85);

      step++;
    };

    // Trigger every ~450ms for soothing ambient rhythm
    this.timerId = window.setInterval(playTone, 450);
  }

  public stopSynthBgm() {
    this.isBgmPlaying = false;
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  public isPlaying(): boolean {
    return this.isBgmPlaying;
  }
}

export const audioEngine = new AudioEngine();

// YouTube helper for background music
export function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId) return '';
  const trimmed = urlOrId.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }
  const match = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  return match ? match[1] : '';
}
