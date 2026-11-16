import React, { useState } from 'react';
import { playUiClick } from '../utils/audioEffects';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    district: '',
    customerType: 'B2B Institution (Office / CA Firm / Factory / Railway)',
    serviceType: '1 KG Packets (Signature Lemon Tea, NesTea, Coffee, Milk Powder)',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playUiClick();

    const msg = `Hello Sowmiya Enterprises (Mr. V. Sundareshan),%0A%0A` +
      `*New Distribution Enquiry (Andhra Pradesh):*%0A` +
      `*Customer Type:* ${encodeURIComponent(formData.customerType)}%0A` +
      `*Contact Person:* ${encodeURIComponent(formData.name)}%0A` +
      `*Company / Establishment:* ${encodeURIComponent(formData.company)}%0A` +
      `*Mobile Number:* ${encodeURIComponent(formData.phone)}%0A` +
      `*District in AP:* ${encodeURIComponent(formData.district)}%0A` +
      `*Product / Service Required:* ${encodeURIComponent(formData.serviceType)}%0A` +
      `*Additional Details:* ${encodeURIComponent(formData.notes || 'Please share wholesale rate list & delivery schedule.')}`;

    window.open(`https://wa.me/919390488777?text=${msg}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#120A05] border-b border-[#D4AF37]/30 text-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2A160E] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
            <span>📍 Direct Andhra Pradesh Distribution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF7]">
            Connect with Sowmiya Enterprises
          </h2>
          <p className="text-[#E5D3B3] text-sm sm:text-base leading-relaxed">
            Reach out directly to proprietor Mr. V. Sundareshan for wholesale supply of <strong>1 KG Packets</strong>, commercial coffee vending machines, or regional AP institutional distribution.
          </p>

          <span className="inline-block text-[11px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-lg">
            Serving Exclusively Andhra Pradesh (All 26 Districts · No Telangana Distribution)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Direct Contact Details Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#2A160E] to-[#180B06] p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-2xl space-y-6">
            <div>
              <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                Authorized Commercial Stockist
              </span>
              <h3 className="font-serif-title font-bold text-2xl text-white mt-1">
                SOWMIYA ENTERPRISES
              </h3>
              <p className="text-xs text-[#E5D3B3] mt-1">
                Family-managed distribution enterprise founded in 2018 in Tirupati.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3.5 bg-[#120A05] p-3 rounded-2xl border border-[#D4AF37]/20">
                <span className="text-2xl mt-0.5">👤</span>
                <div>
                  <span className="text-[#A68318] block font-semibold">Founder & Proprietor:</span>
                  <span className="font-bold text-white text-sm">Mr. V. Sundareshan</span>
                  <span className="block text-[#E5D3B3]/70 text-[11px] mt-0.5">Operations managed with Sangeetha</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-[#120A05] p-3 rounded-2xl border border-[#D4AF37]/20">
                <span className="text-2xl mt-0.5">📍</span>
                <div>
                  <span className="text-[#A68318] block font-semibold">Distribution Godown & Office:</span>
                  <span className="font-bold text-white text-sm">Tirupati, Andhra Pradesh, India</span>
                  <span className="block text-emerald-400 font-semibold text-[11px] mt-0.5">Exclusively serving all 26 AP districts</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-[#120A05] p-3 rounded-2xl border border-[#D4AF37]/20">
                <span className="text-2xl mt-0.5">📞</span>
                <div>
                  <span className="text-[#A68318] block font-semibold">Direct Phone Hotline:</span>
                  <a href="tel:9390488777" className="font-bold text-[#D4AF37] hover:underline text-base">
                    +91 9390488777
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-[#120A05] p-3 rounded-2xl border border-[#D4AF37]/20">
                <span className="text-2xl mt-0.5">💬</span>
                <div>
                  <span className="text-[#A68318] block font-semibold">Instant WhatsApp Chat:</span>
                  <a
                    href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20in%20Andhra%20Pradesh."
                    target="_blank"
                    rel="noreferrer"
                    className="font-bold text-emerald-400 hover:underline text-xs"
                  >
                    Click to Open WhatsApp (+91 9390488777)
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href="tel:9390488777"
                className="flex-1 bg-[#D4AF37] hover:bg-amber-400 text-[#120A05] font-extrabold py-3 rounded-xl text-center text-xs shadow-lg transition-all"
              >
                📞 Direct Call
              </a>
              <a
                href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20your%20products%20in%20Andhra%20Pradesh."
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-700 hover:bg-emerald-600 text-white font-extrabold py-3 rounded-xl text-center text-xs shadow-lg transition-all"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#180B06] p-8 rounded-3xl border-2 border-[#D4AF37]/30 shadow-2xl">
            <h3 className="font-serif-title font-bold text-xl text-white mb-1">
              Submit Wholesale / Vending Inquiry
            </h3>
            <p className="text-xs text-[#E5D3B3] mb-6">
              Fill in your details below to instantly generate a pre-formatted WhatsApp quotation request.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                  Customer Type *
                </label>
                <select
                  value={formData.customerType}
                  onChange={(e) => setFormData({ ...formData, customerType: e.target.value })}
                  className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="B2B Institution (Office / CA Firm / Factory / Railway)">
                    🏢 B2B Institution (Office / CA Firm / Factory / Railway)
                  </option>
                  <option value="Direct Commercial Wholesale (Caterer / Event / Bulk Buyer)">
                    👥 Direct Commercial Wholesale (Caterer / Event / Bulk Buyer)
                  </option>
                  <option value="Retail Outlet / Kiosk Vendor">
                    🏪 Retail Outlet / Kiosk Vendor
                  </option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Kumar"
                    className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                    Company / Firm Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. Balaji Firm / Office / Catering"
                    className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                    Mobile / Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="10-digit mobile number"
                    className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                    District / City in Andhra Pradesh *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Tirupati / Chittoor / Nellore / Vijayawada"
                    className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                  Product or Service Category Required *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="1 KG Packets (Signature Lemon Tea, NesTea, Coffee, Milk Powder)">
                    1 KG Packets (Signature Lemon Tea, NesTea, Coffee, Milk Powder)
                  </option>
                  <option value="Chocolates Master Cartons (Milkybar, KitKat, Munch)">
                    Chocolates Master Cartons (Milkybar, KitKat, Munch Max)
                  </option>
                  <option value="Commercial Coffee Vending Machine Supply & Installation">
                    Commercial Coffee Vending Machine Supply & Installation
                  </option>
                  <option value="Vending Machine Maintenance & Technician Support">
                    Vending Machine Maintenance & Technician Support
                  </option>
                  <option value="Full AP Institutional Supply Agreement">
                    Full AP Institutional Supply Agreement
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#E5D3B3] mb-1">
                  Specific Requirements / Quantities
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Specify required 1kg pack quantities or machine installation details..."
                  className="w-full bg-[#120A05] border border-[#D4AF37]/30 rounded-xl p-3 text-white focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-[#D4AF37] text-[#120A05] font-extrabold py-3.5 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <span>💬 Submit AP Inquiry via WhatsApp (+91 9390488777)</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
