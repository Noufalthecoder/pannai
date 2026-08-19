import React from 'react';
import { useApp } from '../store/AppContext';
import { BarChart3, Info, Globe2, TrendingUp, Sparkles } from 'lucide-react';
import { SourceBadge } from '../components/ui/SourceBadge';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { ponds, marketLots, language, setLanguage } = useApp();

  const monthlyHarvestData = [
    { month: language === 'ta' ? 'ஏப்' : 'Apr', harvestsKg: 120 },
    { month: language === 'ta' ? 'மே' : 'May', harvestsKg: 240 },
    { month: language === 'ta' ? 'ஜூன்' : 'Jun', harvestsKg: 310 },
    { month: language === 'ta' ? 'ஜூலை' : 'Jul', harvestsKg: 450 },
    { month: language === 'ta' ? 'ஆக (மதிப்பு)' : 'Aug (Est)', harvestsKg: 620 },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-[#11100F]">
      {/* Header with Language Switcher */}
      <div className="bg-white border-2 border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-xl bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-pink-700 font-bold">
            <BarChart3 className="w-6 h-6 text-pink-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-[#11100F] tracking-tight">
                {language === 'ta' ? 'பண்ணை செயல் திறன்' : 'FARM PERFORMANCE'}
              </h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs font-mono font-bold text-stone-700 mt-0.5">
              {language === 'ta'
                ? 'உப்புப் பண்ணை உயிரியல் மற்றும் செயல்பாட்டுத் தரவு அறிக்கைகள்'
                : 'Salt-Pan Bioeconomy Telemetry & Operational Performance Intelligence'}
            </p>
          </div>
        </div>

        {/* Language Switcher */}
        <button
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="flex items-center space-x-2 px-4 py-2 bg-pink-50 border-2 border-pink-300 rounded-xl text-xs font-mono font-extrabold text-pink-800 hover:bg-pink-100 transition-all cursor-pointer shadow-xs"
        >
          <Globe2 className="w-4 h-4 text-pink-700" />
          <span>{language === 'ta' ? 'English - EN' : 'தமிழ் - Tamil'}</span>
        </button>
      </div>

      {/* NATURAL-LANGUAGE INSIGHT CALLOUT (High Contrast & Tamil Support) */}
      <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-xs flex items-start space-x-3 text-[#11100F]">
        <Info className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-mono font-extrabold tracking-widest text-amber-900 uppercase block">
            {language === 'ta' ? 'இயல்பு மொழி நுண்ணறிவு தகவல்' : 'NATURAL-LANGUAGE INTELLIGENCE INSIGHT'}
          </span>
          <p className="text-sm font-heading font-extrabold text-stone-900 leading-relaxed">
            {language === 'ta'
              ? '"கடந்த சுழற்சியில் மழைப்பொழிவு காரணமாக எதிர்பார்த்த உற்பத்தியில் 14% குறைவு ஏற்பட்டுள்ளது."'
              : '"Rainfall caused a 14% reduction in expected production across monitored ponds during the previous cycle."'}
          </p>
        </div>
      </div>

      {/* Primary Key Metrics (High Contrast & Tamil Support) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
        <div className="bg-white p-4 rounded-2xl border-2 border-stone-300 space-y-1 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-stone-800 uppercase">
              {language === 'ta' ? 'கண்காணிக்கப்படும் குளங்கள்' : 'MONITORED PONDS'}
            </span>
            <SourceBadge source="DEMO" />
          </div>
          <span className="font-heading font-extrabold text-3xl text-[#11100F] block">{ponds.length}</span>
          <span className="text-xs font-bold text-stone-700">Thoothukudi Cluster</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-stone-300 space-y-1 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-stone-800 uppercase">
              {language === 'ta' ? 'அறுவடை எடை' : 'RAW HARVESTS'}
            </span>
            <SourceBadge source="DEMO" />
          </div>
          <span className="font-heading font-extrabold text-3xl text-[#11100F] block">18.4 kg</span>
          <span className="text-xs font-bold text-emerald-800">Batch PN-TUT-018</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-stone-300 space-y-1 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-stone-800 uppercase">
              {language === 'ta' ? 'சான்றளிக்கப்பட்டவை' : 'CERTIFIED LOTS'}
            </span>
            <SourceBadge source="DEMO" />
          </div>
          <span className="font-heading font-extrabold text-3xl text-pink-700 block">{marketLots.length}</span>
          <span className="text-xs font-bold text-pink-800">Grade A Passport</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border-2 border-stone-300 space-y-1 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs font-extrabold text-stone-800 uppercase">
              {language === 'ta' ? 'வழங்கப்பட்ட தொகை' : 'SETTLED PAYOUT'}
            </span>
            <SourceBadge source="DEMO" />
          </div>
          <span className="font-heading font-extrabold text-3xl text-emerald-800 block">₹14,720</span>
          <span className="text-xs font-bold text-stone-800">Direct Payout</span>
        </div>
      </div>

      {/* Editorial Single Chart View (High Contrast & User Friendly) */}
      <div className="bg-white border-2 border-stone-300 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3">
          <div>
            <span className="text-xs font-mono font-extrabold tracking-widest text-pink-700 uppercase block">
              {language === 'ta' ? 'அறுவடை போக்கு' : 'HARVEST TREND'}
            </span>
            <h2 className="font-heading font-extrabold text-lg text-[#11100F]">
              {language === 'ta'
                ? 'மாதாந்திர ஆர்டீமியா அறுவடை அளவு (கி.கி)'
                : 'MONTHLY ARTEMIA HARVEST VOLUME (KG)'}
            </h2>
          </div>
          <SourceBadge source="DEMO" />
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyHarvestData}>
              <XAxis dataKey="month" stroke="#11100F" fontSize={12} fontWeight="bold" tickLine={false} />
              <YAxis stroke="#11100F" fontSize={12} fontWeight="bold" tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#11100F',
                  color: '#FFFFFF',
                  borderRadius: '10px',
                  borderColor: '#D946EF',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}
              />
              <Bar dataKey="harvestsKg" fill="#D946EF" radius={[6, 6, 0, 0]} name={language === 'ta' ? 'அறுவடை அளவு (கி.கி)' : 'Harvest Volume (kg)'} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User-Friendly Summary Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs text-[#11100F]">
        <div className="bg-pink-50 border-2 border-pink-300 p-4 rounded-2xl space-y-1">
          <span className="font-extrabold text-pink-900 block flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-pink-700" />
            {language === 'ta' ? 'உற்பத்தி வளர்ச்சி போக்கு' : 'PRODUCTION GROWTH TREND'}
          </span>
          <p className="text-stone-900 font-bold leading-relaxed">
            {language === 'ta'
              ? 'ஆகஸ்ட் மாதத்திற்கான மதிப்பிடப்பட்ட அறுவடை 620 கி.கி ஆகும். இது கடந்த மாதத்தை விட +37% அதிகமாகும்.'
              : 'August estimated harvest reaches 620 kg, showing +37% month-on-month growth across active salt pans.'}
          </p>
        </div>

        <div className="bg-emerald-50 border-2 border-emerald-300 p-4 rounded-2xl space-y-1">
          <span className="font-extrabold text-emerald-900 block flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-700" />
            {language === 'ta' ? 'உப்புத்தன்மை வரம்பு சாதனை' : 'OPTIMAL SALINITY SUCCESS'}
          </span>
          <p className="text-stone-900 font-bold leading-relaxed">
            {language === 'ta'
              ? '18 குளங்களில் உகந்த 90-110 ppt உப்புத்தன்மை அளவு அடைந்து சாதனை நிலையை எட்டியுள்ளது.'
              : 'Optimal 90-110 ppt salinity range achieved across 18 monitored salt compartments.'}
          </p>
        </div>
      </div>
    </div>
  );
};
