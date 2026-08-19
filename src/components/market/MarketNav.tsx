import React from 'react';
import { ShoppingBag, Globe, ShoppingCart, LayoutGrid } from 'lucide-react';

export type MarketTab = 'overview' | 'local' | 'global' | 'orders';

interface MarketNavProps {
  activeTab: MarketTab;
  onTabChange: (tab: MarketTab) => void;
  openOrdersCount?: number;
}

export const MarketNav: React.FC<MarketNavProps> = ({ activeTab, onTabChange, openOrdersCount = 12 }) => {
  return (
    <div className="bg-white border border-stone-200/90 rounded-xl p-1.5 shadow-xs flex items-center justify-between overflow-x-auto select-none">
      <div className="flex items-center gap-1 font-mono text-xs">
        <button
          onClick={() => onTabChange('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-[#11100F] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>OVERVIEW</span>
        </button>

        <button
          onClick={() => onTabChange('local')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'local'
              ? 'bg-[#11100F] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShoppingBag className="w-3.5 h-3.5 text-pink-500" />
          <span>LOCAL MARKET</span>
        </button>

        <button
          onClick={() => onTabChange('global')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer ${
            activeTab === 'global'
              ? 'bg-[#11100F] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Globe className="w-3.5 h-3.5 text-blue-500" />
          <span>GLOBAL MARKET</span>
        </button>

        <button
          onClick={() => onTabChange('orders')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg font-bold transition-all cursor-pointer relative ${
            activeTab === 'orders'
              ? 'bg-[#11100F] text-white shadow-sm'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShoppingCart className="w-3.5 h-3.5 text-amber-500" />
          <span>ORDERS</span>
          {openOrdersCount > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] bg-pink-600 text-white rounded-full font-extrabold">
              {openOrdersCount}
            </span>
          )}
        </button>
      </div>

      <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-stone-500 px-3">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>B2B COMMODITY ENGINE ACTIVE</span>
      </div>
    </div>
  );
};
