import React from 'react';
import { ArrowRight } from 'lucide-react';

export const GroupingWorkflowBar: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'SATELLITE',
      detail: 'Sentinel-1 + Sentinel-2',
      color: 'bg-purple-100 border-purple-300 text-purple-950',
    },
    {
      num: '02',
      title: 'GIS',
      detail: 'Pond boundaries & spatial features',
      color: 'bg-blue-100 border-blue-300 text-blue-950',
    },
    {
      num: '03',
      title: 'AI ANALYSIS',
      detail: 'Random Forest similarity model',
      color: 'bg-pink-100 border-pink-300 text-pink-950',
    },
    {
      num: '04',
      title: 'GROUP',
      detail: 'Ponds with similar observable patterns',
      color: 'bg-emerald-100 border-emerald-300 text-emerald-950',
    },
    {
      num: '05',
      title: 'VERIFY',
      detail: 'Representative pond / anomaly check',
      color: 'bg-amber-100 border-amber-300 text-amber-950',
    },
    {
      num: '06',
      title: 'ACTION',
      detail: 'Simple farmer recommendation',
      color: 'bg-stone-900 border-stone-800 text-white',
    },
  ];

  return (
    <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs space-y-3 font-mono text-xs select-none">
      <div className="flex items-center justify-between border-b border-stone-200 pb-2">
        <span className="font-heading font-extrabold text-sm text-[#11100F]">
          HOW PANNAI GROUPS PONDS (செயற்கைக்கோள் மற்றும் குழு பகுப்பாய்வு)
        </span>
        <span className="text-[11px] text-stone-500 font-bold">
          Satellite Identifies Patterns → Field Measurement Provides Ground Truth
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {steps.map((step, idx) => (
          <div
            key={step.num}
            className={`p-3 rounded-2xl border-2 flex flex-col justify-between space-y-1 relative ${step.color}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-heading font-extrabold text-sm opacity-80">{step.num}</span>
              {idx < steps.length - 1 && (
                <ArrowRight className="w-3.5 h-3.5 opacity-40 hidden md:block" />
              )}
            </div>

            <div>
              <span className="font-heading font-extrabold text-xs block">{step.title}</span>
              <span className="text-[10px] font-sans opacity-85 block leading-tight">{step.detail}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
