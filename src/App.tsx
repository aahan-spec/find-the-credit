/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameMode, Room, RoomId, SearchSpot, Player, GameLog, ClueData, RadarResult } from './types/game';
import { generateNewBoard, ROOM_METADATA } from './data/gameData';
import { sound } from './utils/audio';
import { Header } from './components/Header';
import { GameHUD } from './components/GameHUD';
import { RoomView } from './components/RoomView';
import { SpotModal } from './components/SpotModal';
import { WinnerCelebration } from './components/WinnerCelebration';
import { ClueNotebook } from './components/ClueNotebook';
import { RadarModal } from './components/RadarModal';
import { RulesModal } from './components/RulesModal';
import { PlayerSetupModal, DEFAULT_PLAYER_TEMPLATES } from './components/PlayerSetupModal';
import { LuckBoosterModal } from './components/LuckBoosterModal';
import { LogFeed } from './components/LogFeed';
import { CreditCardDisplay } from './components/CreditCardDisplay';
import { Sparkles, Users, HelpCircle, Zap } from 'lucide-react';
import { COSMIC_FORTUNE_STRING, COSMIC_FORTUNE_FORMATTED } from './types/game';

export default function App() {
  // Game Setup & Mode
  const [mode, setMode] = useState<GameMode>('MULTIPLAYER');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Board Data
  const [rooms, setRooms] = useState<Room[]>([]);
  const [winningSpotId, setWinningSpotId] = useState<string>('');
  const [selectedRoomId, setSelectedRoomId] = useState<RoomId>('lounge');

  // Multi-Player State
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 'p1',
      name: 'Agent Cash',
      roleTitle: 'Master Sleuth',
      avatarSeed: 'cash',
      color: '#f59e0b',
      score: 0,
      searchesCount: 0,
      cluesDiscovered: [],
      isAI: false,
      balance: COSMIC_FORTUNE_STRING,
      luckLevel: 0,
      hasCosmicLuck: false,
    },
    {
      id: 'p2',
      name: 'Baron Vault',
      roleTitle: 'Rival Collector',
      avatarSeed: 'vault',
      color: '#06b6d4',
      score: 0,
      searchesCount: 0,
      cluesDiscovered: [],
      isAI: false,
      balance: COSMIC_FORTUNE_STRING,
      luckLevel: 0,
      hasCosmicLuck: false,
    },
  ]);

  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [actionPoints, setActionPoints] = useState<number>(2);
  const maxActionPoints = 2;
  const [totalTurns, setTotalTurns] = useState<number>(1);
  const [isAiThinking, setIsAiThinking] = useState<boolean>(false);

  // Time Attack State (for 1P Solo Time Attack)
  const [timeRemaining, setTimeRemaining] = useState<number>(90);
  const [timerActive, setTimerActive] = useState<boolean>(false);

  // Modals & Inspect State
  const [inspectingSpot, setInspectingSpot] = useState<SearchSpot | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);
  const [isNotebookOpen, setIsNotebookOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isPlayerSetupOpen, setIsPlayerSetupOpen] = useState<boolean>(false);
  const [isLuckBoosterOpen, setIsLuckBoosterOpen] = useState<boolean>(false);
  const [isRadarOpen, setIsRadarOpen] = useState<boolean>(false);
  const [radarScanning, setRadarScanning] = useState<boolean>(false);
  const [radarResult, setRadarResult] = useState<RadarResult | null>(null);

  // Deductions & Intel State
  const [discoveredClues, setDiscoveredClues] = useState<ClueData[]>([]);
  const [discoveredDecoys, setDiscoveredDecoys] = useState<string[]>([]);
  const [confirmedRoomId, setConfirmedRoomId] = useState<string | undefined>(undefined);
  const [eliminatedRoomId, setEliminatedRoomId] = useState<string | undefined>(undefined);

  // Activity Logs
  const [logs, setLogs] = useState<GameLog[]>([]);

  // Sound sync
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Helper to add log
  const addLog = useCallback(
    (
      playerName: string,
      actionText: string,
      type: 'search' | 'clue' | 'decoy' | 'trap' | 'radar' | 'winner'
    ) => {
      const newLog: GameLog = {
        id: Math.random().toString(36).substring(2, 9),
        turnNumber: totalTurns,
        playerName,
        actionText,
        type,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setLogs((prev) => [newLog, ...prev]);
    },
    [totalTurns]
  );

  // Rename any player to anything and save
  const handleRenamePlayer = useCallback((playerId: string, newName: string) => {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setPlayers((prev) => {
      const updated = prev.map((p) => (p.id === playerId ? { ...p, name: trimmed } : p));
      try {
        localStorage.setItem(
          'find_card_saved_names',
          JSON.stringify(updated.map((p) => ({ id: p.id, name: p.name })))
        );
      } catch {
        // ignore
      }
      return updated;
    });
    addLog('System', `Investigator renamed to "${trimmed}".`, 'search');
  }, [addLog]);

  // Increase Luck with $100000000000000000000000000000000
  const handleIncreaseLuck = useCallback((playerId: string) => {
    setPlayers((prev) =>
      prev.map((p) => {
        if (p.id !== playerId) return p;
        const nextLuck = p.luckLevel + 1;
        addLog(
          p.name,
          `Increased Cosmic Luck to Tier ${nextLuck} with $100000000000000000000000000000000!`,
          'clue'
        );
        return {
          ...p,
          luckLevel: nextLuck,
          hasCosmicLuck: true,
        };
      })
    );
  }, [addLog]);

  // Load saved custom names on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('find_card_saved_names');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setPlayers((prev) =>
            prev.map((p) => {
              const match = parsed.find((item: { id: string; name: string }) => item.id === p.id);
              return match && match.name ? { ...p, name: match.name } : p;
            })
          );
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Start / Reset Game
  const startNewGame = useCallback(
    (customPlayers?: Player[], customMode?: GameMode) => {
      const activePlayers = customPlayers || players;
      const activeMode = customMode || mode;
      const { rooms: newRooms, winningSpotId: newWinnerId } = generateNewBoard();

      setRooms(newRooms);
      setWinningSpotId(newWinnerId);
      setSelectedRoomId('lounge');
      setInspectingSpot(null);
      setWinner(null);
      setDiscoveredClues([]);
      setDiscoveredDecoys([]);
      setConfirmedRoomId(undefined);
      setEliminatedRoomId(undefined);
      setLogs([]);
      setActionPoints(2);
      setTotalTurns(1);
      setActivePlayerIndex(0);
      setIsAiThinking(false);
      setTimeRemaining(90);

      if (customPlayers) {
        setPlayers(customPlayers);
      } else {
        setPlayers((prev) => prev.map((p) => ({ ...p, searchesCount: 0 })));
      }

      if (customMode) {
        setMode(customMode);
      }

      if (activeMode === 'SOLO_TIME_ATTACK') {
        setTimerActive(true);
      } else {
        setTimerActive(false);
      }

      addLog(
        'System',
        `New game started with ${activePlayers.length} ${
          activePlayers.length === 1 ? 'Player' : 'Players'
        }. Find the Black Diamond Card to win!`,
        'search'
      );
    },
    [players, mode, addLog]
  );

  // Initialize board on mount
  useEffect(() => {
    startNewGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quick player count switcher
  const handleQuickSelectPlayers = useCallback(
    (count: number) => {
      const validCount = Math.min(5, Math.max(1, count));
      const newPlayersList: Player[] = [];

      for (let i = 0; i < validCount; i++) {
        const tmpl = DEFAULT_PLAYER_TEMPLATES[i];
        const existing = players[i];
        newPlayersList.push({
          id: `p${i + 1}`,
          name: existing ? existing.name : tmpl.name,
          roleTitle: tmpl.roleTitle,
          avatarSeed: tmpl.avatarSeed,
          color: tmpl.color,
          score: 0,
          searchesCount: 0,
          cluesDiscovered: [],
          isAI: i > 0 && validCount === 2 && count === 2 && players[1]?.isAI ? true : false,
          balance: existing?.balance || tmpl.balance,
          luckLevel: existing?.luckLevel || 0,
          hasCosmicLuck: existing?.hasCosmicLuck || false,
        });
      }

      const nextMode = validCount === 1 ? mode : 'MULTIPLAYER';
      startNewGame(newPlayersList, nextMode);
    },
    [players, mode, startNewGame]
  );

  // Time Attack Timer countdown
  useEffect(() => {
    if (mode !== 'SOLO_TIME_ATTACK' || !timerActive || winner) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerActive(false);
          sound.playTrapAlarm();
          addLog('System', 'Time expired! The Black Card heist failed!', 'trap');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode, timerActive, winner, addLog]);

  // Current active player object
  const activePlayer = useMemo(() => {
    return players[activePlayerIndex] || players[0];
  }, [players, activePlayerIndex]);

  // Find current room object
  const currentRoom = useMemo(() => {
    return rooms.find((r) => r.id === selectedRoomId) || rooms[0] || null;
  }, [rooms, selectedRoomId]);

  // Find winning spot object for radar distance math
  const winningSpot = useMemo(() => {
    for (const r of rooms) {
      const match = r.spots.find((s) => s.id === winningSpotId);
      if (match) return match;
    }
    return null;
  }, [rooms, winningSpotId]);

  // Switch Turn logic
  const handleEndTurn = useCallback(() => {
    sound.playClick();
    if (mode === 'SOLO_TIME_ATTACK' || players.length === 1) {
      setActionPoints(2);
      return;
    }

    const nextIndex = (activePlayerIndex + 1) % players.length;
    setActivePlayerIndex(nextIndex);
    setActionPoints(2);

    if (nextIndex === 0) {
      setTotalTurns((prev) => prev + 1);
    }

    const nextPlayer = players[nextIndex];
    addLog('Turn Switch', `Turn handed over to ${nextPlayer.name}.`, 'search');
  }, [activePlayerIndex, players, mode, addLog]);

  // Trigger search on a spot
  const handleSearchSpot = useCallback(
    (spot: SearchSpot, searchingPlayer: Player = activePlayer) => {
      if (spot.isSearched || actionPoints <= 0) return;

      sound.playSearch();

      // Deduct 1 AP
      setActionPoints((prev) => prev - 1);

      // Update spot as searched in rooms state
      setRooms((prevRooms) =>
        prevRooms.map((room) => {
          if (room.id !== spot.roomId) return room;
          return {
            ...room,
            spots: room.spots.map((s) =>
              s.id === spot.id
                ? {
                    ...s,
                    isSearched: true,
                    searchedByPlayerId: searchingPlayer.id,
                  }
                : s
            ),
          };
        })
      );

      // Increment player searches count
      setPlayers((prev) =>
        prev.map((p) =>
          p.id === searchingPlayer.id ? { ...p, searchesCount: p.searchesCount + 1 } : p
        )
      );

      // Check Content
      const content = spot.content;

      if (content.type === 'CREDIT_CARD') {
        sound.playCashJackpot();
        sound.playWinnerFanfare();
        addLog(
          searchingPlayer.name,
          `FOUND THE BLACK DIAMOND CREDIT CARD! REWARDED $100000000000000000000000000000000! WINNER!`,
          'winner'
        );
        // Award $100000000000000000000000000000000 to winner
        setPlayers((prev) =>
          prev.map((p) =>
            p.id === searchingPlayer.id
              ? { ...p, score: p.score + 1000, hasCosmicLuck: true }
              : p
          )
        );
        setInspectingSpot(spot);
        setWinner(searchingPlayer);
        return;
      }

      if (content.type === 'CLUE') {
        sound.playClueFound();
        if (content.clueData) {
          setDiscoveredClues((prev) => [...prev, content.clueData!]);
          if (content.clueData.type === 'ROOM_CONFIRMATION') {
            setConfirmedRoomId(content.clueData.revealedInfo);
          } else if (content.clueData.type === 'ELIMINATE_COLD') {
            setEliminatedRoomId(content.clueData.revealedInfo);
          }
        }
        addLog(
          searchingPlayer.name,
          `Discovered intel in ${spot.name}: ${content.clueData?.text || content.title}`,
          'clue'
        );
      } else if (content.type === 'DECOY_CARD') {
        sound.playDecoy();
        if (content.decoyTitle) {
          setDiscoveredDecoys((prev) => [...prev, content.decoyTitle!]);
        }
        addLog(searchingPlayer.name, `Found decoy in ${spot.name}: "${content.decoyTitle}"`, 'decoy');
      } else if (content.type === 'TRAP') {
        if (searchingPlayer.luckLevel >= 2) {
          sound.playCashJackpot();
          addLog(
            searchingPlayer.name,
            `🌟 Cosmic Luck neutralized trap! Awarded $100000000000000000000000000000000 gold bonus!`,
            'clue'
          );
        } else {
          sound.playTrapAlarm();
          addLog(searchingPlayer.name, `Triggered security alert in ${spot.name}!`, 'trap');
        }
      } else {
        addLog(searchingPlayer.name, `Searched ${spot.name} - Compartment was empty.`, 'search');
      }

      // Open inspection modal for human users
      if (!searchingPlayer.isAI) {
        setInspectingSpot(spot);
      }
    },
    [actionPoints, activePlayer, addLog]
  );

  // Handle AP depletion turn change check
  useEffect(() => {
    if (mode === 'SOLO_TIME_ATTACK' || players.length === 1) {
      if (actionPoints <= 0) {
        const timer = setTimeout(() => {
          setActionPoints(2);
        }, 300);
        return () => clearTimeout(timer);
      }
      return;
    }

    if (actionPoints <= 0 && !inspectingSpot && !winner && !isAiThinking) {
      const switchTimer = setTimeout(() => {
        handleEndTurn();
      }, 700);
      return () => clearTimeout(switchTimer);
    }
  }, [actionPoints, inspectingSpot, winner, isAiThinking, mode, players.length, handleEndTurn]);

  // AI Turn Automator
  useEffect(() => {
    if (!activePlayer.isAI || winner) return;

    setIsAiThinking(true);

    const aiTimer = setTimeout(() => {
      // Find candidate spots that are unsearched
      const allUnsearchedSpots: SearchSpot[] = [];
      rooms.forEach((r) => {
        if (r.id !== eliminatedRoomId) {
          r.spots.forEach((s) => {
            if (!s.isSearched) allUnsearchedSpots.push(s);
          });
        }
      });

      if (allUnsearchedSpots.length === 0) {
        setIsAiThinking(false);
        handleEndTurn();
        return;
      }

      let targetSpot: SearchSpot;
      const confirmedRoomSpots = allUnsearchedSpots.filter((s) => s.roomId === confirmedRoomId);

      if (confirmedRoomSpots.length > 0) {
        targetSpot = confirmedRoomSpots[Math.floor(Math.random() * confirmedRoomSpots.length)];
      } else {
        targetSpot = allUnsearchedSpots[Math.floor(Math.random() * allUnsearchedSpots.length)];
      }

      // Switch room view to where AI searched
      if (targetSpot.roomId !== selectedRoomId) {
        setSelectedRoomId(targetSpot.roomId);
      }

      handleSearchSpot(targetSpot, activePlayer);
      setIsAiThinking(false);
    }, 1200);

    return () => clearTimeout(aiTimer);
  }, [
    activePlayer,
    rooms,
    eliminatedRoomId,
    confirmedRoomId,
    selectedRoomId,
    winner,
    handleSearchSpot,
    handleEndTurn,
  ]);

  // Proximity Radar Trigger
  const handleUseRadar = () => {
    if (actionPoints <= 0 || !winningSpot) return;

    sound.playClick();
    setActionPoints((prev) => prev - 1);
    setIsRadarOpen(true);
    setRadarScanning(true);
    setRadarResult(null);

    // Scan calculation
    setTimeout(() => {
      const isSameRoom = winningSpot.roomId === selectedRoomId;
      let level: 'cold' | 'warm' | 'hot' | 'burning' = 'cold';
      let message = '';
      let distanceMeters = 18;

      if (isSameRoom) {
        level = 'burning';
        distanceMeters = 1.4;
        message = `STRONG RESONANCE: The Centurion Black Card is hidden right here inside the ${ROOM_METADATA[selectedRoomId].name}!`;
      } else {
        const roomOrder: RoomId[] = ['lounge', 'study', 'vault'];
        const currIdx = roomOrder.indexOf(selectedRoomId);
        const winIdx = roomOrder.indexOf(winningSpot.roomId);
        const diff = Math.abs(currIdx - winIdx);

        if (diff === 1) {
          level = 'warm';
          distanceMeters = 7.5;
          message = `MODERATE SIGNAL: The EMV chip pinged from an adjacent suite (1 floor or section away).`;
        } else {
          level = 'cold';
          distanceMeters = 19.8;
          message = `WEAK SIGNAL: Card signature is far away. Try searching the other end of the penthouse.`;
        }
      }

      sound.playRadarPing(level);
      setRadarScanning(false);
      setRadarResult({
        spotName: winningSpot.name,
        roomName: ROOM_METADATA[selectedRoomId].name,
        level,
        distanceMeters,
        message,
      });

      addLog(
        activePlayer.name,
        `Used RFID Radar in ${ROOM_METADATA[selectedRoomId].name} - Signal: ${level.toUpperCase()}`,
        'radar'
      );
    }, 1200);
  };

  // Total spots & searched spots count
  const { totalSpots, searchedSpots } = useMemo(() => {
    let total = 0;
    let searched = 0;
    rooms.forEach((r) => {
      r.spots.forEach((s) => {
        total++;
        if (s.isSearched) searched++;
      });
    });
    return { totalSpots: total, searchedSpots: searched };
  }, [rooms]);

  if (!currentRoom) return null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Bar Header with Player Count Chooser */}
      <Header
        currentMode={mode}
        playerCount={players.length}
        onOpenPlayerSetup={() => setIsPlayerSetupOpen(true)}
        onQuickSelectPlayers={handleQuickSelectPlayers}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
        onNewGame={() => startNewGame()}
        onOpenRules={() => setIsRulesOpen(true)}
      />

      {/* Main Game Surface */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-5">
        {/* Game HUD (Active players roster, turn tracker, AP pips, tactical tools) */}
        <GameHUD
          mode={mode}
          players={players}
          activePlayerIndex={activePlayerIndex}
          actionPoints={actionPoints}
          maxActionPoints={maxActionPoints}
          totalTurns={totalTurns}
          timeRemaining={timeRemaining}
          onUseRadar={handleUseRadar}
          onEndTurn={handleEndTurn}
          onToggleClueDrawer={() => setIsNotebookOpen(true)}
          onOpenPlayerSetup={() => setIsPlayerSetupOpen(true)}
          onOpenLuckBooster={() => setIsLuckBoosterOpen(true)}
          onRenamePlayer={handleRenamePlayer}
          cluesCount={discoveredClues.length}
          isAiThinking={isAiThinking}
          canUseRadar={actionPoints > 0}
        />

        {/* Hero Context Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-amber-950/20 via-slate-900/60 to-slate-900/40 p-3.5 sm:px-5 sm:py-3 rounded-2xl border border-amber-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                Prize: Centurion Black Diamond Card (+$100,000,000,000,000,000,000,000,000,000,000)
              </div>
              <div className="text-[11px] text-slate-400">
                Playing with <span className="text-amber-300 font-semibold">{players.length} {players.length === 1 ? 'Player' : 'Players'}</span>. Whoever finds the card is the WINNER and takes the $10^32 fortune!
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsLuckBoosterOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs font-bold text-amber-300 border border-amber-500/40 flex items-center gap-1.5 transition-colors shadow-sm"
              title="Increase luck with $100000000000000000000000000000000"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Cosmic Luck Lv {activePlayer.luckLevel}</span>
            </button>
            <button
              onClick={() => setIsPlayerSetupOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5 text-amber-400" />
              <span>Players ({players.length})</span>
            </button>
            <div className="text-xs font-mono text-slate-400 hidden sm:block">
              <span className="text-amber-400 font-semibold">{searchedSpots} / {totalSpots}</span> Checked
            </div>
          </div>
        </div>

        {/* Room Viewport & Interactive Hotspots */}
        <RoomView
          currentRoom={currentRoom}
          allRooms={rooms}
          selectedRoomId={selectedRoomId}
          onSelectRoom={(id) => {
            sound.playClick();
            setSelectedRoomId(id);
          }}
          onSearchSpot={(spot) => handleSearchSpot(spot)}
          actionPoints={actionPoints}
          isAiThinking={isAiThinking}
          eliminatedRoomId={eliminatedRoomId}
          confirmedRoomId={confirmedRoomId}
          luckLevel={activePlayer.luckLevel}
          winningRoomId={winningSpot?.roomId}
        />

        {/* Bottom Section: Activity Log & Quick Target Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <LogFeed logs={logs} />
          </div>

          {/* Quick Target Showcase Card */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono tracking-widest uppercase text-slate-400 mb-1">
                Target To Uncover
              </div>
              <h3 className="font-display text-base font-bold text-slate-100 flex items-center gap-2">
                <span>The Black Diamond Card</span>
                <span className="text-xs font-mono font-normal text-amber-400">#4401</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Made from black matte titanium with gold embossed EMV circuitry. Keep an eye out for
                worthless decoy cards and security tripwires!
              </p>
            </div>

            <div className="flex justify-center my-3">
              <CreditCardDisplay compact={true} cardHolderName={winner ? winner.name : 'FINDER WINS'} />
            </div>

            <button
              onClick={() => setIsRulesOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>How To Play & Win</span>
            </button>
          </div>
        </div>
      </main>

      {/* Spot Inspection Modal */}
      <SpotModal
        spot={inspectingSpot}
        player={activePlayer}
        onClose={() => setInspectingSpot(null)}
        onClaimVictory={() => {
          setInspectingSpot(null);
        }}
      />

      {/* Official Winner Celebration Screen */}
      {winner && winningSpot && (
        <WinnerCelebration
          winner={winner}
          mode={mode}
          totalRounds={totalTurns}
          totalSearches={searchedSpots}
          winningLocationName={winningSpot.name}
          winningRoomName={ROOM_METADATA[winningSpot.roomId].name}
          onPlayAgain={() => startNewGame()}
        />
      )}

      {/* Player Setup & Count Chooser Modal */}
      <PlayerSetupModal
        isOpen={isPlayerSetupOpen}
        onClose={() => setIsPlayerSetupOpen(false)}
        currentPlayers={players}
        currentMode={mode}
        onStartGame={(newPlayers, newMode) => {
          startNewGame(newPlayers, newMode);
        }}
      />

      {/* Intel Dossier Notebook Drawer */}
      <ClueNotebook
        isOpen={isNotebookOpen}
        onClose={() => setIsNotebookOpen(false)}
        clues={discoveredClues}
        foundDecoys={discoveredDecoys}
        totalSpotsCount={totalSpots}
        searchedSpotsCount={searchedSpots}
      />

      {/* RFID Radar Modal */}
      <RadarModal
        isOpen={isRadarOpen}
        onClose={() => setIsRadarOpen(false)}
        result={radarResult}
        scanning={radarScanning}
      />

      {/* Cosmic Luck Enhancer Modal */}
      <LuckBoosterModal
        isOpen={isLuckBoosterOpen}
        onClose={() => setIsLuckBoosterOpen(false)}
        player={activePlayer}
        onIncreaseLuck={handleIncreaseLuck}
      />

      {/* Rules Modal */}
      <RulesModal isOpen={isRulesOpen} onClose={() => setIsRulesOpen(false)} />
    </div>
  );
}
