import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import type { MarketLot, BuyerReservation } from '../../types';
import { ShoppingBag, CheckCircle2, X } from 'lucide-react';
import { DemoBadge } from '../ui/Badge';

interface ReservationModalProps {
  lot: MarketLot;
  onClose: () => void;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({ lot, onClose }) => {
  const { reserveMarketLot, confirmPaymentToFarmer, guidedDemoStep, nextGuidedDemoStep } = useApp();

  const [buyerCompany, setBuyerCompany] = useState('BlueStar Shrimp Hatcheries Pvt Ltd');
  const [buyerType, setBuyerType] = useState<BuyerReservation['buyerType']>('Shrimp Hatchery');
  const [quantityKg, setQuantityKg] = useState<number>(lot.quantityKg);
  const [confirmed, setConfirmed] = useState(false);

  const totalCostINR = quantityKg * lot.pricePerKgINR;

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    reserveMarketLot(lot.id, 'Dr. K. Rajan', buyerCompany, buyerType, quantityKg);
    confirmPaymentToFarmer(14720);
    setConfirmed(true);

    if (guidedDemoStep === 5) {
      setTimeout(() => {
        nextGuidedDemoStep();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#14100E]/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#69615B] hover:text-[#14100E] p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!confirmed ? (
          <form onSubmit={handleReserveSubmit} className="space-y-4">
            <div className="border-b border-[#E6DFD5] pb-3">
              <div className="flex items-center space-x-2">
                <h3 className="font-heading font-bold text-lg text-[#14100E]">RESERVE ARTEMIA BATCH</h3>
                <DemoBadge />
              </div>
              <p className="text-xs text-[#69615B]">
                Lot: {lot.id} · Grade: {lot.grade} · Hatchability: {lot.hatchabilityPercent}%
              </p>
            </div>

            <div className="bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5] space-y-2 text-xs">
              <div className="flex justify-between font-semibold">
                <span>PRODUCT:</span>
                <span className="text-[#14100E]">{lot.title}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>ORIGIN:</span>
                <span className="text-[#14100E]">{lot.origin}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>INDICATIVE PRICE:</span>
                <span className="text-[#C42A6B]">₹{lot.pricePerKgINR.toLocaleString('en-IN')} / kg</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#14100E] mb-1">BUYER ORGANIZATION</label>
                <input
                  type="text"
                  value={buyerCompany}
                  onChange={(e) => setBuyerCompany(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white font-medium text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-[#14100E] mb-1">BUYER CATEGORY</label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value as BuyerReservation['buyerType'])}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white font-medium text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                >
                  <option value="Shrimp Hatchery">Shrimp Hatchery (Penaeus vannamei)</option>
                  <option value="Marine Fish Hatchery">Marine Fish Hatchery (Seabass)</option>
                  <option value="Aquaculture Distributor">Aquaculture Distributor</option>
                  <option value="Ornamental Breeder">Ornamental Breeder</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#14100E] mb-1">QUANTITY TO RESERVE (KG)</label>
                <input
                  type="number"
                  max={lot.quantityKg}
                  min={1}
                  value={quantityKg}
                  onChange={(e) => setQuantityKg(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E6DFD5] bg-white font-bold text-[#14100E] focus:outline-none focus:border-[#C42A6B]"
                  required
                />
              </div>
            </div>

            {/* Total Cost Summary */}
            <div className="bg-[#14100E] text-white p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">TOTAL ESCROW AMOUNT</span>
                <span className="font-heading font-bold text-xl text-[#C42A6B]">
                  ₹{totalCostINR.toLocaleString('en-IN')}{' '}
                  <span className="text-xs text-stone-400 font-mono font-normal">DEMO</span>
                </span>
              </div>

              <button
                type="submit"
                className={`py-3 px-5 rounded-xl text-xs font-bold text-white shadow-md flex items-center space-x-1.5 transition-transform active:scale-95 ${
                  guidedDemoStep === 5
                    ? 'bg-[#C42A6B] hover:bg-[#A8225A] pulse-highlight'
                    : 'bg-[#C42A6B] hover:bg-[#A8225A]'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>CONFIRM RESERVATION</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-[#E2F4EE] text-[#3E8B7A] rounded-full flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h3 className="font-heading font-bold text-2xl text-[#14100E]">RESERVATION CONFIRMED!</h3>
              <p className="text-xs text-[#69615B]">
                Lot {lot.id} has been reserved for {buyerCompany}. Escrow payout initiated for farmer Muthu Swamy.
              </p>
            </div>

            <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-3 rounded-xl text-xs text-[#C42A6B] font-bold">
              ✓ Digital Batch Passport Verified & Assigned to Reservation
            </div>

            <button
              onClick={onClose}
              className="py-3 px-8 bg-[#14100E] text-white text-xs font-bold rounded-xl hover:bg-[#C42A6B] transition-colors"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
