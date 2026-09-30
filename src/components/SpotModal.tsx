import React from 'react';
import { Sparkles, AlertTriangle, FileText, Check, ArrowRight, ShieldAlert, Award } from 'lucide-react';
import { SearchSpot, Player } from '../types/game';
import { CreditCardDisplay } from './CreditCardDisplay';

interface SpotModalProps {
  spot: SearchSpot | null;
  player: Player;
  onClose: () => void;
  onClaimVictory?: () => void;
}

export const SpotModal: React.FC<SpotModalProps> = ({
  spot,
  player,
  onClose,
  onClaimVictory,
}) => {
  if (!spot) return null;

  const { content } = spot;
  const isWinnerCard = content.type === 'CREDIT_CARD';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-lg rounded-3xl bg-slate-900 border p-6 sm:p-8 shadow-2xl overflow-hidden ${
          isWinnerCard
            ? 'border-amber-500/80 shadow-amber-500/20'
            : content.type === 'TRAP'
            ? 'border-red-500/50 shadow-red-500/10'
            : content.type === 'CLUE'
            ? 'border-blue-500/50 shadow-blue-500/10'
            : 'border-slate-800'
        }`}
      >
        {/* Subtle Ambient Background Glow */}
        {isWinnerCard && (
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
        )}

        {/* Header Kicker */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400">
            Searched: <span className="text-slate-200 font-bold">{spot.name}</span>
          </div>
          <div className="text-xs font-mono text-amber-400">
            Inspector: {player.name}
          </div>
        </div>

        {/* Content Body Based on Type */}
        {isWinnerCard ? (
          <div className="text-center space-y-5 my-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>THE LOST BLACK CARD HAS BEEN LOCATED!</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500">
              WE HAVE A WINNER!
            </h3>

            {/* Jackpot Cash Banner */}
            <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-amber-950/60 to-yellow-950/40 border border-amber-400/60 shadow-lg">
              <div className="text-[10px] font-mono uppercase text-amber-300 font-bold">
                Grand Prize Deposited:
              </div>
              <div className="font-mono text-xs sm:text-sm font-black text-emerald-400 break-all">
                +$100,000,000,000,000,000,000,000,000,000,000
              </div>
            </div>

            {/* Realistic Black Titanium Card Component */}
            <div className="flex justify-center py-2">
              <CreditCardDisplay cardHolderName={player.name} isWinnerRevealed={true} />
            </div>

            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              {content.description}
            </p>

            <button
              onClick={() => {
                if (onClaimVictory) onClaimVictory();
                onClose();
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-5 h-5 text-slate-950" />
              <span>CLAIM THE VICTORY TROPHY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : content.type === 'CLUE' ? (
          <div className="space-y-4 my-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mx-auto">
              <FileText className="w-6 h-6" />
            </div>

            <div className="text-center">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-400">
                Encrypted Intel Discovered
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{content.title}</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/30 text-center">
              <div className="text-xs font-mono text-slate-400 mb-1">Decrypted Dossier</div>
              <div className="text-sm font-semibold text-blue-200">
                "{content.clueData?.text || content.description}"
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center leading-relaxed">
              {content.description} This intelligence has been logged into your detective notebook.
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Record Intel & Continue</span>
              <Check className="w-4 h-4 text-emerald-400" />
            </button>
          </div>
        ) : content.type === 'DECOY_CARD' ? (
          <div className="space-y-4 my-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-yellow-400">
                False Lead / Decoy Card
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{content.title}</h3>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800">
              <div className="text-xs font-mono text-slate-500 mb-1">Item Found:</div>
              <div className="font-mono text-sm font-bold text-yellow-300">
                "{content.decoyTitle || 'Plastic Card'}"
              </div>
              <div className="text-xs text-slate-400 mt-2">{content.description}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              Keep Searching
            </button>
          </div>
        ) : content.type === 'TRAP' ? (
          <div className="space-y-4 my-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 mx-auto animate-bounce">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-red-400">
                Security Alarm Triggered
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-1">{content.title}</h3>
            </div>

            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-500/40">
              <div className="text-xs font-mono text-red-300 mb-1">Penalty Applied:</div>
              <div className="text-sm font-bold text-red-200">{content.trapPenalty}</div>
              <div className="text-xs text-slate-400 mt-2">{content.description}</div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-red-900/60 hover:bg-red-800/80 text-white font-semibold text-xs border border-red-500/50 transition-colors"
            >
              Acknowledge & Continue
            </button>
          </div>
        ) : (
          /* EMPTY SPOT */
          <div className="space-y-4 my-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 mx-auto">
              <Check className="w-6 h-6" />
            </div>

            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Inspection Result
              </div>
              <h3 className="text-lg font-bold text-slate-200 mt-1">{content.title}</h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed px-4">
              {content.description}
            </p>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              Close & Keep Searching
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
