import React, { useState } from 'react';
import { CartItem, ProductItem } from './types';
import { Navbar } from './components/Navbar';
import { ThirumalaNamamHero } from './components/ThirumalaNamamHero';
import { ThreeCoffeeCanvas } from './components/ThreeCoffeeCanvas';
import { ProductCatalog3D } from './components/ProductCatalog3D';
import { CoffeeVideosSection } from './components/CoffeeVideosSection';
import { GodownFacilitySection } from './components/GodownFacilitySection';
import { VendingCalculatorSection } from './components/VendingCalculatorSection';
import { TechnicianServices } from './components/TechnicianServices';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { B2BQuoteDrawer } from './components/B2BQuoteDrawer';
import { CustomerInquiryChatbot } from './components/CustomerInquiryChatbot';
import { Global3DFloatingBeans } from './components/Global3DFloatingBeans';
import { AmbientMusicBar } from './components/AmbientMusicBar';
import { playUiClick } from './utils/audioEffects';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (product: ProductItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    showToast(`Added "${product.name}" to B2B Quote Drawer`);
  };

  const handleUpdateQty = (productId: string, change: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + change;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('B2B Quote Drawer cleared');
  };

  const scrollToSection = (id: string) => {
    playUiClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#120A05] text-[#FDFBF7] flex flex-col font-sans selection:bg-[#D4AF37] selection:text-[#180B06] relative">
      {/* Global 3D Ambient Floating Beans & Choco Chips */}
      <Global3DFloatingBeans />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 bg-[#180B06] border-2 border-[#D4AF37] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <span className="text-xl">☕</span>
          <span className="text-xs font-bold text-[#FDFBF7]">{toastMessage}</span>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        cartCount={cart.length}
        onOpenCart={() => setIsCartOpen(true)}
        onEnquireClick={() => scrollToSection('contact')}
      />

      <main className="flex-grow">
        {/* 1. Divine Tirumala Hill & Sacred 3D Namam Integration */}
        <ThirumalaNamamHero
          onExploreProducts={() => scrollToSection('products')}
          onRequestQuote={() => scrollToSection('contact')}
        />

        {/* 2. Interactive Three.js 3D Floating Coffee Beans & 3D Floating Mug Canvas */}
        <section id="3d-canvas" className="py-12 bg-[#120A05] border-b border-[#D4AF37]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
              Interactive 3D Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif-title font-bold text-[#FDFBF7]">
              Floating Coffee Beans & Ceramic Mug Simulation
            </h2>
            <p className="text-xs sm:text-sm text-[#E5D3B3] max-w-xl mx-auto">
              Inspect roasted coffee beans floating in 3D zero-gravity space with interactive camera controls, creaming stir action, and procedural steam.
            </p>
          </div>
          <ThreeCoffeeCanvas />
        </section>

        {/* 3. Product Catalog with User's Uploaded Milkybar Image */}
        <ProductCatalog3D onAddToCart={handleAddToCart} />

        {/* 4. Coffee Videos (People Drinking Coffee & Floating Mug) */}
        <CoffeeVideosSection
          onSelectBeverage={(beverageName) => {
            scrollToSection('products');
            showToast(`Find ${beverageName} in our B2B Product Catalog below`);
          }}
        />

        {/* 5. Godown Stockroom & Computer Logistics Desk Section */}
        <GodownFacilitySection />

        {/* 6. Vending Machine Selection & ROI Calculator */}
        <VendingCalculatorSection />

        {/* 7. Dedicated Technician Services */}
        <TechnicianServices />

        {/* 8. Direct Business Contact & Inquiry Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-out B2B Quote Drawer */}
      <B2BQuoteDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onClear={handleClearCart}
      />

      {/* 3D Floating Customer Inquiry Chatbot */}
      <CustomerInquiryChatbot />

      {/* 100% Royalty-Free Procedural Ambient Music Player */}
      <AmbientMusicBar />
    </div>
  );
}
