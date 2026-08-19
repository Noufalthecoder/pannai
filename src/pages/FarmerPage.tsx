import React from 'react';
import { PhoneSimulator } from '../components/farmer/PhoneSimulator';
import { FarmerHome } from '../components/farmer/FarmerHome';
import { Smartphone, Languages } from 'lucide-react';
import { SourceBadge } from '../components/ui/SourceBadge';
import { useApp } from '../store/AppContext';

export const FarmerPage: React.FC = () => {
  const { language, setLanguage } = useApp();

  return (
    <div className="space-y-6 max-w-5xl mx-auto text-[#11100F]">
      {/* Top Header */}
      <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-700">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#11100F]">PANNAI FARMER</h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-600">
              Producer Mobile Operating Interface · Simple Decision Cards · Native Tamil UX
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Language Toggle Button */}
          <button
            onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#FAF8F5] border border-stone-300 rounded-lg text-xs font-mono font-semibold text-[#11100F] hover:bg-stone-200 transition-colors cursor-pointer"
          >
            <Languages className="w-4 h-4 text-pink-600" />
            <span>{language === 'ta' ? 'Switch to English' : 'தமிழ் பதிப்பு'}</span>
          </button>
        </div>
      </div>

      {/* Phone Simulator Display */}
      <div className="py-2">
        <PhoneSimulator>
          <FarmerHome />
        </PhoneSimulator>
      </div>
    </div>
  );
};
