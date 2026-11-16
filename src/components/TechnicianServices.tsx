import React from 'react';
import { playUiClick } from '../utils/audioEffects';

export const TechnicianServices: React.FC = () => {
  return (
    <section id="technician" className="py-16 sm:py-24 bg-[#180B06] border-b border-[#D4AF37]/30 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-b from-[#2A160E] to-[#120A05] rounded-3xl border-2 border-[#D4AF37]/40 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 bg-[#180B06] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40">
                <span>🔧 On-Site & Remote Engineering Assistance</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#FDFBF7]">
                Dedicated Technician Services & Preventive Maintenance
              </h2>

              <p className="text-sm text-[#E5D3B3] leading-relaxed">
                Coffee machines require consistent care to maintain extraction quality and prevent line scaling. 
                Sowmiya Enterprises provides dedicated technician support across Andhra Pradesh to ensure zero downtime for your workplace canteens.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="bg-[#180B06] p-3.5 rounded-xl border border-[#D4AF37]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-white block">Preventive Sanitization Check</span>
                    <span className="text-[#E5D3B3]/80">Guidance on daily canister wash & hygiene maintenance.</span>
                  </div>
                </div>

                <div className="bg-[#180B06] p-3.5 rounded-xl border border-[#D4AF37]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-white block">Premix Flow & Water Calibration</span>
                    <span className="text-[#E5D3B3]/80">Fine-tuning grammage settings for optimal taste & aroma.</span>
                  </div>
                </div>

                <div className="bg-[#180B06] p-3.5 rounded-xl border border-[#D4AF37]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-white block">Rapid Spare Parts Availability</span>
                    <span className="text-[#E5D3B3]/80">Stocked valves, heating coils, tubes, and canister gears.</span>
                  </div>
                </div>

                <div className="bg-[#180B06] p-3.5 rounded-xl border border-[#D4AF37]/20 flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold text-base mt-0.5">✓</span>
                  <div>
                    <span className="font-bold text-white block">AP Regional Technician Coverage</span>
                    <span className="text-[#E5D3B3]/80">Serving Tirupati, Chittoor, Nellore, Kadapa, and nearby districts.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Technician Call Card */}
            <div className="lg:col-span-4 bg-[#180B06] p-6 rounded-2xl border-2 border-[#D4AF37] text-center space-y-4 shadow-xl">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-2xl text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                🛠️
              </div>
              
              <h3 className="font-serif-title font-bold text-lg text-white">
                Need Machine Service or Parts?
              </h3>
              
              <p className="text-xs text-[#E5D3B3]">
                Contact V. Sundareshan directly for prompt maintenance coordination.
              </p>

              <div className="space-y-2.5 pt-2">
                <a
                  href="tel:9390488777"
                  onClick={() => playUiClick()}
                  className="block w-full bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] font-extrabold py-3 rounded-xl text-xs transition-colors shadow-lg"
                >
                  Direct Call: +91 9390488777
                </a>
                <a
                  href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20need%20technician%20support%20or%20servicing%20for%20my%20coffee%20vending%20machine."
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => playUiClick()}
                  className="block w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs transition-colors shadow"
                >
                  WhatsApp Technician Support
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
