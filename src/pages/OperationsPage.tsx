import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { BatchTimeline } from '../components/certified/BatchTimeline';
import { SourceBadge } from '../components/ui/SourceBadge';
import { Package, PlusCircle, Scale, AlertCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export const OperationsPage: React.FC = () => {
  const { ponds, batches, addHarvestAndCreateBatch, guidedDemoStep, nextGuidedDemoStep } = useApp();
  const navigate = useNavigate();

  const [selectedPondId, setSelectedPondId] = useState<string>('TTK-042');
  const [weightKg, setWeightKg] = useState<number>(18.4);
  const [fieldNotes, setFieldNotes] = useState<string>('Harvested during optimal salinity window (92 ppt). High cyst density.');
  const [activeBatchId, setActiveBatchId] = useState<string>('PN-TUT-260806-018');

  const handleReceiveHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const createdBatch = addHarvestAndCreateBatch(selectedPondId, weightKg, undefined, fieldNotes);
    setActiveBatchId(createdBatch.id);

    if (guidedDemoStep === 3) {
      nextGuidedDemoStep();
      navigate('/certified');
    }
  };

  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];

  const workflowSteps = [
    'POND',
    'WATER CONDITION',
    'SALT PRODUCTION',
    'BIOLOGICAL OPPORTUNITY',
    'FIELD VALIDATION',
    'HARVEST',
    'CERTIFICATION',
    'MARKET',
  ];

  return (
    <div className="space-y-8 max-w-6xl mx-auto text-[#11100F]">
      {/* Top Title Bar */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#11100F]">PANNAI OPERATIONS</h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-600">
              Salt-Pan Bioeconomy Workflows · Field Validation · Harvest Processing Pipeline
            </p>
          </div>
        </div>
      </div>

      {/* WORKFLOW TIMELINE BAR (Section 10 Requirement) */}
      <div className="bg-[#FAF8F5] border border-stone-200/80 rounded-2xl p-5 shadow-xs space-y-3">
        <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-semibold block">
          OPERATIONAL LIFECYCLE TIMELINE
        </span>

        <div className="overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-1.5 min-w-max text-[10px] font-mono font-bold">
            {workflowSteps.map((step, idx) => (
              <React.Fragment key={step}>
                <div
                  className={`px-3 py-1.5 rounded-lg border ${
                    step === 'FIELD VALIDATION' || step === 'HARVEST' || step === 'CERTIFICATION'
                      ? 'bg-pink-600 text-white border-pink-600'
                      : 'bg-white text-stone-700 border-stone-200'
                  }`}
                >
                  {step}
                </div>
                {idx < workflowSteps.length - 1 && <ArrowRight className="w-3 h-3 text-stone-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* "WHAT NEEDS ATTENTION TODAY?" DASHBOARD (Section 10 Requirement) */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-pink-600" />
            <h3 className="font-heading font-bold text-base text-[#11100F]">WHAT NEEDS ATTENTION TODAY?</h3>
          </div>
          <SourceBadge source="MODEL" timestamp="Real time" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-amber-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-amber-900">
              <span>FIELD VERIFICATION</span>
              <span className="text-lg">3</span>
            </div>
            <p className="text-[11px] text-stone-600">3 ponds require physical field verification of salinity & depth</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-blue-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-blue-900">
              <span>PRODUCTION WINDOW</span>
              <span className="text-lg">2</span>
            </div>
            <p className="text-[11px] text-stone-600">2 ponds approaching optimal biological production window</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-purple-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-purple-900">
              <span>LAB CERTIFICATION</span>
              <span className="text-lg">1</span>
            </div>
            <p className="text-[11px] text-stone-600">1 batch awaiting physical 24-hr lab hatchability testing</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-emerald-200 space-y-1">
            <div className="flex items-center justify-between font-bold text-emerald-900">
              <span>MARKET READY</span>
              <span className="text-lg">4</span>
            </div>
            <p className="text-[11px] text-stone-600">4 verified Grade A lots available for hatchery buyers</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Harvest Receiving Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleReceiveHarvest} className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-stone-200 pb-3">
              <h2 className="font-heading font-bold text-base text-[#11100F]">RECEIVE RAW HARVEST</h2>
              <p className="text-xs text-stone-500">Record raw biomass weight from salt-pan field collection.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-mono font-bold text-[#11100F] mb-1">SELECT PRODUCER POND</label>
                <select
                  value={selectedPondId}
                  onChange={(e) => setSelectedPondId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FAF8F5] font-bold text-[#11100F] focus:outline-none focus:border-pink-600"
                >
                  {ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.owner} ({p.village})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-mono font-bold text-[#11100F] mb-1">
                  RAW HARVEST WEIGHT (KG)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="500"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-[#FAF8F5] font-bold text-base text-[#11100F] focus:outline-none focus:border-pink-600"
                    required
                  />
                  <Scale className="w-5 h-5 text-stone-400 absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-mono font-bold text-[#11100F] mb-1">FIELD OBSERVATION NOTES</label>
                <textarea
                  rows={3}
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-stone-300 bg-[#FAF8F5] text-xs text-[#11100F] focus:outline-none focus:border-pink-600"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-98 cursor-pointer ${
                guidedDemoStep === 3
                  ? 'bg-pink-600 hover:bg-pink-500 demo-highlight'
                  : 'bg-pink-600 hover:bg-pink-500'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>RECEIVE HARVEST & CREATE BATCH</span>
            </button>
          </form>
        </div>

        {/* Right Column: Active Batch Processing Timeline */}
        <div className="lg:col-span-7">
          {activeBatch ? (
            <BatchTimeline batch={activeBatch} />
          ) : (
            <div className="bg-white p-8 text-center text-stone-500 rounded-2xl border border-stone-200">
              No active batch selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
