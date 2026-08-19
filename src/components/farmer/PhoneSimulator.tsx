import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto max-w-[420px] w-full bg-[#11100F] p-4 rounded-[40px] shadow-2xl border-4 border-stone-800 relative ${className}`}>
      {/* Notch / Dynamic Island */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#11100F] rounded-full z-30 flex items-center justify-center space-x-2 border border-stone-800">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
      </div>

      {/* Screen Container */}
      <div className="bg-white text-[#11100F] rounded-[30px] overflow-hidden min-h-[660px] flex flex-col justify-between relative shadow-inner pt-6 pb-4 px-4 font-sans border border-stone-200">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-stone-700 mb-2 px-2 pt-1">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5">
            <Signal className="w-3.5 h-3.5 text-[#11100F]" />
            <Wifi className="w-3.5 h-3.5 text-[#11100F]" />
            <Battery className="w-4 h-4 text-[#11100F]" />
          </div>
        </div>

        {/* Screen Body Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none py-1 space-y-2">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="w-32 h-1 bg-stone-900/30 rounded-full mx-auto mt-3" />
      </div>
    </div>
  );
};
