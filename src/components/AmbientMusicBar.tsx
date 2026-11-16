import React, { useEffect, useState, useRef } from 'react';
import {
  playProceduralMusic,
  stopProceduralMusic,
  setMusicVolume,
  getCurrentMusicTrack,
  getMusicAnalyser,
  playUiClick,
} from '../utils/audioEffects';

type TrackId = 'commercial_beat' | 'cafe_groove' | 'lofi_chill' | 'corporate_anthem';

interface TrackInfo {
  id: TrackId;
  name: string;
  category: string;
  icon: string;
  vibe: string;
}

const TRACKS: TrackInfo[] = [
  {
    id: 'commercial_beat',
    name: 'Trending Commercial Beat',
    category: 'Upbeat Commercial (112 BPM)',
    icon: '🔥',
    vibe: 'Modern punchy kick, crisp snare, groovy synth bassline & energetic commercial chords (No bells)',
  },
  {
    id: 'cafe_groove',
    name: 'Café Coffeehouse Acoustic Groove',
    category: 'Acoustic Coffee Beat (96 BPM)',
    icon: '☕',
    vibe: 'Warm acoustic rhythm, syncopated jazz chords, walking bassline & coffee aroma bounce',
  },
  {
    id: 'lofi_chill',
    name: 'Modern Lo-Fi Coffee Chill-Hop',
    category: 'Lo-Fi Chill-Hop (82 BPM)',
    icon: '🎧',
    vibe: 'Boom-bap lo-fi drums, deep 808 sub-bass, lush Rhodes piano & smooth relaxing vibe',
  },
  {
    id: 'corporate_anthem',
    name: 'Corporate Executive Anthem',
    category: 'Driving Corporate (120 BPM)',
    icon: '🚀',
    vibe: 'Four-on-the-floor kick, driving bass pulse & motivational enterprise synth harmony',
  },
];

