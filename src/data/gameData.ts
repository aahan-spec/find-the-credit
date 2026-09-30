import { Room, RoomId, SearchSpot, SpotContent } from '../types/game';

// Image references generated for this app
export const CARD_IMAGE_PATH = '/src/assets/images/black_titanium_card_1790764616899.jpg';
export const LOUNGE_IMAGE_PATH = '/src/assets/images/card_hunt_lounge_1790764603607.jpg';
export const VAULT_IMAGE_PATH = '/src/assets/images/card_hunt_vault_1790764628664.jpg';

export interface BaseSpotTemplate {
  id: string;
  roomId: RoomId;
  name: string;
  category: 'furniture' | 'decor' | 'electronics' | 'security' | 'apparel';
  hint: string;
  xPercent: number;
  yPercent: number;
}

export const BASE_SPOTS: BaseSpotTemplate[] = [
  // --- Room 1: Penthouse Sky Lounge (8 spots) ---
  {
    id: 'lounge_sofa',
    roomId: 'lounge',
    name: 'Velvet Sofa Cushions',
    category: 'furniture',
    hint: 'Deep under the plush velvet Italian cushions',
    xPercent: 28,
    yPercent: 68,
  },
  {
    id: 'lounge_fireplace',
    roomId: 'lounge',
    name: 'Modern Fireplace Mantel',
    category: 'decor',
    hint: 'Behind the smoked quartz crystal centerpiece',
    xPercent: 52,
    yPercent: 50,
  },
  {
    id: 'lounge_coffeetable',
    roomId: 'lounge',
    name: 'Marble Coffee Table Drawers',
    category: 'furniture',
    hint: 'Underneath architecture art catalogs and marble coasters',
    xPercent: 44,
    yPercent: 78,
  },
  {
    id: 'lounge_bookshelf',
    roomId: 'lounge',
    name: 'Walnut Backlit Bookshelf',
    category: 'decor',
    hint: 'Behind leather-bound auction catalogs',
    xPercent: 12,
    yPercent: 38,
  },
  {
    id: 'lounge_bar',
    roomId: 'lounge',
    name: 'Champagne Bar Ice Bucket',
    category: 'furniture',
    hint: 'Tucked behind rare vintage Dom Pérignon bottles',
    xPercent: 84,
    yPercent: 48,
  },
  {
    id: 'lounge_coatrack',
    roomId: 'lounge',
    name: 'Cashmere Overcoat Pocket',
    category: 'apparel',
    hint: 'Inside the inner silk pocket of a tailored charcoal coat',
    xPercent: 92,
    yPercent: 32,
  },
  {
    id: 'lounge_speakers',
    roomId: 'lounge',
    name: 'Audiophile Turntable Console',
    category: 'electronics',
    hint: 'Next to the vacuum tube pre-amp and vinyl sleeves',
    xPercent: 68,
    yPercent: 62,
  },

  // --- Room 2: Private Executive Study (7 spots) ---
  {
    id: 'study_desk',
    roomId: 'study',
    name: 'Mahogany Partner Desk Drawer',
    category: 'furniture',
    hint: 'Concealed inside the false bottom of the center drawer',
    xPercent: 46,
    yPercent: 66,
  },
  {
    id: 'study_lamp',
    roomId: 'study',
    name: 'Vintage Banker Brass Lamp',
    category: 'decor',
    hint: 'Under the heavy solid green-glass and brass base',
    xPercent: 60,
    yPercent: 54,
  },
  {
    id: 'study_chair',
    roomId: 'study',
    name: 'Tufted Leather Armchair',
    category: 'furniture',
    hint: 'Wedged between the deep buttoned leather backrest',
    xPercent: 24,
    yPercent: 65,
  },
  {
    id: 'study_painting',
    roomId: 'study',
    name: 'Oil Painting Hidden Safe',
    category: 'security',
    hint: 'Swung open behind the 19th-century maritime portrait',
    xPercent: 50,
    yPercent: 28,
  },
  {
    id: 'study_book',
    roomId: 'study',
    name: 'Hollow Encyclopedia of Law',
    category: 'decor',
    hint: 'A cutout compartment hidden inside Volume IX',
    xPercent: 78,
    yPercent: 34,
  },
  {
    id: 'study_rug',
    roomId: 'study',
    name: 'Persian Rug Corner',
    category: 'decor',
    hint: 'Lifted beneath the woven silk fringes and pad',
    xPercent: 35,
    yPercent: 88,
  },
  {
    id: 'study_shredder',
    roomId: 'study',
    name: 'Executive Waste Bin & Shredder',
    category: 'electronics',
    hint: 'Mixed within shredded corporate takeover drafts',
    xPercent: 12,
    yPercent: 78,
  },

  // --- Room 3: Secret Vault & Dressing Suite (7 spots) ---
  {
    id: 'vault_tuxedo',
    roomId: 'vault',
    name: 'Silk-Lapel Velvet Tuxedo',
    category: 'apparel',
    hint: 'Right breast pocket beside the monogrammed handkerchief',
    xPercent: 22,
    yPercent: 42,
  },
  {
    id: 'vault_safe',
    roomId: 'vault',
    name: 'Biometric Wall Depository',
    category: 'security',
    hint: 'Heavy reinforced steel door requiring an eye-scan',
    xPercent: 55,
    yPercent: 38,
  },
  {
    id: 'vault_valet',
    roomId: 'vault',
    name: 'Watchmaker Valet Tray',
    category: 'decor',
    hint: 'Resting among Swiss chronographs and platinum cufflinks',
    xPercent: 70,
    yPercent: 62,
  },
  {
    id: 'vault_cabinet',
    roomId: 'vault',
    name: 'Reinforced Filing Locker',
    category: 'furniture',
    hint: 'Top drawer marked "Confidential Swiss Accounts"',
    xPercent: 85,
    yPercent: 52,
  },
  {
    id: 'vault_floorboard',
    roomId: 'vault',
    name: 'Loose Parquet Floor Tile',
    category: 'security',
    hint: 'A hollow resonant thud beneath the velvet runner',
    xPercent: 40,
    yPercent: 82,
  },
  {
    id: 'vault_display',
    roomId: 'vault',
    name: 'Tempered Glass Trophy Pedestal',
    category: 'decor',
    hint: 'Beneath the velvet-lined golden championship cup',
    xPercent: 12,
    yPercent: 66,
  },
  {
    id: 'vault_briefcase',
    roomId: 'vault',
    name: 'Titanium Courier Briefcase',
    category: 'security',
    hint: 'Inside the dual-combination security clasps',
    xPercent: 62,
    yPercent: 76,
  },
];

