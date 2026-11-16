import React, { useEffect, useRef, useState } from 'react';
import trendingMugImg from '../assets/images/trending_3d_ai_coffee_mug_1793883710589.jpg';
import peopleColdWeatherImg from '../assets/images/people_drinking_coffee_cold_weather_1793883707890.jpg';
import vendingCupsImg from '../assets/images/vending_machine_filled_coffee_cups_1793883707718.jpg';
import { playCoffeeSteamSound, playUiClick } from '../utils/audioEffects';

interface CoffeeVideosSectionProps {
  onSelectBeverage: (beverageName: string) => void;
}

interface VideoChannel {
  id: string;
  title: string;
  category: '3d_ai' | 'cold_weather' | 'vending_cups' | 'crema_pour';
  tag: string;
  description: string;
  beverageName: string;
  imagePoster: string;
  ambientVibe: string;
}

export const CoffeeVideosSection: React.FC<CoffeeVideosSectionProps> = ({
  onSelectBeverage,
}) => {
  const [activeChannelId, setActiveChannelId] = useState<string>('chan-1');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [soundOn, setSoundOn] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isTheaterOpen, setIsTheaterOpen] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(12);
  const duration = 48; // seconds
  const [sensory5DActive, setSensory5DActive] = useState<boolean>(true);

  // Time scrubber effect
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
    }, 1000 / speed);
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const channels: VideoChannel[] = [
    {
      id: 'chan-1',
      title: 'Trending 3D AI Commercial: Floating Coffee Mug & Zero-Gravity Swirl',
      category: '3d_ai',
      tag: '🔥 Trending 3D AI Video',
      description: 'A cinematic 3D advertising showcase featuring a floating ceramic mug enveloped in a swirling vortex of rich espresso, orbiting roasted coffee beans, and white chocolate chips.',
      beverageName: 'Commercial 3D Roasted Blend',
      imagePoster: trendingMugImg,
      ambientVibe: 'Cinematic 3D Advert Experience',
    },
    {
      id: 'chan-2',
      title: 'People Savoring Hot Steaming Coffee in Cold Mountain Weather',
      category: 'cold_weather',
      tag: '❄️ Cold Weather Refreshment',
      description: 'Outdoor morning moments holding warm ceramic coffee cups amidst the cool chilly mountain mist of the hills, showing the sheer comfort of fresh hot coffee in cold weather.',
      beverageName: 'Fresh Steaming Hot Coffee',
      imagePoster: peopleColdWeatherImg,
      ambientVibe: 'Cool Hills & Warm Sips',
    },
    {
      id: 'chan-3',
      title: 'Commercial Vending Dispenser & Cups Filled with Rich Coffee',
      category: 'vending_cups',
      tag: '☕ Vending Machine in Action',
      description: 'Modern 4-lane automatic coffee vending machine actively dispensing into glass and ceramic cups filled with hot coffee topped with thick golden crema froth.',
      beverageName: 'Automated 4-Lane Dispenser Coffee',
      imagePoster: vendingCupsImg,
      ambientVibe: 'Freshly Filled Crema Cups',
    },
    {
      id: 'chan-4',
      title: 'Artisanal Crema Extraction & Steaming Aroma Flow',
      category: 'crema_pour',
      tag: '✨ Slow-Motion Crema Pour',
      description: 'Slow-motion stream of aromatic hot coffee pouring with velvety crema froth into ready cups, maintaining the consistent taste supplied across Andhra Pradesh.',
      beverageName: 'Continuous Extraction Blend',
      imagePoster: vendingCupsImg,
      ambientVibe: 'Golden Crema Flow',
    },
  ];

  const currentChannel = channels.find((c) => c.id === activeChannelId) || channels[0];

  const handleTogglePlay = () => {
    playUiClick();
    setIsPlaying(!isPlaying);
  };

  const handleToggleSound = () => {
    playUiClick();
    const next = !soundOn;
    setSoundOn(next);
    if (next) {
      playCoffeeSteamSound();
    }
  };

  return (
    <section id="videos" className="py-16 sm:py-24 bg-[#180B06] border-b border-[#D4AF37]/30 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2A160E] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
            <span>🎬 Trending 3D Commercials & Coffee Moments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF7]">
            Trending 3D Commercials, Cold Weather Coffee & Vending Cups
          </h2>
          <p className="text-[#E5D3B3] text-sm sm:text-base leading-relaxed">
            Experience our trending 3D AI promotional coffee mug commercials, people enjoying hot coffee in cold misty weather, and commercial vending machines actively filling cups with rich crema.
          </p>
        </div>

        {/* Video Player & Playlist Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Cinematic Video Player Screen */}
          <div className="lg:col-span-8 bg-[#2A160E] rounded-3xl border-2 border-[#D4AF37]/50 overflow-hidden shadow-2xl">
            {/* Live Interactive Cinematic Viewport */}
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              {/* High-Resolution Commercial Image Backdrop */}
              <img
                src={currentChannel.imagePoster}
                alt={currentChannel.title}
                className={`w-full h-full object-cover transition-transform duration-1000 ${
                  isPlaying ? 'scale-105 filter brightness-[0.94]' : 'scale-100 filter brightness-75'
                }`}
              />

              {/* Dynamic 60FPS Steam & Particle Motion Overlay */}
              <LiveVideoMotionCanvas isPlaying={isPlaying} speed={speed} channelId={currentChannel.id} />

              {/* 5D Aroma & Heat Sensory Aura when active */}
              {sensory5DActive && isPlaying && (
                <div className="absolute inset-0 pointer-events-none ring-4 ring-amber-500/30 animate-pulse bg-gradient-to-t from-amber-950/20 to-transparent" />
              )}

              {/* Floating Status Tag */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex flex-wrap items-center gap-2">
                <span className="bg-[#180B06]/90 border border-[#D4AF37]/60 text-[#D4AF37] text-[11px] font-bold px-3 py-1 rounded-full backdrop-blur-md shadow">
                  {currentChannel.tag}
                </span>
                {isPlaying && (
                  <span className="bg-emerald-950/85 border border-emerald-500/50 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    <span>60 FPS 4K COMMERCIAL STREAM</span>
                  </span>
                )}
                {sensory5DActive && (
                  <span className="bg-amber-900/80 border border-amber-400/50 text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md hidden sm:inline-block">
                    ♨️ 5D Heat & Aroma Simulation Active
                  </span>
                )}
              </div>

              {/* Scrubber overlay at bottom of video */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 z-20 flex flex-col gap-1.5">
                {/* Timeline bar */}
                <div
                  className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer hover:h-2 transition-all relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const ratio = (e.clientX - rect.left) / rect.width;
                    setCurrentTime(Math.floor(ratio * duration));
                  }}
                >
                  <div
                    className="bg-gradient-to-r from-amber-400 via-[#D4AF37] to-amber-300 h-full rounded-full transition-all duration-300 relative"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  >
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md -mr-1.5" />
                  </div>
                </div>

                {/* Timecode counter */}
                <div className="flex justify-between items-center text-[10px] text-white/80 font-mono">
                  <span>
                    00:{currentTime < 10 ? `0${currentTime}` : currentTime} / 00:{duration}
                  </span>
                  <span className="text-[10px] font-sans text-amber-300/90 font-bold">
                    {currentChannel.ambientVibe}
                  </span>
                </div>
              </div>

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div
                  onClick={handleTogglePlay}
                  className="absolute inset-0 z-20 bg-black/60 backdrop-blur-xs flex items-center justify-center cursor-pointer"
                >
                  <div className="w-18 h-18 rounded-full bg-[#D4AF37] text-[#120A05] flex items-center justify-center text-3xl font-bold shadow-[0_0_40px_rgba(212,175,55,0.9)] transform hover:scale-110 transition-transform">
                    ▶
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 sm:p-5 bg-[#180B06] border-t border-[#D4AF37]/30 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Play / Pause Toggle */}
                <button
                  onClick={handleTogglePlay}
                  className="bg-[#D4AF37] hover:bg-amber-400 text-[#120A05] px-4 py-2 rounded-xl font-bold transition-all shadow flex items-center gap-1.5"
                >
                  <span>{isPlaying ? '⏸ Pause Video' : '▶ Play Video'}</span>
                </button>

                {/* Sound Ambient Toggle */}
                <button
                  onClick={handleToggleSound}
                  className={`px-3.5 py-2 rounded-xl font-bold border transition-all ${
                    soundOn
                      ? 'bg-emerald-800 border-emerald-500 text-white'
                      : 'bg-[#2A160E] border-[#D4AF37]/30 text-[#E5D3B3] hover:text-[#D4AF37]'
                  }`}
                >
                  {soundOn ? '🔊 Steam FX On' : '🔇 Audio Ambience'}
                </button>

                {/* 5D Sensory Mode Toggle */}
                <button
                  onClick={() => {
                    playUiClick();
                    setSensory5DActive(!sensory5DActive);
                  }}
                  className={`px-3 py-2 rounded-xl font-bold border text-[11px] transition-all ${
                    sensory5DActive
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                      : 'bg-[#2A160E] border-[#D4AF37]/20 text-[#E5D3B3]/70'
                  }`}
                >
                  {sensory5DActive ? '♨️ 5D Sensory: ON' : '♨️ 5D Sensory: OFF'}
                </button>

                {/* Speed Multiplier */}
                <div className="hidden sm:flex items-center gap-1 bg-[#2A160E] px-2 py-1 rounded-xl border border-[#D4AF37]/20">
                  <span className="text-[10px] text-[#A68318] font-bold">Speed:</span>
                  {[1, 1.5, 2].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        playUiClick();
                        setSpeed(s);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        speed === s
                          ? 'bg-[#5C3420] text-[#D4AF37]'
                          : 'text-[#E5D3B3] hover:text-[#D4AF37]'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Theater Mode Button */}
              <button
                onClick={() => {
                  playUiClick();
                  setIsTheaterOpen(true);
                }}
                className="bg-[#2A160E] hover:bg-[#3D2314] text-[#D4AF37] border border-[#D4AF37]/40 px-3.5 py-2 rounded-xl font-bold transition-all text-xs"
              >
                ⛶ Fullscreen Theater
              </button>
            </div>

            {/* Video Details & Commercial Information */}
            <div className="p-6 bg-[#2A160E] space-y-2 border-t border-[#D4AF37]/20">
              <h3 className="font-serif-title font-bold text-lg sm:text-xl text-[#FDFBF7]">
                {currentChannel.title}
              </h3>
              <p className="text-xs text-[#E5D3B3] leading-relaxed">
                {currentChannel.description}
              </p>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#D4AF37]/15">
                <span className="text-xs text-[#D4AF37] font-semibold">
                  ☕ Beverage Type: <span className="text-white font-bold">{currentChannel.beverageName}</span>
                </span>
                <button
                  onClick={() => onSelectBeverage(currentChannel.beverageName)}
                  className="bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] font-extrabold px-4 py-2 rounded-xl text-xs transition-all shadow"
                >
                  Enquire Vending Machine & 1 KG Packs
                </button>
              </div>
            </div>
          </div>

          {/* Playlist Channels Column */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider block mb-1">
              Select Video Channel (4 Episodes):
            </span>

            {channels.map((chan) => (
              <div
                key={chan.id}
                onClick={() => {
                  playUiClick();
                  setActiveChannelId(chan.id);
                  setIsPlaying(true);
                  if (soundOn) playCoffeeSteamSound();
                }}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  activeChannelId === chan.id
                    ? 'bg-[#2A160E] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
                    : 'bg-[#180B06] border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
                }`}
              >
                {/* Thumbnail */}
                <div className="w-16 h-14 rounded-xl overflow-hidden bg-black shrink-0 border border-[#D4AF37]/30 relative">
                  <img
                    src={chan.imagePoster}
                    alt={chan.title}
                    className="w-full h-full object-cover"
                  />
                  {activeChannelId === chan.id && (
                    <div className="absolute inset-0 bg-[#D4AF37]/30 flex items-center justify-center text-xs">
                      ▶
                    </div>
                  )}
                </div>

                {/* Text Info */}
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-[#D4AF37] uppercase">
                    {chan.tag}
                  </span>
                  <h4 className="font-serif-title font-bold text-xs text-white leading-snug line-clamp-2">
                    {chan.title}
                  </h4>
                  <p className="text-[10px] text-[#E5D3B3]/70 line-clamp-1">
                    {chan.ambientVibe}
                  </p>
                </div>
              </div>
            ))}

            {/* Note on Authorized Distributor Wording */}
            <div className="bg-[#120A05] p-4 rounded-2xl border border-[#D4AF37]/25 text-[11px] text-[#E5D3B3] space-y-1.5">
              <span className="font-bold text-[#D4AF37] block">Authorized Line Stockist Notice:</span>
              <p>
                As an authorized commercial line distributor in Tirupati, Sowmiya Enterprises supplies genuine factory-sealed stock of 1 KG premixes, chocolates, and automatic coffee vending machines across all Andhra Pradesh districts.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Fullscreen Theater Modal */}
      {isTheaterOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#2A160E] border-2 border-[#D4AF37] rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
            <button
              onClick={() => setIsTheaterOpen(false)}
              className="absolute top-4 right-4 z-20 text-white hover:text-[#D4AF37] text-3xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center"
            >
              &times;
            </button>

            <div className="relative aspect-video bg-black">
              <img
                src={currentChannel.imagePoster}
                alt={currentChannel.title}
                className="w-full h-full object-cover"
              />
              <LiveVideoMotionCanvas isPlaying={true} speed={1} channelId={currentChannel.id} />
            </div>

            <div className="p-6 bg-[#180B06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  {currentChannel.tag}
                </span>
                <span className="text-xs text-[#E5D3B3]">
                  Andhra Pradesh Commercial Distribution
                </span>
              </div>

              <h3 className="font-serif-title font-bold text-xl text-[#FDFBF7]">
                {currentChannel.title}
              </h3>

              <p className="text-xs text-[#E5D3B3] leading-relaxed">
                {currentChannel.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// -------------------------------------------------------------
// Live Interactive Motion Canvas (Simulates 60FPS Video Steam/Glow)
// -------------------------------------------------------------
interface MotionCanvasProps {
  isPlaying: boolean;
  speed: number;
  channelId: string;
}

const LiveVideoMotionCanvas: React.FC<MotionCanvasProps> = ({ isPlaying, speed, channelId }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const render = () => {
      if (isPlaying) {
        t += 0.04 * speed;
      }

      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 450);

      ctx.clearRect(0, 0, w, h);

      if (channelId === 'chan-1') {
        // Trending 3D AI Commercial: Glowing orbital light streak & swirling golden sparks
        const cx = w * 0.5;
        const cy = h * 0.5;

        // Orbiting glowing ring
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.ellipse(cx, cy, 180 + Math.sin(t * 2) * 10, 110 + Math.cos(t * 2) * 10, t * 0.5, 0, Math.PI * 2);
        ctx.stroke();

        // 3D Orbiting Golden Sparks & Coffee Particles
        for (let i = 0; i < 16; i++) {
          const angle = t * 1.5 + (i * Math.PI) / 8;
          const rX = 180 + Math.sin(t + i) * 15;
          const rY = 110 + Math.cos(t + i) * 15;
          const px = cx + Math.cos(angle) * rX;
          const py = cy + Math.sin(angle) * rY;

          ctx.fillStyle = i % 2 === 0 ? 'rgba(255, 220, 120, 0.85)' : 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(px, py, 3 + (i % 3) * 1.5, 0, Math.PI * 2);
          ctx.fill();
        }

        // Billowing central mug steam
        for (let i = 0; i < 5; i++) {
          const sy = cy - 60 - ((t * 40 + i * 25) % 120);
          const sx = cx + Math.sin(t * 2 + i) * 18;
          const alpha = Math.max(0, 1 - (cy - sy) / 120) * 0.35;
          ctx.fillStyle = `rgba(255, 245, 230, ${alpha})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 14 + (cy - sy) * 0.15, 0, Math.PI * 2);
          ctx.fill();
        }

      } else if (channelId === 'chan-2') {
        // Cold Weather: Rising dense warm steam from mugs + gentle mountain breeze mist
        const p1X = w * 0.42;
        const p2X = w * 0.60;
        const cupY = h * 0.68;

        [p1X, p2X].forEach((cx, idx) => {
          for (let i = 0; i < 6; i++) {
            const sy = cupY - ((t * 35 + i * 28 + idx * 15) % 110);
            const sx = cx + Math.sin(t * 1.8 + i + idx) * 14 + (cupY - sy) * 0.12;
            const alpha = Math.max(0, 1 - (cupY - sy) / 110) * 0.45;
            ctx.fillStyle = `rgba(255, 250, 240, ${alpha})`;
            ctx.beginPath();
            ctx.arc(sx, sy, 10 + (cupY - sy) * 0.16, 0, Math.PI * 2);
            ctx.fill();
          }
        });

      } else if (channelId === 'chan-3' || channelId === 'chan-4') {
        // Vending Machine Active Dispensing Streams into Cups
        const stream1X = w * 0.46;
        const stream2X = w * 0.63;
        const streamTopY = h * 0.38;
        const streamBottomY = h * 0.64;

        [stream1X, stream2X].forEach((sx, idx) => {
          // Flowing liquid stream
          const streamWidth = 5 + Math.sin(t * 5 + idx) * 1.5;
          ctx.fillStyle = 'rgba(180, 100, 45, 0.85)';
          ctx.fillRect(sx - streamWidth * 0.5, streamTopY, streamWidth, streamBottomY - streamTopY);

          // Golden crema froth ripple in cup
          ctx.strokeStyle = 'rgba(255, 220, 150, 0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(sx, streamBottomY, (t * 20 + idx * 10) % 25, 6, 0, 0, Math.PI * 2);
          ctx.stroke();

          // Rising hot steam
          const sy = streamBottomY - ((t * 30 + idx * 20) % 80);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.arc(sx + Math.sin(t * 2 + idx) * 8, sy, 8 + (streamBottomY - sy) * 0.1, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying, speed, channelId]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />;
};
