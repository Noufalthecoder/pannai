import React, { useState } from 'react';
import { PondMap } from '../components/earth/PondMap';
import { PondDrawer } from '../components/earth/PondDrawer';
import { useApp } from '../store/AppContext';
import { Search, Globe } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';

export const EarthPage: React.FC = () => {
  const { ponds } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-lg text-[#14100E]">PANNAI EARTH</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              Satellite-Assisted Pond Intelligence · Thoothukudi Bioeconomy Cluster (35 Ponds Monitored)
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none py-1">
          <div className="relative">
            <Search className="w-4 h-4 text-[#69615B] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search pond ID or farmer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 bg-[#F7F3EC] border border-[#E6DFD5] rounded-xl text-xs text-[#14100E] focus:outline-none focus:border-[#C42A6B] w-48"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-[#F7F3EC] border border-[#E6DFD5] rounded-xl text-xs font-semibold text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
          >
            <option value="ALL">ALL STATUSES ({ponds.length})</option>
            <option value="TOO DILUTE">TOO DILUTE</option>
            <option value="APPROACHING">APPROACHING</option>
            <option value="CANDIDATE">CANDIDATE</option>
            <option value="FIELD CHECK">FIELD CHECK</option>
            <option value="SUITABLE">SUITABLE</option>
            <option value="HARVEST WINDOW">HARVEST WINDOW</option>
          </select>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-12rem)]">
        <div className="lg:col-span-8 h-full">
          <PondMap />
        </div>
        <div className="lg:col-span-4 h-full">
          <PondDrawer />
        </div>
      </div>
    </div>
  );
};
