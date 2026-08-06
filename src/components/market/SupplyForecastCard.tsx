import React from 'react';
import { TrendingUp } from 'lucide-react';
import { DemoBadge } from '../ui/Badge';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const SupplyForecastCard: React.FC = () => {
  const chartData = [
    { day: 'Week 1', supply: 80, demand: 120 },
    { day: 'Week 2', supply: 140, demand: 135 },
    { day: 'Week 3', supply: 220, demand: 180 },
    { day: 'Week 4', supply: 420, demand: 550 },
  ];

  return (
    <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-3">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-[#C42A6B]" />
          <h3 className="font-heading font-bold text-base text-[#14100E]">30-DAY SUPPLY INTELLIGENCE</h3>
          <DemoBadge />
        </div>
        <span className="text-xs font-mono text-[#69615B]">PROJECTED</span>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
        <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] block font-mono">POTENTIAL PONDS</span>
          <span className="font-heading font-bold text-lg text-[#14100E]">14</span>
        </div>
        <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] block font-mono">FIELD CHECKS</span>
          <span className="font-heading font-bold text-lg text-[#14100E]">22</span>
        </div>
        <div className="bg-[#FAF0F4] p-3 rounded-xl border border-[#F3CBDC]">
          <span className="text-[10px] text-[#C42A6B] block font-mono">QUALIFIED SUPPLY</span>
          <span className="font-heading font-bold text-lg text-[#C42A6B]">420 kg</span>
        </div>
        <div className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5]">
          <span className="text-[10px] text-[#69615B] block font-mono">BUYER DEMAND</span>
          <span className="font-heading font-bold text-lg text-[#3E8B7A]">550 kg</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-44 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorSupply" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#C42A6B" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#C42A6B" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3E8B7A" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3E8B7A" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="day" stroke="#69615B" fontSize={11} tickLine={false} />
            <YAxis stroke="#69615B" fontSize={11} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#FFFCF7', borderRadius: '8px', borderColor: '#E6DFD5', fontSize: '12px' }} />
            <Area type="monotone" dataKey="supply" stroke="#C42A6B" fillOpacity={1} fill="url(#colorSupply)" name="Projected Supply (kg)" />
            <Area type="monotone" dataKey="demand" stroke="#3E8B7A" fillOpacity={1} fill="url(#colorDemand)" name="Buyer Demand (kg)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="text-[11px] text-[#69615B] flex items-center justify-between pt-1 border-t border-[#E6DFD5]">
        <span>Projected supply based on active pond salinity progression</span>
        <span className="font-mono text-[#C42A6B] font-bold">DEMO FORECAST</span>
      </div>
    </div>
  );
};
