import React, { useState } from 'react';
import { Users, Bot, User, Play, Sparkles, Check, Plus, Minus } from 'lucide-react';
import { Player, GameMode, COSMIC_FORTUNE_STRING } from '../types/game';

export const DEFAULT_PLAYER_TEMPLATES: Omit<Player, 'id' | 'searchesCount' | 'score' | 'cluesDiscovered'>[] = [
  {
    name: 'Agent Cash',
    roleTitle: 'Master Sleuth',
    avatarSeed: 'cash',
    color: '#f59e0b', // Amber / Gold
    isAI: false,
    balance: COSMIC_FORTUNE_STRING,
    luckLevel: 0,
    hasCosmicLuck: false,
  },
  {
    name: 'Baron Vault',
    roleTitle: 'Rival Collector',
    avatarSeed: 'vault',
    color: '#06b6d4', // Cyan
    isAI: false,
    balance: COSMIC_FORTUNE_STRING,
    luckLevel: 0,
    hasCosmicLuck: false,
  },
  {
    name: 'Sly Emerald',
    roleTitle: 'Silent Operative',
    avatarSeed: 'emerald',
    color: '#10b981', // Emerald
    isAI: false,
    balance: COSMIC_FORTUNE_STRING,
    luckLevel: 0,
    hasCosmicLuck: false,
  },
  {
    name: 'Countess Ruby',
    roleTitle: 'Elite Heiress',
    avatarSeed: 'ruby',
    color: '#f43f5e', // Rose
    isAI: false,
    balance: COSMIC_FORTUNE_STRING,
    luckLevel: 0,
    hasCosmicLuck: false,
  },
  {
    name: 'Shadow Violet',
    roleTitle: 'Crypto Infiltrator',
    avatarSeed: 'shadow',
    color: '#a855f7', // Purple
    isAI: false,
    balance: COSMIC_FORTUNE_STRING,
    luckLevel: 0,
    hasCosmicLuck: false,
  },
];

interface PlayerSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPlayers: Player[];
  currentMode: GameMode;
  onStartGame: (players: Player[], mode: GameMode) => void;
}

