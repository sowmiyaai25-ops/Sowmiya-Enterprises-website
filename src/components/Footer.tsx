import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#120A05] text-[#FDFBF7] pt-16 pb-8 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#D4AF37] flex items-center justify-center text-[#120A05] font-bold text-lg">
                ☕
              </div>
              <span className="font-serif-title text-base font-bold text-[#FDFBF7]">
                SOWMIYA ENTERPRISES
              </span>
            </div>

            <p className="text-xs text-[#E5D3B3] leading-relaxed">
              Authorized commercial line distributor based in Tirupati since 2018. Supplying 1 KG packets of Signature Lemon Tea, NesTea, Coffee, Milk Powder, Milkybar chocolates, and coffee vending machines.
            </p>

            <p className="text-xs text-[#D4AF37] font-bold">
              Proprietor: Mr. V. Sundareshan (Managed with Sangeetha)
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif-title font-bold text-[#D4AF37] uppercase tracking-wider">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#E5D3B3]">
              <li><a href="#3d-canvas" className="hover:text-[#D4AF37] transition-colors">3D Floating Coffee Beans</a></li>
              <li><a href="#products" className="hover:text-[#D4AF37] transition-colors">1 KG Packs & Milkybar</a></li>
              <li><a href="#videos" className="hover:text-[#D4AF37] transition-colors">Tirumala Coffee Moments</a></li>
              <li><a href="#godown" className="hover:text-[#D4AF37] transition-colors">Tirupati Godown & Desk</a></li>
              <li><a href="#vending" className="hover:text-[#D4AF37] transition-colors">Vending Setup Calculator</a></li>
              <li><a href="#technician" className="hover:text-[#D4AF37] transition-colors">Technician Support</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif-title font-bold text-[#D4AF37] uppercase tracking-wider">
              Facility & Contact
            </h4>
            <div className="space-y-2 text-xs text-[#E5D3B3]">
              <p>👤 Founder: Mr. V. Sundareshan</p>
              <p>🛕 Godown: Tirupati, Andhra Pradesh</p>
              <p>📞 Phone: <a href="tel:9390488777" className="text-[#D4AF37] font-bold hover:underline">9390488777</a></p>
              <p>💬 WhatsApp: <a href="https://wa.me/919390488777" className="text-emerald-400 font-bold hover:underline">+91 9390488777</a></p>
            </div>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-xs font-serif-title font-bold text-[#D4AF37] uppercase tracking-wider">
              Exclusively Andhra Pradesh
            </h4>
            <p className="text-xs text-[#E5D3B3] leading-relaxed">
              We distribute exclusively to all 26 districts of Andhra Pradesh (Tirupati, Chittoor, Nellore, Kadapa, Anantapur, Kurnool, Guntur, Vijayawada, Visakhapatnam, etc.). We do not distribute to Telangana.
            </p>
            <div className="pt-2">
              <span className="inline-block bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-[10px] font-bold px-3 py-1 rounded-lg">
                B2B Institutions & Direct Commercial Wholesale
              </span>
            </div>
          </div>

        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 border-t border-[#2A160E] text-center space-y-4">
          <div className="bg-[#180B06] p-4 rounded-2xl border border-[#D4AF37]/20 max-w-4xl mx-auto text-[11px] text-[#A68318] leading-relaxed">
            <span className="font-bold text-[#D4AF37] block mb-1 uppercase tracking-wider">
              TRADEMARK & LEGAL DISCLAIMER
            </span>
            "Sowmiya Enterprises is an independently operated commercial line distribution business based in Tirupati, Andhra Pradesh. This website is not the official corporate website of Nestlé India Limited. Brand and product names mentioned (such as KitKat, Milkybar, Munch, Nescafé, Nestea) are the trademarks of their respective owners and are used only to identify the products handled by our business as a distributor. No ownership or corporate endorsement of third-party trademarks is claimed. Distribution operations are conducted exclusively in Andhra Pradesh."
          </div>

          <div className="text-xs text-[#E5D3B3]/70 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto px-2">
            <p>© 2018 - 2026 Sowmiya Enterprises. All Rights Reserved.</p>
            <p className="text-[11px]">Tirupati, Andhra Pradesh, India</p>
          </div>
        </div>

      </div>
    </footer>
  );
};
