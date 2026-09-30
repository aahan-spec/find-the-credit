import React, { useState } from 'react';
import { Search, CheckCircle2, AlertCircle, FileText, Sparkles, LayoutGrid, Eye, MapPin, ShieldAlert } from 'lucide-react';
import { Room, SearchSpot, RoomId } from '../types/game';

interface RoomViewProps {
  currentRoom: Room;
  allRooms: Room[];
  selectedRoomId: RoomId;
  onSelectRoom: (roomId: RoomId) => void;
  onSearchSpot: (spot: SearchSpot) => void;
  actionPoints: number;
  isAiThinking: boolean;
  eliminatedRoomId?: string;
  confirmedRoomId?: string;
  luckLevel?: number;
  winningRoomId?: RoomId;
}

export const RoomView: React.FC<RoomViewProps> = ({
  currentRoom,
  allRooms,
  selectedRoomId,
  onSelectRoom,
  onSearchSpot,
  actionPoints,
  isAiThinking,
  eliminatedRoomId,
  confirmedRoomId,
  luckLevel = 0,
  winningRoomId,
}) => {
  const [viewMode, setViewMode] = useState<'spatial' | 'grid'>('spatial');
  const [hoveredSpot, setHoveredSpot] = useState<SearchSpot | null>(null);
  const [imageFailed, setImageFailed] = useState(false);

  const isCardInCurrentRoom = winningRoomId === currentRoom.id;
  const showLuckRoomAura = luckLevel >= 1 && isCardInCurrentRoom;

  return (
    <div className="space-y-4">
      {/* ROOM SELECTION TABS */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {allRooms.map((room) => {
            const isSelected = room.id === selectedRoomId;
            const unsearchedCount = room.spots.filter((s) => !s.isSearched).length;
            const isEliminated = eliminatedRoomId === room.id;
            const isConfirmed = confirmedRoomId === room.id;
            const hasLuckShimmer = luckLevel >= 1 && winningRoomId === room.id;

            return (
              <button
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`relative px-4 py-2.5 rounded-xl text-left transition-all whitespace-nowrap flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-slate-800 text-amber-200 border border-amber-500/40 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-805/50 border border-transparent'
                } ${hasLuckShimmer ? 'ring-1 ring-amber-400/50 shadow-amber-400/20 shadow-md' : ''}`}
              >
                <div>
                  <div className="text-xs font-semibold flex items-center gap-1.5">
                    <span>{room.name}</span>
                    {hasLuckShimmer && (
                      <span className="text-[10px] text-amber-300 font-bold bg-amber-400/30 px-1.5 py-0.5 rounded border border-amber-400/50 flex items-center gap-1 animate-pulse">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>LUCKY AURA</span>
                      </span>
                    )}
                    {isConfirmed && !hasLuckShimmer && (
                      <span className="text-[10px] text-amber-400 font-bold bg-amber-400/20 px-1 rounded">
                        HOT TARGET
                      </span>
                    )}
                    {isEliminated && (
                      <span className="text-[10px] text-red-400 font-bold bg-red-400/20 px-1 rounded">
                        CLEARED
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {unsearchedCount} remaining
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 self-end sm:self-auto">
          <button
            onClick={() => setViewMode('spatial')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'spatial'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Interactive room scene"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Room Scene</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Card Grid view"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid Inspect</span>
          </button>
        </div>
      </div>

      {/* ROOM MAIN VIEW */}
      {viewMode === 'spatial' ? (
        <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[640px] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 select-none">
          {/* Background Room Photo / Stylized Fallback */}
          {!imageFailed ? (
            <img
              src={currentRoom.bgImage}
              alt={currentRoom.name}
              referrerPolicy="no-referrer"
              onError={() => setImageFailed(true)}
              className="w-full h-full object-cover object-center filter brightness-[0.55] contrast-[1.1] transition-transform duration-700 hover:scale-[1.01]"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-950 to-neutral-950 flex flex-col items-center justify-center p-8 text-center">
              <MapPin className="w-16 h-16 text-amber-500/30 mb-2" />
              <div className="font-display text-2xl font-bold text-slate-200">{currentRoom.name}</div>
              <div className="text-sm text-slate-400 mt-1">{currentRoom.subtitle}</div>
            </div>
          )}

          {/* Vignette Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/60 pointer-events-none" />

          {/* Room Header Overlay */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none z-10">
            <div className="bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-800">
              <h2 className="font-display text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2">
                <span>{currentRoom.name}</span>
                <span className="text-xs font-mono font-normal text-amber-400/90">
                  {currentRoom.subtitle}
                </span>
              </h2>
              {showLuckRoomAura ? (
                <div className="mt-1 flex items-center gap-1.5 text-xs font-mono text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/40 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>COSMIC LUCK DETECTED: The $10^32 Black Card is in this suite!</span>
                </div>
              ) : (
                <p className="text-[11px] text-slate-400 hidden sm:block max-w-lg mt-0.5">
                  {currentRoom.themeDescription}
                </p>
              )}
            </div>

            <div className="bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-300">
              <span>{currentRoom.spots.filter((s) => !s.isSearched).length} / {currentRoom.spots.length} Spots Unsearched</span>
            </div>
          </div>

          {/* Interactive Hotspots Layer */}
          {currentRoom.spots.map((spot) => {
            const isClickable = !spot.isSearched && !isAiThinking && actionPoints > 0;

            return (
              <div
                key={spot.id}
                style={{
                  left: `${spot.xPercent}%`,
                  top: `${spot.yPercent}%`,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                onMouseEnter={() => setHoveredSpot(spot)}
                onMouseLeave={() => setHoveredSpot(null)}
              >
                {spot.isSearched ? (
                  // Searched Marker
                  <div className="group relative flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-slate-950/90 border border-slate-700/80 flex items-center justify-center text-slate-400 shadow-lg backdrop-blur-sm">
                      {spot.content.type === 'CREDIT_CARD' ? (
                        <Sparkles className="w-4 h-4 text-amber-400" />
                      ) : spot.content.type === 'CLUE' ? (
                        <FileText className="w-3.5 h-3.5 text-blue-400" />
                      ) : spot.content.type === 'DECOY_CARD' ? (
                        <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                      ) : spot.content.type === 'TRAP' ? (
                        <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                      )}
                    </div>
                  </div>
                ) : (
                  // Active Interactive Unsearched Spot Node
                  <button
                    onClick={() => onSearchSpot(spot)}
                    disabled={!isClickable}
                    className={`group relative flex items-center justify-center transition-transform ${
                      isClickable
                        ? 'hover:scale-125 cursor-pointer active:scale-95'
                        : 'opacity-50 cursor-not-allowed'
                    }`}
                    title={`Inspect: ${spot.name}`}
                  >
                    {/* Pulsing Beacon Ring */}
                    <span className="absolute -inset-2 rounded-full bg-amber-400/25 animate-ping opacity-75" />
                    
                    {/* Glowing Core Button */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-yellow-200/80 shadow-lg shadow-amber-500/50 flex items-center justify-center text-slate-950">
                      <Search className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
                    </div>

                    {/* Spot Name Label Pill on hover or persistent */}
                    <div className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/95 border border-amber-500/40 px-2.5 py-1 rounded-lg text-[11px] font-semibold text-amber-200 whitespace-nowrap shadow-xl pointer-events-none z-30">
                      {spot.name}
                    </div>
                  </button>
                )}
              </div>
            );
          })}

          {/* Hover Detail Panel at Bottom */}
          {hoveredSpot && (
            <div className="absolute bottom-4 left-4 right-4 bg-slate-950/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 flex items-center justify-between z-30 animate-in fade-in duration-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-100 flex items-center gap-2">
                    <span>{hoveredSpot.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 capitalize">
                      · {hoveredSpot.category}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{hoveredSpot.hint}</div>
                </div>
              </div>

              <div>
                {hoveredSpot.isSearched ? (
                  <div className="text-xs font-mono text-slate-400">
                    Already Examined ({hoveredSpot.content.type.replace('_', ' ')})
                  </div>
                ) : (
                  <button
                    onClick={() => onSearchSpot(hoveredSpot)}
                    disabled={actionPoints <= 0 || isAiThinking}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Search Spot</span>
                    <span className="text-[10px] opacity-75 font-mono">(1 AP)</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* GRID INSPECT VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {currentRoom.spots.map((spot) => {
            const isClickable = !spot.isSearched && !isAiThinking && actionPoints > 0;

            return (
              <div
                key={spot.id}
                className={`p-4 rounded-2xl border transition-all ${
                  spot.isSearched
                    ? 'bg-slate-950/60 border-slate-850 opacity-75'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900 shadow-md'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-xs font-bold text-slate-200">{spot.name}</div>
                  <div className="text-[10px] font-mono text-slate-400 capitalize">
                    {spot.category}
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mb-3 min-h-[32px]">{spot.hint}</p>

                {spot.isSearched ? (
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px]">
                    <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                      {spot.content.type === 'CREDIT_CARD' ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-amber-300">BLACK CREDIT CARD!</span>
                        </>
                      ) : spot.content.type === 'CLUE' ? (
                        <>
                          <FileText className="w-3.5 h-3.5 text-blue-400" />
                          <span className="text-blue-300">Intel Decrypted</span>
                        </>
                      ) : spot.content.type === 'DECOY_CARD' ? (
                        <>
                          <AlertCircle className="w-3.5 h-3.5 text-yellow-400" />
                          <span className="text-yellow-300">Decoy Card</span>
                        </>
                      ) : spot.content.type === 'TRAP' ? (
                        <>
                          <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
                          <span className="text-red-300">Security Triggered</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                          <span className="text-slate-400">Empty Pocket</span>
                        </>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {spot.content.title}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => onSearchSpot(spot)}
                    disabled={!isClickable}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      isClickable
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Location (1 AP)</span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
