import React from 'react';
import { Lightbulb } from 'lucide-react';

export const MoatPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-3xl p-8 shadow-md space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#FAF0F4] border border-[#F3CBDC] rounded-full text-xs font-mono font-bold text-[#C42A6B]">
          <Lightbulb className="w-3.5 h-3.5" />
          <span>PRODUCT MOAT & DEFENSIBILITY</span>
        </div>

        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-[#14100E] leading-tight">
          THE MOAT ISN'T THE SATELLITE.
        </h1>

        <p className="text-sm sm:text-base text-[#69615B] leading-relaxed">
          Satellite data is increasingly accessible and commoditized. PANNAI's long-term defensible asset is the proprietary dataset connecting pond condition signals to commercial outcomes over real production cycles.
        </p>
      </div>

      {/* Connected Dataset Diagram */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl p-6 shadow-xs space-y-6">
        <h2 className="font-heading font-bold text-lg text-[#14100E] border-b border-[#E6DFD5] pb-3">
          PANNAI'S LONG-TERM DATA ADVANTAGE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-7 gap-2 text-center text-xs items-center font-mono">
          <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">POND CONDITIONS</span>
          </div>

          <div className="hidden md:block text-[#69615B]">→</div>

          <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">SATELLITE SIGNS</span>
          </div>

          <div className="hidden md:block text-[#69615B]">→</div>

          <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">FIELD SALINITY</span>
          </div>

          <div className="hidden md:block text-[#69615B]">→</div>

          <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-3 rounded-xl font-bold text-[#C42A6B]">
            <span>BUYER ACCEPTANCE</span>
          </div>
        </div>

        <div className="bg-[#F7F3EC] p-5 rounded-2xl border border-[#E6DFD5] space-y-3 text-xs text-[#69615B] leading-relaxed">
          <p className="font-semibold text-[#14100E]">Why this creates a compounding advantage:</p>
          <ul className="list-disc pl-4 space-y-1.5">
            <li>
              After enough real production cycles, PANNAI learns which satellite & field condition combinations lead to maximum hatchability recovery.
            </li>
            <li>
              Producers gain higher yields and predictable harvests based on localized advisory timing.
            </li>
            <li>
              Hatchery buyers obtain consistent, lab-certified Artemia cyst lots with digital batch passports.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
