import React from 'react';
import { TrendingUp } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';

export const BusinessModelPage: React.FC = () => {
  return (
    <div className="space-y-10 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl p-8 shadow-xs space-y-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#C42A6B]" />
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#14100E]">
            COMMERCIAL MODEL & EXPANSION ROADMAP
          </h1>
          <DemoBadge />
        </div>
        <p className="text-xs text-[#69615B]">
          How PANNAI monetizes digital bioeconomy infrastructure and scales across coastal salt belts.
        </p>
      </div>

      {/* Revenue Streams Grid */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-lg text-[#14100E]">POTENTIAL REVENUE STREAMS</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="bg-[#FFFCF7] border border-[#E6DFD5] p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono text-[#C42A6B] font-bold block uppercase">STREAM 01</span>
            <h3 className="font-heading font-bold text-base text-[#14100E]">B2B Marketplace Fee</h3>
            <p className="text-[#69615B] leading-relaxed">
              3–5% transaction fee on verified Artemia cyst lot reservations executed through PANNAI Market.
            </p>
            <span className="text-[10px] font-mono text-[#69615B] block pt-2 border-t border-[#E6DFD5]">Illustrative Pricing</span>
          </div>

          <div className="bg-[#FFFCF7] border border-[#E6DFD5] p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono text-[#3E8B7A] font-bold block uppercase">STREAM 02</span>
            <h3 className="font-heading font-bold text-base text-[#14100E]">Processing & Certification</h3>
            <p className="text-[#69615B] leading-relaxed">
              Fee per kg for lab hatchability testing, moisture verification, and Digital Batch Passport generation.
            </p>
            <span className="text-[10px] font-mono text-[#69615B] block pt-2 border-t border-[#E6DFD5]">Illustrative Pricing</span>
          </div>

          <div className="bg-[#FFFCF7] border border-[#E6DFD5] p-5 rounded-2xl space-y-2">
            <span className="text-[10px] font-mono text-[#D9A441] font-bold block uppercase">STREAM 03</span>
            <h3 className="font-heading font-bold text-base text-[#14100E]">Enterprise Hatchery Tools</h3>
            <p className="text-[#69615B] leading-relaxed">
              Subscription SaaS portal for large commercial hatcheries requiring forward supply guarantees & API integration.
            </p>
            <span className="text-[10px] font-mono text-[#69615B] block pt-2 border-t border-[#E6DFD5]">Illustrative Pricing</span>
          </div>
        </div>
      </div>

      {/* Geographic Scale Expansion Roadmap */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl p-8 space-y-6">
        <h2 className="font-heading font-bold text-lg text-[#14100E] border-b border-[#E6DFD5] pb-3">
          GEOGRAPHIC EXPANSION ROADMAP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-4 rounded-2xl space-y-2">
            <span className="font-bold text-[#C42A6B] block">PHASE 1 (CURRENT PILOT)</span>
            <h4 className="font-bold text-sm text-[#14100E]">Thoothukudi, TN</h4>
            <p className="text-[#69615B] text-[11px]">5–10 pilot salt ponds. Baseline salinity & Artemia suitability validation.</p>
          </div>

          <div className="bg-[#F7F3EC] border border-[#E6DFD5] p-4 rounded-2xl space-y-2">
            <span className="font-bold text-[#3E8B7A] block">PHASE 2</span>
            <h4 className="font-bold text-sm text-[#14100E]">Tamil Nadu Coast</h4>
            <p className="text-[#69615B] text-[11px]">Expand across Marakkanam, Vedaranyam & Ramanathapuram salt belts.</p>
          </div>

          <div className="bg-[#F7F3EC] border border-[#E6DFD5] p-4 rounded-2xl space-y-2">
            <span className="font-bold text-[#D9A441] block">PHASE 3</span>
            <h4 className="font-bold text-sm text-[#14100E]">All India Salt Belts</h4>
            <p className="text-[#69615B] text-[11px]">Scale to Gujarat (Little Rann of Kutch), Andhra Pradesh & Odisha.</p>
          </div>

          <div className="bg-[#F7F3EC] border border-[#E6DFD5] p-4 rounded-2xl space-y-2">
            <span className="font-bold text-[#69615B] block">PHASE 4</span>
            <h4 className="font-bold text-sm text-[#14100E]">Global Bioeconomy</h4>
            <p className="text-[#69615B] text-[11px]">Select hypersaline salt producing regions across South & SE Asia.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