export const ROOM_METADATA: Record<RoomId, { name: string; subtitle: string; themeDescription: string; bgImage: string }> = {
  lounge: {
    name: 'Penthouse Sky Lounge',
    subtitle: 'Floor 72 · Private Observation Suite',
    themeDescription: 'Panoramic glass skyline, warm marble fireplace, bespoke Italian leather and cocktails.',
    bgImage: LOUNGE_IMAGE_PATH,
  },
  study: {
    name: 'Executive Private Study',
    subtitle: 'Floor 71 · Heritage Mahogany Library',
    themeDescription: 'Floor-to-ceiling bookshelves, brass bankers lamps, secret oil painting safes and documents.',
    bgImage: VAULT_IMAGE_PATH,
  },
  vault: {
    name: 'Subterranean Vault & Suite',
    subtitle: 'Sub-Level 2 · High-Security Dressing Room',
    themeDescription: 'Biometric depository, tailored suits, titanium lockboxes, and private safety deposits.',
    bgImage: VAULT_IMAGE_PATH,
  },
};

const DECOY_CARDS = [
  {
    title: 'Decoy: Expired Transit Pass',
    desc: 'An old 2017 Metro card with $0.45 balance remaining. Not the Black Card!',
    name: 'City Rapid Transit MetroCard',
  },
  {
    title: 'Decoy: Coffee Stamp Loyalty Card',
    desc: 'Nine stamps collected out of ten! One more for a free caramel macchiato, but no spending millions.',
    name: 'Artisan Roast Punch Card (9/10)',
  },
  {
    title: 'Decoy: Cheap Novelty "Billionaire" Card',
    desc: 'Plastic gold novelty card from a prank magic shop. "Good for unlimited laughs only".',
    name: 'Novelty Gag Gold Card',
  },
  {
    title: 'Decoy: Vintage Video Rental Card',
    desc: 'Blockbuster Video Member #09281. Unpaid late fees for Jurassic Park!',
    name: 'Blockbuster Express VIP Card',
  },
];

