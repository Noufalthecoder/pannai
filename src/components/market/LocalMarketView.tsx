import React from 'react';
import { useApp } from '../../store/AppContext';
import { SourceBadge } from '../ui/SourceBadge';
import { MapPin, ShieldCheck, CheckCircle2, ArrowRight, ExternalLink, Filter, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MarketLot } from '../../types';


interface LocalMarketViewProps {
  onOpenOrderModal: (lot: MarketLot) => void;
  onOpenFilterModal: () => void;
}

export const LocalMarketView: React.FC<LocalMarketViewProps> = ({ onOpenOrderModal, onOpenFilterModal }) => {
  const { marketLots, buyerRequests } = useApp();
  const navigate = useNavigate();

  const localBuyer = buyerRequests[0];


  return (
    <div className="space-y-8 text-[#11100F]">
      {/* Header Banner & Location Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block mb-1">
            LOCAL B2B FULFILLMENT
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-[#11100F]">
            LOCAL MARKET · SHORTER DISTANCE. FASTER VALUE.
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Direct pond-to-hatchery sales within 50 km logistics radius. Lower transport complexity & rapid payout settlement.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#FAF8F5] border border-stone-300 px-3.5 py-2 rounded-xl text-xs font-mono">
            <span className="text-[10px] text-stone-500 block">LOCATION</span>
            <span className="font-bold text-[#11100F] flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-pink-600" /> THOOTHUKUDI · 50 km
            </span>
          </div>

          <button
            onClick={onOpenFilterModal}
            className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#11100F] hover:bg-stone-800 text-white font-mono text-xs font-bold rounded-xl transition-all cursor-pointer"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>FILTER</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Horizontal Product Listings Left | Local Buyer Matching Drawer Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Horizontal Product Cards */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3 className="font-heading font-bold text-base text-[#11100F]">
              LOCAL VERIFIED SUPPLY ({marketLots.length})
            </h3>
            <SourceBadge source="FIELD" timestamp="Location Aware" />
          </div>

          <div className="space-y-3">
            {marketLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-white border border-stone-200/90 rounded-xl p-4 shadow-sm hover:border-pink-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-base text-[#11100F]">{lot.title}</span>
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-pink-50 text-pink-700 rounded border border-pink-200">
                      {lot.grade}
                    </span>
                    <SourceBadge source="DEMO" />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-stone-700">
                    <div>
                      <span className="text-[10px] text-stone-500 block">AVAILABLE</span>
                      <span className="font-bold text-[#11100F]">{lot.quantityKg} kg</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">HATCHABILITY</span>
                      <span className="font-bold text-emerald-700 flex items-center gap-1">
                        {lot.hatchabilityPercent}% <SourceBadge source="LAB" />
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">POND ORIGIN</span>
                      <span className="font-bold text-stone-900">{lot.origin}</span>
                    </div>

                    <div>
                      <span className="text-[10px] text-stone-500 block">PRICE</span>
                      <span className="font-bold text-pink-600">₹{lot.pricePerKgINR.toLocaleString('en-IN')}/kg</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1 text-[11px] font-mono text-stone-600">
                    <span className="flex items-center gap-1 text-emerald-800 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      ✓ Digital Batch Passport Verified
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="flex items-center gap-1 font-bold text-stone-800">
                      <Truck className="w-3.5 h-3.5 text-stone-500" /> 18 km distance
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate(`/passport/${lot.batchId}`)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] hover:bg-stone-200 text-stone-800 font-mono text-xs font-bold rounded-lg border border-stone-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>PASSPORT</span>
                  </button>

                  <button
                    onClick={() => onOpenOrderModal(lot)}
                    className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-md flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>RESPOND TO ORDER</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Local Buyer Experience & Match Drawer (Section 3 Requirement) */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-pink-500 rounded-2xl p-6 shadow-md space-y-5 sticky top-20">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block">
                  LOCAL BUYER PROFILING
                </span>
                <h3 className="font-heading font-bold text-base text-[#11100F]">
                  {localBuyer?.buyerCompany || 'Thoothukudi Aquaculture Hatchery'}
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-300">
                MATCH {localBuyer?.matchScorePercent || 92}%
              </span>
            </div>

            {/* Buyer Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200">
              <div>
                <span className="text-[10px] text-stone-500 block">BUYER TYPE</span>
                <span className="font-bold text-stone-900">{localBuyer?.buyerType}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">DISTANCE</span>
                <span className="font-bold text-stone-900">{localBuyer?.distanceKm || 18} km</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">DEMAND</span>
                <span className="font-bold text-pink-600">{localBuyer?.demandKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">REQUIRED QUALITY</span>
                <span className="font-bold text-emerald-700">{localBuyer?.requiredGrade}</span>
              </div>
            </div>

            {/* WHY THIS MATCH? Breakdown (Section 3 Requirement) */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-stone-700 uppercase block">
                WHY THIS MATCH?
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                {localBuyer?.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-emerald-800 bg-emerald-50/90 p-2 rounded-lg border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="pt-2 border-t border-stone-200 flex gap-2">
              <button
                onClick={() => onOpenOrderModal(marketLots[0])}
                className="flex-1 py-3 px-4 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>RESPOND TO ORDER</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
