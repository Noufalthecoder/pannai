import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface PhoneSimulatorProps {
  children: React.ReactNode;
  className?: string;
}

export const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto max-w-[380px] w-full bg-[#14100E] p-3.5 rounded-[44px] shadow-2xl border-4 border-[#2C2420] relative ${className}`}>
      {/* Dynamic Island / Notch */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#14100E] rounded-full z-30 flex items-center justify-center space-x-2">
        <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
        <div className="w-1.5 h-1.5 rounded-full bg-[#3E8B7A]" />
      </div>

      {/* Screen Container */}
      <div className="bg-[#FFFCF7] text-[#14100E] rounded-[32px] overflow-hidden min-h-[640px] flex flex-col justify-between relative shadow-inner pt-7 pb-4 px-4 font-sans border border-[#E6DFD5]">
        {/* Status Bar */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#69615B] mb-2 px-2 pt-1">
          <span>09:41</span>
          <div className="flex items-center space-x-1.5">
            <Signal className="w-3 h-3 text-[#14100E]" />
            <Wifi className="w-3 h-3 text-[#14100E]" />
            <Battery className="w-3.5 h-3.5 text-[#14100E]" />
          </div>
        </div>

        {/* Screen Body Content */}
        <div className="flex-1 overflow-y-auto scrollbar-none py-1">
          {children}
        </div>

        {/* Home Indicator Bar */}
        <div className="w-32 h-1 bg-[#14100E]/20 rounded-full mx-auto mt-2" />
      </div>
    </div>
  );
};
