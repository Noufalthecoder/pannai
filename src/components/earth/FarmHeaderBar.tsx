import React from 'react';
import { PlusCircle, ShieldCheck } from 'lucide-react';

interface FarmHeaderBarProps {
  myPondsCount?: number;
  totalPondsCount?: number;
  onOpenRegisterModal: () => void;
}

export const FarmHeaderBar: React.FC<FarmHeaderBarProps> = ({
  totalPondsCount = 50,
  onOpenRegisterModal,
}) => {
  return (
    <div className="bg-white border-2 border-stone-300 rounded-3xl px-6 py-4 shadow-sm flex flex-wrap items-center justify-between gap-4 text-[#11100F] font-mono select-none">
      <div className="flex items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl text-[#11100F] tracking-tight">MY FARM</h1>
            <span className="text-xs font-mono font-bold text-stone-600">Tharuvaikulam · Thoothukudi</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs mt-1 font-bold">
            <span className="text-pink-700 font-extrabold">{totalPondsCount} PONDS MONITORED</span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1.5 text-emerald-800 font-extrabold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              LIVE MONITORING
            </span>
            <span className="text-stone-300">·</span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-[11px] flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              FIELD VERIFIED ✓
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenRegisterModal}
          className="px-4 py-2.5 bg-[#11100F] hover:bg-stone-800 text-white font-mono text-xs font-extrabold rounded-2xl transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-98"
        >
          <PlusCircle className="w-4 h-4 text-pink-400" />
          <span>REGISTER YOUR POND</span>
        </button>
      </div>
    </div>
  );
};
