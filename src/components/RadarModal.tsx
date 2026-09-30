import React, { useEffect, useState } from 'react';
import { Radio, X, Sparkles, Navigation, AlertCircle } from 'lucide-react';
import { RadarResult } from '../types/game';
import { sound } from '../utils/audio';

interface RadarModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: RadarResult | null;
  scanning: boolean;
}

export const RadarModal: React.FC<RadarModalProps> = ({
  isOpen,
  onClose,
  result,
  scanning,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-amber-500/50 p-6 sm:p-8 shadow-2xl overflow-hidden text-center">
        {/* Radar Ambient Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6 relative z-10">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
              RFID Proximity Sensor
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Radar Scanner Animation Viewport */}
        <div className="relative w-48 h-48 mx-auto my-4 rounded-full border-2 border-amber-500/30 bg-slate-950 flex items-center justify-center overflow-hidden shadow-inner shadow-amber-500/10">
          {/* Concentric rings */}
          <div className="absolute w-36 h-36 rounded-full border border-amber-500/20" />
          <div className="absolute w-24 h-24 rounded-full border border-amber-500/20" />
          <div className="absolute w-12 h-12 rounded-full border border-amber-500/30" />

          {/* Crosshairs */}
          <div className="absolute inset-x-0 h-px bg-amber-500/20" />
          <div className="absolute inset-y-0 w-px bg-amber-500/20" />

          {/* Rotating radar sweep beam */}
          <div
            className={`absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-amber-400/30 pointer-events-none ${
              scanning ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '1.2s' }}
          />

          {/* Target Blip when scan completes */}
          {!scanning && result && (
            <div
              className={`relative z-10 flex flex-col items-center justify-center p-3 rounded-full ${
                result.level === 'burning'
                  ? 'bg-red-500/20 text-red-400 animate-ping'
                  : result.level === 'hot'
                  ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                  : result.level === 'warm'
                  ? 'bg-yellow-500/20 text-yellow-300'
                  : 'bg-blue-500/20 text-blue-300'
              }`}
            >
              <Navigation className="w-8 h-8 rotate-45" />
            </div>
          )}
        </div>

        {/* Scan Status & Results */}
        {scanning ? (
          <div className="space-y-2 py-4">
            <div className="text-sm font-mono text-amber-300 animate-pulse">
              CALIBRATING TITANIUM EMV FREQUENCY...
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Listening for encrypted microchip resonance
            </div>
          </div>
        ) : result ? (
          <div className="space-y-4 py-2">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Current Room Signal
              </div>
              <div
                className={`font-display text-2xl font-black tracking-wider uppercase mt-1 ${
                  result.level === 'burning'
                    ? 'text-red-400 animate-pulse'
                    : result.level === 'hot'
                    ? 'text-amber-400'
                    : result.level === 'warm'
                    ? 'text-yellow-400'
                    : 'text-blue-400'
                }`}
              >
                {result.level === 'burning'
                  ? '🔥 BURNING HOT (< 1.5m)'
                  : result.level === 'hot'
                  ? '⚡ HOT SIGNAL (IN THIS ROOM)'
                  : result.level === 'warm'
                  ? '📡 WARM SIGNAL (NEARBY SUITE)'
                  : '❄️ COLD SIGNAL (> 15m AWAY)'}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              {result.message}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-colors"
            >
              Resume Search With Coordinates
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
