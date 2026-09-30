import React from 'react';
import { X, Target, Radio, AlertTriangle, ShieldCheck, Trophy } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2.5">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="font-display text-lg font-bold text-slate-100">
              Find The Card — Rules & Objectives
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Breakdown */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          {/* Mission Objective */}
          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
            <div className="font-bold text-amber-300 flex items-center gap-1.5 mb-1 text-sm">
              <Target className="w-4 h-4 text-amber-400" />
              <span>The Mission & How to Win</span>
            </div>
            A priceless VIP Centurion Black Diamond Credit Card (unlimited credit line!) has been
            hidden in one secret compartment inside this penthouse.
            <div className="mt-2 font-semibold text-slate-100">
              Whoever uncovers the authentic Black Diamond Credit Card first is crowned THE WINNER!
            </div>
          </div>

          {/* Turn Mechanics */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="font-bold text-slate-200 flex items-center gap-1.5 mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Turn Actions (2 Action Points per turn)</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>
                <strong className="text-slate-200">Search Spot (1 AP):</strong> Inspects an item (cushion, safe, drawer, jacket).
              </li>
              <li>
                <strong className="text-slate-200">RFID Proximity Radar (1 AP):</strong> Calibrates sensor to detect whether the card is in your current room or nearby.
              </li>
              <li>
                <strong className="text-slate-200">Switch Rooms:</strong> Free! Click any room tab at any time to travel between the Sky Lounge, Study, and Vault.
              </li>
            </ul>
          </div>

          {/* Hazards & False Leads */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="font-bold text-slate-200 flex items-center gap-1.5 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span>Clues, Decoys & Security Traps</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-400">
              <li>
                <strong className="text-blue-300">Intel Clues:</strong> Decrypt logs that confirm or eliminate entire rooms and furniture categories.
              </li>
              <li>
                <strong className="text-yellow-300">Decoy Cards:</strong> Expired metro cards, coffee loyalty cards, and joke novelty cards to trick hasty detectives!
              </li>
              <li>
                <strong className="text-red-300">Security Traps:</strong> Laser tripwires and dye packs that trigger penalties!
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
        >
          Got it, Let's Play!
        </button>
      </div>
    </div>
  );
};
