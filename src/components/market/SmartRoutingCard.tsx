import React from 'react';
import { Route, AlertCircle } from 'lucide-react';
import { DemoBadge } from '../ui/Badge';

export const SmartRoutingCard: React.FC = () => {
  return (
    <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
        <div className="flex items-center space-x-2">
          <Route className="w-5 h-5 text-[#3E8B7A]" />
          <h3 className="font-heading font-bold text-base text-[#14100E]">SMART MARKET ROUTING</h3>
          <DemoBadge />
        </div>
        <span className="text-xs font-mono text-[#3E8B7A] bg-[#E2F4EE] px-2 py-0.5 rounded-full font-bold">
          OPTIMIZED
        </span>
      </div>

      <div className="space-y-3">
        <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-3.5 rounded-xl space-y-1">
          <span className="text-[10px] font-mono text-[#C42A6B] uppercase font-bold block">
            RECOMMENDED COMMERCIAL ROUTE
          </span>
          <p className="font-heading font-bold text-sm text-[#14100E]">
            PREMIUM SHRIMP & MARINE FISH HATCHERY MARKET
          </p>
          <p className="text-xs text-[#69615B]">
            Targeting commercial Penaeus vannamei & Asian Seabass hatcheries in Tamil Nadu & Andhra Pradesh.
          </p>
        </div>

        <div className="space-y-1.5 text-xs">
          <span className="font-bold text-[#14100E] block">ALTERNATIVE COMMERCIAL DESTINATIONS</span>
          <div className="bg-[#F7F3EC] p-2.5 rounded-lg border border-[#E6DFD5] flex justify-between">
            <span>Ornamental Fish Breeding Sector</span>
            <span className="font-mono text-[#69615B]">Secondary Route</span>
          </div>
          <div className="bg-[#F7F3EC] p-2.5 rounded-lg border border-[#E6DFD5] flex justify-between">
            <span>Formulated Aquafeed Biomass Applications</span>
            <span className="font-mono text-[#69615B]">Tertiary Route</span>
          </div>
        </div>

        {/* Mandatory Scientific Guardrail Notice */}
        <div className="bg-[#FFF8EE] border border-[#FCE4C0] p-3 rounded-xl text-[11px] text-[#A6781B] flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-[#D9A441] shrink-0 mt-0.5" />
          <span>
            Final commercial destination remains strictly subject to product-specific physical QC parameters and buyer lab clearance.
          </span>
        </div>
      </div>
    </div>
  );
};
