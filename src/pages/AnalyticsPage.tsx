import React from 'react';
import { useApp } from '../store/AppContext';
import { BarChart3 } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { ponds, batches, marketLots } = useApp();

  const monthlyHarvestData = [
    { month: 'Apr', harvestsKg: 120 },
    { month: 'May', harvestsKg: 240 },
    { month: 'Jun', harvestsKg: 310 },
    { month: 'Jul', harvestsKg: 450 },
    { month: 'Aug (Est)', harvestsKg: 620 },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-2xs flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#14100E]">OPERATIONAL ANALYTICS</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              Salt Pan Bioeconomy Telemetry & Operational Metrics (Thoothukudi Cluster)
            </p>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
        <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E6DFD5] space-y-1">
          <span className="text-[10px] text-[#69615B] font-mono uppercase block">REGISTERED PONDS</span>
          <span className="font-heading font-bold text-xl text-[#14100E]">{ponds.length}</span>
          <span className="text-[10px] text-[#3E8B7A] block font-semibold">35 Monitored</span>
        </div>

        <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E6DFD5] space-y-1">
          <span className="text-[10px] text-[#69615B] font-mono uppercase block">FIELD CHECKS REQ.</span>
          <span className="font-heading font-bold text-xl text-[#D9A441]">8</span>
          <span className="text-[10px] text-[#69615B] block">Pending Friday</span>
        </div>

        <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E6DFD5] space-y-1">
          <span className="text-[10px] text-[#69615B] font-mono uppercase block">HARVESTS RECEIVED</span>
          <span className="font-heading font-bold text-xl text-[#14100E]">18.4 kg</span>
          <span className="text-[10px] text-[#3E8B7A] block font-semibold">Batch PN-TUT-018</span>
        </div>

        <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E6DFD5] space-y-1">
          <span className="text-[10px] text-[#69615B] font-mono uppercase block">BATCHES PROCESSING</span>
          <span className="font-heading font-bold text-xl text-[#14100E]">{batches.length}</span>
          <span className="text-[10px] text-[#69615B] block">Traceable</span>
        </div>

        <div className="bg-[#FAF0F4] p-4 rounded-2xl border border-[#F3CBDC] space-y-1">
          <span className="text-[10px] text-[#C42A6B] font-mono uppercase block">CERTIFIED LOTS</span>
          <span className="font-heading font-bold text-xl text-[#C42A6B]">{marketLots.length}</span>
          <span className="text-[10px] text-[#C42A6B] block font-semibold">Grade A Passport</span>
        </div>

        <div className="bg-[#FFFCF7] p-4 rounded-2xl border border-[#E6DFD5] space-y-1">
          <span className="text-[10px] text-[#69615B] font-mono uppercase block">SETTLED INVENTORY</span>
          <span className="font-heading font-bold text-xl text-[#3E8B7A]">₹14,720</span>
          <span className="text-[10px] text-[#69615B] font-mono block">DEMO PAYOUT</span>
        </div>
      </div>

      {/* Chart View */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
          <h2 className="font-heading font-bold text-base text-[#14100E]">
            MONTHLY ARTEMIA HARVEST VOLUME (KG)
          </h2>
          <DemoBadge />
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyHarvestData}>
              <XAxis dataKey="month" stroke="#69615B" fontSize={12} tickLine={false} />
              <YAxis stroke="#69615B" fontSize={12} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#FFFCF7', borderRadius: '8px', borderColor: '#E6DFD5', fontSize: '12px' }} />
              <Bar dataKey="harvestsKg" fill="#C42A6B" radius={[6, 6, 0, 0]} name="Harvest (kg)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