const TRAPS = [
  {
    title: 'Security Laser Tripwire Triggered!',
    desc: 'A silent infrared alarm flashed! Security guard checks in—costs you 1 Action Point penalty!',
    penalty: '-1 Action Point next turn',
  },
  {
    title: 'Ink Dye Security Capsule Expelled!',
    desc: 'A decoy anti-theft packet poofed non-toxic ultraviolet smoke! Made a loud racket!',
    penalty: 'Revealed search noise to rival',
  },
];

const EMPTY_MESSAGES = [
  { title: 'Nothing Here', desc: 'Just some spare lint, brass paperclips, and an old fountain pen cap.' },
  { title: 'Empty Compartment', desc: 'Rummaged thoroughly, but found only clean empty velvet lining.' },
  { title: 'False Lead', desc: 'A pair of designer sunglasses and a receipt for a $3,000 bottle of cognac.' },
  { title: 'Dust & Cobwebs', desc: 'Carefully inspected the crevices, but no credit cards hidden here.' },
  { title: 'Dry Well', desc: 'Nothing but an old USB thumb drive with encrypted backup labels.' },
];

/**
 * Initializes a new round with randomized distribution:
 * - 1 spot holds the WINNING Centurion Black Diamond Credit Card
 * - 3 spots hold CLUES that narrow down the location
 * - 3 spots hold hilarious DECOY CARDS
 * - 2 spots hold TRAPS / Security alerts
 * - The remainder are EMPTY flavor spots
 */
