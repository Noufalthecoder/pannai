import React from 'react';
import type { MarketLot } from '../../types';
import { StatusBadge, DemoBadge } from '../ui/Badge';
import { ShoppingBag, FileText, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LotCardProps {
  lot: MarketLot;
  onReserve: (lot: MarketLot) => void;
}

export const LotCard: React.FC<LotCardProps> = ({ lot, onReserve }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-xs space-y-4 hover:border-[#C42A6B] transition-colors flex flex-col justify-between">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-heading font-bold text-base text-[#14100E]">{lot.title}</h3>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B] flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#3E8B7A]" />
              <span>{lot.origin}</span>
            </p>
          </div>
          <StatusBadge status={lot.grade} />
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-3 gap-2 bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5] text-center text-xs">
          <div>
            <span className="text-[10px] text-[#69615B] block font-mono">HATCHABILITY</span>
            <span className="font-heading font-bold text-sm text-[#C42A6B]">{lot.hatchabilityPercent}%</span>
          </div>
          <div>
            <span className="text-[10px] text-[#69615B] block font-mono">MOISTURE</span>
            <span className="font-heading font-bold text-sm text-[#14100E]">{lot.moisturePercent}%</span>
          </div>
          <div>
            <span className="text-[10px] text-[#69615B] block font-mono">LOT SIZE</span>
            <span className="font-heading font-bold text-sm text-[#3E8B7A]">{lot.quantityKg} kg</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <span className="text-[10px] text-[#69615B] block uppercase font-mono">INDICATIVE PRICE</span>
            <span className="font-heading font-bold text-lg text-[#14100E]">
              ₹{lot.pricePerKgINR.toLocaleString('en-IN')}{' '}
              <span className="text-xs text-[#69615B] font-normal">/ kg</span>
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#69615B] block uppercase font-mono">LOT STATUS</span>
            <span
              className={`text-xs font-bold ${
                lot.status === 'AVAILABLE' ? 'text-[#3E8B7A]' : 'text-[#D9A441]'
              }`}
            >
              {lot.status === 'AVAILABLE' ? '✓ AVAILABLE INVENTORY' : 'RESERVED'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-3 border-t border-[#E6DFD5] grid grid-cols-2 gap-2">
        <button
          onClick={() => navigate(lot.passportUrl)}
          className="py-2.5 px-3 bg-[#F7F3EC] hover:bg-[#E6DFD5] text-[#14100E] text-xs font-bold rounded-xl transition-colors flex items-center justify-center space-x-1"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>VIEW PASSPORT</span>
        </button>

        <button
          onClick={() => onReserve(lot)}
          disabled={lot.status !== 'AVAILABLE'}
          className={`py-2.5 px-3 text-white text-xs font-bold rounded-xl shadow-xs flex items-center justify-center space-x-1 transition-transform active:scale-95 ${
            lot.status === 'AVAILABLE'
              ? 'bg-[#C42A6B] hover:bg-[#A8225A]'
              : 'bg-[#69615B] cursor-not-allowed'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>RESERVE LOT</span>
        </button>
      </div>
    </div>
  );
};
