import React from 'react';
import { GameLog } from '../types/game';
import { Terminal, Sparkles, FileText, AlertTriangle, ShieldAlert, Radio, CheckCircle } from 'lucide-react';

interface LogFeedProps {
  logs: GameLog[];
}

export const LogFeed: React.FC<LogFeedProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
            Investigation Activity Log
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">Live Feed</span>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto no-scrollbar pr-1">
        {logs.length === 0 ? (
          <div className="text-[11px] font-mono text-slate-500 py-3 text-center">
            Investigation initialized. Make your first search move!
          </div>
        ) : (
          logs.slice(0, 10).map((log) => {
            const Icon =
              log.type === 'winner'
                ? Sparkles
                : log.type === 'clue'
                ? FileText
                : log.type === 'decoy'
                ? AlertTriangle
                : log.type === 'trap'
                ? ShieldAlert
                : log.type === 'radar'
                ? Radio
                : CheckCircle;

            const colorClass =
              log.type === 'winner'
                ? 'text-amber-400 font-bold'
                : log.type === 'clue'
                ? 'text-blue-400'
                : log.type === 'decoy'
                ? 'text-yellow-400'
                : log.type === 'trap'
                ? 'text-red-400'
                : log.type === 'radar'
                ? 'text-purple-400'
                : 'text-slate-300';

            return (
              <div
                key={log.id}
                className="flex items-start gap-2.5 text-xs font-mono p-1.5 rounded-lg bg-slate-950/40 border border-slate-850"
              >
                <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${colorClass}`} />
                <div className="flex-1 truncate">
                  <span className="text-slate-400 font-semibold">{log.playerName}: </span>
                  <span className={colorClass}>{log.actionText}</span>
                </div>
                <span className="text-[10px] text-slate-600 shrink-0">{log.timestamp}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
