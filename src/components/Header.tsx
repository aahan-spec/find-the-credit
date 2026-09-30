import React from 'react';
import { Volume2, VolumeX, RotateCcw, HelpCircle, Users } from 'lucide-react';
import { GameMode } from '../types/game';

interface HeaderProps {
  currentMode: GameMode;
  playerCount: number;
  onOpenPlayerSetup: () => void;
  onQuickSelectPlayers: (count: number) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onNewGame: () => void;
  onOpenRules: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMode,
  playerCount,
  onOpenPlayerSetup,
  onQuickSelectPlayers,
  soundEnabled,
  onToggleSound,
  onNewGame,
  onOpenRules,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={onNewGame}
          className="text-left group flex items-center gap-2 transition-transform"
        >
          <span className="font-display text-lg sm:text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 whitespace-nowrap">
            FIND THE CARD
          </span>
        </button>

        {/* Zone 2: Clean text navigation links / Player choice controls */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {/* Quick player count selector buttons */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl">
            <span className="text-[11px] font-mono text-slate-400 px-2 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Players:</span>
            </span>
            {[1, 2, 3, 4, 5].map((cnt) => (
              <button
                key={cnt}
                onClick={() => onQuickSelectPlayers(cnt)}
                className={`w-7 h-7 rounded-lg text-xs font-mono font-bold transition-all ${
                  playerCount === cnt
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
                title={`Set to ${cnt} ${cnt === 1 ? 'Player' : 'Players'}`}
              >
                {cnt}P
              </button>
            ))}
          </div>

          <button
            onClick={onOpenPlayerSetup}
            className="text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1.5 text-xs font-semibold whitespace-nowrap"
          >
            <span>Edit Roster & Names</span>
          </button>

          <button
            onClick={onOpenRules}
            className="text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 whitespace-nowrap text-xs"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Rules & Intel</span>
          </button>
        </nav>

        {/* Zone 3: Primary action controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Player Count Opener */}
          <button
            onClick={onOpenPlayerSetup}
            className="md:hidden px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-amber-300 flex items-center gap-1.5"
            title="Choose number of players"
          >
            <Users className="w-3.5 h-3.5" />
            <span>{playerCount}P</span>
          </button>

          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Unmute sound'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-colors"
            title={soundEnabled ? 'Audio On' : 'Audio Muted'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          <button
            onClick={onOpenRules}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400"
            title="Rules"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            onClick={onNewGame}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 rounded-lg transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Board</span>
          </button>
        </div>
      </div>
    </header>
  );
};
