/**
 * Procedural Web Audio API sound synthesizer
 * 100% Royalty-Free & Copyright-Safe: Generates all music and soundwaves directly
 * via Web Audio API oscillators, filters, envelopes, and procedural arpeggios.
 * No external copyrighted MP3s or streaming licenses required.
 */

let audioCtx: AudioContext | null = null;
let musicMasterGain: GainNode | null = null;
let musicAnalyser: AnalyserNode | null = null;
let activeMusicInterval: number | null = null;
let activeDroneNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
let currentMusicTrack: string | null = null;
let currentVolume: number = 0.4;

export function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function getMusicAnalyser(): AnalyserNode | null {
  return musicAnalyser;
}

function initMusicPipeline(ctx: AudioContext): { master: GainNode; analyser: AnalyserNode } {
  if (!musicMasterGain || !musicAnalyser) {
    musicMasterGain = ctx.createGain();
    musicMasterGain.gain.setValueAtTime(currentVolume, ctx.currentTime);

    musicAnalyser = ctx.createAnalyser();
    musicAnalyser.fftSize = 64;
    musicAnalyser.smoothingTimeConstant = 0.8;

    musicMasterGain.connect(musicAnalyser);
    musicAnalyser.connect(ctx.destination);
  }
  return { master: musicMasterGain, analyser: musicAnalyser };
}

/**
 * Stop any active procedural background music
 */
export function stopProceduralMusic() {
  if (activeMusicInterval) {
    window.clearInterval(activeMusicInterval);
    activeMusicInterval = null;
  }

  // Fade out drone nodes
  if (audioCtx) {
    const now = audioCtx.currentTime;
    activeDroneNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // Ignore if already stopped
          }
        }, 450);
      } catch {
        // Safe cleanup
      }
    });
  }
  activeDroneNodes = [];
  currentMusicTrack = null;
}

/**
 * Set master music volume (0 to 1)
 */
export function setMusicVolume(vol: number) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (musicMasterGain && audioCtx) {
    musicMasterGain.gain.setValueAtTime(currentVolume, audioCtx.currentTime);
  }
}

/**
 * Helper drum: Punchy kick drum
 */
function playKick(ctx: AudioContext, targetNode: AudioNode, time: number, vol = 0.22) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(140, time);
  osc.frequency.exponentialRampToValueAtTime(38, time + 0.08);

  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

  osc.connect(gain);
  gain.connect(targetNode);

  osc.start(time);
  osc.stop(time + 0.19);
}

/**
 * Helper drum: Crisp snappy snare / clap
 */
function playSnare(ctx: AudioContext, targetNode: AudioNode, time: number, vol = 0.14) {
  const bufferSize = ctx.sampleRate * 0.12;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(1100, time);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(targetNode);

  // Add subtle body tone
  const toneOsc = ctx.createOscillator();
  const toneGain = ctx.createGain();
  toneOsc.type = 'triangle';
  toneOsc.frequency.setValueAtTime(180, time);
  toneOsc.frequency.exponentialRampToValueAtTime(80, time + 0.08);
  toneGain.gain.setValueAtTime(vol * 0.6, time);
  toneGain.gain.exponentialRampToValueAtTime(0.001, time + 0.09);
  toneOsc.connect(toneGain);
  toneGain.connect(targetNode);

  noise.start(time);
  noise.stop(time + 0.13);
  toneOsc.start(time);
  toneOsc.stop(time + 0.1);
}

/**
 * Helper drum: Crisp closed hi-hat
 */
function playHiHat(ctx: AudioContext, targetNode: AudioNode, time: number, vol = 0.06) {
  const bufferSize = ctx.sampleRate * 0.04;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.setValueAtTime(7500, time);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(targetNode);

  noise.start(time);
  noise.stop(time + 0.05);
}

/**
 * Helper bass: Deep punchy synthesizer bass
 */
function playSynthBass(ctx: AudioContext, targetNode: AudioNode, freq: number, time: number, duration: number, vol = 0.16) {
  const osc = ctx.createOscillator();
  const sub = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(freq, time);

  sub.type = 'sine';
  sub.frequency.setValueAtTime(freq * 0.5, time);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime( freq * 4, time);
  filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + duration);

  gain.gain.setValueAtTime(vol, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(filter);
  sub.connect(filter);
  filter.connect(gain);
  gain.connect(targetNode);

  osc.start(time);
  sub.start(time);
  osc.stop(time + duration + 0.05);
  sub.stop(time + duration + 0.05);
}

/**
 * Helper chords: Polyphonic warm keyboard / synth chords
 */
function playChord(ctx: AudioContext, targetNode: AudioNode, freqs: number[], time: number, duration: number, vol = 0.08) {
  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, time);
    filter.frequency.exponentialRampToValueAtTime(700, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol / freqs.length, time + 0.03 + idx * 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(targetNode);

    osc.start(time);
    osc.stop(time + duration + 0.05);
  });
}

/**
 * Track 1: Modern Trending Commercial Beat
 * Upbeat 112 BPM rhythm with punchy kick, crisp snare, groovy bassline, and bright energetic chords.
 * Zero bells!
 */
