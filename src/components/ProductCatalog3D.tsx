import React, { useState } from 'react';
import { ProductItem } from '../types';
import { playUiClick } from '../utils/audioEffects';

interface ProductCatalog3DProps {
  onAddToCart: (product: ProductItem) => void;
}

export const ProductCatalog3D: React.FC<ProductCatalog3DProps> = ({ onAddToCart }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);

  // Products dataset including 1 KG packets, Milkybar white chocolate, and vending hardware
  const products: ProductItem[] = [
    {
      id: 'signature-lemon-tea-1kg',
      name: 'Signature Lemon Tea Premix (1 KG Pack)',
      category: 'beverages',
      categoryLabel: '1 KG Premix Packet',
      packWeight: '1 KG Packet',
      targetSegment: 'B2B & B2C',
      description: 'Zesty, invigorating signature lemon tea vending formulation packed in heavy-duty 1 KG commercial foil pouches. Dispenses instantly with hot water or automatic vending machine canisters.',
      packInfo: '1 KG Commercial Foil Packs (Cartons of 10 x 1kg)',
      shelfLife: 'Fresh Factory Batch (12 Months)',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=800&auto=format&fit=crop',
      featuredTag: '1 KG Foil Packet · High Demand',
      specs: {
        origin: 'Authorized Commercial Line Formulation',
        packaging: 'Aroma-Sealed 1kg Heat-Sealed Pouches',
        idealFor: 'CA Offices, Corporate Pantries, Station Refreshment',
        minimumOrder: '5 x 1kg Packs or 1 Master Case (10kg)',
      },
    },
    {
      id: 'nestea-premix-1kg',
      name: 'Nestea Instant Tea Premix (1 KG Pack)',
      category: 'beverages',
      categoryLabel: '1 KG Premix Packet',
      packWeight: '1 KG Packet',
      targetSegment: 'B2B & B2C',
      description: 'Premium ready-to-dispense instant tea premix in sealed 1 KG packets. Specially engineered for free-flowing extraction inside commercial vending machine canisters without clogging.',
      packInfo: '1 KG Moisture-Barrier Packets (10 x 1kg per carton)',
      shelfLife: '12 Months Factory Hermetic Packaging',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=800&auto=format&fit=crop',
      featuredTag: '1 KG Packet · Vending Grade',
      specs: {
        origin: 'Authentic Foodservice Line',
        packaging: 'Reinforced 1kg Multilayer Foil',
        idealFor: 'High-Volume Office Pantries & Canteens',
        minimumOrder: '5 x 1kg Packs or 1 Master Carton',
      },
    },
    {
      id: 'coffee-powder-1kg',
      name: 'Premium Coffee Vending Powder (1 KG Pack)',
      category: 'coffee',
      categoryLabel: '1 KG Coffee Packet',
      packWeight: '1 KG Packet',
      targetSegment: 'B2B & B2C',
      description: 'Pure granulated roasted coffee formulation packed in convenient 1 KG commercial bags. Delivers intense aroma, thick crema, and authentic taste in every dispensed cup.',
      packInfo: '1 KG Commercial Aroma Pouches (6 x 1kg per case)',
      shelfLife: '18 Months Nitrogen Flush Sealed',
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
      featuredTag: '1 KG Pack · Rich Crema',
      specs: {
        origin: 'Authorized Coffee Line Stock',
        packaging: 'Aroma-Shield 1kg Commercial Bags',
        idealFor: 'Automated Vending Machines, Hospitals, CA Firms',
        minimumOrder: '4 x 1kg Bags',
      },
    },
    {
      id: 'milk-whitener-1kg',
      name: 'Everyday Dairy Whitener & Milk Powder (1 KG Pack)',
      category: 'dairy',
      categoryLabel: '1 KG Milk Packet',
      packWeight: '1 KG Packet',
      targetSegment: 'B2B & B2C',
      description: 'High-solubility dairy milk powder formulated for tea and coffee vending machines. Dissolves rapidly with zero clumping, creating rich and creamy texture for hot beverages.',
      packInfo: '1 KG Packs (Also in 10kg & 15kg commercial bulk sacks)',
      shelfLife: '12 Months Fresh Batch Guarantee',
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=800&auto=format&fit=crop',
      featuredTag: '1 KG Packet · High Solubility',
      specs: {
        origin: 'Authentic Dairy Line Stock',
        packaging: 'Moisture-Proof 1kg Pouch',
        idealFor: 'Vending Canisters, Institutional Messes, Caterers',
        minimumOrder: '5 x 1kg Packs',
      },
    },
    {
      id: 'milkybar-white-choc',
      name: 'Milkybar Creamy White Chocolate Bar',
      category: 'chocolates',
      categoryLabel: 'Chocolates',
      packWeight: 'Carton Case',
      targetSegment: 'B2B & B2C',
      description: 'Velvety smooth, delicious creamy white chocolate bar. Supplied in wholesale case packs and display boxes for retail counters, canteens, and bulk institutional gifting.',
      packInfo: 'Wholesale Box & Master Carton Cases',
      shelfLife: 'Fresh Batch Control (9-12 Months)',
      image: '/assets/aistudio/WhatsApp_Image_2026-11-05_at_3.09.32_PM_385af987.jpeg',
      is3dSpecial: true,
      featuredTag: 'Uploaded White Chocolate 3D',
      specs: {
        origin: 'Authorized Brand Line Stock',
        packaging: 'Master Corrugated Carton (Multiple Display Boxes)',
        idealFor: 'Retail Stores, Railway Stalls, Corporate Gift Packs',
        minimumOrder: '1 Master Carton / 5 Display Boxes',
      },
    },
    {
      id: 'kitkat-wafer',
      name: 'KitKat 4-Finger Crisp Wafer Chocolate',
      category: 'chocolates',
      categoryLabel: 'Chocolates',
      packWeight: 'Carton Case',
      targetSegment: 'B2B & B2C',
      description: 'Crispy wafer fingers covered with smooth milk chocolate. Consistent best-seller for railway vendor kiosks, college canteens, and workplace snack corners.',
      packInfo: 'Master Cartons of 24/48 Units',
      shelfLife: 'Fresh Batch Supply',
      image: 'https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=800&auto=format&fit=crop',
      specs: {
        origin: 'Authentic Product Line',
        packaging: 'Cartons of 24/48 units',
        idealFor: 'Offices, CA Pantries, Railway Vendors, Retailers',
        minimumOrder: '2 Master Cases',
      },
    },
    {
      id: 'munch-max',
      name: 'Munch Max Chocolate Wafer',
      category: 'chocolates',
      categoryLabel: 'Chocolates',
      packWeight: 'Carton Case',
      targetSegment: 'B2B & B2C',
      description: 'Crunchy chocolate wafer bar with maximum crunch. Extremely popular across school canteens, travel snack stalls, and local grocery retail chains.',
      packInfo: 'Bulk Master Cartons',
      shelfLife: 'Current Production Batch',
      image: 'https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&auto=format&fit=crop',
      specs: {
        origin: 'Authentic Product Line',
        packaging: 'Corrugated Master Box',
        idealFor: 'School Canteens, Grocery, Station Kiosks',
        minimumOrder: '1 Master Case',
      },
    },
    {
      id: 'coffee-vending-unit',
      name: 'Commercial Automatic Coffee & Tea Vending Machine',
      category: 'vending',
      categoryLabel: 'Hardware Unit',
      packWeight: 'Hardware Unit',
      targetSegment: 'B2B Institutions',
      description: 'Dual-canister and 4-canister automatic hot beverage dispensing machines with microprocessor temperature control, cup counters, and on-site technician calibration across AP.',
      packInfo: 'Heavy-Duty Machine Unit + Complete Starter Kit',
      shelfLife: 'Full Hardware Warranty & Service Agreement',
      image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop',
      featuredTag: 'Machine + On-Site AP Setup',
      specs: {
        origin: 'Commercial Stainless Construction',
        packaging: 'Protective Wooden Crate / Foam Wrap',
        idealFor: 'Offices, Factories, CA Firms, Railway Stations',
        minimumOrder: '1 Unit (Outright Purchase or Placement)',
      },
    },
  ];

  const filteredProducts = products.filter((p) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === '1kg') return p.packWeight === '1 KG Packet';
    if (activeFilter === 'chocolates') return p.category === 'chocolates';
    if (activeFilter === 'vending') return p.category === 'vending';
    if (activeFilter === 'b2b') return p.targetSegment.includes('B2B');
    if (activeFilter === 'b2c') return p.targetSegment.includes('B2C');
    return true;
  });

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#120A05] text-[#FDFBF7] border-b border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 bg-[#2A160E] text-[#D4AF37] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-[#D4AF37]/40 shadow">
            <span>📦 Wholesale Stockist Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#FDFBF7]">
            1 KG Packets, Chocolates & Coffee Vending Machines
          </h2>
          <p className="text-[#E5D3B3] text-sm sm:text-base leading-relaxed">
            Supplying genuine products from Tirupati across all 26 districts of Andhra Pradesh. 
            We cater to both <strong>B2B Institutional Clients</strong> and <strong>Direct Commercial Wholesale</strong> customers.
          </p>

          {/* B2B / B2C Confirmation Box */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-[#180B06] p-3 rounded-2xl border border-[#D4AF37]/30 text-xs">
            <span className="text-[#A68318] font-bold">Supply Models:</span>
            <span className="bg-[#2A160E] text-white px-2.5 py-1 rounded-lg border border-[#D4AF37]/40">
              🏢 <strong>B2B:</strong> CA Firms, IT Offices, Factories, Railway Vendors
            </span>
            <span className="bg-[#2A160E] text-white px-2.5 py-1 rounded-lg border border-[#D4AF37]/40">
              👥 <strong>B2C:</strong> Commercial Caterers, Event Organizers, Bulk Buyers
            </span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Products (8)' },
            { id: '1kg', label: '⭐ 1 KG Packets (Signature, Lemon Tea, NesTea, Milk)' },
            { id: 'chocolates', label: '🍫 Chocolates (Milkybar, KitKat, Munch)' },
            { id: 'vending', label: '⚙️ Vending Machines' },
            { id: 'b2b', label: '🏢 B2B Institutional' },
            { id: 'b2c', label: '👥 Direct Commercial Wholesale' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playUiClick();
                setActiveFilter(tab.id);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                activeFilter === tab.id
                  ? 'bg-[#D4AF37] text-[#120A05] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.4)]'
                  : 'bg-[#180B06] text-[#E5D3B3] border-[#D4AF37]/20 hover:border-[#D4AF37]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3D Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Product3DCard
              key={product.id}
              product={product}
              onAddToCart={() => onAddToCart(product)}
              onInspect={() => setInspectedProduct(product)}
            />
          ))}
        </div>

      </div>

      {/* 3D Product Detail Modal */}
      {inspectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-[#2A160E] to-[#180B06] border-2 border-[#D4AF37] rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl relative">
            <button
              onClick={() => setInspectedProduct(null)}
              className="absolute top-4 right-4 z-20 text-white hover:text-[#D4AF37] text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center"
            >
              &times;
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
              {/* Product Visual */}
              <div className="relative h-64 md:h-full rounded-2xl overflow-hidden bg-black/40 border border-[#D4AF37]/30 flex items-center justify-center p-4">
                <img
                  src={inspectedProduct.image}
                  alt={inspectedProduct.name}
                  className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {inspectedProduct.packWeight && (
                  <span className="absolute top-3 left-3 bg-[#D4AF37] text-[#120A05] text-[10px] font-extrabold px-2.5 py-1 rounded shadow">
                    {inspectedProduct.packWeight}
                  </span>
                )}
              </div>

              {/* Specs & Details */}
              <div className="space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                      {inspectedProduct.categoryLabel}
                    </span>
                    <span className="text-[10px] bg-[#120A05] text-[#E5D3B3] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                      {inspectedProduct.targetSegment}
                    </span>
                  </div>

                  <h3 className="font-serif-title font-bold text-xl text-[#FDFBF7] mt-1.5">
                    {inspectedProduct.name}
                  </h3>
                  <p className="text-xs text-[#E5D3B3] mt-2 leading-relaxed">
                    {inspectedProduct.description}
                  </p>

                  <div className="mt-4 space-y-2 bg-[#120A05] p-3 rounded-xl border border-[#D4AF37]/20 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-[#A68318]">Pack Format:</span>
                      <span className="font-bold text-white">{inspectedProduct.packInfo}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A68318]">Shelf Life:</span>
                      <span className="font-bold text-white">{inspectedProduct.shelfLife}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A68318]">Best Suited For:</span>
                      <span className="font-bold text-white">{inspectedProduct.specs.idealFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#A68318]">Min Order (MOQ):</span>
                      <span className="font-bold text-[#D4AF37]">{inspectedProduct.specs.minimumOrder}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    onClick={() => {
                      playUiClick();
                      onAddToCart(inspectedProduct);
                      setInspectedProduct(null);
                    }}
                    className="flex-1 bg-gradient-to-r from-[#D4AF37] to-amber-500 hover:from-amber-500 hover:to-[#D4AF37] text-[#120A05] font-extrabold py-3 rounded-xl text-xs shadow-lg transition-all text-center"
                  >
                    + Add to B2B/B2C Quote
                  </button>
                  <a
                    href={`https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20would%20like%20to%20enquire%20about%20bulk%20wholesale%20supply%20for%20*${encodeURIComponent(
                      inspectedProduct.name
                    )}*%20in%20Andhra%20Pradesh.`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center shadow"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// 3D Tilt Card Component
interface Product3DCardProps {
  product: ProductItem;
  onAddToCart: () => void;
  onInspect: () => void;
}

const Product3DCard: React.FC<Product3DCardProps> = ({ product, onAddToCart, onInspect }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.y}deg) rotateY(${rotate.x}deg)`,
      }}
      className={`group bg-gradient-to-b from-[#1E0F08] to-[#150B05] rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-xl ${
        product.packWeight === '1 KG Packet'
          ? 'border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]'
          : 'border-[#D4AF37]/25 hover:border-[#D4AF37]/80'
      }`}
    >
      <div>
        {/* Card Visual Header with Image */}
        <div
          className="relative h-48 sm:h-52 bg-black/40 overflow-hidden cursor-pointer flex items-center justify-center p-3"
          onClick={() => {
            playUiClick();
            onInspect();
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
            <span className="bg-[#120A05]/95 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-extrabold px-2.5 py-0.5 rounded backdrop-blur-sm">
              {product.packWeight || product.categoryLabel}
            </span>

            {product.is3dSpecial && (
              <span className="bg-[#D4AF37] text-[#120A05] text-[10px] font-extrabold px-2 py-0.5 rounded shadow flex items-center gap-1 animate-pulse">
                <span>⭐</span> White Chocolate
              </span>
            )}
          </div>

          {/* 3D Inspect Hover Indicator */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-[#180B06]/90 border border-[#D4AF37] text-[#D4AF37] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg">
              🔍 Inspect in 3D
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#A68318] font-bold uppercase">
              {product.targetSegment}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold">
              AP Delivery
            </span>
          </div>

          <h3
            className="font-serif-title font-bold text-[#FDFBF7] text-sm sm:text-base group-hover:text-[#D4AF37] transition-colors leading-snug cursor-pointer"
            onClick={() => {
              playUiClick();
              onInspect();
            }}
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#E5D3B3] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="pt-2">
            <div className="bg-[#120A05] p-2 rounded-lg border border-[#D4AF37]/20 flex items-center justify-between text-[11px]">
              <span className="text-[#A68318] font-medium">Packing:</span>
              <span className="font-bold text-[#FDFBF7]">{product.packInfo}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-5 pt-0 space-y-2">
        <button
          onClick={() => {
            playUiClick();
            onAddToCart();
          }}
          className="w-full bg-gradient-to-r from-[#5C3420] to-[#3D2314] hover:from-[#D4AF37] hover:to-amber-500 text-[#D4AF37] hover:text-[#120A05] font-extrabold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-1.5 border border-[#D4AF37]/40 shadow hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]"
        >
          <span>+ Add to Quote Drawer</span>
        </button>
      </div>
    </div>
  );
};