export const AmbientMusicBar: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTrack, setActiveTrack] = useState<TrackId>('commercial_beat');
  const [volume, setVolume] = useState<number>(45);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [eqLevels, setEqLevels] = useState<number[]>([15, 25, 45, 30, 20]);
  const animationFrameRef = useRef<number | null>(null);

  // Equalizer visualizer loop
  useEffect(() => {
    let tick = 0;
    const updateEq = () => {
      if (isPlaying) {
        tick += 0.15;
        const analyser = getMusicAnalyser();
        if (analyser) {
          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(dataArray);
          const bar1 = Math.min(100, Math.max(12, dataArray[1] / 2 + Math.sin(tick * 2) * 10));
          const bar2 = Math.min(100, Math.max(16, dataArray[3] / 2 + Math.cos(tick * 1.5) * 15));
          const bar3 = Math.min(100, Math.max(20, dataArray[5] / 1.8 + Math.sin(tick * 3) * 20));
          const bar4 = Math.min(100, Math.max(14, dataArray[8] / 2 + Math.cos(tick * 2.2) * 12));
          const bar5 = Math.min(100, Math.max(10, dataArray[12] / 2.5 + Math.sin(tick) * 8));
          setEqLevels([bar1, bar2, bar3, bar4, bar5]);
        } else {
          // Synthetic pulsing when audio context initializes
          setEqLevels([
            25 + Math.sin(tick * 2) * 20,
            45 + Math.cos(tick * 1.8) * 30,
            65 + Math.sin(tick * 2.5) * 30,
            40 + Math.cos(tick * 2.1) * 25,
            20 + Math.sin(tick * 1.3) * 15,
          ]);
        }
      } else {
        setEqLevels([8, 8, 8, 8, 8]);
      }
      animationFrameRef.current = requestAnimationFrame(updateEq);
    };

    animationFrameRef.current = requestAnimationFrame(updateEq);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying]);

  const handleTogglePlay = () => {
    playUiClick();
    if (isPlaying) {
      stopProceduralMusic();
      setIsPlaying(false);
    } else {
      playProceduralMusic(activeTrack);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (trackId: TrackId) => {
    playUiClick();
    setActiveTrack(trackId);
    playProceduralMusic(trackId);
    setIsPlaying(true);
  };

  const handleVolumeChange = (newVal: number) => {
    setVolume(newVal);
    setMusicVolume(newVal / 100);
  };

  const currentTrackInfo = TRACKS.find((t) => t.id === activeTrack) || TRACKS[0];

  return (
    <>
      {/* Floating Ambient Music Controller Bar (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full transition-all duration-300">
        
        {/* Main Capsule Controller */}
        <div className="bg-[#180B06]/95 backdrop-blur-md border-2 border-[#D4AF37] rounded-3xl shadow-[0_10px_35px_rgba(0,0,0,0.8)] p-3.5 sm:p-4 text-[#FDFBF7]">
          
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3">
            
            {/* Play/Pause Button + EQ Visualizer */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleTogglePlay}
                className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-amber-600 hover:from-amber-400 hover:to-[#D4AF37] text-[#120A05] flex items-center justify-center font-extrabold text-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform active:scale-95 shrink-0"
                title={isPlaying ? 'Pause Background Music' : 'Play Background Music'}
              >
                {isPlaying ? '⏸' : '▶'}
              </button>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#FDFBF7] truncate max-w-[150px] sm:max-w-[170px]">
                    {currentTrackInfo.name}
                  </span>
                  {isPlaying && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-[#D4AF37] font-semibold flex items-center gap-1">
                  <span>{currentTrackInfo.icon}</span>
                  <span className="truncate">{currentTrackInfo.category}</span>
                </span>
              </div>
            </div>

            {/* EQ Frequency Animation Bars + Expand Toggle */}
            <div className="flex items-center gap-2.5">
              {/* Dancing Equalizer Bars */}
              <div className="flex items-end gap-1 h-6 px-1.5 py-0.5 bg-[#120A05] rounded-lg border border-[#D4AF37]/30">
                {eqLevels.map((lvl, idx) => (
                  <span
                    key={idx}
                    style={{ height: `${lvl}%` }}
                    className={`w-1 rounded-full transition-all duration-75 ${
                      isPlaying
                        ? idx % 2 === 0
                          ? 'bg-[#D4AF37]'
                          : 'bg-amber-400'
                        : 'bg-amber-900/40'
                    }`}
                  />
                ))}
              </div>

              {/* Expand / Minimize Drawer */}
              <button
                onClick={() => {
                  playUiClick();
                  setIsExpanded(!isExpanded);
                }}
                className="w-8 h-8 rounded-xl bg-[#2A160E] hover:bg-[#3D2314] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center text-xs font-bold transition-all"
                title={isExpanded ? 'Collapse Music Menu' : 'Open Music Channels & Settings'}
              >
                {isExpanded ? '▼' : '▲'}
              </button>
            </div>

          </div>

          {/* Expanded Music Channels, Volume & Copyright-Free Certificate */}
          {isExpanded && (
            <div className="mt-3.5 pt-3.5 border-t border-[#D4AF37]/30 space-y-3.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
              
              {/* Copyright Safety Seal */}
              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-2.5 flex items-center gap-2 text-[10px] text-emerald-200">
                <span className="text-base shrink-0">🛡️</span>
                <div className="leading-tight">
                  <span className="font-extrabold text-emerald-300 block">100% Royalty-Free & Copyright-Safe</span>
                  <span>Synthesized via Web Audio API. Zero copyright claims, zero royalties.</span>
                </div>
              </div>

              {/* Track Selection List */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] block">
                  Select Music Channel (4 Options):
                </label>
                <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto pr-1">
                  {TRACKS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => handleSelectTrack(t.id)}
                      className={`p-2 rounded-xl text-left text-xs font-semibold border transition-all flex items-start gap-2.5 ${
                        activeTrack === t.id
                          ? 'bg-[#2A160E] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                          : 'bg-[#120A05] border-[#D4AF37]/20 text-[#E5D3B3] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <span className="text-base shrink-0">{t.icon}</span>
                      <div className="min-w-0">
                        <span className="font-bold text-white block text-xs truncate">{t.name}</span>
                        <span className="text-[10px] text-[#E5D3B3]/70 line-clamp-1">{t.vibe}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Volume Slider */}
              <div className="space-y-1 bg-[#120A05] p-2.5 rounded-xl border border-[#D4AF37]/25">
                <div className="flex justify-between items-center text-[10px] text-[#E5D3B3]">
                  <span className="font-bold flex items-center gap-1 text-[#D4AF37]">
                    <span>🔊 Volume</span>
                  </span>
                  <span className="font-mono text-white">{volume}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer h-1.5 bg-[#2A160E] rounded-lg"
                />
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between text-[11px] text-[#A68318]">
                <span>Tirupati HQ Ambiance</span>
                <button
                  onClick={() => handleTogglePlay()}
                  className="text-xs font-bold text-[#D4AF37] hover:underline"
                >
                  {isPlaying ? 'Mute Music' : 'Start Music'}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </>
  );
};
