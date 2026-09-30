import React from 'react';
import { X, Sparkles, Zap, Shield, Compass, DollarSign, Award, CheckCircle } from 'lucide-react';
import { Player, COSMIC_FORTUNE_STRING, COSMIC_FORTUNE_FORMATTED } from '../types/game';
import { sound } from '../utils/audio';

interface LuckBoosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: Player;
  onIncreaseLuck: (playerId: string) => void;
}

export const LuckBoosterModal: React.FC<LuckBoosterModalProps> = ({
  isOpen,
  onClose,
  player,
  onIncreaseLuck,
}) => {
  if (!isOpen) return null;

  const handleActivate = () => {
    sound.playLuckBoosterSound();
    onIncreaseLuck(player.id);
  };

  const perks = [
    {
      level: 1,
      title: 'Golden Aura Detection',
      desc: 'The exact room concealing the Black Diamond Card emits a celestial golden shimmer beacon.',
      icon: Sparkles,
      color: 'text-amber-400',
    },
    {
      level: 2,
      title: 'Security Trap Immunity',
      desc: 'Laser tripwires and dye capsules are neutralized and convert into pure gold cash bonuses!',
      icon: Shield,
      color: 'text-emerald-400',
    },
    {
      level: 3,
      title: 'Quantum Radar Pinpoint',
      desc: 'RFID Radar Scanner achieves 100% pinpoint accuracy, directing you straight to the exact container.',
      icon: Compass,
      color: 'text-cyan-400',
    },
    {
      level: 4,
      title: 'Decoy Sniffer',
      desc: 'Automatically weeds out fake transit cards, punch cards, and novelty joke items across all rooms.',
      icon: Zap,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border-2 border-amber-500/60 p-6 sm:p-8 shadow-2xl overflow-hidden my-auto">
        {/* Ambient Cosmic Radial Glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center border border-amber-400/30">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>Cosmic Luck Enhancer</span>
                <span className="text-xs font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                  Tier {player.luckLevel}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Active Investigator: <span className="font-semibold text-slate-200">{player.name}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Cosmic Fortune Balance Pill */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-950 border border-amber-500/40 mb-6 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 mb-1 flex items-center justify-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-amber-400" />
            <span>Grand Fortune Value</span>
          </div>
          <div className="font-mono text-xs sm:text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 tracking-wider break-all select-all">
            {COSMIC_FORTUNE_FORMATTED}
          </div>
          <div className="text-[10px] font-mono text-slate-400 mt-1">
            $10^32 Nonillion Dollars · Unlimited VIP Centurion Line
          </div>
        </div>

        {/* Big Action Button: INCREASE LUCK */}
        <div className="mb-6">
          <button
            onClick={handleActivate}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm tracking-wide shadow-xl shadow-amber-500/25 hover:scale-[1.02] active:scale-[0.99] transition-all flex flex-col items-center justify-center gap-1"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 fill-slate-950" />
              <span>INCREASE YOUR LUCK WITH $100000000000000000000000000000000</span>
            </div>
            <span className="text-[11px] font-mono opacity-80 font-semibold">
              Tap to Supercharge Detective Instincts · Tier +1
            </span>
          </button>
        </div>

        {/* Perks Grid */}
        <div className="space-y-2.5 mb-6">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Active Cosmic Perks (Luck Tier: {player.luckLevel}/4)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {perks.map((perk) => {
              const isUnlocked = player.luckLevel >= perk.level;
              const Icon = perk.icon;

              return (
                <div
                  key={perk.level}
                  className={`p-3 rounded-2xl border transition-all ${
                    isUnlocked
                      ? 'bg-slate-950/90 border-amber-500/50 shadow-md ring-1 ring-amber-400/30'
                      : 'bg-slate-950/40 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isUnlocked ? 'bg-amber-400/20 text-amber-300' : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-100 flex items-center gap-1.5">
                        <span>{perk.title}</span>
                        {isUnlocked && (
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                        {perk.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 pt-4">
          <div className="text-[11px] font-mono text-slate-400">
            Finding the Black Card also awards this exact grand prize!
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close & Hunt
          </button>
        </div>
      </div>
    </div>
  );
};
