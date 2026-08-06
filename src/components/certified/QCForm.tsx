import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import type { Batch } from '../../types';
import { ShieldCheck, Eye, TestTube, CheckCircle2, FileCheck } from 'lucide-react';
import { DemoBadge } from '../ui/Badge';

export const QCForm: React.FC<{ batch: Batch }> = ({ batch }) => {
  const { recordQCAndCertify, guidedDemoStep, nextGuidedDemoStep } = useApp();

  const [hatchability, setHatchability] = useState<number>(86.4);
  const [moisture, setMoisture] = useState<number>(6.1);
  const [technician, setTechnician] = useState<string>('Dr. V. Ramanathan (PANNAI Bio-Lab)');

  const calculatedGrade = hatchability >= 80 && moisture <= 8.0 ? 'GRADE A' : 'GRADE B';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    recordQCAndCertify(batch.id, hatchability, moisture, technician);
    if (guidedDemoStep === 4) {
      nextGuidedDemoStep();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-sm space-y-5">
      <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-heading font-bold text-lg text-[#14100E]">QUALITY CONTROL & CERTIFICATION</h3>
            <DemoBadge />
          </div>
          <p className="text-xs text-[#69615B]">Batch ID: {batch.id} · Pond {batch.pondId}</p>
        </div>
        <ShieldCheck className="w-6 h-6 text-[#C42A6B]" />
      </div>

      {/* 01 Image-Assisted Purity Assessment Section */}
      <div className="bg-[#F7F3EC] p-4 rounded-xl border border-[#E6DFD5] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#14100E]">
            <Eye className="w-4 h-4 text-[#3E8B7A]" />
            <span>IMAGE-ASSISTED PURITY ASSESSMENT</span>
          </div>
          <span className="text-[10px] font-mono text-[#69615B]">COMPUTER VISION</span>
        </div>

        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5]">
            <span className="text-[10px] text-[#69615B] block">CYST DENSITY EST.</span>
            <span className="font-bold text-[#3E8B7A] text-sm">94.2% Pure Cysts</span>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5]">
            <span className="text-[10px] text-[#69615B] block">DEBRIS / ORGANICS</span>
            <span className="font-bold text-[#D9A441] text-sm">5.8% Est. Debris</span>
          </div>
        </div>

        <p className="text-[11px] text-[#69615B] italic">
          Image model evaluates surface purity and shell integrity. Computer vision does not determine viability.
        </p>
      </div>

      {/* 02 Physical Lab QC Section */}
      <div className="space-y-3">
        <div className="flex items-center space-x-1.5 text-xs font-bold text-[#14100E]">
          <TestTube className="w-4 h-4 text-[#C42A6B]" />
          <span>PHYSICAL LAB QC (MANDATORY FOR CERTIFICATION)</span>
        </div>

        {/* Scientific Guardrail Banner */}
        <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-3 rounded-xl text-xs text-[#C42A6B] font-medium flex items-start space-x-2">
          <CheckCircle2 className="w-4 h-4 text-[#C42A6B] shrink-0 mt-0.5" />
          <span>
            Hatchability is recorded from a physical 24-hour lab hatch test. It is not predicted from a photograph.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-[#14100E] mb-1">
              PHYSICAL HATCHABILITY (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={hatchability}
              onChange={(e) => setHatchability(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E6DFD5] bg-white font-bold text-sm text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
              required
            />
            <span className="text-[10px] text-[#69615B] mt-1 block">Grade A threshold: ≥ 80.0%</span>
          </div>

          <div>
            <label className="block font-bold text-[#14100E] mb-1">
              MOISTURE CONTENT (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="20"
              value={moisture}
              onChange={(e) => setMoisture(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-[#E6DFD5] bg-white font-bold text-sm text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
              required
            />
            <span className="text-[10px] text-[#69615B] mt-1 block">Max moisture threshold: ≤ 8.0%</span>
          </div>
        </div>

        <div>
          <label className="block font-bold text-[#14100E] mb-1 text-xs">LAB TECHNICIAN / CERTIFIER</label>
          <input
            type="text"
            value={technician}
            onChange={(e) => setTechnician(e.target.value)}
            className="w-full px-3.5 py-2 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
            required
          />
        </div>
      </div>

      {/* Calculated Grade Summary Box */}
      <div className="bg-[#14100E] text-white p-4 rounded-xl flex items-center justify-between">
        <div>
          <span className="text-[10px] text-stone-400 font-mono tracking-wider uppercase block">CALCULATED GRADE</span>
          <span className="font-heading font-bold text-xl text-[#C42A6B]">{calculatedGrade}</span>
        </div>

        <button
          type="submit"
          className={`py-3 px-5 rounded-xl text-xs font-bold text-white shadow-md flex items-center space-x-2 transition-transform active:scale-95 ${
            guidedDemoStep === 4
              ? 'bg-[#C42A6B] hover:bg-[#A8225A] pulse-highlight'
              : 'bg-[#C42A6B] hover:bg-[#A8225A]'
          }`}
        >
          <FileCheck className="w-4 h-4" />
          <span>CERTIFY & ISSUE PASSPORT</span>
        </button>
      </div>
    </form>
  );
};
