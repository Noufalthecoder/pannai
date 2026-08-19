import React from 'react';
import { TrendingUp, RefreshCw } from 'lucide-react';
import { SourceBadge } from '../components/ui/SourceBadge';


export const BusinessModelPage: React.FC = () => {
  const revenueStreams = [
    {
      code: '01',
      title: 'Hardware',
      subtitle: 'Field Telemetry Kits',
      desc: 'Deployable refractometers, water depth sensors, and field telemetry kits provided to salt clusters.',
      tag: 'CAPEX / DEPLOYMENT',
    },
    {
      code: '02',
      title: 'SaaS',
      subtitle: 'Enterprise Pond Intelligence',
      desc: 'Subscription dashboard for salt-pan operators, leaseholders, and enterprise coastal management.',
      tag: 'RECURRING SAAS',
    },
    {
      code: '03',
      title: 'Certification',
      subtitle: 'QC & Digital Batch Passport',
      desc: 'Per-batch fee for physical 24-hr lab hatchability testing, moisture validation, and QR passports.',
      tag: 'PER-BATCH FEE',
    },
    {
      code: '04',
      title: 'Marketplace',
      subtitle: 'B2B Artemia Procurement',
      desc: '3–5% transaction fee on verified Artemia cyst lot reservations executed through PANNAI Market.',
      tag: 'TRANSACTION TAKE-RATE',
    },
    {
      code: '05',
      title: 'B2B / B2G',
      subtitle: 'Coastal Bioeconomy Contracts',
      desc: 'State aquaculture development contracts, coastal climate resilience data, and enterprise supply guarantees.',
      tag: 'ENTERPRISE / B2G CONTRACTS',
    },
  ];

  return (
    <div className="space-y-10 max-w-5xl mx-auto text-[#11100F] pb-10">
      {/* Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-2xl text-[#11100F]">PANNAI BUSINESS MODEL</h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-600">
              Investor & Venture Strategy · Commercial Monetization Streams & Growth Flywheel
            </p>
          </div>
        </div>
      </div>

      {/* 5 REVENUE STREAMS GRID (Section 15 Requirement) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block">
              MONETIZATION ARCHITECTURE
            </span>
            <h2 className="font-heading font-bold text-xl text-[#11100F]">FIVE REVENUE STREAMS</h2>
          </div>
          <SourceBadge source="DEMO" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
          {revenueStreams.map((stream) => (
            <div
              key={stream.code}
              className="bg-white border border-stone-200/90 p-4 rounded-xl space-y-2 flex flex-col justify-between shadow-xs hover:border-pink-300 transition-colors"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-pink-600 block">{stream.code}</span>
                <h3 className="font-heading font-bold text-base text-[#11100F]">{stream.title}</h3>
                <p className="text-[11px] font-semibold text-stone-700 font-sans">{stream.subtitle}</p>
                <p className="text-[11px] text-stone-500 font-sans leading-relaxed pt-1">{stream.desc}</p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-[9px] text-stone-500 font-bold">
                {stream.tag}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FLYWHEEL VISUAL (Section 15 Requirement) */}
      <div className="bg-[#11100F] text-white rounded-2xl p-8 border border-stone-800 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-stone-800 pb-4">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-5 h-5 text-pink-400 animate-spin-slow" />
            <h3 className="font-heading font-bold text-xl text-white">THE PANNAI GROWTH FLYWHEEL</h3>
          </div>
          <SourceBadge source="DEMO" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs font-mono">
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-stone-200">
            MORE FARMS
          </div>
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-pink-400">
            MORE DATA
          </div>
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-purple-400">
            BETTER INTELLIGENCE
          </div>
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-blue-400">
            BETTER DECISIONS
          </div>
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-emerald-400">
            MORE VALUE
          </div>
          <div className="bg-stone-900 border border-stone-800 p-3 rounded-xl font-bold text-amber-400">
            MORE FARMERS
          </div>
        </div>

        <p className="text-xs text-stone-400 text-center max-w-xl mx-auto leading-relaxed">
          Each newly onboarded salt-pan pond expands ground truth observation density, refining regional Artemia suitability algorithms and attracting more hatchery buyers to the platform.
        </p>
      </div>
    </div>
  );
};
