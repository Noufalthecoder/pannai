import React, { useState } from 'react';
import { X, Filter, RotateCcw } from 'lucide-react';

interface FilterOptions {
  product: string;
  quality: string;
  locationRadius: number;
  deliveryType: string;
  minPrice: number;
  maxPrice: number;
}

interface MarketFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: FilterOptions) => void;
}

export const MarketFilterModal: React.FC<MarketFilterModalProps> = ({ isOpen, onClose, onApplyFilters }) => {
  const [product, setProduct] = useState<string>('ALL');
  const [quality, setQuality] = useState<string>('ALL');
  const [locationRadius, setLocationRadius] = useState<number>(50);
  const [deliveryType, setDeliveryType] = useState<string>('ALL');
  const [minPrice, setMinPrice] = useState<number>(3000);
  const [maxPrice, setMaxPrice] = useState<number>(8000);

  if (!isOpen) return null;

  const handleReset = () => {
    setProduct('ALL');
    setQuality('ALL');
    setLocationRadius(50);
    setDeliveryType('ALL');
    setMinPrice(3000);
    setMaxPrice(8000);
  };

  const handleApply = () => {
    onApplyFilters({
      product,
      quality,
      locationRadius,
      deliveryType,
      minPrice,
      maxPrice,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 text-[#11100F]">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-pink-600" />
            <h3 className="font-heading font-bold text-lg text-[#11100F]">MARKETPLACE ADVANCED FILTERS</h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs font-mono">
          {/* Product Type Filter */}
          <div>
            <label className="block font-bold text-stone-700 mb-1.5 uppercase">COMMODITY PRODUCT</label>
            <div className="grid grid-cols-2 gap-2">
              {['ALL', 'Artemia Cysts', 'Artemia Biomass', 'Live Nauplii', 'Industrial Salt'].map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProduct(p)}
                  className={`p-2 rounded-lg border font-semibold transition-all cursor-pointer ${
                    product === p ? 'bg-pink-600 text-white border-pink-600' : 'bg-[#FAF8F5] border-stone-200 text-stone-700'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Quality Grade Filter */}
          <div>
            <label className="block font-bold text-stone-700 mb-1.5 uppercase">QUALITY CERTIFICATION</label>
            <div className="grid grid-cols-3 gap-2">
              {['ALL', 'GRADE A', 'GRADE B'].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setQuality(g)}
                  className={`p-2 rounded-lg border font-semibold transition-all cursor-pointer ${
                    quality === g ? 'bg-pink-600 text-white border-pink-600' : 'bg-[#FAF8F5] border-stone-200 text-stone-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Location Radius */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-bold text-stone-700 uppercase">LOCAL DELIVERY RADIUS</label>
              <span className="font-bold text-pink-600">{locationRadius} km</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              value={locationRadius}
              onChange={(e) => setLocationRadius(Number(e.target.value))}
              className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
            />
          </div>

          {/* Price Range */}
          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="font-bold text-stone-700 uppercase">INDICATIVE PRICE RANGE (INR/KG)</label>
              <span className="font-bold text-pink-600">₹{minPrice} – ₹{maxPrice}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-stone-300 bg-[#FAF8F5]"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="px-3 py-1.5 rounded-lg border border-stone-300 bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#FAF8F5] hover:bg-stone-200 text-stone-700 font-mono text-xs font-semibold rounded-lg flex items-center gap-1.5 border border-stone-300 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RESET</span>
          </button>

          <button
            onClick={handleApply}
            className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-lg transition-all shadow-md cursor-pointer"
          >
            APPLY FILTERS
          </button>
        </div>
      </div>
    </div>
  );
};
