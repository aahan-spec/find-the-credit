import React from 'react';
import { X, BookOpen, Check, HelpCircle, Shield, AlertTriangle, Sparkles } from 'lucide-react';
import { ClueData } from '../types/game';

interface ClueNotebookProps {
  isOpen: boolean;
  onClose: () => void;
  clues: ClueData[];
  foundDecoys: string[];
  totalSpotsCount: number;
  searchedSpotsCount: number;
}

export const ClueNotebook: React.FC<ClueNotebookProps> = ({
  isOpen,
  onClose,
  clues,
  foundDecoys,
  totalSpotsCount,
  searchedSpotsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-slate-100">
                Detective Dossier & Intel
              </h3>
              <p className="text-xs text-slate-400">
                Verified clues and forensic deduction findings
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Progress */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>Overall Mansion Inspection</span>
            <span className="font-mono text-amber-400 font-bold">
              {searchedSpotsCount} / {totalSpotsCount} Spots Examined
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full transition-all duration-500"
              style={{ width: `${(searchedSpotsCount / totalSpotsCount) * 100}%` }}
            />
          </div>
        </div>

        {/* Clues Discovered List */}
        <div className="space-y-4 mb-6">
          <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Decrypted Field Intelligence ({clues.length})</span>
          </div>

          {clues.length === 0 ? (
            <div className="p-6 rounded-2xl border border-dashed border-slate-800 text-center text-slate-500 text-xs">
              No clues discovered yet. Search study drawers, bookshelf volumes, and safe compartments to unlock critical hints!
            </div>
          ) : (
            <div className="space-y-2.5">
              {clues.map((clue, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-950/90 border border-amber-500/30 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-amber-200">{clue.text}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{clue.revealedInfo}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Decoys Found */}
        {foundDecoys.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <AlertTriangle className="w-3.5 h-3.5 text-yellow-500" />
              <span>Discarded False Leads & Decoys ({foundDecoys.length})</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {foundDecoys.map((decoy, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-400 line-through"
                >
                  {decoy}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Strategic Tips */}
        <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
          <div className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>Master Detective Tip:</span>
          </div>
          The authentic Black Diamond Credit Card emits an ultra-high frequency RFID beacon. Use your
          RFID Radar Scanner (1 AP) to assess proximity: a "Burning Hot" reading means it's right in that room!
        </div>

        <button
          onClick={onClose}
          className="w-full mt-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
        >
          Return to Investigation
        </button>
      </div>
    </div>
  );
};
