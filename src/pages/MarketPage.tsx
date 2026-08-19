import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { SourceBadge } from '../components/ui/SourceBadge';
import { MarketNav, type MarketTab } from '../components/market/MarketNav';
import { LocalMarketView } from '../components/market/LocalMarketView';
import { GlobalMarketView } from '../components/market/GlobalMarketView';
import { OrdersView } from '../components/market/OrdersView';
import { OrderDetailModal } from '../components/market/OrderDetailModal';
import { MarketFilterModal } from '../components/market/MarketFilterModal';
import { MarketFlywheel } from '../components/market/MarketFlywheel';
import type { MarketLot, MarketOrder } from '../types';
import {
  ShoppingBag,
  Globe,
  Search,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';


export const MarketPage: React.FC = () => {
  const { marketOrders, createMarketOrder, updateOrderStatus } = useApp();

  const [activeTab, setActiveTab] = useState<MarketTab>('overview');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<MarketOrder | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [targetLotForOrder, setTargetLotForOrder] = useState<MarketLot | null>(null);

  const handleOpenOrderModal = (lot: MarketLot) => {
    setTargetLotForOrder(lot);
  };

  const handleConfirmOrderPlacement = (lot: MarketLot) => {
    const newOrder = createMarketOrder(lot.id, 'BlueStar Hatcheries (Thoothukudi)', 10);
    setTargetLotForOrder(null);
    setSelectedOrder(newOrder);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#11100F]">
      {/* Global Marketplace Search Bar (Section 17 Requirement) */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search verified products, buyers, batches... (e.g. Artemia Cysts, Grade A, Thoothukudi, 10 kg)"
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-stone-200/90 rounded-2xl text-xs font-mono font-medium shadow-xs focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        />
      </div>

      {/* Secondary Top Navigation Bar (Section Requirement) */}
      <MarketNav
        activeTab={activeTab}
        onTabChange={(t) => setActiveTab(t)}
        openOrdersCount={marketOrders.filter((o) => o.status !== 'COMPLETED').length}
      />

      {/* TAB 1: OVERVIEW / MARKET LANDING (Section 1 Requirement) */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Header Banner */}
          <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm space-y-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block mb-1">
                  SALT-PAN BIOECONOMY B2B MARKETPLACE
                </span>
                <h1 className="font-heading font-extrabold text-3xl text-[#11100F] tracking-tight">
                  MARKET · FROM VERIFIED PONDS TO VERIFIED BUYERS.
                </h1>
                <p className="text-xs text-stone-600 mt-1 max-w-3xl">
                  Connect certified PANNAI supply with aquaculture, hatchery, and feed buyers across local and global markets.
                </p>
              </div>

              <SourceBadge source="DEMO" timestamp="Real-Time Engine" />
            </div>

            {/* Top Overview Metrics (Section 1 Requirement) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono pt-2">
              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold block">ACTIVE LISTINGS</span>
                <span className="font-heading font-extrabold text-2xl text-[#11100F]">24</span>
                <span className="text-[10px] text-emerald-700 font-bold block">Verified Lots</span>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold block">VERIFIED SUPPLY</span>
                <span className="font-heading font-extrabold text-2xl text-[#11100F]">186 kg</span>
                <span className="text-[10px] text-pink-600 font-bold block">Grade A Artemia</span>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold block">OPEN ORDERS</span>
                <span className="font-heading font-extrabold text-2xl text-[#11100F]">12</span>
                <span className="text-[10px] text-blue-600 font-bold block">Active Procurement</span>
              </div>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
                <span className="text-stone-500 text-[10px] uppercase font-bold block">PENDING PAYOUT</span>
                <span className="font-heading font-extrabold text-2xl text-pink-600">₹84,600</span>
                <SourceBadge source="DEMO" />
              </div>
            </div>
          </div>

          {/* Two Large Visual Entry Points (Section 1 Requirement) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Entry Point 1: LOCAL MARKET */}
            <div className="bg-white border-2 border-pink-500 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4 hover:border-pink-600 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-pink-100 text-pink-800 rounded-full border border-pink-300">
                    LOCAL FULFILLMENT
                  </span>
                  <ShoppingBag className="w-5 h-5 text-pink-600" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#11100F]">LOCAL MARKET</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-mono">
                  Nearby buyers · Faster fulfillment · Lower logistics complexity · Direct pickup within 50 km.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('local')}
                className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE LOCAL MARKET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Entry Point 2: GLOBAL MARKET */}
            <div className="bg-white border-2 border-blue-500 rounded-2xl p-6 shadow-md flex flex-col justify-between space-y-4 hover:border-blue-600 transition-all">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-mono font-bold bg-blue-100 text-blue-800 rounded-full border border-blue-300">
                    BULK EXPORT NETWORKS
                  </span>
                  <Globe className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#11100F]">GLOBAL MARKET</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-mono">
                  Larger buyers · Bulk demand · Export-oriented opportunities · Verified feed suppliers.
                </p>
              </div>

              <button
                onClick={() => setActiveTab('global')}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>EXPLORE GLOBAL MARKET</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RECENT MARKET ACTIVITY FEED (Section 1 Requirement) */}
          <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-heading font-bold text-base text-[#11100F]">RECENT MARKET ACTIVITY</h3>
              <SourceBadge source="FIELD" timestamp="Live Telemetry Feed" />
            </div>

            <div className="space-y-2 font-mono text-xs">
              <div className="p-3 bg-pink-50/80 rounded-xl border border-pink-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-pink-500" />
                  <span className="font-bold text-[#11100F]">New buyer request</span>
                  <span className="text-stone-500">· Batch PN-TUT-018 (BlueStar Hatcheries)</span>
                </div>
                <span className="text-stone-400 text-[10px]">10 mins ago</span>
              </div>

              <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-bold text-[#11100F]">Order confirmed</span>
                  <span className="text-stone-500">· Hatchery Chennai (25 kg Grade A)</span>
                </div>
                <span className="text-stone-400 text-[10px]">2 hours ago</span>
              </div>

              <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-bold text-[#11100F]">Payment released</span>
                  <span className="text-stone-500">· Batch PN-TUT-014 (₹49,240 Net Payout)</span>
                </div>
                <span className="text-stone-400 text-[10px]">Yesterday</span>
              </div>
            </div>
          </div>

          {/* PANNAI MARKET INTELLIGENCE (Section 20 Requirement) */}
          <div className="bg-stone-900 text-white rounded-2xl p-6 shadow-md space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase font-semibold flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-pink-400" />
                PANNAI MARKET INTELLIGENCE
              </span>
              <SourceBadge source="MODEL" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono text-stone-300">
              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-1">
                <span className="font-bold text-white block">💡 Hatchery Demand Spike</span>
                <p>Demand for Grade A Artemia (≥ 85% hatchability) is currently 34% higher among regional hatchery buyers.</p>
              </div>

              <div className="bg-stone-800/80 p-3.5 rounded-xl border border-stone-700 space-y-1">
                <span className="font-bold text-white block">📍 Logistics Value Optimization</span>
                <p>Nearby buyer fulfillment (within 50 km) yields 8.2% higher net margin for salt producers vs long-distance transport.</p>
              </div>
            </div>
          </div>

          {/* Market Flywheel (Section 21 Requirement) */}
          <MarketFlywheel />
        </div>
      )}

      {/* TAB 2: LOCAL MARKET */}
      {activeTab === 'local' && (
        <LocalMarketView
          onOpenOrderModal={handleOpenOrderModal}
          onOpenFilterModal={() => setIsFilterModalOpen(true)}
        />
      )}

      {/* TAB 3: GLOBAL MARKET */}
      {activeTab === 'global' && (
        <GlobalMarketView onOpenOrderModal={handleOpenOrderModal} />
      )}

      {/* TAB 4: ORDERS PAGE */}
      {activeTab === 'orders' && (
        <OrdersView onSelectOrder={(ord) => setSelectedOrder(ord)} />
      )}

      {/* Order Placement Confirmation Drawer/Modal */}
      {targetLotForOrder && (
        <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5 text-[#11100F]">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="font-heading font-bold text-lg text-[#11100F]">CONFIRM B2B ORDER REQUEST</h3>
              <button onClick={() => setTargetLotForOrder(null)} className="text-stone-400 hover:text-stone-900 cursor-pointer">✕</button>
            </div>

            <div className="space-y-2 text-xs font-mono bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200">
              <div className="flex justify-between">
                <span>Product:</span>
                <span className="font-bold">{targetLotForOrder.title}</span>
              </div>
              <div className="flex justify-between">
                <span>Batch ID:</span>
                <span className="font-bold">{targetLotForOrder.batchId}</span>
              </div>
              <div className="flex justify-between">
                <span>Grade:</span>
                <span className="font-bold text-emerald-700">{targetLotForOrder.grade}</span>
              </div>
              <div className="flex justify-between">
                <span>Price per kg:</span>
                <span className="font-bold text-pink-600">₹{targetLotForOrder.pricePerKgINR.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => handleConfirmOrderPlacement(targetLotForOrder)}
              className="w-full py-3 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md cursor-pointer"
            >
              CONFIRM ORDER (10 KG) & VIEW TRACKING
            </button>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={Boolean(selectedOrder)}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(id, st) => updateOrderStatus(id, st)}
      />

      {/* Advanced Market Filters Modal */}
      <MarketFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={() => {}}
      />

      {/* FINAL BRAND MESSAGE (Section 24 Requirement) */}
      <div className="py-6 border-t border-stone-200 text-center font-mono text-xs text-stone-500 space-y-1">
        <p className="font-heading font-extrabold text-sm text-[#11100F]">PANNAI</p>
        <p className="tracking-widest uppercase text-[10px] text-pink-600 font-bold">
          FROM VERIFIED PONDS TO VERIFIED MARKETS.
        </p>
      </div>
    </div>
  );
};