export function generateNewBoard(): { rooms: Room[]; winningSpotId: string } {
  // Clone spots
  const shuffledSpots = [...BASE_SPOTS].sort(() => Math.random() - 0.5);

  // 1. Pick Winning Spot
  const winningSpot = shuffledSpots[0];
  const winningSpotId = winningSpot.id;

  // 2. Pick Clue spots (next 3 spots)
  const clueSpot1 = shuffledSpots[1];
  const clueSpot2 = shuffledSpots[2];
  const clueSpot3 = shuffledSpots[3];

  // 3. Pick Decoy spots (next 3 spots)
  const decoySpots = [shuffledSpots[4], shuffledSpots[5], shuffledSpots[6]];

  // 4. Pick Trap spots (next 2 spots)
  const trapSpots = [shuffledSpots[7], shuffledSpots[8]];

  // Remaining are Empty
  const emptySpots = shuffledSpots.slice(9);

  // Build clues based on where winning card really is
  const winningRoomName = ROOM_METADATA[winningSpot.roomId].name;
  const winningCategory = winningSpot.category;

  const clue1Content: SpotContent = {
    type: 'CLUE',
    title: 'Clue Discovered: Encrypted Terminal Receipt',
    description: `A receipt shows the cardholder signed for a transaction in the: "${winningRoomName}"!`,
    clueData: {
      type: 'ROOM_CONFIRMATION',
      text: `Confirmed Location: Card is hidden in the ${winningRoomName}!`,
      revealedInfo: winningSpot.roomId,
    },
  };

  const categoryLabels: Record<string, string> = {
    furniture: 'seating, sofa cushions, or desk furniture',
    decor: 'ornaments, artwork, books, or tabletop decor',
    electronics: 'gadgets, consoles, or electrical equipment',
    security: 'safes, hidden compartments, or lockboxes',
    apparel: 'garments, luxury jackets, or pocket lining',
  };

  const clue2Content: SpotContent = {
    type: 'CLUE',
    title: 'Clue Discovered: Surveillance Footage Log',
    description: `Security tape shows someone sliding a matte black card into ${categoryLabels[winningCategory] || 'a hidden spot'}.`,
    clueData: {
      type: 'CONTAINER_TYPE',
      text: `Card is hidden inside: ${categoryLabels[winningCategory]}!`,
      revealedInfo: winningCategory,
    },
  };

  // Find a room where the card is NOT located to eliminate
  const allRooms: RoomId[] = ['lounge', 'study', 'vault'];
  const coldRoomId = allRooms.find((r) => r !== winningSpot.roomId) || 'lounge';
  const coldRoomName = ROOM_METADATA[coldRoomId].name;

  const clue3Content: SpotContent = {
    type: 'CLUE',
    title: 'Clue Discovered: Sweep Report',
    description: `A security sweep log confirms the card is DEFINITELY NOT inside the ${coldRoomName}.`,
    clueData: {
      type: 'ELIMINATE_COLD',
      text: `Safe to ignore: 0% chance of card in the ${coldRoomName}!`,
      revealedInfo: coldRoomId,
    },
  };

  // Assemble the map of contents
  const contentMap = new Map<string, SpotContent>();

  // Winner card
  contentMap.set(winningSpotId, {
    type: 'CREDIT_CARD',
    title: 'WINNER! The Centurion Black Diamond Infinite Card',
    description: 'You found the authentic Black Titanium Credit Card! Unlimited limit, master access granted. YOU ARE THE WINNER!',
  });

  // Clues
  contentMap.set(clueSpot1.id, clue1Content);
  contentMap.set(clueSpot2.id, clue2Content);
  contentMap.set(clueSpot3.id, clue3Content);

  // Decoys
  decoySpots.forEach((s, idx) => {
    const decoy = DECOY_CARDS[idx % DECOY_CARDS.length];
    contentMap.set(s.id, {
      type: 'DECOY_CARD',
      title: decoy.title,
      description: decoy.desc,
      decoyTitle: decoy.name,
    });
  });

  // Traps
  trapSpots.forEach((s, idx) => {
    const trap = TRAPS[idx % TRAPS.length];
    contentMap.set(s.id, {
      type: 'TRAP',
      title: trap.title,
      description: trap.desc,
      trapPenalty: trap.penalty,
    });
  });

  // Empty
  emptySpots.forEach((s, idx) => {
    const emptyMsg = EMPTY_MESSAGES[idx % EMPTY_MESSAGES.length];
    contentMap.set(s.id, {
      type: 'EMPTY',
      title: emptyMsg.title,
      description: emptyMsg.desc,
    });
  });

  // Now create the final Room objects
  const fullSpots: SearchSpot[] = BASE_SPOTS.map((base) => ({
    ...base,
    isSearched: false,
    content: contentMap.get(base.id) || {
      type: 'EMPTY',
      title: 'Empty Spot',
      description: 'Nothing hidden here.',
    },
  }));

  const rooms: Room[] = (['lounge', 'study', 'vault'] as RoomId[]).map((roomId) => {
    const meta = ROOM_METADATA[roomId];
    return {
      id: roomId,
      name: meta.name,
      subtitle: meta.subtitle,
      themeDescription: meta.themeDescription,
      bgImage: meta.bgImage,
      spots: fullSpots.filter((s) => s.roomId === roomId),
    };
  });

  return { rooms, winningSpotId };
}
