import React from 'react';
import { ShieldCheck, Database, ArrowDown } from 'lucide-react';
import { SourceBadge } from '../components/ui/SourceBadge';


export const MoatPage: React.FC = () => {
  const dataInputs = [
    'FIELD DATA',
    'SATELLITE',
    'WEATHER',
    'POND HISTORY',
    'HARVEST OUTCOME',
    'QUALITY',
    'MARKET PRICE',
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto text-[#11100F] pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-2xl text-[#11100F]">PANNAI MOAT & DEFENSIBILITY</h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-600">
              Data Flywheel · Ground-Truth Telemetry Asset · Model Compounding Defensibility
            </p>
          </div>
        </div>
      </div>

      {/* HEADLINE: THE MOAT IS NOT THE SENSOR. THE MOAT IS THE DATA. (Section 16 Requirement) */}
      <div className="bg-white border-2 border-pink-500 rounded-2xl p-8 shadow-md space-y-6 text-center">
        <div className="space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block">
            CORE STRATEGIC THESIS
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#11100F]">
            THE MOAT IS NOT THE SENSOR. <br />
            <span className="text-pink-600">THE MOAT IS THE DATA.</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Hardware sensors and raw satellite imagery are commoditized. PANNAI's indefensible asset is the proprietary salt-pan dataset binding remote observation signals to verified physical lab outcomes across real production cycles.
          </p>
        </div>
      </div>

      {/* DATA PIPELINE & COMPOUNDING FLYWHEEL (Section 16 Requirement) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h3 className="font-heading font-bold text-lg text-[#11100F]">
            MULTI-SOURCE DATA PIPELINE & FLYWHEEL
          </h3>
          <SourceBadge source="MODEL" />
        </div>

        {/* 7 Data Inputs Grid */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-semibold tracking-wider text-stone-500 uppercase block">
            01 MULTI-SOURCE SIGNAL INPUTS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-[10px] font-mono font-bold">
            {dataInputs.map((input) => (
              <div key={input} className="bg-[#FAF8F5] p-2.5 rounded-lg border border-stone-200 text-stone-800">
                {input}
              </div>
            ))}
          </div>
        </div>

        {/* Flow Down Arrow */}
        <div className="flex justify-center my-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-pink-600 bg-pink-50 px-4 py-1.5 rounded-full border border-pink-200">
            <Database className="w-4 h-4" />
            <span>SALT-PAN INTELLIGENCE DATASET</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
        </div>

        {/* Compounding Model Outcomes */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs font-mono">
          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-purple-200">
            <span className="text-[10px] text-purple-700 block font-bold">STAGE 02</span>
            <span className="font-bold text-stone-900 text-sm">BETTER MODELS</span>
          </div>

          <div className="bg-[#FAF8F5] p-4 rounded-xl border border-blue-200">
            <span className="text-[10px] text-blue-700 block font-bold">STAGE 03</span>
            <span className="font-bold text-stone-900 text-sm">BETTER DECISIONS</span>
          </div>

          <div className="bg-pink-50 p-4 rounded-xl border border-pink-300">
            <span className="text-[10px] text-pink-700 block font-bold">STAGE 04</span>
            <span className="font-bold text-pink-700 text-sm">MORE FARMS</span>
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200 text-xs text-stone-600 leading-relaxed font-mono">
          <strong className="text-[#11100F]">Compounding Advantage:</strong> Every verified batch passport recorded strengthens ground-truth correlation between satellite salinity bands and physical 24-hr lab hatchability recovery, creating an insurmountable proprietary dataset.
        </div>
      </div>
    </div>
  );
};
