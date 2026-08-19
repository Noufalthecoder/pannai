import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { FarmHeaderBar } from '../components/earth/FarmHeaderBar';
import { PondMap } from '../components/earth/PondMap';
import { GroupInsightPanel } from '../components/earth/GroupInsightPanel';
import { GroupingWorkflowBar } from '../components/earth/GroupingWorkflowBar';
import { PondRegisterModal } from '../components/earth/PondRegisterModal';
import { PondIntelligenceDrawer } from '../components/earth/PondIntelligenceDrawer';
import { SIMILARITY_GROUPS } from '../data/demoData';
import { Search, ChevronRight, Layers, AlertTriangle } from 'lucide-react';

import type { Pond } from '../types';

export const EarthPage: React.FC = () => {
  const { ponds, selectedPond, setSelectedPondId } = useApp();

  const [filterMode, setFilterMode] = useState<'MY_PONDS' | 'ALL_PONDS'>('ALL_PONDS');
  const [activeGroupNumber, setActiveGroupNumber] = useState<number>(1);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeGroup = SIMILARITY_GROUPS.find((g) => g.groupNumber === activeGroupNumber) || SIMILARITY_GROUPS[0];
  const representativePond = ponds.find((p) => p.id === activeGroup.representativePondId) || null;
  const anomalyPond = activeGroup.anomalyPondId ? ponds.find((p) => p.id === activeGroup.anomalyPondId) || null : null;

  const handleSelectPondInList = (pond: Pond) => {
    if (pond.groupNumber) {
      setActiveGroupNumber(pond.groupNumber);
    }
    setSelectedPondId(pond.id);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto text-[#11100F] font-mono select-none">
      {/* Top Header: MY FARM Context */}
      <FarmHeaderBar
        totalPondsCount={ponds.length}
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      {/* Main Geospatial Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (8 cols): 50-Pond Spatial Map */}
        <div className="lg:col-span-8 space-y-4">
          <PondMap
            filterMode={filterMode}
            activeGroupNumber={activeGroupNumber}
            onFilterChange={(mode) => setFilterMode(mode)}
            onSelectGroup={(groupNum) => setActiveGroupNumber(groupNum)}
          />
        </div>

        {/* Right Column (4 cols): Selected Group Insight + MY PONDS (50) List */}
        <div className="lg:col-span-4 space-y-5">
          {/* Selected Group Insight Panel */}
          <GroupInsightPanel
            group={activeGroup}
            representativePond={representativePond}
            anomalyPond={anomalyPond}
            onSelectPond={(pondId) => setSelectedPondId(pondId)}
          />

          {/* MY PONDS (50) Sidebar List */}
          <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-pink-600" />
                <h3 className="font-heading font-extrabold text-sm text-[#11100F]">
                  MY PONDS ({ponds.length})
                </h3>
              </div>
              <span className="text-[11px] font-bold text-stone-500">Group 0{activeGroupNumber} Active</span>
            </div>

            {/* Quick Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 50 ponds or names..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-[#FAF8F5] border-2 border-stone-200 rounded-2xl text-xs font-mono font-bold focus:outline-none"
              />
            </div>

            {/* List of 50 Monitored Ponds */}
            <div className="space-y-1.5 font-mono text-xs max-h-64 overflow-y-auto pr-1">
              {ponds
                .filter(
                  (p) =>
                    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (p.localName && p.localName.toLowerCase().includes(searchQuery.toLowerCase()))
                )
                .map((p) => {
                  const isCurrent = selectedPond?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleSelectPondInList(p)}
                      className={`w-full p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-pink-600 text-white border-pink-700 font-extrabold shadow-sm'
                          : 'bg-[#FAF8F5] hover:bg-stone-100 border-stone-200 text-stone-900'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold">{p.id}</span>
                        <span className="text-[11px] opacity-90 font-semibold truncate max-w-[100px]">
                          {p.localName || p.name.split(' ')[0]}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold opacity-80">
                          Group 0{p.groupNumber}
                        </span>

                        {p.isAnomaly ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-600 text-white flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3 text-white" /> CHECK
                          </span>
                        ) : p.isRepresentative ? (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-800 text-white">
                            REP ✓
                          </span>
                        ) : (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              isCurrent
                                ? 'bg-white text-pink-900'
                                : p.status === 'SUITABLE' || p.status === 'HARVEST WINDOW'
                                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                                : p.status === 'FIELD CHECK'
                                ? 'bg-rose-100 text-rose-950 border border-rose-300'
                                : 'bg-amber-100 text-amber-950 border border-amber-300'
                            }`}
                          >
                            {p.status}
                          </span>
                        )}

                        <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Selected Pond Drawer Details */}
          {selectedPond && (
            <PondIntelligenceDrawer
              pond={selectedPond}
              onClose={() => {}}
            />
          )}
        </div>
      </div>

      {/* Bottom 6-Step Visual Workflow: HOW PANNAI GROUPS PONDS */}
      <GroupingWorkflowBar />

      {/* 5-Step Pond Registration Modal */}
      <PondRegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
};
