import React, { useState } from 'react';
import { Wifi, Sparkles, Award, ShieldCheck } from 'lucide-react';
import { CARD_IMAGE_PATH } from '../data/gameData';

interface CreditCardDisplayProps {
  cardHolderName?: string;
  isWinnerRevealed?: boolean;
  compact?: boolean;
}

export const CreditCardDisplay: React.FC<CreditCardDisplayProps> = ({
  cardHolderName = 'CHAMPION INVESTIGATOR',
  isWinnerRevealed = false,
  compact = false,
}) => {
  const [flipped, setFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (compact) {
    return (
      <div className="relative w-48 h-28 rounded-xl bg-gradient-to-br from-zinc-900 via-neutral-900 to-black p-3 text-amber-100 shadow-xl border border-amber-500/30 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="text-[10px] tracking-widest uppercase font-mono text-amber-400 font-semibold">
            Centurion Black
          </div>
          <Wifi className="w-3.5 h-3.5 text-amber-300/80 rotate-90" />
        </div>
        <div className="font-mono text-xs tracking-wider text-slate-200">
          7749 •••• •••• 4401
        </div>
        <div className="flex justify-between items-end text-[9px] font-mono text-slate-400">
          <span className="truncate max-w-[100px] uppercase font-bold text-amber-200">{cardHolderName}</span>
          <span>12/32</span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer group perspective-1000 select-none transition-transform duration-300 hover:scale-[1.02]"
      title="Click to flip card"
    >
      <div
        className={`relative w-80 sm:w-96 h-48 sm:h-56 rounded-2xl transition-all duration-700 transform-style-3d shadow-2xl ${
          flipped ? 'rotate-y-180' : ''
        } ${isWinnerRevealed ? 'ring-4 ring-amber-400/80 shadow-amber-500/40 glow-gold' : 'border border-amber-500/40'}`}
      >
        {/* FRONT OF CARD */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-zinc-950 via-neutral-900 to-stone-950 p-6 flex flex-col justify-between overflow-hidden backface-hidden shadow-2xl">
          {/* Subtle card photo overlay if loaded */}
          {!imageError && (
            <img
              src={CARD_IMAGE_PATH}
              alt="Titanium Black Card Texture"
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay pointer-events-none"
            />
          )}

          {/* Brushed metallic reflection sheen */}
          <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-12 pointer-events-none group-hover:translate-x-1/2 transition-transform duration-1000" />

          {/* Card Header */}
          <div className="flex justify-between items-start z-10">
            <div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-display font-bold tracking-widest text-sm text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-100">
                  BLACK DIAMOND
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-mono">
                Centurion Infinite Tier
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-amber-300 rotate-90" />
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-[10px] font-bold text-black shadow-inner">
                VIP
              </div>
            </div>
          </div>

          {/* Gold Embossed EMV Chip & Contactless */}
          <div className="flex items-center justify-between z-10 my-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-600 p-0.5 shadow-md flex items-center justify-center border border-yellow-200/50">
                <div className="w-full h-full border border-yellow-800/40 rounded grid grid-cols-2 grid-rows-2 opacity-70">
                  <div className="border-r border-b border-yellow-900/40"></div>
                  <div className="border-b border-yellow-900/40"></div>
                  <div className="border-r border-yellow-900/40"></div>
                  <div></div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-[10px] font-mono text-amber-400/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>UNLIMITED LIMIT</span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 font-bold tracking-tight">
                  +$100,000,000,000,000,000,000,000,000,000,000
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-mono uppercase text-amber-300/80 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                COSMIC LUCK +$10^32
              </span>
            </div>
          </div>

          {/* Card Number */}
          <div className="z-10">
            <div className="font-mono text-lg sm:text-xl tracking-[0.2em] font-semibold text-slate-100 drop-shadow">
              7749 •••• •••• 4401
            </div>
          </div>

          {/* Card Footer: Holder & Valid Thru */}
          <div className="flex justify-between items-end z-10 pt-1 border-t border-white/10">
            <div>
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Cardholder & Winner
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold tracking-wider text-amber-300 uppercase truncate max-w-[200px]">
                {cardHolderName}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                Valid Thru
              </div>
              <div className="font-mono text-xs sm:text-sm font-semibold text-slate-200">
                12/32
              </div>
            </div>
          </div>
        </div>

        {/* BACK OF CARD */}
        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-neutral-900 to-black p-6 flex flex-col justify-between overflow-hidden backface-hidden rotate-y-180 border border-amber-500/30 shadow-2xl">
          <div className="-mx-6 -mt-1 h-10 bg-black/90 border-y border-neutral-700/50"></div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 h-8 bg-neutral-200/90 rounded px-3 flex items-center justify-between text-neutral-800 font-mono text-xs">
              <span className="italic text-[10px] text-neutral-600">Authorized Signature Required</span>
              <span className="font-bold tracking-widest text-black">882</span>
            </div>
            <div className="w-10 h-8 rounded border border-neutral-600 flex items-center justify-center">
              <Award className="w-4 h-4 text-amber-400" />
            </div>
          </div>

          <div className="text-[9px] text-slate-400 leading-relaxed font-mono">
            This card is the exclusive property of the Black Diamond Vault Syndicate.
            Finder is authenticated as the Grand Champion Winner with unlimited credit privileges.
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-amber-400/80 border-t border-white/5 pt-2">
            <span>24/7 CONCIERGE: 1-800-BLACK-VIP</span>
            <span className="text-slate-400 font-bold">CLICK TO FLIP FRONT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
