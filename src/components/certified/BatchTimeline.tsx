import React from 'react';
import { useApp } from '../../store/AppContext';
import type { Batch, BatchStage } from '../../types';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { StatusBadge, DemoBadge } from '../ui/Badge';

export const BatchTimeline: React.FC<{ batch: Batch }> = ({ batch }) => {
  const { updateBatchStage } = useApp();

  const stages: { stage: BatchStage; label: string; desc: string }[] = [
    { stage: 'RECEIVED', label: '01 RECEIVED', desc: 'Raw Artemia biomass logged at collection hub' },
    { stage: 'CLEANING', label: '02 CLEANING', desc: 'Saline wash & debris density separation' },
    { stage: 'SEPARATION', label: '03 SEPARATION', desc: 'Cyst density stratification' },
    { stage: 'DEHYDRATION', label: '04 DEHYDRATION', desc: 'Fluidized brine dehydrator' },
    { stage: 'DRYING', label: '05 DRYING', desc: 'Controlled temperature drying (<38°C)' },
    { stage: 'QC', label: '06 LAB QC', desc: 'Physical hatch test & purity analysis' },
    { stage: 'CERTIFIED', label: '07 CERTIFIED', desc: 'Grade A Digital Passport issued' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.stage === batch.currentStage);

  const handleNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      const nextStage = stages[currentStageIndex + 1].stage;
      updateBatchStage(batch.id, nextStage);
    }
  };

  return (
    <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="font-heading font-bold text-lg text-[#14100E]">BATCH {batch.id}</h3>
            <DemoBadge />
          </div>
          <p className="text-xs text-[#69615B]">
            Pond: {batch.pondId} · Producer: {batch.producerName} · Raw Weight: {batch.receivedWeightKg} kg
          </p>
        </div>

        {batch.grade && <StatusBadge status={batch.grade} />}
      </div>

      {/* Timeline Steps */}
      <div className="space-y-3 pt-1">
        {stages.map((item, idx) => {
          const isDone = idx <= currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const timestamp = batch.stageTimestamps[item.stage];

          return (
            <div
              key={item.stage}
              className={`p-3 rounded-xl border flex items-start justify-between transition-all ${
                isCurrent
                  ? 'bg-[#FAF0F4] border-[#C42A6B] shadow-xs'
                  : isDone
                  ? 'bg-[#F7F3EC] border-[#3E8B7A]/30 text-[#14100E]'
                  : 'bg-white border-[#E6DFD5] text-[#69615B] opacity-60'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isDone ? 'bg-[#3E8B7A] text-white' : 'bg-[#E6DFD5] text-[#69615B]'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div>
                  <span className="font-heading font-bold text-xs text-[#14100E] block">{item.label}</span>
                  <span className="text-xs text-[#69615B]">{item.desc}</span>
                </div>
              </div>

              {timestamp ? (
                <span className="text-[11px] font-mono text-[#3E8B7A] bg-white px-2 py-0.5 rounded border border-[#E6DFD5]">
                  {timestamp}
                </span>
              ) : isCurrent ? (
                <span className="text-[11px] font-bold text-[#C42A6B] animate-pulse">IN PROGRESS</span>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Progress Action Button */}
      {currentStageIndex < stages.length - 1 && (
        <button
          onClick={handleNextStage}
          className="w-full py-2.5 px-4 bg-[#14100E] hover:bg-[#C42A6B] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-2"
        >
          <span>Progress to Next Processing Stage</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
