import React from 'react';
import { PhoneSimulator } from '../components/farmer/PhoneSimulator';
import { FarmerHome } from '../components/farmer/FarmerHome';
import { Smartphone } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';

export const FarmerPage: React.FC = () => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#14100E]">PANNAI FARMER</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              "Know what to do." · Radical Operational Simplicity in Native Tamil Script with Web Speech Audio
            </p>
          </div>
        </div>

        <div className="text-right text-xs text-[#69615B]">
          <span className="font-bold text-[#14100E]">Target Producer:</span> Muthu Swamy (Tharuvaikulam)
        </div>
      </div>

      {/* Phone Simulator Layout */}
      <div className="py-4">
        <PhoneSimulator>
          <FarmerHome />
        </PhoneSimulator>
      </div>
    </div>
  );
};