function startCommercialBeat(ctx: AudioContext, output: AudioNode) {
  // Chords: F major -> C major -> D minor -> Bb major
  const chordProg = [
    [174.61, 220.0, 261.63, 349.23], // F major
    [130.81, 164.81, 196.0, 261.63], // C major
    [146.83, 174.61, 220.0, 293.66], // D minor
    [116.54, 146.83, 174.61, 233.08], // Bb major
  ];
  const bassNotes = [87.31, 65.41, 73.42, 58.27];

  let step = 0;
  // 16th note subdivision at ~112 BPM (134ms per 16th note)
  activeMusicInterval = window.setInterval(() => {
    const t = ctx.currentTime;
    const beat16 = step % 16;
    const chordIndex = Math.floor(step / 16) % chordProg.length;
    const currentChord = chordProg[chordIndex];
    const bassNote = bassNotes[chordIndex];

    // Drums: Four-on-the-floor / commercial groove
    if (beat16 === 0 || beat16 === 8 || beat16 === 10) {
      playKick(ctx, output, t, 0.24);
    }
    if (beat16 === 4 || beat16 === 12) {
      playSnare(ctx, output, t, 0.15);
    }
    // Hi-hats on every 8th note, plus 16th groove
    if (beat16 % 2 === 0 || beat16 === 7 || beat16 === 15) {
      playHiHat(ctx, output, t, beat16 % 4 === 2 ? 0.08 : 0.04);
    }

    // Bassline rhythm
    if (beat16 === 0 || beat16 === 3 || beat16 === 6 || beat16 === 10 || beat16 === 14) {
      const octaveMod = beat16 === 14 ? 1.5 : 1.0;
      playSynthBass(ctx, output, bassNote * octaveMod, t, 0.22, 0.15);
    }

    // Melodic Synth Chords: Stabs on off-beats
    if (beat16 === 2 || beat16 === 6 || beat16 === 10 || beat16 === 13) {
      playChord(ctx, output, currentChord, t, 0.26, 0.12);
    }

    step++;
  }, 134);
}

/**
 * Track 2: Café Coffeehouse Acoustic Groove
 * Warm acoustic 96 BPM rhythm with syncopated bounce, warm acoustic bass, and rhythmic chords.
 * Zero bells!
 */
function startCafeGroove(ctx: AudioContext, output: AudioNode) {
  // Coffeehouse Jazz Chords: Dm9 -> G13 -> Cmaj9 -> A7b13
  const jazzChords = [
    [146.83, 220.0, 261.63, 329.63], // Dm9
    [196.0, 246.94, 293.66, 370.0],  // G13
    [130.81, 196.0, 246.94, 329.63], // Cmaj9
    [220.0, 277.18, 329.63, 415.3],  // A7b13
  ];
  const bassRoots = [73.42, 98.0, 65.41, 110.0];

  let step = 0;
  // 16th note at ~96 BPM (156ms per 16th note)
  activeMusicInterval = window.setInterval(() => {
    const t = ctx.currentTime;
    const beat16 = step % 16;
    const chordIndex = Math.floor(step / 16) % jazzChords.length;
    const currentChord = jazzChords[chordIndex];
    const bass = bassRoots[chordIndex];

    // Soft acoustic percussion: gentle kick, rim click/snare, and shaker hat
    if (beat16 === 0 || beat16 === 10) {
      playKick(ctx, output, t, 0.16);
    }
    if (beat16 === 4 || beat16 === 12) {
      playSnare(ctx, output, t, 0.09);
    }
    if (beat16 % 2 === 0) {
      playHiHat(ctx, output, t, 0.04);
    }

    // Walking acoustic bass
    if (beat16 === 0 || beat16 === 4 || beat16 === 8 || beat16 === 12) {
      const stepOffset = (beat16 / 4);
      const bassFreq = bass * (stepOffset === 3 ? 1.25 : 1.0);
      playSynthBass(ctx, output, bassFreq, t, 0.35, 0.12);
    }

    // Rhythmic acoustic guitar chord comping
    if (beat16 === 2 || beat16 === 6 || beat16 === 11 || beat16 === 14) {
      playChord(ctx, output, currentChord, t, 0.3, 0.10);
    }

    step++;
  }, 156);
}

/**
 * Track 3: Modern Lo-Fi Coffee Chill-Hop
 * Relaxed, stylish 82 BPM lo-fi beat with deep sub-bass, dusty drums, and velvety electric piano.
 * Zero bells!
 */
