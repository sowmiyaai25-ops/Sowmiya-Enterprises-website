import React from 'react';
import { CartItem } from '../types';
import { playUiClick } from '../utils/audioEffects';

interface B2BQuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (productId: string, change: number) => void;
  onClear: () => void;
}

export const B2BQuoteDrawer: React.FC<B2BQuoteDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onClear,
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleExportWhatsApp = () => {
    if (cart.length === 0) return;

    let text = 'Hello Sowmiya Enterprises (Mr. V. Sundareshan),%0A%0A' +
      'I would like to request an official wholesale B2B quotation for the following items:%0A%0A';

    cart.forEach((item, idx) => {
      text += `${idx + 1}. *${encodeURIComponent(item.product.name)}* - ${item.quantity} Master Case(s)/Unit(s) (${encodeURIComponent(item.product.packInfo)})%0A`;
    });

    text += '%0A*Delivery District / City in Andhra Pradesh:* %0A*Company / Establishment Name:* %0A%0APlease provide pricing, GST invoicing, and dispatch timeline.';

    window.open(`https://wa.me/919390488777?text=${text}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#180B06] border-l-2 border-[#D4AF37]/50 text-[#FDFBF7] z-50 transform transition-transform duration-300 flex flex-col justify-between shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#D4AF37]/30 bg-[#2A160E] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">📋</span>
            <div>
              <h3 className="font-serif-title font-bold text-base text-[#FDFBF7]">
                B2B Quote Drawer
              </h3>
              <p className="text-[10px] text-[#D4AF37]">
                Compile items for wholesale pricing & delivery
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playUiClick();
              onClose();
            }}
            className="text-[#E5D3B3] hover:text-white text-2xl font-bold p-1"
          >
            &times;
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 flex-grow overflow-y-auto space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3 text-[#E5D3B3]">
              <span className="text-4xl block">☕</span>
              <p className="text-xs italic">
                Your B2B quote drawer is empty.
              </p>
              <p className="text-[11px] text-[#A68318]">
                Click "+ Add to B2B Quote" on any product in the 3D catalogue to build your custom wholesale request!
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                className="bg-[#2A160E] p-3.5 rounded-2xl border border-[#D4AF37]/25 flex items-center justify-between text-xs space-y-1"
              >
                <div className="max-w-[62%]">
                  <p className="font-bold text-[#FDFBF7] leading-snug">
                    {item.product.name}
                  </p>
                  <p className="text-[10px] text-[#D4AF37]">
                    {item.product.categoryLabel} · {item.product.packInfo}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#120A05] px-2 py-1 rounded-xl border border-[#D4AF37]/30">
                  <button
                    onClick={() => {
                      playUiClick();
                      onUpdateQty(item.product.id, -1);
                    }}
                    className="text-[#D4AF37] hover:text-white font-bold px-1.5 text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-white min-w-6 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => {
                      playUiClick();
                      onUpdateQty(item.product.id, 1);
                    }}
                    className="text-[#D4AF37] hover:text-white font-bold px-1.5 text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-[#D4AF37]/30 bg-[#2A160E] space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#E5D3B3]">Total Lines:</span>
            <span className="font-serif-title font-bold text-base text-[#D4AF37]">
              {cart.length} Lines ({totalItems} Cases/Units)
            </span>
          </div>

          <button
            onClick={() => {
              playUiClick();
              handleExportWhatsApp();
            }}
            disabled={cart.length === 0}
            className={`w-full py-3.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shadow-lg ${
              cart.length === 0
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-emerald-700 hover:bg-emerald-600 text-white hover:scale-[1.02]'
            }`}
          >
            <span>💬 Export Quote to WhatsApp (+91 9390488777)</span>
          </button>

          {cart.length > 0 && (
            <button
              onClick={() => {
                playUiClick();
                onClear();
              }}
              className="w-full text-center text-[11px] text-[#E5D3B3]/70 hover:text-[#D4AF37] py-1 transition-colors"
            >
              Clear Entire Drawer
            </button>
          )}
        </div>
      </div>
    </>
  );
};