export const PlayerSetupModal: React.FC<PlayerSetupModalProps> = ({
  isOpen,
  onClose,
  currentPlayers,
  currentMode,
  onStartGame,
}) => {
  const [playerCount, setPlayerCount] = useState<number>(Math.max(1, currentPlayers.length || 2));
  const [selectedMode, setSelectedMode] = useState<GameMode>(currentMode);
  const [playersList, setPlayersList] = useState<Array<{ name: string; isAI: boolean; color: string }>>(() => {
    return DEFAULT_PLAYER_TEMPLATES.map((tmpl, idx) => {
      const existing = currentPlayers[idx];
      return {
        name: existing ? existing.name : tmpl.name,
        isAI: existing?.isAI ?? (idx === 1 && currentPlayers.length === 2 && currentPlayers[1]?.isAI ? true : false),
        color: tmpl.color,
      };
    });
  });

  if (!isOpen) return null;

  const handlePlayerCountChange = (count: number) => {
    const validCount = Math.min(5, Math.max(1, count));
    setPlayerCount(validCount);
    if (validCount === 1 && selectedMode !== 'SOLO_TIME_ATTACK') {
      // Keep as multiplayer with AI or offer Time Attack
    }
  };

  const handleNameChange = (index: number, newName: string) => {
    setPlayersList((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], name: newName };
      return copy;
    });
  };

  const handleToggleAI = (index: number) => {
    setPlayersList((prev) => {
      const copy = [...prev];
      const current = copy[index];
      const willBeAI = !current.isAI;
      let newName = current.name;
      if (willBeAI && !current.name.includes('(AI)')) {
        newName = `${current.name} (AI)`;
      } else if (!willBeAI && current.name.includes('(AI)')) {
        newName = current.name.replace(' (AI)', '');
      }
      copy[index] = {
        ...current,
        isAI: willBeAI,
        name: newName,
      };
      return copy;
    });
  };

  const handleConfirm = () => {
    const finalPlayers: Player[] = [];
    for (let i = 0; i < playerCount; i++) {
      const p = playersList[i];
      const template = DEFAULT_PLAYER_TEMPLATES[i];
      finalPlayers.push({
        id: `p${i + 1}`,
        name: p.name.trim() || `Player ${i + 1}`,
        roleTitle: template.roleTitle,
        avatarSeed: template.avatarSeed,
        color: template.color,
        score: 0,
        searchesCount: 0,
        cluesDiscovered: [],
        isAI: p.isAI,
        balance: template.balance,
        luckLevel: 0,
        hasCosmicLuck: false,
      });
    }

    onStartGame(finalPlayers, selectedMode);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-slate-900 border border-amber-500/50 p-6 sm:p-8 shadow-2xl my-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold tracking-widest uppercase mb-2">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Game Setup & Roster</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-100">
            How Many Players Are Playing?
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose from 1 to 5 players. Pass and play on this device or add smart AI detective bots!
          </p>
        </div>

        {/* Player Count Selection Buttons */}
        <div className="mb-6">
          <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-2.5 text-center">
            Select Number of Players
          </label>
          <div className="grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((count) => {
              const isSelected = playerCount === count;
              return (
                <button
                  key={count}
                  type="button"
                  onClick={() => handlePlayerCountChange(count)}
                  className={`py-3 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-400/25 font-bold scale-105'
                      : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <span className="text-lg font-mono font-black">{count}</span>
                  <span className="text-[10px] tracking-tight uppercase opacity-90">
                    {count === 1 ? 'Solo' : 'Players'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mode Selector if 1 player */}
        {playerCount === 1 && (
          <div className="mb-6 p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-xs font-mono text-slate-400 mb-2">Solo Game Mode:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMode('MULTIPLAYER')}
                className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  selectedMode === 'MULTIPLAYER'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-slate-200">Solo Detective</div>
                <div className="text-[10px] text-slate-400">Casual search with radar & clues</div>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMode('SOLO_TIME_ATTACK')}
                className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                  selectedMode === 'SOLO_TIME_ATTACK'
                    ? 'bg-amber-500/20 text-amber-200 border-amber-500/50'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-bold text-slate-200">Time Attack (90s)</div>
                <div className="text-[10px] text-slate-400">Race the ticking clock</div>
              </button>
            </div>
          </div>
        )}

        {/* Players Customization List */}
        <div className="space-y-3 mb-6 max-h-56 overflow-y-auto pr-1">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Active Investigators ({playerCount})
          </div>

          {Array.from({ length: playerCount }).map((_, index) => {
            const player = playersList[index];
            const template = DEFAULT_PLAYER_TEMPLATES[index];

            return (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800"
              >
                {/* Color Pip and Avatar badge */}
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border border-white/10"
                  style={{
                    backgroundColor: `${player.color}25`,
                    color: player.color,
                  }}
                >
                  {player.isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                {/* Player Name Input */}
                <div className="flex-1">
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Player ${index + 1}`}
                    maxLength={18}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-100 font-semibold focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Human vs Bot Toggle (available for slot 2+) */}
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleToggleAI(index)}
                    className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium border flex items-center gap-1.5 transition-colors shrink-0 ${
                      player.isAI
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                    title={player.isAI ? 'Switch to Human Player' : 'Switch to AI Bot'}
                  >
                    {player.isAI ? (
                      <>
                        <Bot className="w-3.5 h-3.5" />
                        <span>AI Bot</span>
                      </>
                    ) : (
                      <>
                        <User className="w-3.5 h-3.5" />
                        <span>Human</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-bold text-xs tracking-wide shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Start Game with {playerCount} {playerCount === 1 ? 'Player' : 'Players'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
