import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { SourceBadge } from '../components/ui/SourceBadge';
import { ArtemiaEngine } from '../components/earth/ArtemiaEngine';
import {
  Play,
  ArrowRight,
  ShieldCheck,
  Globe,
  ShoppingBag,
  Layers,
} from 'lucide-react';


export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { startGuidedDemo } = useApp();

  const [pondAcres, setPondAcres] = useState<number>(5);
  const estimatedIncomeINR = pondAcres * 24000;

  const [activeTab, setActiveTab] = useState<'earth' | 'farmer' | 'certified' | 'market'>('earth');

  const handleStartDemo = () => {
    startGuidedDemo();
    navigate('/earth');
  };

  return (
    <div className="space-y-20 pb-20 text-[#11100F]">
      {/* 1. HERO SECTION */}
      <section className="pt-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-stone-900 text-white rounded-md text-[11px] font-mono tracking-wider">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <span>THOOTHUKUDI COASTAL BIOECONOMY</span>
            </div>

            <div className="space-y-3">
              <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-[#11100F] tracking-tight leading-[1.05]">
                THE OPERATING SYSTEM <br />
                FOR INDIA'S SALT-PAN <br />
                <span className="text-pink-600">BIOECONOMY.</span>
              </h1>

              <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl">
                Turn pond-level signals into better production decisions, new biological value, verified supply and stronger market access.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => navigate('/earth')}
                className="py-3.5 px-7 bg-[#11100F] hover:bg-stone-800 text-white text-xs font-mono font-bold rounded-xl transition-all shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <span>EXPLORE PANNAI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleStartDemo}
                className="py-3.5 px-7 bg-pink-600 hover:bg-pink-500 text-white text-xs font-mono font-bold rounded-xl transition-transform active:scale-95 shadow-md flex items-center space-x-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START GUIDED DEMO</span>
              </button>
            </div>

            <p className="text-xs font-mono text-stone-500 flex items-center gap-2 pt-1">
              <span>Satellite-assisted</span> · <span>Field-informed</span> · <span>Producer-first</span>
            </p>
          </div>

          {/* Right Column Aerial Landscape Hero Image (45-55% Hero) */}
          <div className="lg:col-span-6">
            <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xl relative overflow-hidden">
              <div className="h-80 sm:h-96 rounded-xl relative overflow-hidden flex items-center justify-center border border-stone-200">
                <img
                  src="/assets/salt_pan_aerial.png"
                  alt="Thoothukudi Aerial Salt Pan Landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#11100F]/70 via-transparent to-black/20" />
                
                {/* Satellite Radar Scan Line */}
                <div className="absolute inset-x-0 h-0.5 bg-pink-500/80 shadow-[0_0_15px_#D946EF] animate-scan pointer-events-none" />

                {/* Overlaid Data Layer */}
                <div className="absolute top-3 left-3 bg-[#11100F]/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-stone-700 text-white text-[10px] font-mono space-y-0.5">
                  <div className="flex items-center gap-2 text-stone-300">
                    <span>COORD: 8.7642° N, 78.1348° E</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-400 font-semibold">
                    <span>SALINITY SCAN: 92 ppt</span>
                    <SourceBadge source="SATELLITE" />
                  </div>
                </div>

                {/* Selected Pond Callout Box */}
                <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-stone-200 shadow-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-bold text-sm text-[#11100F]">POND TTK-042</span>
                    <SourceBadge source="DEMO" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono block">SALINITY</span>
                      <span className="font-bold text-stone-900">92 ppt</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono block">CONFIDENCE</span>
                      <span className="font-bold text-purple-700">82%</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-stone-500 font-mono block">STATUS</span>
                      <span className="font-bold text-amber-600">CANDIDATE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HERO STORY: ONE PAN. MULTIPLE POSSIBILITIES. */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-8 sm:p-12 shadow-sm space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold">
            TRANSFORMATION FLOW
          </span>
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#11100F]">
            ONE PAN. MULTIPLE POSSIBILITIES.
          </h2>
          <p className="text-xs text-stone-600">
            Re-architecting traditional salt operations into intelligent, multi-output bioeconomies.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Traditional Flow */}
          <div className="bg-[#FAF8F5] border border-stone-200 rounded-xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <span className="text-xs font-mono font-bold text-stone-500 uppercase">TRADITIONAL MODEL</span>
              <span className="text-[10px] font-mono text-stone-400">SINGLE OUTPUT</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center text-xs font-mono py-4">
              <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200 font-bold text-stone-700">
                SALT
              </div>
              <span className="text-stone-400">→</span>
              <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200 font-bold text-stone-700">
                HARVEST
              </div>
              <span className="text-stone-400">→</span>
              <div className="bg-white px-4 py-2.5 rounded-lg border border-stone-200 font-bold text-stone-700">
                SELL
              </div>
            </div>

            <p className="text-xs text-stone-500 leading-relaxed">
              Produces raw industrial salt only (~₹2.50/kg). Highly vulnerable to seasonal rainfall shut-downs.
            </p>
          </div>

          {/* PANNAI Operating Flow */}
          <div className="bg-[#11100F] text-white rounded-xl p-6 space-y-4 border border-stone-800 shadow-md">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-xs font-mono font-bold text-pink-400 uppercase">PANNAI OPERATING SYSTEM</span>
              <span className="text-[10px] font-mono text-emerald-400">MULTI-VALUE ECOSYSTEM</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-[10px] font-mono py-2">
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-pink-400">SENSE</div>
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-pink-400">PREDICT</div>
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-pink-400">OPTIMIZE</div>
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-pink-400">DIVERSIFY</div>
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-pink-400">VERIFY</div>
              <div className="bg-stone-900 p-2 rounded border border-stone-800 font-bold text-emerald-400">SELL</div>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Combines satellite signals, Tamil advisory, lab QC digital passports, and B2B hatchery market matching.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ARTEMIA BIOECONOMY ENGINE */}
      <section>
        <ArtemiaEngine />
      </section>

      {/* 4. ECONOMIC IMPACT ESTIMATOR */}
      <section className="bg-[#11100F] text-[#F7F3ED] rounded-2xl p-8 sm:p-10 border border-stone-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase font-semibold">
              BIOECONOMY ECONOMICS
            </span>
            <h3 className="font-heading font-bold text-xl sm:text-2xl text-white">
              PRODUCER VALUE POTENTIAL ESTIMATOR
            </h3>
          </div>
          <SourceBadge source="DEMO" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-stone-300">SALT PAN POND AREA:</span>
                <span className="font-bold text-amber-400 text-sm">{pondAcres} Acres</span>
              </div>
              <input
                type="range"
                min="1"
                max="25"
                value={pondAcres}
                onChange={(e) => setPondAcres(Number(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Estimated additional biological co-product value based on standard hypersaline Artemia cyst production windows across Tamil Nadu salt belts.
            </p>
          </div>

          <div className="lg:col-span-5 bg-stone-900 border border-stone-800 p-6 rounded-xl text-center space-y-2">
            <span className="text-[10px] font-mono text-stone-400 uppercase block">
              ESTIMATED ANNUAL BIOECONOMY REVENUE
            </span>
            <div className="font-heading font-bold text-3xl sm:text-4xl text-pink-500">
              +₹{estimatedIncomeINR.toLocaleString('en-IN')}{' '}
              <span className="text-xs font-mono text-stone-400 font-normal">/ year</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOUR PRODUCTS IN ONE DATA LAYER */}
      <section className="bg-white border border-stone-200/90 rounded-2xl p-8 shadow-sm space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold">
            PRODUCT SUITE
          </span>
          <h2 className="font-heading font-bold text-2xl text-[#11100F]">FOUR MODULES. ONE DATA LAYER.</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-stone-200 pb-4">
          <button
            onClick={() => setActiveTab('earth')}
            className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'earth' ? 'bg-[#11100F] text-white' : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>01 EARTH</span>
          </button>
          <button
            onClick={() => setActiveTab('farmer')}
            className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'farmer' ? 'bg-[#11100F] text-white' : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>02 FARMER</span>
          </button>
          <button
            onClick={() => setActiveTab('certified')}
            className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'certified' ? 'bg-[#11100F] text-white' : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>03 CERTIFIED</span>
          </button>
          <button
            onClick={() => setActiveTab('market')}
            className={`py-2.5 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'market' ? 'bg-[#11100F] text-white' : 'bg-[#FAF8F5] text-stone-600 hover:bg-stone-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>04 MARKET</span>
          </button>
        </div>

        <div className="p-5 bg-[#FAF8F5] rounded-xl border border-stone-200/80 text-xs">
          {activeTab === 'earth' && (
            <div>
              <h4 className="font-bold text-sm text-[#11100F] mb-1">PANNAI EARTH — Geospatial Intelligence</h4>
              <p className="text-stone-600 leading-relaxed">
                Satellite-assisted salinity monitoring, candidate pond screening, and environmental status tracking across hypersaline salt compartments.
              </p>
            </div>
          )}
          {activeTab === 'farmer' && (
            <div>
              <h4 className="font-bold text-sm text-[#11100F] mb-1">PANNAI FARMER — Producer Workflows</h4>
              <p className="text-stone-600 leading-relaxed">
                Operational simplicity in native Tamil script with clear action cards for salt-pan producers.
              </p>
            </div>
          )}
          {activeTab === 'certified' && (
            <div>
              <h4 className="font-bold text-sm text-[#11100F] mb-1">PANNAI CERTIFIED — Quality Trust Layer</h4>
              <p className="text-stone-600 leading-relaxed">
                Multi-stage lot processing, physical lab hatchability validation, and tamper-proof Digital Batch Passports.
              </p>
            </div>
          )}
          {activeTab === 'market' && (
            <div>
              <h4 className="font-bold text-sm text-[#11100F] mb-1">PANNAI MARKET — B2B Procurement</h4>
              <p className="text-stone-600 leading-relaxed">
                Direct commercial marketplace matching verified Artemia cyst supply with hatcheries and aquaculture buyers.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* FINAL TAGLINE */}
      <div className="text-center pt-8 space-y-2 border-t border-stone-200">
        <h3 className="font-heading text-2xl font-bold text-[#11100F]">PANNAI</h3>
        <p className="text-xs font-mono text-stone-500 uppercase tracking-widest">
          MORE THAN SALT. MORE VALUE FROM EVERY PAN.
        </p>
      </div>
    </div>
  );
};
