import React, { useState } from 'react';
import { playUiClick } from '../utils/audioEffects';

export const CustomerInquiryChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user'; text: string }[]>([
    {
      sender: 'bot',
      text: 'Namaste! Welcome to Sowmiya Enterprises (Tirupati). We supply 1 KG packets of Signature Lemon Tea, NesTea, Coffee, Milk Powder, Milkybar chocolates, and coffee vending machines across Andhra Pradesh (B2B & B2C). How may I assist you today?',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickReplies = [
    { label: '📦 1 KG Packets', query: 'What 1 KG packets are available?' },
    { label: '🏢 B2B vs B2C', query: 'Do you supply to B2B institutions and B2C?' },
    { label: '🚚 AP Districts', query: 'Do you supply only to Andhra Pradesh?' },
    { label: '☕ Vending Machines', query: 'Tell me about coffee vending machine setup.' },
  ];

  const handleSend = (userMsg: string) => {
    if (!userMsg.trim()) return;

    playUiClick();
    const newLogs = [...messages, { sender: 'user' as const, text: userMsg }];
    setMessages(newLogs);
    setInputText('');

    setTimeout(() => {
      const lower = userMsg.toLowerCase();
      let botResponse = '';

      if (lower.includes('1 kg') || lower.includes('1kg') || lower.includes('packet') || lower.includes('signature') || lower.includes('lemon') || lower.includes('nestea')) {
        botResponse = 'Yes! We have standard 1 KG commercial packets available in Signature Lemon Tea, NesTea Premix, Premium Coffee Powder, and Everyday Dairy Whitener / Milk Powder, ready for dispatch across AP.';
      } else if (lower.includes('b2b') || lower.includes('b2c') || lower.includes('model') || lower.includes('institution') || lower.includes('customer')) {
        botResponse = 'We cater to both! B2B Institutional Supply for CA offices, corporate firms, factories, hospitals, and railway kiosks, as well as Direct Commercial Wholesale (B2C) for caterers and event bulk buyers in Andhra Pradesh.';
      } else if (lower.includes('telangana') || lower.includes('andhra') || lower.includes('ap') || lower.includes('district') || lower.includes('state')) {
        botResponse = 'We distribute EXCLUSIVELY to Andhra Pradesh (serving all 26 AP districts: Tirupati, Chittoor, Nellore, Kadapa, Anantapur, Kurnool, Guntur, Vijayawada, Visakhapatnam, etc.). We do not distribute to Telangana.';
      } else if (lower.includes('vending') || lower.includes('machine') || lower.includes('dispenser')) {
        botResponse = 'We provide 2-canister and 4-canister automatic hot beverage dispensers with installation, calibration, and technician maintenance support anywhere in Andhra Pradesh.';
      } else if (lower.includes('choc') || lower.includes('milkybar') || lower.includes('kitkat') || lower.includes('munch')) {
        botResponse = 'We supply master cartons of Milkybar creamy white chocolate, KitKat 4-finger wafers, and Munch Max directly from our Tirupati warehouse.';
      } else {
        botResponse = 'Thank you for your enquiry! For instant wholesale quotation or direct coordination, click below to WhatsApp proprietor Mr. V. Sundareshan.';
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#180B06] border-2 border-[#D4AF37] rounded-3xl shadow-2xl overflow-hidden flex flex-col text-[#FDFBF7] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#2A160E] p-4 border-b border-[#D4AF37]/30 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#120A05] flex items-center justify-center font-bold text-sm shadow">
                ☕
              </div>
              <div>
                <h4 className="font-serif-title font-bold text-xs text-white">
                  Sowmiya AP Assistant
                </h4>
                <span className="text-[10px] text-[#D4AF37] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> B2B & B2C Andhra Pradesh
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playUiClick();
                setIsOpen(false);
              }}
              className="text-[#E5D3B3] hover:text-white font-bold text-xl px-1"
            >
              &times;
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#120A05]/70 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#5C3420] text-[#D4AF37] font-semibold rounded-tr-none'
                      : 'bg-[#2A160E] text-[#FDFBF7] border border-[#D4AF37]/25 rounded-tl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="p-2.5 bg-[#180B06] border-t border-[#D4AF37]/20 flex flex-wrap gap-1.5">
            {quickReplies.map((qr, i) => (
              <button
                key={i}
                onClick={() => handleSend(qr.query)}
                className="text-[10px] bg-[#2A160E] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#120A05] font-bold border border-[#D4AF37]/30 px-2.5 py-1 rounded-full transition-colors"
              >
                {qr.label}
              </button>
            ))}
          </div>

          {/* Input & WhatsApp Action */}
          <div className="p-3 bg-[#2A160E] border-t border-[#D4AF37]/30 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputText)}
                placeholder="Ask about 1kg packs, vending, AP districts..."
                className="w-full bg-[#120A05] border border-[#D4AF37]/30 text-xs rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => handleSend(inputText)}
                className="bg-[#D4AF37] hover:bg-amber-400 text-[#120A05] px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow"
              >
                ➤
              </button>
            </div>

            <a
              href="https://wa.me/919390488777?text=Hello%20Sowmiya%20Enterprises%2C%20I%20have%20an%20enquiry%20regarding%20products%20and%20coffee%20vending%20machines%20in%20Andhra%20Pradesh."
              target="_blank"
              rel="noreferrer"
              className="block w-full text-center bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl text-[11px] transition-colors shadow"
            >
              💬 WhatsApp Founder (V. Sundareshan)
            </a>
          </div>

        </div>
      )}

      {/* Floating 3D Button */}
      <button
        onClick={() => {
          playUiClick();
          setIsOpen(!isOpen);
        }}
        className="group relative bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] hover:from-amber-400 hover:to-[#D4AF37] text-[#120A05] p-4 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.6)] border-2 border-white flex items-center justify-center transition-all transform hover:scale-110 active:scale-95"
        title="Open Sowmiya AP Assistant"
      >
        <span className="text-2xl">☕</span>
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#180B06]">
          AP
        </span>
      </button>
    </div>
  );
};
