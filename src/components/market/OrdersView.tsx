import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { SourceBadge } from '../ui/SourceBadge';
import { Eye, Truck, DollarSign, Clock, CheckCircle2 } from 'lucide-react';
import type { MarketOrder } from '../../types';

interface OrdersViewProps {
  onSelectOrder: (order: MarketOrder) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({ onSelectOrder }) => {
  const { marketOrders } = useApp();
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('ALL');

  const filteredOrders = marketOrders.filter((o) => {
    if (selectedStatusTab === 'ALL') return true;
    return o.status === selectedStatusTab;
  });

  return (
    <div className="space-y-8 text-[#11100F]">
      {/* Header Banner */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase font-semibold block mb-1">
            FULFILLMENT & PAYOUT ENGINE
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-[#11100F]">
            ORDERS · FROM ACCEPTED TO PAID.
          </h2>
          <p className="text-xs text-stone-600 mt-1">
            Track batch dispatches, cold-chain shipment milestones, buyer delivery acknowledgments, and farmer payout releases.
          </p>
        </div>

        <SourceBadge source="DEMO" timestamp="Real-Time Orders" />
      </div>

      {/* Top Order Metrics (Section 8 Requirement) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 font-bold block flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> OPEN ORDERS
          </span>
          <span className="font-heading font-extrabold text-2xl text-[#11100F]">12</span>
          <span className="text-[10px] text-amber-700 font-bold block">Action Required</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 font-bold block flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-blue-600" /> IN TRANSIT
          </span>
          <span className="font-heading font-extrabold text-2xl text-[#11100F]">4</span>
          <span className="text-[10px] text-blue-700 font-bold block">En Route</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 font-bold block flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> DELIVERED
          </span>
          <span className="font-heading font-extrabold text-2xl text-[#11100F]">7</span>
          <span className="text-[10px] text-emerald-700 font-bold block">Verified by Buyer</span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-xs space-y-1">
          <span className="text-stone-500 font-bold block flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-pink-600" /> PAYOUT PENDING
          </span>
          <span className="font-heading font-extrabold text-2xl text-pink-600">₹84,600</span>
          <SourceBadge source="DEMO" />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-stone-200 pb-2 overflow-x-auto text-xs font-mono">
        {['ALL', 'PENDING', 'CONFIRMED', 'IN_TRANSIT', 'DELIVERED', 'COMPLETED'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatusTab(st)}
            className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              selectedStatusTab === st
                ? 'bg-[#11100F] text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Clean Editorial Order Table (Section 8 Requirement) */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-stone-200 text-stone-500 font-bold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">ORDER ID</th>
                <th className="py-3 px-4">PRODUCT</th>
                <th className="py-3 px-4">BUYER</th>
                <th className="py-3 px-4">QTY</th>
                <th className="py-3 px-4">ORDER VALUE</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4">DATE</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-pink-50/40 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#11100F]">{ord.id}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-stone-900 block">{ord.productName}</span>
                    <span className="text-[10px] text-stone-500 font-mono">BATCH: {ord.batchId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-stone-900 block">{ord.buyerCompany}</span>
                    <span className="text-[10px] text-stone-500 font-mono">{ord.buyerLocation}</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-pink-700">{ord.quantityKg} kg</td>
                  <td className="py-3.5 px-4 font-bold text-[#11100F]">₹{ord.totalValueINR.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                        ord.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : ord.status === 'IN_TRANSIT'
                          ? 'bg-blue-100 text-blue-900 border border-blue-300'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                      }`}
                    >
                      {ord.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600">{ord.orderDate}</td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectOrder(ord)}
                      className="px-3 py-1.5 bg-[#11100F] hover:bg-stone-800 text-white font-mono text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-pink-400" />
                      <span>VIEW ORDER</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
