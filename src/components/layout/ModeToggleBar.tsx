import React from 'react';
import { useApp } from '../../store/AppContext';
import { UserCheck, Microscope, Mic, HelpCircle, Languages } from 'lucide-react';

export const ModeToggleBar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    language,
    setLanguage,
    setIsVoiceModalOpen,
    setIsHelpModalOpen,
  } = useApp();

  return (
    <div className="bg-[#11100F] text-white border-b border-stone-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono select-none sticky top-0 z-40">
      {/* Mode Switcher */}
      <div className="flex items-center gap-1.5 bg-stone-900 p-1 rounded-xl border border-stone-800">
        <button
          onClick={() => setViewMode('FARMER')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            viewMode === 'FARMER'
              ? 'bg-pink-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>🧑‍🌾 FARMER MODE ({language === 'ta' ? 'எளிய வடிவம்' : 'Simple'})</span>
        </button>

        <button
          onClick={() => setViewMode('OPERATOR')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
            viewMode === 'OPERATOR'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-stone-400 hover:text-white'
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>🔬 OPERATOR MODE ({language === 'ta' ? 'விரிவான வடிவம்' : 'Detailed'})</span>
        </button>
      </div>

      {/* Quick Action Helpers */}
      <div className="flex items-center gap-2">
        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="flex items-center gap-1 px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg border border-stone-700 font-bold transition-colors cursor-pointer"
        >
          <Languages className="w-3.5 h-3.5 text-pink-400" />
          <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
        </button>

        {/* Voice Assistance Button */}
        <button
          onClick={() => setIsVoiceModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-500 text-white rounded-lg font-bold transition-all shadow-sm cursor-pointer animate-pulse"
        >
          <Mic className="w-3.5 h-3.5" />
          <span>🎙️ {language === 'ta' ? 'கேளுங்கள்' : 'Ask PANNAI'}</span>
        </button>

        {/* Help Button */}
        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-bold transition-all shadow-sm cursor-pointer"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>❔ {language === 'ta' ? 'உதவி' : 'Help'}</span>
        </button>
      </div>
    </div>
  );
};
