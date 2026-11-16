import React, { useState } from 'react';
import vendingFilledCupsImg from '../assets/images/vending_machine_filled_coffee_cups_1793883707718.jpg';
import { playCoffeeSteamSound, playUiClick } from '../utils/audioEffects';

export const VendingCalculatorSection: React.FC = () => {
  const [workplaceType, setWorkplaceType] = useState<'ca-office' | 'corporate' | 'factory' | 'railway'>('ca-office');
  const [dailyCups, setDailyCups] = useState<number>(40);
  const [simulatedDrink, setSimulatedDrink] = useState<string>('Hot Coffee');
  const [cupStyle, setCupStyle] = useState<'ceramic' | 'paper' | 'glass' | 'tumbler'>('ceramic');
  const [isDispensing, setIsDispensing] = useState<boolean>(false);
  const [fillLevel, setFillLevel] = useState<number>(100);

  const configs = {
    'ca-office': {
      label: 'CA Firm / Audit Office / Legal Hub',
      recommendedModel: 'Dual-Canister Hot Beverage Dispenser',
      beverageOptions: ['Nescafé Coffee', 'Special Masala Tea'],
      monthlyPremixKg: Math.round(dailyCups * 26 * 0.014),
      costPerCup: '₹5.50',
      description: 'Compact, whisper-quiet dual canister unit with stainless steel drip tray. Ideal for partner rooms, tax consultancies, and executive client meetings.',
      badge: 'Professional & Compact',
    },
    'corporate': {
      label: 'Corporate Office / IT Park (30-80 Staff)',
      recommendedModel: '4-Option Multi-Beverage Dispenser',
      beverageOptions: ['Nescafé Coffee', 'Nestea Cardamom Tea', 'Signature Lemon Tea', 'Hot Milk'],
      monthlyPremixKg: Math.round(dailyCups * 26 * 0.014),
      costPerCup: '₹5.20',
      description: 'High-speed 4-canister digital dispenser with individual cup counters, auto-cleaning rinse cycle, and independent water temperature control.',
      badge: 'Most Popular for Offices',
    },
    'factory': {
      label: 'Factory / Manufacturing Plant (100+ Workers)',
      recommendedModel: 'Heavy-Duty Commercial High-Extraction Unit',
      beverageOptions: ['Strong Black Coffee', 'Special Ginger Tea', 'Dairy Milk'],
      monthlyPremixKg: Math.round(dailyCups * 26 * 0.014),
      costPerCup: '₹4.80',
      description: 'Rugged heavy-gauge body engineered for shift changes and intense continuous dispensing without boiler pressure drop.',
      badge: 'High-Endurance Industrial',
    },
    'railway': {
      label: 'Railway Station Kiosk / Cafeteria Refreshment Stall',
      recommendedModel: 'Fast-Flow Rapid Extraction Commercial Unit',
      beverageOptions: ['Hot Filter-style Coffee', 'Instant Cutting Tea', 'Lemon Tea'],
      monthlyPremixKg: Math.round(dailyCups * 30 * 0.014),
      costPerCup: '₹4.50',
      description: 'Super-fast 4-second cup extraction with digital cup counter locks for cashier reconciliation and zero wastage.',
      badge: 'High-Speed Commercial',
    },
  };

  const current = configs[workplaceType];

  const handleSimulateDispense = (drinkName: string) => {
    playUiClick();
    playCoffeeSteamSound();
    setSimulatedDrink(drinkName);
    setIsDispensing(true);
    setFillLevel(0);

    // Animate cup filling
    setTimeout(() => {
      setFillLevel(100);
    }, 100);

    setTimeout(() => {
      setIsDispensing(false);
    }, 1800);
  };

  return (
    <section id="vending" className="py-16 sm:py-24 bg-[#120A05] border-b border-[#D4AF37]/30 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2A160E] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
            <span>⚙️ 5D Interactive Vending Dispenser & Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF7]">
            Commercial Vending Machine Setups & Fresh Filled Cups
          </h2>
          <p className="text-[#E5D3B3] text-sm sm:text-base leading-relaxed">
            See our commercial 4-lane automatic coffee vending machine dispensing into cups filled with rich crema froth. 
            Try the live 5D dispenser simulator below and calculate your monthly 1 KG premix needs across Andhra Pradesh.
          </p>

          <div className="inline-block bg-[#180B06] border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-xl text-xs text-[#D4AF37] font-semibold">
            Authorized Line Distributor for Genuine Nestlé Products (KitKat, Munch, Milkybar, Nescafé, Nestea, Everyday)
          </div>
        </div>

        {/* Photorealistic Vending Machine with Filled Coffee Cups Visual Banner */}
        <div className="mb-14 rounded-3xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-2xl relative group">
          <img
            src={vendingFilledCupsImg}
            alt="Commercial Coffee Vending Machine Dispensing into Cups with Rich Golden Crema Froth"
            className="w-full h-80 sm:h-[420px] object-cover group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#120A05] via-[#120A05]/30 to-transparent" />

          {/* Interactive Floating Card Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#180B06]/90 border border-[#D4AF37]/50 p-4 sm:p-5 rounded-2xl backdrop-blur-md shadow-2xl">
            <div>
              <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-wider">
                COMMERCIAL BEVERAGE EXTRACTION
              </span>
              <h3 className="font-serif-title font-bold text-lg text-white">
                Freshly Filled Coffee & Tea Cups with Thick Golden Crema
              </h3>
              <p className="text-xs text-[#E5D3B3] mt-0.5">
                Installed with on-site technician calibration for corporate offices, CA firms, hospitals, and railway kiosks in AP.
              </p>
            </div>

            <a
              href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20commercial%20coffee%20vending%20machine%20installation%20in%20Andhra%20Pradesh."
              target="_blank"
              rel="noreferrer"
              className="bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] font-extrabold px-5 py-2.5 rounded-xl text-xs shadow-lg transition-all whitespace-nowrap shrink-0 text-center"
            >
              Enquire Machine Installation
            </a>
          </div>
        </div>

        {/* 2-Column Calculator & 5D Interactive Dispenser Simulator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#180B06] p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl space-y-6">
            <h3 className="font-serif-title font-bold text-xl text-[#D4AF37] flex items-center gap-2">
              <span>📊 Configure Your Workplace Profile</span>
            </h3>

            {/* Establishment Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E5D3B3]">
                1. Select Establishment Type:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { id: 'ca-office', label: 'CA / Law Firm (10-25 Staff)', icon: '🏛️' },
                  { id: 'corporate', label: 'Corporate Office (30-80 Staff)', icon: '🏢' },
                  { id: 'factory', label: 'Factory / Plant (100+ Staff)', icon: '🏭' },
                  { id: 'railway', label: 'Railway / Station Stall', icon: '🚆' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      playUiClick();
                      setWorkplaceType(item.id as typeof workplaceType);
                      if (item.id === 'ca-office') setDailyCups(40);
                      else if (item.id === 'corporate') setDailyCups(90);
                      else if (item.id === 'factory') setDailyCups(250);
                      else setDailyCups(400);
                    }}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center gap-2.5 ${
                      workplaceType === item.id
                        ? 'bg-[#2A160E] border-[#D4AF37] text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'bg-[#120A05] border-[#D4AF37]/20 text-[#E5D3B3] hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cups Slider */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs">
                <label className="font-bold uppercase tracking-wider text-[#E5D3B3]">
                  2. Expected Daily Cups:
                </label>
                <span className="font-serif-title font-bold text-base text-[#D4AF37] bg-[#2A160E] px-3 py-0.5 rounded-lg border border-[#D4AF37]/40">
                  {dailyCups} Cups / Day
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={600}
                step={10}
                value={dailyCups}
                onChange={(e) => setDailyCups(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#A68318]">
                <span>20 cups</span>
                <span>200 cups</span>
                <span>400 cups</span>
                <span>600 cups</span>
              </div>
            </div>

            {/* Output Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-[#120A05] p-3.5 rounded-2xl border border-[#D4AF37]/30">
                <span className="text-[10px] text-[#A68318] block font-bold uppercase">Estimated Cost Per Cup</span>
                <span className="font-serif-title font-bold text-xl text-[#D4AF37]">{current.costPerCup}</span>
                <span className="text-[9px] text-[#E5D3B3]/70 block mt-0.5">Huge savings vs canteen</span>
              </div>
              <div className="bg-[#120A05] p-3.5 rounded-2xl border border-[#D4AF37]/30">
                <span className="text-[10px] text-[#A68318] block font-bold uppercase">Monthly 1 KG Premix</span>
                <span className="font-serif-title font-bold text-xl text-white">~{current.monthlyPremixKg} kg</span>
                <span className="text-[9px] text-[#E5D3B3]/70 block mt-0.5">Direct 1 KG foil packs</span>
              </div>
            </div>

          </div>

          {/* Interactive 5D Live Dispenser Simulator */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#2A160E] to-[#180B06] p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37] shadow-2xl space-y-6 relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#120A05] px-2.5 py-0.5 rounded border border-[#D4AF37]/40">
                  5D INTERACTIVE SIMULATOR
                </span>
                <h3 className="font-serif-title font-bold text-xl text-[#FDFBF7] mt-1">
                  Live Coffee Cup Filling Experience
                </h3>
              </div>
              <span className="text-3xl animate-bounce">☕</span>
            </div>

            <p className="text-xs text-[#E5D3B3] leading-relaxed">
              Press any beverage button and choose your cup type below to experience the live dispensing stream, sound effect, and cups filled with rich crema froth:
            </p>

            {/* Beverage Push Buttons */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                Step 1: Choose Hot Beverage
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { name: 'Nescafé Coffee', icon: '☕' },
                  { name: 'Nestea Tea', icon: '🍵' },
                  { name: 'Lemon Tea', icon: '🍋' },
                  { name: 'Dairy Milk', icon: '🥛' },
                ].map((b) => (
                  <button
                    key={b.name}
                    onClick={() => handleSimulateDispense(b.name)}
                    className={`p-2.5 rounded-xl border text-center font-bold text-xs transition-all shadow ${
                      simulatedDrink === b.name
                        ? 'bg-[#D4AF37] text-[#120A05] border-[#D4AF37] scale-105'
                        : 'bg-[#180B06] text-[#E5D3B3] border-[#D4AF37]/30 hover:border-[#D4AF37]'
                    }`}
                  >
                    <span className="block text-base">{b.icon}</span>
                    <span className="text-[10px] block mt-0.5">{b.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cup Style Switcher */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block">
                Step 2: Select Cup Type (Filled with Fresh Crema)
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'ceramic', label: 'Ceramic Mug', sub: '200ml' },
                  { id: 'paper', label: 'Paper Cup', sub: '120ml' },
                  { id: 'glass', label: 'Glass Cup', sub: '180ml' },
                  { id: 'tumbler', label: 'Desk Flask', sub: '300ml' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      playUiClick();
                      setCupStyle(c.id as typeof cupStyle);
                      handleSimulateDispense(simulatedDrink);
                    }}
                    className={`p-2 rounded-xl border text-center text-[10px] font-bold transition-all ${
                      cupStyle === c.id
                        ? 'bg-[#5C3420] text-[#D4AF37] border-[#D4AF37] shadow'
                        : 'bg-[#120A05] text-[#E5D3B3] border-[#D4AF37]/20 hover:border-[#D4AF37]/60'
                    }`}
                  >
                    <span className="block">{c.label}</span>
                    <span className="text-[8px] text-[#A68318] block">{c.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Animated 3D Coffee Cup Stage */}
            <div className="relative h-48 bg-[#120A05] rounded-2xl border border-[#D4AF37]/30 flex flex-col items-center justify-end pb-3 overflow-hidden">
              {/* Dual Nozzle Stream Animation */}
              {isDispensing && (
                <>
                  <div className="absolute top-0 left-[calc(50%-8px)] w-2 bg-gradient-to-b from-[#8B4513] via-[#D2691E] to-[#F5DEB3] h-24 animate-pulse rounded-full" />
                  <div className="absolute top-0 left-[calc(50%+2px)] w-1.5 bg-gradient-to-b from-[#8B4513] via-[#D2691E] to-[#F5DEB3] h-24 animate-pulse rounded-full" />
                </>
              )}

              {/* Steam Puffs */}
              <div className="absolute top-6 flex gap-3">
                <span className="animate-steam-1 text-base opacity-75">☁️</span>
                <span className="animate-steam-2 text-sm opacity-60">☁️</span>
                <span className="animate-steam-3 text-base opacity-75">☁️</span>
              </div>

              {/* Interactive Cup Container according to cupStyle */}
              {cupStyle === 'glass' ? (
                // Double-wall glass cup with layered coffee & milk froth
                <div className="relative w-24 h-28 bg-white/10 backdrop-blur-md border-2 border-white/40 rounded-b-2xl rounded-t-sm overflow-hidden flex flex-col justify-end p-1 shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  <div
                    style={{ height: `${fillLevel}%` }}
                    className="w-full bg-gradient-to-t from-[#2B1408] via-[#633314] to-[#C88A4B] transition-all duration-1000 ease-out rounded-b-xl relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#FFF2D6] to-[#C88A4B] opacity-95 rounded-t-sm flex items-center justify-center">
                      <span className="text-[7px] text-[#2B1408] font-bold">CREMA</span>
                    </div>
                  </div>
                </div>
              ) : cupStyle === 'paper' ? (
                // Classic paper cup
                <div className="relative w-22 h-26 bg-gradient-to-b from-[#F5DEB3] to-[#D2B48C] border-t-4 border-white border-x border-b border-amber-900/40 rounded-b-xl overflow-hidden flex flex-col justify-end p-1 shadow-[0_10px_20px_rgba(0,0,0,0.7)]">
                  <div
                    style={{ height: `${fillLevel}%` }}
                    className="w-full bg-gradient-to-t from-[#1E0D05] via-[#4A2411] to-[#B07238] transition-all duration-1000 ease-out rounded-b-lg relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-3.5 bg-[#D4AF37] opacity-90 rounded-full" />
                  </div>
                </div>
              ) : cupStyle === 'tumbler' ? (
                // Stainless Steel Tumbler
                <div className="relative w-24 h-30 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 border-2 border-slate-300 rounded-b-2xl rounded-t-md overflow-hidden flex flex-col justify-end p-1 shadow-[0_12px_25px_rgba(0,0,0,0.8)]">
                  <div
                    style={{ height: `${fillLevel}%` }}
                    className="w-full bg-gradient-to-t from-[#2A160E] via-[#5C3420] to-[#C98A4B] transition-all duration-1000 ease-out rounded-b-xl relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-3 bg-[#E5D3B3] opacity-95 rounded-full" />
                  </div>
                </div>
              ) : (
                // Classic Ceramic Mug with Gold Rim
                <div className="relative w-28 h-26 bg-gradient-to-b from-[#2A160E] to-[#120A05] border-2 border-[#D4AF37] rounded-b-3xl rounded-t-lg overflow-hidden flex flex-col justify-end p-1 shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
                  <div
                    style={{ height: `${fillLevel}%` }}
                    className="w-full bg-gradient-to-t from-[#201007] via-[#3a1d0d] to-[#b87333] transition-all duration-1000 ease-out rounded-b-2xl relative"
                  >
                    <div className="absolute top-0 left-0 right-0 h-3.5 bg-[#c98a4b] opacity-95 rounded-full" />
                  </div>
                </div>
              )}

              {/* Status Note below cup */}
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] text-[#D4AF37] font-bold">
                  {isDispensing ? `⚡ Dispensing ${simulatedDrink}...` : `✓ Fresh ${simulatedDrink} Filled with Rich Golden Crema`}
                </span>
                <span className="text-[9px] bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 px-2 py-0.5 rounded-full font-bold">
                  88°C Hot Brew
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Action for this setup */}
            <a
              href={`https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20am%20interested%20in%20the%20*${encodeURIComponent(
                current.recommendedModel
              )}*%20for%20my%20*${encodeURIComponent(
                current.label
              )}*%20expecting%20approx%20${dailyCups}%20cups%20daily%20in%20Andhra%20Pradesh.%20Please%20share%20quotation.`}
              target="_blank"
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-[#D4AF37] text-[#120A05] font-extrabold py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <span>💬 Request This Machine Setup on WhatsApp</span>
            </a>

            {/* Distributor Wording Clarification Card */}
            <div className="bg-[#120A05] p-3.5 rounded-2xl border border-[#D4AF37]/30 text-[11px] text-[#E5D3B3] space-y-1">
              <div className="flex items-center gap-1.5 text-[#D4AF37] font-bold">
                <span>🛡️ Distributor Designation Compliance:</span>
              </div>
              <p className="leading-relaxed">
                As an authorized commercial stockist, Sowmiya Enterprises legally and officially states <strong className="text-white">"Authorized Commercial Line Stockist & Distributor for Genuine Nestlé Products"</strong>. All stock comes with authentic batch seals, GST invoices, and machine maintenance warranties across all 26 Andhra Pradesh districts.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