function startLoFiChill(ctx: AudioContext, output: AudioNode) {
  // Chords: Fmaj7 -> Em7 -> Dm7 -> Cmaj7
  const lofiChords = [
    [174.61, 220.0, 261.63, 329.63], // Fmaj7
    [164.81, 196.0, 246.94, 293.66], // Em7
    [146.83, 174.61, 220.0, 261.63], // Dm7
    [130.81, 164.81, 196.0, 246.94], // Cmaj7
  ];
  const lofiBass = [87.31, 82.41, 73.42, 65.41];

  let step = 0;
  // 16th note at ~82 BPM (183ms per step)
  activeMusicInterval = window.setInterval(() => {
    const t = ctx.currentTime;
    const beat16 = step % 16;
    const chordIndex = Math.floor(step / 16) % lofiChords.length;
    const chord = lofiChords[chordIndex];
    const bass = lofiBass[chordIndex];

    // Boom-bap lo-fi kick & dusty snare
    if (beat16 === 0 || beat16 === 6 || beat16 === 10) {
      playKick(ctx, output, t, 0.22);
    }
    if (beat16 === 4 || beat16 === 12) {
      playSnare(ctx, output, t, 0.12);
    }
    if (beat16 % 2 === 0) {
      playHiHat(ctx, output, t, beat16 === 8 ? 0.05 : 0.03);
    }

    // Heavy lo-fi sub-bass
    if (beat16 === 0 || beat16 === 6 || beat16 === 10) {
      playSynthBass(ctx, output, bass * 0.75, t, 0.45, 0.18);
    }

    // Lush Rhodes chord swell
    if (beat16 === 0 || beat16 === 8) {
      playChord(ctx, output, chord, t, 0.9, 0.11);
    }

    step++;
  }, 183);
}

/**
 * Track 4: Corporate Executive Anthem
 * Driving, motivational 120 BPM corporate rhythm with energetic synth pulse.
 * Zero bells!
 */
function startCorporateAnthem(ctx: AudioContext, output: AudioNode) {
  // Uplifting chord progression: C -> G -> Am -> F
  const chords = [
    [130.81, 164.81, 196.0, 261.63], // C
    [98.0, 146.83, 196.0, 246.94],   // G
    [110.0, 164.81, 220.0, 261.63],  // Am
    [87.31, 130.81, 174.61, 220.0],  // F
  ];
  const roots = [65.41, 49.0, 55.0, 43.65];

  let step = 0;
  // 16th note at ~120 BPM (125ms per step)
  activeMusicInterval = window.setInterval(() => {
    const t = ctx.currentTime;
    const beat16 = step % 16;
    const chordIndex = Math.floor(step / 16) % chords.length;
    const chord = chords[chordIndex];
    const root = roots[chordIndex];

    // Driving four-on-the-floor kick
    if (beat16 % 4 === 0) {
      playKick(ctx, output, t, 0.25);
    }
    // Snare on 2 and 4
    if (beat16 === 4 || beat16 === 12) {
      playSnare(ctx, output, t, 0.16);
    }
    // High-hat rhythm on up-beats
    if (beat16 % 2 === 1) {
      playHiHat(ctx, output, t, 0.06);
    }

    // Driving octave bass pulse
    if (beat16 % 2 === 0) {
      const isUp = beat16 % 4 === 2;
      playSynthBass(ctx, output, root * (isUp ? 2 : 1), t, 0.14, 0.14);
    }

    // Arpeggiated melodic synthesizer note
    const arpNote = chord[beat16 % chord.length] * 1.5;
    playChord(ctx, output, [arpNote], t, 0.18, 0.08);

    step++;
  }, 125);
}

/**
 * Play a specific royalty-free procedural ambient music track (100% Bell-Free)
 */
export function playProceduralMusic(trackId: 'commercial_beat' | 'cafe_groove' | 'lofi_chill' | 'corporate_anthem') {
  const ctx = getAudioContext();
  if (!ctx) return;

  stopProceduralMusic();
  currentMusicTrack = trackId;

  const { master } = initMusicPipeline(ctx);

  if (trackId === 'commercial_beat') {
    startCommercialBeat(ctx, master);
  } else if (trackId === 'cafe_groove') {
    startCafeGroove(ctx, master);
  } else if (trackId === 'lofi_chill') {
    startLoFiChill(ctx, master);
  } else if (trackId === 'corporate_anthem') {
    startCorporateAnthem(ctx, master);
  }
}

export function getCurrentMusicTrack(): string | null {
  return currentMusicTrack;
}

/**
 * Resonant Temple Bell Chime (Tirumala blessing)
 */
export function playTempleBell() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Harmonic frequencies for rich brass temple bell
  const freqs = [440, 880, 1320, 1760];
  const gains = [0.25, 0.15, 0.08, 0.04];

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    
    // Add subtle vibrato
    const detune = (idx % 2 === 0 ? 1 : -1) * 3;
    osc.detune.setValueAtTime(detune, now);

    gainNode.gain.setValueAtTime(gains[idx], now);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.3);
  });
}

/**
 * Gentle Coffee Steam / Pour Hiss
 */
export function playCoffeeSteamSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bufferSize = ctx.sampleRate * 1.5;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  // Pinkish noise for gentle steam
  let b0 = 0, b1 = 0, b2 = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.96900 * b2 + white * 0.1538520;
    data[i] = (b0 + b1 + b2) * 0.08;
  }

  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(700, now + 1.5);
  filter.Q.value = 3.0;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.3);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.5);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start(now);
  noiseSource.stop(now + 1.6);
}

/**
 * Subtle tactile UI click sound
 */
export function playUiClick() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(800, now);
  osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.09);
}
