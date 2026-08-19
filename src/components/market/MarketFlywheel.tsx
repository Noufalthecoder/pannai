import React from 'react';
import { ArrowRight, ShieldCheck, ShoppingBag, Truck, DollarSign, BarChart3, Sparkles } from 'lucide-react';

export const MarketFlywheel: React.FC = () => {
  const steps = [
    { title: 'VERIFIED POND', sub: 'Satellite + Field Data', icon: ShieldCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { title: 'CERTIFIED BATCH', sub: 'Lab Passport Hash', icon: Sparkles, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { title: 'LOCAL / GLOBAL BUYER', sub: 'Smart Match 92%+', icon: ShoppingBag, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { title: 'ORDER & DISPATCH', sub: 'Cold-Chain Shipping', icon: Truck, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { title: 'DELIVERY & PAYOUT', sub: 'Instant Settlement', icon: DollarSign, color: 'text-emerald-700 bg-emerald-100 border-emerald-300' },
    { title: 'MARKET DATA FLYWHEEL', sub: 'Better Match Confidence', icon: BarChart3, color: 'text-purple-700 bg-purple-50 border-purple-200' },
  ];

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-xs space-y-4 text-[#11100F]">
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block">
            THE PANNAI MARKET ENGINE
          </span>
          <h3 className="font-heading font-bold text-lg text-[#11100F]">
            END-TO-END VERIFIED COMMODITY FLYWHEEL
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-stone-500">OBSERVE → SELL → FLYWHEEL</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {steps.map((st, idx) => {
          const Icon = st.icon;
          return (
            <div key={idx} className="relative group">
              <div className={`p-3.5 rounded-xl border space-y-2 h-full flex flex-col justify-between transition-all ${st.color}`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4" />
                  <span className="text-[10px] font-mono font-bold opacity-60">0{idx + 1}</span>
                </div>
                <div>
                  <span className="font-heading font-extrabold text-xs block leading-snug">{st.title}</span>
                  <span className="text-[10px] font-mono block opacity-80 mt-0.5">{st.sub}</span>
                </div>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-stone-300">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
