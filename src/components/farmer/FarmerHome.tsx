import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Volume2, CheckCircle2, Home, Layers, IndianRupee, HelpCircle, Sun, CloudRain, Sparkles, ChevronDown, ChevronUp, Cpu, PhoneCall } from 'lucide-react';
import { SourceBadge } from '../ui/SourceBadge';
import { useNavigate } from 'react-router-dom';

export const FarmerHome: React.FC = () => {
  const {
    ponds,
    advisories,
    acknowledgeAdvisory,
    language,
    setLanguage,
    guidedDemoStep,
    nextGuidedDemoStep,
    farmerIncome,
    setIsHelpModalOpen,
  } = useApp();


  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'today' | 'ponds' | 'income' | 'help'>('today');
  const [showLevel3Data, setShowLevel3Data] = useState<boolean>(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState<boolean>(false);

  const activeAdvisory = advisories.find((a) => a.pondId === 'TTK-042') || advisories[0];

  const speakTamilAdvisory = () => {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const textToSpeak = activeAdvisory
        ? `${activeAdvisory.tamilTitle}. ${activeAdvisory.tamilInstruction}. ${activeAdvisory.tamilDetails}`
        : 'வணக்கம். இன்று செய்ய வேண்டியது. வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும்.';

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.9;

      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingVoice(false);
    }
  };

  const handleAcknowledge = () => {
    if (activeAdvisory) {
      acknowledgeAdvisory(activeAdvisory.id);
    }
    if (guidedDemoStep === 2 || guidedDemoStep === 3) {
      nextGuidedDemoStep();
    }
  };

  return (
    <div className="space-y-5 flex flex-col justify-between h-full text-[#11100F] font-mono select-none">
      {/* Top Header & Simple Greeting (Section 3 Requirement) */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs flex items-center justify-between">
        <div>
          <h1 className="text-xl font-heading font-extrabold text-[#11100F] tracking-tight">
            {language === 'ta' ? 'வணக்கம், முத்து 👋' : 'WELCOME, MUTHU 👋'}
          </h1>
          <p className="text-xs font-bold text-stone-600">Tharuvaikulam Salt Pan Cluster</p>
        </div>

        <button
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="px-3.5 py-2 bg-pink-50 border-2 border-pink-400 rounded-2xl text-xs font-extrabold text-pink-800 hover:bg-pink-100 transition-colors cursor-pointer"
        >
          {language === 'ta' ? 'English' : 'தமிழ்'}
        </button>
      </div>

      {/* TAB 1: TODAY (DAILY FARM ASSISTANT) */}
      {activeTab === 'today' && (
        <div className="space-y-5">
          {/* Simple Status Summary (Section 3 & 4 Requirement) */}
          <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs space-y-3">
            <span className="text-xs font-extrabold text-stone-800 uppercase block border-b-2 border-stone-200 pb-2">
              {language === 'ta' ? 'இன்று உங்கள் பண்ணை நிலை:' : "TODAY'S FARM STATUS:"}
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-extrabold">
              <div className="bg-emerald-50 p-3 rounded-2xl border-2 border-emerald-400 flex items-center justify-between text-emerald-950">
                <span>🟢 3 குளங்கள் (3 Ponds)</span>
                <span className="font-heading text-sm">நல்ல நிலை (Good)</span>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border-2 border-amber-400 flex items-center justify-between text-amber-950">
                <span>🟡 1 குளம் (1 Pond)</span>
                <span className="font-heading text-sm">கவனிக்கவும் (Watch)</span>
              </div>

              <div className="bg-rose-50 p-3 rounded-2xl border-2 border-rose-400 flex items-center justify-between text-rose-950">
                <span>🔴 1 குளம் (1 Pond)</span>
                <span className="font-heading text-sm">சரிபார்க்கவும் (Check)</span>
              </div>
            </div>
          </div>

          {/* Today's Action Decision Card (Section 3 Requirement - 5 Second Decision) */}
          <div className="bg-white border-3 border-pink-600 rounded-3xl p-5 shadow-md space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-pink-100 pb-2">
              <span className="text-xs font-extrabold text-pink-700 uppercase tracking-wider">
                {language === 'ta' ? 'இன்று என்ன செய்ய வேண்டும்?' : "TODAY'S ACTION NEEDED"}
              </span>
              <SourceBadge source="MODEL" />
            </div>

            <div className="space-y-3">
              <div className="bg-pink-100 border-2 border-pink-400 p-4 rounded-2xl text-base font-tamil font-extrabold text-pink-950 shadow-xs leading-snug">
                "வெள்ளிக்கிழமை குளத்தை (TTK-042) நேரில் சரிபார்க்கவும்."
              </div>

              <p className="text-xs font-bold text-stone-900 leading-relaxed">
                {language === 'ta'
                  ? 'தற்போதைய தண்ணீரின் நிலை அப்படியே பராமரிக்கவும். ஆர்டீமியா உற்பத்தி செய்ய உகந்த சூழல் உள்ளது.'
                  : 'Maintain current water level. Biological Artemia production window detected.'}
              </p>
            </div>

            {/* Audio Voice Narration Button */}
            <button
              onClick={speakTamilAdvisory}
              className={`w-full py-3 rounded-2xl text-xs font-extrabold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                isPlayingVoice
                  ? 'bg-pink-600 text-white animate-pulse'
                  : 'bg-stone-100 hover:bg-stone-200 text-[#11100F] border-2 border-stone-300'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${isPlayingVoice ? 'animate-bounce' : 'text-pink-700'}`} />
              <span>{isPlayingVoice ? 'பேசுகிறது... (Speaking Tamil)' : '🔊 குரல் அறிவுரை கேட்க (LISTEN ADVISORY)'}</span>
            </button>

            {/* Action Acknowledgment Button (56px Touch Target - Section 18 Requirement) */}
            <button
              onClick={handleAcknowledge}
              disabled={activeAdvisory?.status === 'ACKNOWLEDGED'}
              className={`w-full h-14 rounded-2xl text-xs font-extrabold text-white flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer ${
                activeAdvisory?.status === 'ACKNOWLEDGED'
                  ? 'bg-emerald-700 cursor-default'
                  : guidedDemoStep === 2 || guidedDemoStep === 3
                  ? 'bg-pink-600 hover:bg-pink-500 demo-highlight'
                  : 'bg-pink-600 hover:bg-pink-500'
              }`}
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>
                {activeAdvisory?.status === 'ACKNOWLEDGED'
                  ? '✓ சரிபார்க்கப்பட்டது (ACKNOWLEDGED)'
                  : '✓ சரிபார்த்தேன் (CONFIRM ACTION)'}
              </span>
            </button>
          </div>

          {/* Simple Weather Decision Card (Section 9 Requirement) */}
          <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2">
              <span className="text-xs font-extrabold text-stone-800 uppercase flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-500" />
                {language === 'ta' ? 'வானிலை தகவல்' : 'WEATHER SUMMARY'}
              </span>
              <SourceBadge source="WEATHER" />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-300 flex items-center gap-2">
                <Sun className="w-5 h-5 text-amber-600" />
                <span>☀️ இன்று வெயில் (Sunny)</span>
              </div>

              <div className="bg-blue-50 p-3 rounded-2xl border border-blue-300 flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-blue-600" />
                <span>🌧️ நாளை மழை வாய்ப்பு (Rain)</span>
              </div>
            </div>

            <div className="bg-stone-100 p-3 rounded-2xl text-xs font-bold text-stone-900 border border-stone-300">
              💡 <strong>PANNAI ADVICE:</strong> "மழை வர வாய்ப்பு இருப்பதால், இன்று குளத்தின் நீர்மட்டத்தை சரிபார்க்கவும்."
            </div>
          </div>

          {/* Artemia Opportunity Decision Card (Section 10 Requirement) */}
          <div className="bg-pink-50 border-2 border-pink-400 rounded-3xl p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-pink-900 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-pink-700" />
                🦐 புதிய Artemia வாய்ப்பு (NEW OPPORTUNITY)
              </span>
              <SourceBadge source="MODEL" />
            </div>

            <p className="text-xs font-bold text-stone-900 leading-relaxed">
              "குளம் TTK-042-ல் Artemia வளர்ப்பதற்கு ஏற்ற நிலை உள்ளது. நேரில் சரிபார்த்த பிறகு முடிவு செய்யவும்."
            </p>

            <button
              onClick={() => navigate('/earth')}
              className="w-full h-12 bg-pink-600 hover:bg-pink-500 text-white font-extrabold rounded-2xl text-xs shadow-sm cursor-pointer"
            >
              வாய்ப்பை சரிபார்க்க (CHECK OPPORTUNITY) →
            </button>
          </div>

          {/* Zero Manual Entry Smart Device Connection Status (Section 7 Requirement) */}
          <div className="bg-white border-2 border-stone-300 p-4 rounded-3xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-stone-800 uppercase flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-blue-600" />
                📡 DEVICE STATUS (சாதன இணைப்பு)
              </span>
              <span className="text-xs font-extrabold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                CONNECTED ✓
              </span>
            </div>

            <p className="text-xs font-bold text-stone-900">
              "PANNAI தற்போது உங்கள் குளத்தை தானாகவே கண்காணித்து வருகிறது. எந்தத் தகவலையும் கைமுறையாக உள்ளிடத் தேவையில்லை."
            </p>
          </div>

          {/* Level 3 Technical Data Toggle (Section 25 & 26 Requirement) */}
          <div className="bg-stone-50 border border-stone-300 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowLevel3Data(!showLevel3Data)}
              className="w-full px-4 py-3 font-extrabold text-xs text-stone-800 flex items-center justify-between hover:bg-stone-200 cursor-pointer"
            >
              <span>{language === 'ta' ? 'அறிவியல் அளவீடுகள் பார்க்க (WHY? / VIEW DATA)' : 'VIEW TECHNICAL DATA (LEVEL 3)'}</span>
              {showLevel3Data ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showLevel3Data && (
              <div className="p-4 space-y-2 text-xs border-t border-stone-200 text-stone-900 bg-white">
                <div className="flex justify-between">
                  <span>தண்ணீரின் உப்பு அளவு (Salinity):</span>
                  <span className="font-extrabold">92 ppt</span>
                </div>
                <div className="flex justify-between">
                  <span>வெப்பநிலை (Temperature):</span>
                  <span className="font-extrabold">32.4°C</span>
                </div>
                <div className="flex justify-between">
                  <span>நீர்மட்டம் (Depth):</span>
                  <span className="font-extrabold">18 cm</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PONDS */}
      {activeTab === 'ponds' && (
        <div className="space-y-3 font-mono text-xs">
          <span className="text-xs font-extrabold text-[#11100F] uppercase block border-b-2 border-stone-200 pb-1">
            {language === 'ta' ? 'என் குளங்கள் (4)' : 'MY PONDS (4)'}
          </span>

          {ponds.slice(0, 4).map((pond) => (
            <div key={pond.id} className="bg-white border-2 border-stone-300 rounded-2xl p-4 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-sm text-[#11100F]">{pond.id}</span>
                <span className="px-2.5 py-0.5 text-xs font-extrabold bg-emerald-100 text-emerald-900 rounded-full border border-emerald-400">
                  {pond.status}
                </span>
              </div>
              <p className="text-xs font-bold text-stone-900">{pond.recommendedActionTamil}</p>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INCOME */}
      {activeTab === 'income' && (
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-300 space-y-3 text-xs font-mono text-[#11100F] shadow-xs">
          <div className="flex justify-between items-center border-b-2 border-stone-200 pb-2">
            <span className="font-extrabold text-sm">
              {language === 'ta' ? 'வருமான அறிக்கை' : 'PAYOUT SUMMARY'}
            </span>
            <SourceBadge source="DEMO" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-stone-700">அறுவடை எடை:</span>
              <span className="font-extrabold">18.4 kg Artemia</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-bold text-stone-700">சரிபார்க்கப்பட்ட தரம்:</span>
              <span className="font-extrabold text-emerald-800">GRADE A</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-pink-700 pt-2 border-t border-stone-300">
              <span>{language === 'ta' ? 'மொத்த வருமானம்:' : 'Total Earnings:'}</span>
              <span>₹{farmerIncome.totalIncomeINR.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: HELP */}
      {activeTab === 'help' && (
        <div className="bg-white p-5 rounded-3xl border-2 border-stone-300 space-y-4 text-xs font-mono text-[#11100F]">
          <div className="border-b-2 border-stone-200 pb-2">
            <span className="font-extrabold text-base block">
              {language === 'ta' ? 'உதவி மையம் (HELP & SUPPORT)' : 'HELP & SUPPORT'}
            </span>
          </div>

          <a
            href="tel:+919443210890"
            className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-400 font-extrabold text-emerald-950 flex items-center justify-between block"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="font-extrabold text-sm block">📞 நேரடி தொலைபேசி உதவி</span>
                <span className="text-xs text-stone-700 font-bold">Dr. K. Arumugam (+91 94432 10890)</span>
              </div>
            </div>
          </a>
        </div>
      )}

      {/* Bottom Phone Drawer Navigation (4 Tabs) */}
      <div className="pt-2 border-t-2 border-stone-200 grid grid-cols-4 gap-1 text-center font-mono font-extrabold">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center space-y-0.5 py-2 rounded-2xl text-xs cursor-pointer ${
            activeTab === 'today' ? 'text-pink-700 bg-pink-100 border-2 border-pink-300' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>{language === 'ta' ? 'இன்று' : 'TODAY'}</span>
        </button>

        <button
          onClick={() => setActiveTab('ponds')}
          className={`flex flex-col items-center space-y-0.5 py-2 rounded-2xl text-xs cursor-pointer ${
            activeTab === 'ponds' ? 'text-pink-700 bg-pink-100 border-2 border-pink-300' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>{language === 'ta' ? 'குளங்கள்' : 'PONDS'}</span>
        </button>

        <button
          onClick={() => setActiveTab('income')}
          className={`flex flex-col items-center space-y-0.5 py-2 rounded-2xl text-xs cursor-pointer ${
            activeTab === 'income' ? 'text-pink-700 bg-pink-100 border-2 border-pink-300' : 'text-stone-700 hover:bg-stone-100'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          <span>{language === 'ta' ? 'வருமானம்' : 'INCOME'}</span>
        </button>

        <button
          onClick={() => setIsHelpModalOpen(true)}
          className="flex flex-col items-center space-y-0.5 py-2 rounded-2xl text-xs text-amber-700 hover:bg-amber-50 cursor-pointer"
        >
          <HelpCircle className="w-4 h-4" />
          <span>{language === 'ta' ? 'உதவி' : 'HELP'}</span>
        </button>
      </div>
    </div>
  );
};
