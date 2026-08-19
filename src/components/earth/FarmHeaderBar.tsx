import React from 'react';
import { PlusCircle } from 'lucide-react';
import { SourceBadge } from '../ui/SourceBadge';

interface FarmHeaderBarProps {
  myPondsCount?: number;
  onOpenRegisterModal: () => void;
}

export const FarmHeaderBar: React.FC<FarmHeaderBarProps> = ({ myPondsCount = 5, onOpenRegisterModal }) => {
  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl px-5 py-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3 text-[#11100F]">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-lg text-[#11100F]">MY FARM</h1>
            <span className="text-[11px] font-mono text-stone-600 font-bold">Tharuvaikulam · Thoothukudi</span>
          </div>
          <p className="text-xs text-stone-500 font-mono flex items-center gap-2 mt-0.5">
            <span className="font-bold text-pink-600">{myPondsCount} PONDS MONITORED</span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1 text-emerald-700 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              LIVE MONITORING
            </span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <SourceBadge source="FIELD" timestamp="Live Telemetry" />

        <button
          onClick={onOpenRegisterModal}
          className="px-3.5 py-2 bg-[#11100F] hover:bg-stone-800 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <PlusCircle className="w-3.5 h-3.5 text-pink-400" />
          <span>REGISTER YOUR POND</span>
        </button>
      </div>
    </div>
  );
};
