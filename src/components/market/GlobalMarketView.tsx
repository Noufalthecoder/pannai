import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { SourceBadge } from '../ui/SourceBadge';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MarketLot } from '../../types';


interface GlobalMarketViewProps {
  onOpenOrderModal: (lot: MarketLot) => void;
}

export const GlobalMarketView: React.FC<GlobalMarketViewProps> = ({ onOpenOrderModal }) => {
  const { marketLots, buyerRequests } = useApp();
  const navigate = useNavigate();

  const [selectedRegion, setSelectedRegion] = useState<string>('ALL');

  const globalBuyerRequests = buyerRequests.filter((r) => r.region !== 'Local');
  const activeGlobalRequest = globalBuyerRequests[0] || buyerRequests[1] || buyerRequests[0];

  return (
    <div className="space-y-8 text-[#11100F]">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-semibold">
              BULK COMMODITY EXPORT & FEED NETWORKS
            </span>
            <SourceBadge source="DEMO" />
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-[#11100F]">
            GLOBAL MARKET · VERIFIED SUPPLY. BIGGER VALUE CHAINS.
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Connecting certified batch lots with commercial feed suppliers, marine fish hatcheries, and international buyers.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs shrink-0">
          {['ALL', 'Southeast Asia', 'Middle East', 'Sri Lanka'].map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRegion(r)}
              className={`px-3 py-1.5 rounded-lg border font-bold transition-all cursor-pointer ${
                selectedRegion === r
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-[#FAF8F5] border-stone-300 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Global Commodity Listing Left | Global Buyer Network Request Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Global Commodity Listings (Section 5 Requirement) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-2">
            <h3 className="font-heading font-bold text-base text-[#11100F]">
              EXPORT COMMODITY LISTINGS (DEMO GLOBAL MARKET)
            </h3>
            <SourceBadge source="LAB" timestamp="Verified Origin" />
          </div>

          <div className="space-y-4">
            {marketLots.map((lot) => (
              <div
                key={lot.id}
                className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm space-y-4 hover:border-blue-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-extrabold text-lg text-[#11100F]">{lot.title}</span>
                      <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-blue-50 text-blue-800 rounded border border-blue-200">
                        EXPORT GRADE
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 font-mono mt-0.5">BATCH: {lot.batchId} · ORIGIN: {lot.origin}</p>
                  </div>

                  <span className="font-heading font-bold text-lg text-blue-700 font-mono">
                    ₹{lot.pricePerKgINR.toLocaleString('en-IN')} <span className="text-xs font-normal text-stone-500">/ kg</span>
                  </span>
                </div>

                {/* Explicit Provenance Parameters Grid (Section 6 Requirement) */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono bg-[#FAF8F5] p-3 rounded-xl border border-stone-200">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">SALINITY</span>
                      <SourceBadge source="FIELD" />
                    </div>
                    <span className="font-bold text-stone-900">92 ppt</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">HATCHABILITY</span>
                      <SourceBadge source="LAB" />
                    </div>
                    <span className="font-bold text-emerald-800">{lot.hatchabilityPercent}%</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">PURITY</span>
                      <SourceBadge source="MODEL" />
                    </div>
                    <span className="font-bold text-purple-700">{lot.moisturePercent < 7 ? 94.2 : 91.0}%</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-stone-500">AVAILABLE</span>
                      <SourceBadge source="DEMO" />
                    </div>
                    <span className="font-bold text-pink-600">{lot.quantityKg * 2} kg bulk</span>
                  </div>
                </div>

                {/* Buyer Requirements */}
                <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-200 text-xs font-mono space-y-1">
                  <span className="font-bold text-blue-900 uppercase block text-[10px]">GLOBAL BUYER REQUIREMENT</span>
                  <div className="flex flex-wrap justify-between text-[#11100F]">
                    <span>Minimum Order: <strong>10 kg</strong></span>
                    <span>Preferred Quantity: <strong>25–50 kg</strong></span>
                    <span>Destination: <strong>SE Asia / Middle East</strong></span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                  <button
                    onClick={() => navigate(`/passport/${lot.batchId}`)}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-700 hover:underline cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                    <span>VIEW DIGITAL PASSPORT & QR CODE</span>
                  </button>

                  <button
                    onClick={() => onOpenOrderModal(lot)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>REQUEST ORDER</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Global Buyer Network Requests */}
        <div className="lg:col-span-5">
          <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md space-y-5 sticky top-20">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-blue-600 uppercase font-semibold block">
                  GLOBAL BUYER NETWORK
                </span>
                <h3 className="font-heading font-bold text-base text-[#11100F]">
                  {activeGlobalRequest?.buyerCompany}
                </h3>
              </div>
              <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-100 text-blue-800 rounded-full border border-blue-300">
                MATCH {activeGlobalRequest?.matchScorePercent || 88}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200">
              <div>
                <span className="text-[10px] text-stone-500 block">REGION</span>
                <span className="font-bold text-stone-900">{activeGlobalRequest?.region}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">BUYER TYPE</span>
                <span className="font-bold text-stone-900">{activeGlobalRequest?.buyerType}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">BULK DEMAND</span>
                <span className="font-bold text-blue-600">{activeGlobalRequest?.demandKg} kg</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 block">REQUIRED GRADE</span>
                <span className="font-bold text-emerald-700">{activeGlobalRequest?.requiredGrade}</span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-stone-700 uppercase block">
                PANNAI MATCH RATIONALE
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                {activeGlobalRequest?.matchReasons.map((reason, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-blue-900 bg-blue-50 p-2 rounded-lg border border-blue-200">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onOpenOrderModal(marketLots[0])}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>REQUEST BULK EXPORT ORDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
