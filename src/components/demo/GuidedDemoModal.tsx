import React from 'react';
import { useApp } from '../../store/AppContext';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

export const GuidedDemoModal: React.FC = () => {
  const { guidedDemoStep, resetGuidedDemo, startGuidedDemo } = useApp();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (guidedDemoStep === 6) {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D946EF', '#059669', '#0D3B66', '#D97706'],
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
  }, [guidedDemoStep]);

  if (guidedDemoStep !== 6) return null;

  const handleExplore = () => {
    resetGuidedDemo();
    navigate('/earth');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFFFF] border-2 border-[#D946EF] rounded-2xl max-w-xl w-full p-8 shadow-2xl space-y-6 text-center relative overflow-hidden text-[#11100F]">
        <div className="space-y-3">
          <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 bg-pink-50 border border-pink-200 text-pink-700 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>06 SELL · GUIDED DEMO COMPLETE</span>
          </span>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#11100F] leading-tight">
            FROM POND TO PAYMENT.
          </h2>

          <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto">
            PANNAI scans salt-pan environments, identifies promising ponds, confirms conditions with field measurements, recommends optimal action, issues digital passports for certified batches, and connects verified supply directly to commercial buyers.
          </p>
        </div>

        {/* 6-Step Journey Summary */}
        <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200/80 space-y-2 text-xs text-left">
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>01 DISCOVER — PANNAI scanned salt-pan environments via satellite.</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>02 SCREEN — Promising candidate ponds (Pond TTK-042) identified.</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>03 VALIDATE — Field measurements confirmed 92 ppt salinity & depth.</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>04 DECIDE — PANNAI issued high-confidence operational action advice.</span>
          </div>
          <div className="flex items-center space-x-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>05 CERTIFY — Physical lab QC passed (86.4% hatchability) & passport generated.</span>
          </div>
          <div className="flex items-center space-x-2 text-pink-700 font-semibold">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-pink-600" />
            <span>06 SELL — Verified lot matched with B2B hatchery buyer for direct payment.</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={startGuidedDemo}
            className="py-2.5 px-5 bg-[#F7F3ED] hover:bg-stone-200 text-[#11100F] text-xs font-mono font-semibold rounded-lg transition-colors flex items-center space-x-2 border border-stone-300/80 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART DEMO</span>
          </button>

          <button
            onClick={handleExplore}
            className="py-2.5 px-7 bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono font-bold rounded-lg transition-all shadow-lg flex items-center space-x-2 cursor-pointer"
          >
            <span>EXPLORE PANNAI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

