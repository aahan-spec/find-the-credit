export type GameMode = 'MULTIPLAYER' | 'TWO_PLAYERS' | 'VS_AI' | 'SOLO_TIME_ATTACK';

export type RoomId = 'lounge' | 'study' | 'vault';

export type ContentType = 'CREDIT_CARD' | 'CLUE' | 'DECOY_CARD' | 'TRAP' | 'EMPTY';

export interface ClueData {
  type: 'ROOM_CONFIRMATION' | 'CONTAINER_TYPE' | 'ELIMINATE_COLD';
  text: string;
  revealedInfo: string;
}

export interface SpotContent {
  type: ContentType;
  title: string;
  description: string;
  decoyTitle?: string;
  clueData?: ClueData;
  trapPenalty?: string;
}

export interface SearchSpot {
  id: string;
  roomId: RoomId;
  name: string;
  category: 'furniture' | 'decor' | 'electronics' | 'security' | 'apparel';
  hint: string;
  xPercent: number; // For visual spatial placement
  yPercent: number;
  isSearched: boolean;
  searchedByPlayerId?: string;
  content: SpotContent;
}

export interface Room {
  id: RoomId;
  name: string;
  subtitle: string;
  themeDescription: string;
  bgImage: string;
  spots: SearchSpot[];
}

export const COSMIC_FORTUNE_STRING = '100000000000000000000000000000000';
export const COSMIC_FORTUNE_FORMATTED = '$100,000,000,000,000,000,000,000,000,000,000';

export interface Player {
  id: string;
  name: string;
  roleTitle: string;
  avatarSeed: string;
  color: string;
  score: number;
  searchesCount: number;
  cluesDiscovered: string[];
  isAI?: boolean;
  balance: string; // Cosmic bank balance
  luckLevel: number; // 0, 1, 2, 3, etc.
  hasCosmicLuck: boolean; // Activated with $100000000000000000000000000000000
}

export interface RadarResult {
  spotName: string;
  roomName: string;
  level: 'cold' | 'warm' | 'hot' | 'burning';
  distanceMeters: number;
  message: string;
}

export interface GameLog {
  id: string;
  turnNumber: number;
  playerName: string;
  actionText: string;
  type: 'search' | 'clue' | 'decoy' | 'trap' | 'radar' | 'winner';
  timestamp: string;
}

export interface GameSettings {
  mode: GameMode;
  p1Name: string;
  p2Name: string;
  aiDifficulty: 'normal' | 'cunning';
  timerSeconds: number; // for SOLO_TIME_ATTACK
}
