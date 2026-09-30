import React, { useEffect, useRef } from 'react';
import { Trophy, Sparkles, RotateCcw, Share2, Award, CheckCircle } from 'lucide-react';
import { Player, GameMode } from '../types/game';
import { CreditCardDisplay } from './CreditCardDisplay';

interface WinnerCelebrationProps {
  winner: Player;
  mode: GameMode;
  totalRounds: number;
  totalSearches: number;
  winningLocationName: string;
  winningRoomName: string;
  onPlayAgain: () => void;
}

export const WinnerCelebration: React.FC<WinnerCelebrationProps> = ({
  winner,
  mode,
  totalRounds,
  totalSearches,
  winningLocationName,
  winningRoomName,
  onPlayAgain,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Confetti particles loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#f59e0b', '#fbbf24', '#fef08a', '#38bdf8', '#a855f7', '#ffffff'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      vRot: number;
    }> = [];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * -canvas.height,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 8,
      });
    }

    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300 overflow-y-auto">
      {/* Background Confetti Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Main Winner Card Panel */}
      <div className="relative z-20 w-full max-w-2xl rounded-3xl bg-slate-900 border-2 border-amber-500/80 p-6 sm:p-10 shadow-2xl text-center overflow-hidden my-auto">
        {/* Ambient Top Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Kicker */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-4">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>OFFICIAL WINNER CROWNED</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-500 tracking-tight">
          {winner.name} IS THE WINNER!
        </h1>

        {/* Grand Prize Cash Banner */}
        <div className="my-3 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-yellow-900/40 to-slate-950 border-2 border-amber-400 shadow-xl inline-block max-w-xl mx-auto">
          <div className="text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold">
            💰 GRAND CASH PRIZE AWARDED 💰
          </div>
          <div className="font-mono text-sm sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-emerald-400 tracking-wider select-all break-all">
            +$100,000,000,000,000,000,000,000,000,000,000
          </div>
          <div className="text-[10px] font-mono text-slate-400">
            Deposited into Winner's Centurion Titanium Account · Ready to Boost Luck
          </div>
        </div>

        <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto mt-1 leading-relaxed">
          Found the authentic <span className="text-amber-300 font-semibold">Centurion Black Diamond Credit Card</span> hidden inside the{' '}
          <span className="text-slate-100 font-semibold">{winningLocationName}</span> ({winningRoomName})!
        </p>

        {/* The Winner's Physical Black Card Trophy Display */}
        <div className="flex justify-center my-6">
          <CreditCardDisplay cardHolderName={winner.name} isWinnerRevealed={true} />
        </div>

        {/* Match Statistics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-8">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Winning Round</div>
            <div className="text-lg font-bold font-mono text-amber-300 mt-0.5">Round #{totalRounds}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Searches Made</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">{winner.searchesCount}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Total Field Checks</div>
            <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">{totalSearches}</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="text-[10px] font-mono text-slate-400 uppercase">Card Status</div>
            <div className="text-xs font-bold font-mono text-emerald-400 mt-1 flex items-center justify-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-sm tracking-wide shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Next Round</span>
          </button>
        </div>
      </div>
    </div>
  );
};
