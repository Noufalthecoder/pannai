import React from 'react';
import { useApp } from '../../store/AppContext';
import { RotateCcw, ArrowRight } from 'lucide-react';

export const GuidedDemoBar: React.FC = () => {
  const { guidedDemoStep, nextGuidedDemoStep, resetGuidedDemo } = useApp();

  if (guidedDemoStep === null) return null;

  const steps = [
    { num: 1, label: '01 DETECT', desc: 'Satellite Intelligence on TTK-042' },
    { num: 2, label: '02 ADVISE', desc: 'Tamil Advisory & Voice Action' },
    { num: 3, label: '03 HARVEST', desc: '18.4 kg Harvest → Batch PN-TUT-260806-018' },
    { num: 4, label: '04 CERTIFY', desc: 'Lab QC Hatchability & Passport' },
    { num: 5, label: '05 SELL', desc: 'B2B Marketplace & Farmer Payout' },
  ];

  const currentStepInfo = steps.find((s) => s.num === guidedDemoStep);

  return (
    <div className="bg-[#14100E] text-[#FFFCF7] px-4 py-2.5 shadow-md flex items-center justify-between border-b border-[#2C2420] text-sm z-40 relative">
      <div className="flex items-center space-x-3">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-[#C42A6B] text-white">
          GUIDED DEMO
        </span>
        <span className="font-semibold text-amber-200">
          Step {guidedDemoStep} of 5: {currentStepInfo?.label}
        </span>
        <span className="hidden md:inline text-xs text-stone-400">
          · {currentStepInfo?.desc}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="hidden sm:flex items-center space-x-1 mr-4">
          {steps.map((s) => (
            <div
              key={s.num}
              className={`w-6 h-1.5 rounded-full transition-colors ${
                s.num === guidedDemoStep
                  ? 'bg-[#C42A6B]'
                  : s.num < guidedDemoStep
                  ? 'bg-[#3E8B7A]'
                  : 'bg-stone-700'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextGuidedDemoStep}
          className="flex items-center space-x-1.5 bg-[#C42A6B] hover:bg-[#A8225A] text-white font-medium text-xs px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
        >
          <span>{guidedDemoStep === 5 ? 'Finish Demo' : 'Next Step'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={resetGuidedDemo}
          className="text-stone-400 hover:text-white text-xs p-1.5 rounded transition-colors"
          title="Exit Guided Demo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
