import React from 'react';
import { SourceBadge } from '../ui/SourceBadge';
import { AlertCircle, CheckCircle2, ArrowDown } from 'lucide-react';

interface ArtemiaEngineProps {
  salinityPpt?: number;
  temperatureC?: number;
  waterDepthCm?: number;
  suitabilityScore?: number;
  className?: string;
}

export const ArtemiaEngine: React.FC<ArtemiaEngineProps> = ({
  salinityPpt = 92,
  temperatureC = 32.4,
  waterDepthCm = 18,
  suitabilityScore = 86,
  className = '',
}) => {

  return (
    <div className={`bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block mb-1">
            BIOLOGICAL SUITABILITY ENGINE
          </span>
          <h3 className="font-heading text-xl font-bold text-[#11100F]">FROM SALT PAN TO BIOECONOMY</h3>
        </div>
        <SourceBadge source="MODEL" timestamp="Confidence 82%" />
      </div>

      <p className="text-xs text-stone-600 leading-relaxed mb-6">
        Artemia (brine shrimp) cysts represent a high-value biological co-product opportunity in hypersaline coastal salt pans when ecological thresholds are met.
      </p>

      {/* Decision Logic Pipeline */}
      <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-xl p-4 mb-6 space-y-4">
        <div className="text-[10px] font-mono font-semibold tracking-wider text-stone-500 uppercase">
          DECISION LOGIC PIPELINE
        </div>

        {/* Input Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-stone-200">
            <span className="text-[10px] text-stone-500 block font-mono">SALINITY</span>
            <span className="font-bold text-stone-900">{salinityPpt} ppt</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-stone-200">
            <span className="text-[10px] text-stone-500 block font-mono">TEMP</span>
            <span className="font-bold text-stone-900">{temperatureC}°C</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-stone-200">
            <span className="text-[10px] text-stone-500 block font-mono">DEPTH</span>
            <span className="font-bold text-stone-900">{waterDepthCm} cm</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-stone-200">
            <span className="text-[10px] text-stone-500 block font-mono">SEASON</span>
            <span className="font-bold text-stone-900">Pre-Monsoon</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-stone-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-stone-500 block font-mono">SIGNALS</span>
            <span className="font-bold text-emerald-700">Optimal</span>
          </div>
        </div>

        {/* Flow Down Indicator */}
        <div className="flex justify-center my-1">
          <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            <span>PANNAI SUITABILITY ENGINE</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </div>
        </div>

        {/* Output Indicator */}
        <div className="bg-white p-4 rounded-xl border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center font-mono font-bold text-lg text-emerald-700">
              {suitabilityScore}%
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider font-semibold text-emerald-700 uppercase block">
                SUITABILITY SCORE
              </span>
              <h4 className="font-bold text-sm text-[#11100F] flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                SUITABLE — FIELD VALIDATION REQUIRED
              </h4>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SourceBadge source="FIELD" />
            <SourceBadge source="DEMO" />
          </div>
        </div>
      </div>

      {/* Scientific Caution Banner */}
      <div className="bg-amber-50/90 border border-amber-200/90 rounded-xl p-3.5 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed">
          <strong className="font-semibold">Scientific Caution Protocol:</strong> Model estimates indicate high biological suitability based on hypersaline remote data. However, physical ground-truth field sampling (density, pH, dissolved oxygen) and lab validation are mandatory prior to inoculating or harvesting Artemia.
        </div>
      </div>
    </div>
  );
};
