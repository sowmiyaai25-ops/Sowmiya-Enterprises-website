import React, { useState } from 'react';
import { playUiClick } from '../utils/audioEffects';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onEnquireClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onEnquireClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-[#120A05] text-[#E5D3B3] text-xs py-2 px-4 border-b border-[#D4AF37]/30 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center gap-2.5">
            <span className="bg-[#D4AF37]/20 text-[#D4AF37] px-2.5 py-0.5 rounded text-[10px] font-extrabold border border-[#D4AF37]/40 uppercase tracking-wider flex items-center gap-1">
              <span>🛕</span> Tirupati HQ
            </span>
            <span className="hidden sm:inline text-[#5C3420]">|</span>
            <span className="text-xs font-medium text-[#FDFBF7]">
              Divine Blessings of Tirumala · Serving Exclusively Andhra Pradesh (All 26 AP Districts)
            </span>
            <span className="hidden md:inline bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded text-[9px] font-bold">
              B2B + B2C
            </span>
            <span className="hidden lg:inline text-[#5C3420]">|</span>
            <span className="hidden lg:inline bg-amber-950/70 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[9px] font-bold">
              🎵 100% Royalty-Free Ambient Music
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href="tel:9390488777"
              className="text-[#E5D3B3] hover:text-[#D4AF37] transition-colors flex items-center gap-1"
            >
              <span>📞</span> +91 9390488777
            </a>
            <span className="text-[#5C3420]">|</span>
            <a
              href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%2C%201kg%20packs%20or%20coffee%20vending%20machines%20in%20Andhra%20Pradesh."
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-700 hover:bg-emerald-600 text-white px-2.5 py-0.5 rounded-md font-bold flex items-center gap-1 transition-all shadow"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* 2. STICKY TOP BAR */}
      <header className="sticky top-0 z-40 bg-[#180B06]/95 backdrop-blur-md text-white border-b border-[#D4AF37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            
            {/* Zone 1: Brand Wordmark */}
            <a href="#" className="flex items-center gap-3 shrink-0 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#D4AF37] via-amber-500 to-amber-800 flex items-center justify-center text-[#120A05] font-bold text-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-yellow-200 group-hover:scale-105 transition-transform">
                ☕
              </div>
              <div className="flex flex-col">
                <span className="font-serif-title text-base sm:text-lg font-extrabold tracking-wider text-[#FDFBF7] group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
                  SOWMIYA ENTERPRISES
                </span>
                <span className="text-[10px] text-[#D4AF37] font-semibold tracking-wider uppercase whitespace-nowrap">
                  Authorized Line Stockist · Andhra Pradesh
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-7 text-xs font-bold uppercase tracking-wider text-[#E5D3B3]">
              <a href="#3d-canvas" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                3D Experience
              </a>
              <a href="#products" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                1 KG Packs & Products
              </a>
              <a href="#videos" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                Coffee Moments
              </a>
              <a href="#godown" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                Godown & Billing Desk
              </a>
              <a href="#vending" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                Vending Setup
              </a>
              <a href="#technician" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                Technician Support
              </a>
              <a href="#contact" className="hover:text-[#D4AF37] transition-colors whitespace-nowrap py-1">
                Contact
              </a>
            </nav>

            {/* Zone 3: Actions */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  playUiClick();
                  onOpenCart();
                }}
                className="relative bg-[#2A160E] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-2 shadow hover:bg-[#3D2314] transition-all whitespace-nowrap"
              >
                <span>📋 B2B / B2C Quote</span>
                <span className="bg-[#D4AF37] text-[#120A05] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-extrabold">
                  {cartCount}
                </span>
              </button>

              <button
                onClick={() => {
                  playUiClick();
                  onEnquireClick();
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] font-extrabold px-4 py-2 rounded-xl text-xs shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                Enquire Supply
              </button>
            </div>

            {/* Mobile Burger Trigger */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={() => {
                  playUiClick();
                  onOpenCart();
                }}
                className="relative bg-[#2A160E] text-[#D4AF37] p-2 rounded-lg border border-[#D4AF37]/30"
              >
                <span>📋</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D4AF37] text-[#120A05] w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-extrabold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#FDFBF7] hover:text-[#D4AF37] p-2 rounded-md"
              >
                {mobileMenuOpen ? '✕' : '☰'}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#180B06] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-2 text-sm font-medium">
            <a
              href="#3d-canvas"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              3D Coffee Experience
            </a>
            <a
              href="#products"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              1 KG Packs & Products
            </a>
            <a
              href="#videos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              Coffee Moments & Videos
            </a>
            <a
              href="#godown"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              Tirupati Godown & Billing Desk
            </a>
            <a
              href="#vending"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              Vending Setup & Calculator
            </a>
            <a
              href="#technician"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              Technician Support
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-[#E5D3B3] hover:text-[#D4AF37]"
            >
              Contact Us (AP Only)
            </a>

            <div className="pt-2">
              <a
                href="tel:9390488777"
                className="w-full text-center block bg-[#2A160E] text-[#D4AF37] font-bold py-2.5 rounded-xl border border-[#D4AF37]/40 text-xs"
              >
                Call: +91 9390488777
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
