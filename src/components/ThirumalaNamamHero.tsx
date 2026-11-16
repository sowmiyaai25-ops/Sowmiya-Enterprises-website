import React, { useState } from 'react';
import tirumalaScenicHills from '../assets/images/tirumala_hills_scenic_sunrise_1793880366827.jpg';
import { playTempleBell, playUiClick } from '../utils/audioEffects';

interface ThirumalaNamamHeroProps {
  onExploreProducts: () => void;
  onRequestQuote: () => void;
}

export const ThirumalaNamamHero: React.FC<ThirumalaNamamHeroProps> = ({
  onExploreProducts,
  onRequestQuote,
}) => {
  const [blessed, setBlessed] = useState(false);
  const [showBlessingModal, setShowBlessingModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const triggerBlessing = () => {
    playTempleBell();
    setBlessed(true);
    setShowBlessingModal(true);
  };

  return (
    <section className="relative overflow-hidden bg-[#120A05] text-[#FDFBF7] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/30 min-h-[92vh] flex items-center">
      {/* 1. SCENIC TIRUMALA HILLS BACKGROUND AT SUNRISE */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={tirumalaScenicHills}
          alt="Scenic Morning View of Tirupati and Tirumala Hills at Sunrise"
          className="w-full h-full object-cover object-center scale-105 filter brightness-[0.70] contrast-[1.1] transition-transform duration-1000"
        />
        {/* Soft morning mist and dark gradient overlays for maximum contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#120A05]/95 via-[#180B06]/80 to-[#120A05]/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-transparent to-[#180B06]/70" />
        
        {/* Radiant golden sun aura */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,_rgba(212,175,55,0.22)_0%,_transparent_70%)] blur-3xl pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Top Badge: Tirupati HQ */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-[#180B06]/95 border border-[#D4AF37]/60 px-4 py-1.5 rounded-full text-xs font-bold text-[#D4AF37] shadow-2xl backdrop-blur-md">
              <span className="text-base">🛕</span>
              <span className="tracking-wider">BLESSED TIRUPATI HQ</span>
              <span className="text-[#FDFBF7]/40">·</span>
              <span className="text-white">SERVING ACROSS ANDHRA PRADESH</span>
              <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 px-2 py-0.5 rounded text-[10px] font-extrabold">
                ESTD 2018
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-extrabold text-[#FDFBF7] leading-tight tracking-tight drop-shadow-md">
              Tirupati’s Trusted Distributor for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
                Beverages, Chocolates & Vending Solutions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#F4EBE1] font-light leading-relaxed max-w-2xl drop-shadow">
              Located in the holy city of Tirupati at the foothills of the sacred hills. 
              <strong>Sowmiya Enterprises</strong> is an authorized commercial line distributor supplying genuine wholesale stock, <strong>1 KG packets</strong>, and automatic coffee vending machines to institutions and businesses across Andhra Pradesh.
            </p>

            {/* 1 KG Packets & Machine In-Stock Strip */}
            <div className="bg-[#180B06]/90 border border-[#D4AF37]/40 p-4 rounded-2xl backdrop-blur-md text-xs space-y-1.5 max-w-xl">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold">
                <span>📦</span>
                <span>Commercial 1 KG Packets & Hardware Ready for AP Dispatch:</span>
              </div>
              <p className="text-[#E5D3B3] text-[11px] leading-relaxed">
                Stocking <strong>Signature Lemon Tea (1kg)</strong>, <strong>Nestea Premix (1kg)</strong>, <strong>Coffee Powder (1kg)</strong>, <strong>Everyday Milk Powder (1kg)</strong>, <strong>Milkybar White Chocolate</strong>, and automated coffee vending machines.
              </p>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={() => {
                  playUiClick();
                  onExploreProducts();
                }}
                className="bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-[#D4AF37] text-[#120A05] font-extrabold px-6 sm:px-7 py-3.5 rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 text-xs sm:text-sm flex items-center gap-2"
              >
                <span>📦 View 1 KG Packs & Products</span>
              </button>

              <button
                onClick={() => {
                  playUiClick();
                  onRequestQuote();
                }}
                className="bg-[#2A160E]/90 hover:bg-[#3D2314] text-[#FDFBF7] border border-[#D4AF37]/60 font-bold px-6 sm:px-7 py-3.5 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2 backdrop-blur-md"
              >
                <span>📋 B2B / B2C Quote Request</span>
              </button>

              <a
                href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%2C%201kg%20packs%2C%20or%20coffee%20vending%20machines%20in%20Andhra%20Pradesh."
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 sm:px-6 py-3.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all"
              >
                <span>💬 WhatsApp Us</span>
              </a>
            </div>

            {/* State Distribution Scope Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-[#D4AF37]/30 max-w-xl">
              <div className="bg-[#180B06]/85 p-3 rounded-xl border border-[#D4AF37]/25 backdrop-blur-sm">
                <span className="block font-serif-title font-bold text-lg sm:text-xl text-[#D4AF37]">Andhra Pradesh</span>
                <span className="text-[11px] font-semibold text-white">Full State Coverage</span>
                <span className="block text-[10px] text-emerald-400 font-bold">Fast Route Transit</span>
              </div>
              <div className="bg-[#180B06]/85 p-3 rounded-xl border border-[#D4AF37]/25 backdrop-blur-sm">
                <span className="block font-serif-title font-bold text-lg sm:text-xl text-[#D4AF37]">B2B & B2C</span>
                <span className="text-[11px] font-semibold text-white">Wholesale Models</span>
                <span className="block text-[10px] text-[#E5D3B3]/80">Institutions & Retail</span>
              </div>
              <div className="bg-[#180B06]/85 p-3 rounded-xl border border-[#D4AF37]/25 backdrop-blur-sm">
                <span className="block font-serif-title font-bold text-lg sm:text-xl text-[#D4AF37]">Tirupati HQ</span>
                <span className="text-[11px] font-semibold text-white">Direct Godown Stock</span>
                <span className="block text-[10px] text-[#E5D3B3]/80">Verified Batch Dates</span>
              </div>
            </div>

          </div>

          {/* Right Hero Content: 3D INTEGRATED THIRUMALA HILL & NAMAM EMBLEM */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#2A160E]/95 to-[#180B06]/95 border-2 border-[#D4AF37]/60 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md transition-transform duration-200 preserve-3d group cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
              }}
              onClick={triggerBlessing}
            >
              {/* Golden Lotus Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#D4AF37]/35 via-red-900/25 to-[#D4AF37]/35 rounded-full blur-2xl opacity-80 group-hover:opacity-100 transition-opacity" />

              {/* Header inside frame */}
              <div className="relative mb-4 pb-3 border-b border-[#D4AF37]/30 text-center">
                <span className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase flex items-center justify-center gap-1.5">
                  <span>🛕</span> SRI VENKATESWARA DIVINE EMBLEM
                </span>
                <h3 className="font-serif-title font-bold text-lg text-[#FDFBF7] mt-0.5">
                  Tirumala Sacred Namam
                </h3>
                <p className="text-[11px] text-[#E5D3B3]/80">
                  Touch the 3D Namam for Sacred Temple Bell Chime
                </p>
              </div>

              {/* The User-Uploaded Thirumala Namam Emblem with 3D Depth */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
                {/* Glowing Outer Lotus Border */}
                <div className="absolute inset-0 rounded-full border-4 border-[#D4AF37] shadow-[0_0_35px_rgba(212,175,55,0.7)] animate-divine-glow" />

                {/* Actual User Sent Image */}
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.09.12_PM_9c50c492.jpeg"
                  alt="Thirumala Sacred Namam Emblem - Sowmiya Enterprises"
                  className="w-full h-full object-contain rounded-full transform group-hover:scale-105 transition-transform duration-500 shadow-2xl relative z-10"
                  referrerPolicy="no-referrer"
                />

                {/* Floating Sacred Elements */}
                <div className="absolute -top-3 left-4 text-xl animate-float-bob">🌸</div>
                <div className="absolute -bottom-2 right-4 text-xl animate-float-bob" style={{ animationDelay: '1.5s' }}>🌸</div>
                <div className="absolute top-1/2 -right-4 text-xl animate-float-bob" style={{ animationDelay: '0.8s' }}>✨</div>
              </div>

              {/* Interactive Blessing Button */}
              <div className="mt-6 text-center">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerBlessing();
                  }}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-yellow-400 to-[#D4AF37] text-[#120A05] font-extrabold py-3 rounded-xl text-xs sm:text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8)] transition-all flex items-center justify-center gap-2"
                >
                  <span>🔔 Seek Tirupati Blessings (Chime Bell)</span>
                </button>
                <span className="block text-[10px] text-[#D4AF37] mt-2 font-medium">
                  {blessed ? '🙏 Divine Grace Received · Blessed in Tirupati Since 2018' : 'Interactive 3D Touch · Chimes Sacred Bell'}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Blessing Sloka Modal */}
      {showBlessingModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2A160E] to-[#180B06] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowBlessingModal(false)}
              className="absolute top-4 right-4 text-[#E5D3B3] hover:text-white text-2xl font-bold"
            >
              &times;
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-3xl text-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.6)]">
              🛕
            </div>

            <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">
              SRI VENKATESWARA SUPRABHATAM
            </span>

            <h3 className="font-serif-title font-bold text-xl sm:text-2xl text-[#FDFBF7]">
              Om Namo Venkatesaya
            </h3>

            <p className="text-sm italic text-[#D4AF37] font-serif">
              "Kausalya Supraja Rama Poorva Sandhya Pravarthathe |<br />
              Uthishta Narasardoola Karthavyam Daiva Mahnikam ||"
            </p>

            <p className="text-xs text-[#E5D3B3] leading-relaxed">
              With the supreme blessings of Lord Sri Venkateswara on the holy Tirumala hills, 
              <strong>Sowmiya Enterprises</strong> has dedicatedly supplied authentic wholesale stock and commercial coffee vending solutions across Andhra Pradesh since 2018.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setShowBlessingModal(false)}
                className="bg-[#D4AF37] hover:bg-amber-400 text-[#120A05] font-extrabold px-6 py-2.5 rounded-xl text-xs shadow-lg transition-all"
              >
                Proceed to Product Catalog
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
