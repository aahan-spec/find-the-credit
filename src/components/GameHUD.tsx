import React, { useState } from 'react';
import { Radio, ChevronRight, BookOpen, Clock, Bot, User, Users, Edit3, Check } from 'lucide-react';
import { Player, GameMode } from '../types/game';

interface GameHUDProps {
  mode: GameMode;
  players: Player[];
  activePlayerIndex: number;
  actionPoints: number;
  maxActionPoints: number;
  totalTurns: number;
  timeRemaining: number;
  onUseRadar: () => void;
  onEndTurn: () => void;
  onToggleClueDrawer: () => void;
  onOpenPlayerSetup: () => void;
  onOpenLuckBooster: () => void;
  onRenamePlayer: (playerId: string, newName: string) => void;
  cluesCount: number;
  isAiThinking: boolean;
  canUseRadar: boolean;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  mode,
  players,
  activePlayerIndex,
  actionPoints,
  maxActionPoints,
  totalTurns,
  timeRemaining,
  onUseRadar,
  onEndTurn,
  onToggleClueDrawer,
  onOpenPlayerSetup,
  onOpenLuckBooster,
  onRenamePlayer,
  cluesCount,
  isAiThinking,
  canUseRadar,
}) => {
  const activePlayer = players[activePlayerIndex] || players[0];
  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);

  // Format timer if solo mode
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md space-y-4">
      {/* TOP ROW: ALL PLAYERS ROSTER CHIPS */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {players.map((p, idx) => {
            const isActive = idx === activePlayerIndex;

            return (
              <div
                key={p.id}
                className={`relative px-3 py-2 rounded-xl border transition-all flex items-center gap-2.5 shrink-0 select-none ${
                  isActive
                    ? 'shadow-lg ring-1'
                    : 'bg-slate-950/40 border-slate-800 opacity-60 hover:opacity-85'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${p.color}15`,
                        borderColor: `${p.color}80`,
                        boxShadow: `0 4px 15px -3px ${p.color}25`,
                      }
                    : {}
                }
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: `${p.color}30`,
                    color: p.color,
                  }}
                >
                  {p.isAI ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-slate-100 max-w-[120px] truncate">
                      {p.name}
                    </span>
                    {isActive && (
                      <span
                        className="w-2 h-2 rounded-full animate-ping inline-block"
                        style={{ backgroundColor: p.color }}
                      />
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {p.searchesCount} Searches
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Change Players button */}
        <button
          onClick={onOpenPlayerSetup}
          className="px-2.5 py-1.5 rounded-xl text-xs font-mono text-amber-300 hover:text-amber-200 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 transition-all flex items-center gap-1.5 shrink-0 whitespace-nowrap"
          title="Choose how many players play"
        >
          <Users className="w-3.5 h-3.5" />
          <span>{players.length} {players.length === 1 ? 'Player' : 'Players'}</span>
        </button>
      </div>

      {/* BOTTOM ROW: ACTIVE TURN DETAILS, ACTION POINTS, TACTICAL TOOLS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {mode === 'SOLO_TIME_ATTACK' ? (
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  TIME ATTACK SPEEDRUN
                </div>
                <div className="text-2xl font-mono font-bold text-amber-300">
                  {formatTime(timeRemaining)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
              style={{
                backgroundColor: `${activePlayer.color}25`,
                color: activePlayer.color,
                border: `1px solid ${activePlayer.color}50`,
              }}
            >
              {activePlayer.isAI ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <div>
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <span>Current Turn</span>
                <span className="text-[9px] text-slate-500 font-normal">· click to rename</span>
              </div>
              {editingPlayerId === activePlayer.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setEditingPlayerId(null);
                  }}
                  className="flex items-center gap-1 mt-0.5"
                >
                  <input
                    type="text"
                    value={activePlayer.name}
                    onChange={(e) => onRenamePlayer(activePlayer.id, e.target.value)}
                    onBlur={() => setEditingPlayerId(null)}
                    autoFocus
                    placeholder="Enter any name..."
                    className="bg-slate-950 border border-amber-400 rounded-lg px-2 py-0.5 text-xs text-amber-200 font-bold focus:outline-none max-w-[140px]"
                  />
                  <button
                    type="submit"
                    className="p-1 rounded bg-amber-400 text-slate-950 hover:bg-amber-300"
                    title="Save Name"
                  >
                    <Check className="w-3 h-3" />
                  </button>
                </form>
              ) : (
                <div className="text-sm font-bold text-slate-100 flex items-center gap-1.5 group">
                  <span
                    onClick={() => setEditingPlayerId(activePlayer.id)}
                    className="cursor-pointer hover:text-amber-300 transition-colors underline decoration-slate-700 hover:decoration-amber-400 underline-offset-2"
                    title="Click to change your name to anything"
                  >
                    {activePlayer.name}
                  </span>
                  <button
                    onClick={() => setEditingPlayerId(activePlayer.id)}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-amber-400 transition-opacity p-0.5"
                    title="Change your name to anything"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                  {isAiThinking && (
                    <span className="text-[10px] text-cyan-400 font-normal animate-pulse">
                      (Searching room...)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Point Pips & Round */}
        <div className="flex items-center gap-4 py-1.5 px-4 bg-slate-950/70 rounded-xl border border-slate-800/80">
          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider text-center">
              Action Points
            </div>
            <div className="flex items-center gap-1.5 justify-center mt-0.5">
              {Array.from({ length: maxActionPoints }).map((_, i) => (
                <div
                  key={i}
                  className={`w-3.5 h-3.5 rounded-sm transition-all ${
                    i < actionPoints
                      ? 'shadow-sm'
                      : 'bg-slate-800 border border-slate-700'
                  }`}
                  style={
                    i < actionPoints
                      ? {
                          backgroundColor: activePlayer.color,
                          boxShadow: `0 0 8px ${activePlayer.color}80`,
                        }
                      : {}
                  }
                />
              ))}
            </div>
          </div>

          <div className="h-6 w-px bg-slate-800" />

          <div>
            <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider text-center">
              Round
            </div>
            <div className="text-xs font-mono font-bold text-slate-300 text-center">
              #{totalTurns}
            </div>
          </div>
        </div>

        {/* Tactical Buttons */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto justify-end">
          {/* Cosmic Luck Booster Button */}
          <button
            onClick={onOpenLuckBooster}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-all shadow-md ${
              activePlayer.luckLevel > 0
                ? 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20 border-amber-400 text-amber-200 shadow-amber-500/20'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-amber-300 hover:border-amber-500/40'
            }`}
            title="Increase your luck with $100000000000000000000000000000000"
          >
            <span className="text-amber-400 font-black">⚡</span>
            <span>Boost Luck</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
              Lv {activePlayer.luckLevel}
            </span>
          </button>

          {/* Radar */}
          <button
            onClick={onUseRadar}
            disabled={!canUseRadar || isAiThinking || actionPoints <= 0}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
              canUseRadar && actionPoints > 0 && !isAiThinking
                ? 'bg-slate-800 border-amber-500/40 text-amber-200 hover:bg-slate-700 hover:border-amber-400 shadow-sm'
                : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
            }`}
            title="Scan current room with RFID detector (Costs 1 AP)"
          >
            <Radio className={`w-3.5 h-3.5 ${canUseRadar ? 'text-amber-400' : 'text-slate-600'}`} />
            <span className="whitespace-nowrap">RFID Radar (1 AP)</span>
          </button>

          {/* Intel Notebook */}
          <button
            onClick={onToggleClueDrawer}
            className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-600 transition-colors flex items-center gap-2 whitespace-nowrap"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Intel</span>
            {cluesCount > 0 && (
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-bold">
                {cluesCount}
              </span>
            )}
          </button>

          {/* End Turn / Pass */}
          {mode !== 'SOLO_TIME_ATTACK' && players.length > 1 && (
            <button
              onClick={onEndTurn}
              disabled={isAiThinking}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              title="Pass turn to next player"
            >
              <span>End Turn</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
