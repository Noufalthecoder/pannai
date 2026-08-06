import React from 'react';
import { useApp } from '../../store/AppContext';
import { Logo } from '../ui/Logo';
import { CheckCircle2, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const GuidedDemoModal: React.FC = () => {
  const { guidedDemoStep, resetGuidedDemo, startGuidedDemo } = useApp();

  React.useEffect(() => {
    if (guidedDemoStep === 5) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C42A6B', '#3E8B7A', '#D9A441'],
        });
      } catch (e) {
        // Fallback gracefully if canvas-confetti environment varies
      }
    }
  }, [guidedDemoStep]);

  if (guidedDemoStep !== 5) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#14100E]/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-3xl max-w-xl w-full p-8 shadow-2xl space-y-6 text-center relative overflow-hidden">
        <div className="mx-auto flex justify-center">
          <Logo variant="full" size="lg" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-[#FAF0F4] border border-[#F3CBDC] text-[#C42A6B] rounded-full text-xs font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DEMO COMPLETE — POND TO PAYMENT</span>
          </span>

          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#14100E] leading-tight">
            ONE POND. ONE VERIFIED BATCH. ONE BUYER. ONE CONNECTED SYSTEM.
          </h2>

          <p className="text-xs text-[#69615B] leading-relaxed max-w-md mx-auto">
            PANNAI organizes fragmented salt-pan bioeconomy production. Satellite intelligence guides field verification, simple Tamil advisories empower farmers, physical lab QC creates buyer trust, and digital passports turn biological supply into commercial revenue.
          </p>
        </div>

        {/* Journey Recap summary */}
        <div className="bg-[#F7F3EC] p-4 rounded-2xl border border-[#E6DFD5] space-y-2 text-xs text-left">
          <div className="flex items-center space-x-2 text-[#3E8B7A] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Pond TTK-042 (Tharuvaikulam) identified by Satellite Intelligence</span>
          </div>
          <div className="flex items-center space-x-2 text-[#3E8B7A] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Tamil Operational Advisory sent with voice synthesis</span>
          </div>
          <div className="flex items-center space-x-2 text-[#3E8B7A] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>18.4 kg harvest received & batch PN-TUT-260806-018 created</span>
          </div>
          <div className="flex items-center space-x-2 text-[#3E8B7A] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Physical Lab QC passed (86.4% hatchability) & Grade A Passport issued</span>
          </div>
          <div className="flex items-center space-x-2 text-[#C42A6B] font-bold">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Reserved by BlueStar Hatcheries & ₹14,720 Farmer Payout recorded</span>
          </div>
        </div>

        <div className="pt-2 flex items-center justify-center space-x-3">
          <button
            onClick={startGuidedDemo}
            className="py-3 px-6 bg-[#F7F3EC] hover:bg-[#E6DFD5] text-[#14100E] text-xs font-bold rounded-xl transition-colors flex items-center space-x-2 border border-[#E6DFD5]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>RESTART DEMO</span>
          </button>

          <button
            onClick={resetGuidedDemo}
            className="py-3 px-8 bg-[#C42A6B] hover:bg-[#A8225A] text-white text-xs font-bold rounded-xl transition-transform active:scale-95 shadow-md flex items-center space-x-2"
          >
            <span>EXPLORE PANNAI</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
