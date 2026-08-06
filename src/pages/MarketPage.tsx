import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { LotCard } from '../components/market/LotCard';
import { SmartRoutingCard } from '../components/market/SmartRoutingCard';
import { SupplyForecastCard } from '../components/market/SupplyForecastCard';
import { ReservationModal } from '../components/market/ReservationModal';
import type { MarketLot } from '../types';
import { ShoppingBag, PlusCircle } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';

export const MarketPage: React.FC = () => {
  const { marketLots, publishMarketLot } = useApp();

  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [selectedLotForReservation, setSelectedLotForReservation] = useState<MarketLot | null>(null);

  const filteredLots = marketLots.filter((lot) => {
    return selectedGrade === 'ALL' || lot.grade === selectedGrade;
  });

  const handleQuickPublishCurrentBatch = () => {
    publishMarketLot('PN-TUT-260806-018', 5200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#14100E]">PANNAI MARKET</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              Verified B2B Artemia Commodity Procurement Marketplace · Hatchery Procurement Portal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleQuickPublishCurrentBatch}
            className="py-2 px-3 bg-[#14100E] hover:bg-[#C42A6B] text-white text-xs font-bold rounded-xl transition-colors flex items-center space-x-1"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish Batch PN-TUT-260806-018</span>
          </button>

          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="px-3.5 py-2 bg-[#F7F3EC] border border-[#E6DFD5] rounded-xl text-xs font-bold text-[#14100E]"
          >
            <option value="ALL">ALL QUALITY GRADINGS</option>
            <option value="GRADE A">GRADE A (Hatchability ≥ 80%)</option>
            <option value="GRADE B">GRADE B (Hatchability 70-79%)</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Forecast & Smart Routing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SupplyForecastCard />
        <SmartRoutingCard />
      </div>

      {/* Available Procurement Lots Grid */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-2">
          <h2 className="font-heading font-bold text-lg text-[#14100E]">
            AVAILABLE COMMODITY LOTS ({filteredLots.length})
          </h2>
          <span className="text-xs font-mono text-[#69615B]">REAL-TIME INVENTORY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredLots.map((lot) => (
            <LotCard
              key={lot.id}
              lot={lot}
              onReserve={(selected) => setSelectedLotForReservation(selected)}
            />
          ))}
        </div>
      </div>

      {/* Reservation Modal */}
      {selectedLotForReservation && (
        <ReservationModal
          lot={selectedLotForReservation}
          onClose={() => setSelectedLotForReservation(null)}
        />
      )}
    </div>
  );
};
