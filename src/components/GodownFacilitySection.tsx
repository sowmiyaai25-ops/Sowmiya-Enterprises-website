import React, { useState } from 'react';
import cleanBillingDeskImage from '../assets/images/clean_billing_desk_tirupati_1793883204104.jpg';
import { playUiClick } from '../utils/audioEffects';

export const GodownFacilitySection: React.FC = () => {
  const [activeLightbox, setActiveLightbox] = useState<{
    src: string;
    caption: string;
    detail: string;
  } | null>(null);

  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  const godownStockImage = '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.09.22_PM_dfe643f9.jpeg';

  const hotspots = [
    {
      id: 1,
      x: '38%',
      y: '35%',
      label: 'Bulk Beverage & Coffee Cartons',
      detail: 'Over 1,200 master cases of premium instant coffee powders and 1kg tea premixes maintained on active pallet racks.',
    },
    {
      id: 2,
      x: '52%',
      y: '75%',
      label: 'Wrapped Commercial Vending Units',
      detail: 'Factory-sealed, pre-inspected commercial hot beverage vending machines ready for immediate workplace installation across AP.',
    },
    {
      id: 3,
      x: '15%',
      y: '45%',
      label: 'Chocolates & Wafer Bulk Storage',
      detail: 'Climate-controlled master cartons of Milkybar white chocolate, KitKat, and Munch preserving crispiness against regional weather.',
    },
  ];

  return (
    <section id="godown" className="py-16 sm:py-24 bg-[#180B06] border-b border-[#D4AF37]/30 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2A160E] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
            <span>🏭 Authentic Tirupati Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF7]">
            Inside Our Tirupati Godown & Billing Desk
          </h2>
          <p className="text-[#E5D3B3] text-sm sm:text-base leading-relaxed">
            Real photography of our active Tirupati bulk warehouse and clean computerized billing workstation. 
            We maintain direct factory stock ready for both <strong>B2B Institutional Supply</strong> and <strong>Direct Commercial Wholesale</strong> across Andhra Pradesh.
          </p>
        </div>

        {/* 2-Column Showcase: Godown Stock & Clean Billing Desk (No Mugs, No People) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-12">
          
          {/* Card 1: Bulk Godown Stock Facility (Uploaded Image) */}
          <div className="bg-[#2A160E] rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
            <div>
              {/* Image with interactive Hotspots */}
              <div className="relative h-80 sm:h-96 bg-black overflow-hidden">
                <img
                  src={godownStockImage}
                  alt="Tirupati Godown Bulk Inventory - Sowmiya Enterprises"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Hotspot Dots */}
                {hotspots.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => {
                      playUiClick();
                      setActiveHotspot(activeHotspot === h.id ? null : h.id);
                    }}
                    style={{ left: h.x, top: h.y }}
                    className="absolute z-20 w-7 h-7 rounded-full bg-[#D4AF37] text-[#120A05] font-extrabold flex items-center justify-center text-xs shadow-[0_0_15px_rgba(212,175,55,0.8)] animate-bounce hover:scale-125 transition-transform"
                    title={h.label}
                  >
                    +
                  </button>
                ))}

                {/* Hotspot Info Popup Overlay */}
                {activeHotspot !== null && (
                  <div className="absolute bottom-4 left-4 right-4 z-30 bg-[#120A05]/95 border border-[#D4AF37] p-3 rounded-xl shadow-2xl backdrop-blur-md text-xs">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-[#D4AF37]">
                        {hotspots.find((h) => h.id === activeHotspot)?.label}
                      </span>
                      <button
                        onClick={() => setActiveHotspot(null)}
                        className="text-[#E5D3B3] hover:text-white font-bold"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-[#E5D3B3]">
                      {hotspots.find((h) => h.id === activeHotspot)?.detail}
                    </p>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#120A05]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-extrabold px-3 py-1 rounded-md backdrop-blur-sm">
                    📸 Tirupati Bulk Inventory
                  </span>
                </div>

                <button
                  onClick={() => {
                    playUiClick();
                    setActiveLightbox({
                      src: godownStockImage,
                      caption: 'Tirupati Bulk Stockroom & Inventory Facility',
                      detail: 'Direct pallet rows of cartons, 1kg premixes, Milkybar white chocolate, and wrapped commercial coffee vending machines ready for customer dispatch across AP.',
                    });
                  }}
                  className="absolute bottom-4 right-4 bg-[#120A05]/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#120A05] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 transition-all flex items-center gap-1 shadow"
                >
                  <span>🔍 Expand Full View</span>
                </button>
              </div>

              {/* Details */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif-title font-bold text-xl text-[#FDFBF7]">
                  Main Godown: Bulk Stock & Vending Equipment
                </h3>
                <p className="text-xs text-[#E5D3B3] leading-relaxed">
                  Our dedicated Tirupati warehouse maintains fresh production batches of 1kg premixes, chocolates, and vending machines under strict shelf-life monitoring.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="bg-[#180B06] p-2.5 rounded-xl border border-[#D4AF37]/20">
                    <span className="text-[#A68318] block font-semibold">Stock Capacity:</span>
                    <span className="text-white font-bold">5,000+ Master Cartons</span>
                  </div>
                  <div className="bg-[#180B06] p-2.5 rounded-xl border border-[#D4AF37]/20">
                    <span className="text-[#A68318] block font-semibold">Delivery Scope:</span>
                    <span className="text-emerald-400 font-bold">All Andhra Pradesh</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20verify%20godown%20stock%20availability%20for%20a%20bulk%20order%20in%20Andhra%20Pradesh."
                target="_blank"
                rel="noreferrer"
                className="w-full bg-[#180B06] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#120A05] border border-[#D4AF37]/40 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>📦 Verify Godown Stock Availability</span>
              </a>
            </div>
          </div>

          {/* Card 2: Operations & Computer Billing Desk (Clean Workstation, No Mugs, No People) */}
          <div className="bg-[#2A160E] rounded-3xl border-2 border-[#D4AF37]/40 overflow-hidden shadow-2xl flex flex-col justify-between group hover:border-[#D4AF37] transition-all">
            <div>
              {/* Image */}
              <div className="relative h-80 sm:h-96 bg-black overflow-hidden">
                <img
                  src={cleanBillingDeskImage}
                  alt="Computer Billing & Inventory Management Desk - Sowmiya Enterprises Tirupati"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-[#120A05]/90 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-extrabold px-3 py-1 rounded-md backdrop-blur-sm">
                    💻 Billing Counter & System
                  </span>
                </div>

                <button
                  onClick={() => {
                    playUiClick();
                    setActiveLightbox({
                      src: cleanBillingDeskImage,
                      caption: 'Sowmiya Enterprises Billing & Inventory Management Counter',
                      detail: 'Clean computerized billing desk equipped with system monitor, invoice receipt printer, keyboard, and direct overview of Tirupati city and hills.',
                    });
                  }}
                  className="absolute bottom-4 right-4 bg-[#120A05]/80 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#120A05] text-xs font-bold px-3 py-1.5 rounded-lg border border-[#D4AF37]/50 transition-all flex items-center gap-1 shadow"
                >
                  <span>🔍 Expand Full View</span>
                </button>
              </div>

              {/* Details */}
              <div className="p-6 space-y-3">
                <h3 className="font-serif-title font-bold text-xl text-[#FDFBF7]">
                  Computerized Billing & Order Dispatch Desk
                </h3>
                <p className="text-xs text-[#E5D3B3] leading-relaxed">
                  Every order is recorded digitally and invoiced accurately from our Tirupati billing desk. 
                  Equipped with computerized inventory tracking, GST invoice printing, and swift dispatch coordination.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px]">
                  <div className="bg-[#180B06] p-2.5 rounded-xl border border-[#D4AF37]/20">
                    <span className="text-[#A68318] block font-semibold">Invoicing System:</span>
                    <span className="text-white font-bold">Instant GST B2B & B2C Invoices</span>
                  </div>
                  <div className="bg-[#180B06] p-2.5 rounded-xl border border-[#D4AF37]/20">
                    <span className="text-[#A68318] block font-semibold">Location:</span>
                    <span className="text-white font-bold">Tirupati City Center</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <a
                href="tel:9390488777"
                className="w-full bg-[#180B06] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#120A05] border border-[#D4AF37]/40 font-bold py-2.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow"
              >
                <span>📞 Connect with Tirupati Desk: 9390488777</span>
              </a>
            </div>
          </div>

        </div>

        {/* Distributor Process Explained */}
        <div className="bg-[#120A05] border border-[#D4AF37]/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D4AF37]/20 pb-3">
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                DISTRIBUTION WORKFLOW
              </span>
              <h4 className="font-serif-title font-bold text-lg text-white">
                How Our Authorized Line Distribution Operates in Andhra Pradesh
              </h4>
            </div>
            <span className="text-xs text-[#E5D3B3] font-semibold bg-[#2A160E] px-3 py-1 rounded-xl border border-[#D4AF37]/30">
              B2B + B2C Wholesale
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-[#180B06] border border-[#D4AF37]/20 space-y-1">
              <span className="text-base font-serif-title font-bold text-[#D4AF37]">01. Inbound Factory Intake</span>
              <p className="text-[#E5D3B3] text-[11px] leading-relaxed">
                Direct shipment intake of factory-sealed master cartons and 1kg foil pouches into our Tirupati godown.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#180B06] border border-[#D4AF37]/20 space-y-1">
              <span className="text-base font-serif-title font-bold text-[#D4AF37]">02. Batch & Shelf-Life Audit</span>
              <p className="text-[#E5D3B3] text-[11px] leading-relaxed">
                Every carton is checked for fresh expiry dates, seal integrity, and moisture resistance before storage.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#180B06] border border-[#D4AF37]/20 space-y-1">
              <span className="text-base font-serif-title font-bold text-[#D4AF37]">03. GST Billing & Dispatch</span>
              <p className="text-[#E5D3B3] text-[11px] leading-relaxed">
                Orders are processed on our computerized desk with full GST documentation and lot number recording.
              </p>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#180B06] border border-[#D4AF37]/20 space-y-1">
              <span className="text-base font-serif-title font-bold text-[#D4AF37]">04. AP Route Transit</span>
              <p className="text-[#E5D3B3] text-[11px] leading-relaxed">
                Reliable transit to institutional pantries, CA offices, factories, and railway kiosks across Andhra Pradesh.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#2A160E] border-2 border-[#D4AF37] rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative">
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute top-4 right-4 z-20 text-white hover:text-[#D4AF37] text-3xl font-bold bg-black/60 rounded-full w-10 h-10 flex items-center justify-center"
            >
              &times;
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={activeLightbox.src}
                alt={activeLightbox.caption}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <div className="p-6 bg-[#180B06] space-y-2">
              <h3 className="font-serif-title font-bold text-xl text-[#D4AF37]">
                {activeLightbox.caption}
              </h3>
              <p className="text-xs text-[#E5D3B3] leading-relaxed">
                {activeLightbox.detail}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
