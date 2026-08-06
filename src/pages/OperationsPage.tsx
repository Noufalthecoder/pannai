import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { BatchTimeline } from '../components/certified/BatchTimeline';
import { Package, PlusCircle, Scale } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';
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

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#14100E]">HARVEST RECEIVING & OPERATIONS</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              Log Raw Artemia Harvest → Create Batch Identifier → Progress Processing Pipeline
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Harvest Receiving Form */}
        <div className="lg:col-span-5">
          <form onSubmit={handleReceiveHarvest} className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="border-b border-[#E6DFD5] pb-3">
              <h2 className="font-heading font-bold text-base text-[#14100E]">RECEIVE RAW HARVEST</h2>
              <p className="text-xs text-[#69615B]">Record raw biomass weight from salt-pan field collection.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#14100E] mb-1">SELECT PRODUCER POND</label>
                <select
                  value={selectedPondId}
                  onChange={(e) => setSelectedPondId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white font-bold text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                >
                  {ponds.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} — {p.owner} ({p.village})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#14100E] mb-1">
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
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white font-bold text-base text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                    required
                  />
                  <Scale className="w-5 h-5 text-[#69615B] absolute right-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#14100E] mb-1">FIELD OBSERVATION NOTES</label>
                <textarea
                  rows={3}
                  value={fieldNotes}
                  onChange={(e) => setFieldNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E6DFD5] bg-white text-xs text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                />
              </div>
            </div>

            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white shadow-md flex items-center justify-center space-x-2 transition-transform active:scale-98 ${
                guidedDemoStep === 3
                  ? 'bg-[#C42A6B] hover:bg-[#A8225A] pulse-highlight'
                  : 'bg-[#C42A6B] hover:bg-[#A8225A]'
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
            <div className="bg-[#FFFCF7] p-8 text-center text-[#69615B] rounded-2xl border border-[#E6DFD5]">
              No active batch selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
