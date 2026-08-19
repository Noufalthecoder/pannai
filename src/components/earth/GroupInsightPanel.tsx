import React from 'react';
import type { SimilarityGroup, Pond } from '../../types';
import { SourceBadge } from '../ui/SourceBadge';
import { ShieldCheck, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface GroupInsightPanelProps {
  group: SimilarityGroup;
  representativePond?: Pond | null;
  anomalyPond?: Pond | null;
  onSelectPond: (pondId: string) => void;
  onClose?: () => void;
}

export const GroupInsightPanel: React.FC<GroupInsightPanelProps> = ({
  group,
  representativePond,
  anomalyPond,
  onSelectPond,
  onClose,
}) => {
  const { language, sendAdvisory } = useApp();

  const handleStartFieldCheck = () => {
    if (representativePond) {
      sendAdvisory(representativePond.id);
    }
  };

  return (
    <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xl space-y-5 text-[#11100F] font-mono select-none">
      {/* Group Header */}
      <div className="flex items-start justify-between border-b-2 border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold text-xs flex items-center justify-center">
              {group.groupNumber}
            </span>
            <h2 className="font-heading font-extrabold text-xl text-[#11100F]">{group.id}</h2>
            <span className="px-2.5 py-0.5 text-xs font-extrabold bg-stone-100 border border-stone-300 rounded-md">
              {group.patternLabel}
            </span>
          </div>

          <p className="text-xs font-bold text-stone-600 mt-1">
            "{group.description}"
          </p>
        </div>

        {onClose && (
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            ✕
          </button>
        )}
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-300 space-y-0.5">
          <span className="text-[10px] text-stone-500 font-extrabold block">TOTAL PONDS</span>
          <span className="font-heading font-extrabold text-xl text-[#11100F]">{group.pondCount} Ponds</span>
        </div>

        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-300 space-y-0.5">
          <span className="text-[10px] text-stone-500 font-extrabold block">SIMILARITY SCORE</span>
          <span className="font-heading font-extrabold text-xl text-emerald-800">{group.similarityScorePercent}%</span>
        </div>

        <div className="bg-stone-50 p-3 rounded-2xl border border-stone-300 space-y-0.5">
          <span className="text-[10px] text-stone-500 font-extrabold block">LAST VALIDATION</span>
          <span className="font-heading font-extrabold text-sm text-stone-900">{group.lastValidatedDaysAgo} days ago</span>
        </div>

        <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-300 space-y-0.5">
          <span className="text-[10px] text-emerald-800 font-extrabold block uppercase">REPRESENTATIVE</span>
          <span className="font-heading font-extrabold text-sm text-emerald-950">{group.representativePondId}</span>
        </div>
      </div>

      {/* ANOMALY WARNING (If pond behaves differently from group) */}
      {anomalyPond && (
        <div className="bg-rose-50 border-2 border-rose-400 p-4 rounded-2xl space-y-2 text-rose-950">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-rose-900 flex items-center gap-1.5 uppercase">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              ⚠️ ANOMALY DETECTED (மாறுபட்ட நிலை)
            </span>
            <SourceBadge source="MODEL" />
          </div>

          <p className="text-xs font-extrabold leading-relaxed">
            "Pond {anomalyPond.id} differs from its group's recent pattern."
          </p>
          <p className="text-xs font-extrabold text-rose-800">
            {language === 'ta' ? 'குளம் TTK-023-ஐ நேரில் சரிபார்க்கவும்.' : 'Action required: Field Check.'}
          </p>

          <button
            onClick={() => onSelectPond(anomalyPond.id)}
            className="w-full py-2 bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1"
          >
            <span>FIELD CHECK POND {anomalyPond.id} →</span>
          </button>
        </div>
      )}

      {/* WHY THIS GROUP? (Random Forest Rationale) */}
      <div className="bg-stone-50 border-2 border-stone-200 p-4 rounded-2xl space-y-2">
        <span className="text-xs font-extrabold text-stone-800 uppercase block border-b border-stone-300 pb-1">
          WHY THIS GROUP? (Random Forest Analysis)
        </span>

        <div className="space-y-1.5 text-xs text-stone-900 font-bold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Similar spatial signature (Sentinel-1 SAR reflectivity)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Similar water-area evaporation trend over 30 days</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Similar spectral pattern (Sentinel-2 multispectral index)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Similar historical yield and seasonal behavior</span>
          </div>
        </div>
      </div>

      {/* FIELD VERIFICATION RECOMMENDATION */}
      <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-emerald-900 uppercase flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            FIELD VERIFICATION RECOMMENDATION
          </span>
          <SourceBadge source="FIELD" />
        </div>

        <p className="text-xs font-extrabold text-emerald-950 leading-relaxed">
          "PANNAI recommends checking <strong>{group.representativePondId}</strong> because it represents this group of {group.pondCount} ponds."
        </p>

        {representativePond && (
          <div className="text-xs font-bold text-stone-700 bg-white p-2.5 rounded-xl border border-emerald-300">
            {language === 'ta'
              ? `குளம் ${group.representativePondId}-ஐ சரிபார்க்கவும் (${group.representativePondId} represents Group ${group.groupNumber})`
              : `Representative Pond: ${group.representativePondId} (${representativePond.localName || 'Salt Pan'})`}
          </div>
        )}

        <button
          onClick={handleStartFieldCheck}
          className="w-full py-3 bg-[#11100F] hover:bg-stone-800 text-white font-mono text-xs font-extrabold rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98"
        >
          <span>START FIELD CHECK ({group.representativePondId})</span>
          <ChevronRight className="w-4 h-4 text-pink-400" />
        </button>
      </div>
    </div>
  );
};
