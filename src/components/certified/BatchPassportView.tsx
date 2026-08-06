import React from 'react';
import QRCode from 'react-qr-code';
import type { BatchPassport } from '../../types';
import { ShieldCheck, QrCode } from 'lucide-react';
import { DemoBadge } from '../ui/Badge';

export const BatchPassportView: React.FC<{ passport: BatchPassport }> = ({ passport }) => {
  const fullPassportUrl = `${window.location.origin}/passport/${passport.batchId}`;

  return (
    <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-3xl p-6 sm:p-8 shadow-xl max-w-2xl mx-auto space-y-6 relative overflow-hidden">
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-5">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-heading font-bold text-xl text-[#14100E]">DIGITAL BATCH PASSPORT</span>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">PANNAI Quality & Traceability System</p>
          </div>
        </div>

        {/* Grade Badge */}
        <div className="bg-[#C42A6B] text-white px-4 py-2 rounded-xl text-center shadow-xs">
          <span className="text-[10px] font-mono tracking-widest block uppercase opacity-80">QUALITY GRADE</span>
          <span className="font-heading font-bold text-lg">{passport.grade}</span>
        </div>
      </div>

      {/* Primary Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] uppercase font-mono tracking-wider block">BATCH IDENTIFIER</span>
          <span className="font-mono font-bold text-sm text-[#14100E]">{passport.batchId}</span>
        </div>

        <div className="bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] uppercase font-mono tracking-wider block">ORIGIN & POND</span>
          <span className="font-bold text-xs text-[#14100E]">{passport.origin} ({passport.pondId})</span>
        </div>

        <div className="bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] uppercase font-mono tracking-wider block">PRODUCT</span>
          <span className="font-bold text-xs text-[#14100E]">{passport.productName}</span>
        </div>

        <div className="bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] uppercase font-mono tracking-wider block">HARVEST DATE</span>
          <span className="font-bold text-xs text-[#14100E]">{passport.harvestDate}</span>
        </div>
      </div>

      {/* Verified Lab QC Specifications */}
      <div className="border border-[#E6DFD5] rounded-2xl p-4 space-y-3 bg-white">
        <span className="text-xs font-bold uppercase tracking-wider text-[#69615B] block">
          VERIFIED QC SPECIFICATIONS
        </span>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 bg-[#FAF0F4] rounded-xl border border-[#F3CBDC]">
            <span className="text-[10px] text-[#69615B] block uppercase font-mono">HATCHABILITY</span>
            <span className="font-heading font-bold text-base text-[#C42A6B]">
              {passport.hatchabilityPercent}%
            </span>
          </div>

          <div className="p-2.5 bg-[#F7F3EC] rounded-xl border border-[#E6DFD5]">
            <span className="text-[10px] text-[#69615B] block uppercase font-mono">MOISTURE</span>
            <span className="font-heading font-bold text-base text-[#14100E]">
              {passport.moisturePercent}%
            </span>
          </div>

          <div className="p-2.5 bg-[#E2F4EE] rounded-xl border border-[#3E8B7A]/30">
            <span className="text-[10px] text-[#69615B] block uppercase font-mono">PURITY</span>
            <span className="font-heading font-bold text-base text-[#3E8B7A]">
              {passport.imagePurityPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Traceability Flow */}
      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#69615B] block">TRACEABILITY CHAIN</span>
        <div className="grid grid-cols-5 gap-1 text-[10px] text-center font-mono">
          <div className="bg-[#F7F3EC] p-2 rounded-lg border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">POND</span>
            <span className="text-[9px] text-[#69615B]">{passport.pondId}</span>
          </div>
          <div className="bg-[#F7F3EC] p-2 rounded-lg border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">HARVEST</span>
            <span className="text-[9px] text-[#69615B]">18.4 kg</span>
          </div>
          <div className="bg-[#F7F3EC] p-2 rounded-lg border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">PROCESS</span>
            <span className="text-[9px] text-[#69615B]">Cleaned</span>
          </div>
          <div className="bg-[#F7F3EC] p-2 rounded-lg border border-[#E6DFD5]">
            <span className="block font-bold text-[#14100E]">LAB QC</span>
            <span className="text-[9px] text-[#3E8B7A]">Passed</span>
          </div>
          <div className="bg-[#C42A6B] text-white p-2 rounded-lg font-bold">
            <span>PASSPORT</span>
          </div>
        </div>
      </div>

      {/* QR Code & Verification Section */}
      <div className="pt-4 border-t border-[#E6DFD5] flex items-center justify-between">
        <div className="space-y-1 pr-4">
          <span className="text-xs font-bold text-[#14100E] block flex items-center space-x-1">
            <QrCode className="w-4 h-4 text-[#C42A6B]" />
            <span>SCAN TO VERIFY PUBLIC PASSPORT</span>
          </span>
          <p className="text-[11px] text-[#69615B] leading-relaxed max-w-sm">
            Scan this QR code to view public traceability data, physical lab certificates, and verified origin telemetry.
          </p>
          <p className="text-[10px] font-mono text-[#69615B] truncate max-w-xs">
            HASH: {passport.blockchainVerificationHash}
          </p>
        </div>

        {/* Generated QR Code */}
        <div className="p-2.5 bg-white border-2 border-[#14100E] rounded-2xl shadow-sm shrink-0">
          <QRCode value={fullPassportUrl} size={90} />
        </div>
      </div>
    </div>
  );
};
