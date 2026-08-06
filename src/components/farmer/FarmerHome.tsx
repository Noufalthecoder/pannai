import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { Volume2, CheckCircle2, Home, Layers, IndianRupee, HelpCircle, Globe2 } from 'lucide-react';

export const FarmerHome: React.FC = () => {
  const {
    advisories,
    acknowledgeAdvisory,
    language,
    setLanguage,
    guidedDemoStep,
    nextGuidedDemoStep,
    farmerIncome,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'today' | 'ponds' | 'income' | 'help'>('today');
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

  const activeAdvisory = advisories.find((a) => a.pondId === 'TTK-042') || advisories[0];

  const speakTamilAdvisory = () => {
    if (!('speechSynthesis' in window)) {
      setVoiceError('இந்த சாதனத்தில் தமிழ் குரல் கிடைக்கவில்லை.');
      return;
    }

    try {
      window.speechSynthesis.cancel(); // Stop any active speech

      const textToSpeak = activeAdvisory
        ? `${activeAdvisory.tamilTitle}. ${activeAdvisory.tamilInstruction}. ${activeAdvisory.tamilDetails}`
        : 'வணக்கம். இன்று செய்ய வேண்டியது. வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும்.';

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ta-IN';
      utterance.rate = 0.9;

      utterance.onstart = () => {
        setIsPlayingVoice(true);
        setVoiceError(null);
      };

      utterance.onend = () => {
        setIsPlayingVoice(false);
      };

      utterance.onerror = () => {
        setIsPlayingVoice(false);
        setVoiceError('இந்த சாதனத்தில் தமிழ் குரல் கிடைக்கவில்லை.');
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsPlayingVoice(false);
      setVoiceError('இந்த சாதனத்தில் தமிழ் குரல் கிடைக்கவில்லை.');
    }
  };

  const handleAcknowledge = () => {
    if (activeAdvisory) {
      acknowledgeAdvisory(activeAdvisory.id);
    }
    if (guidedDemoStep === 2) {
      nextGuidedDemoStep();
    }
  };

  return (
    <div className="space-y-4 font-tamil flex flex-col justify-between h-full">
      {/* Top Bar with Language Selector */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E6DFD5]">
        <div>
          <h1 className="text-lg font-bold text-[#14100E]">வணக்கம் 👋</h1>
          <p className="text-xs text-[#69615B]">முத்துசாமி (மன்னார் வளைகுடா)</p>
        </div>

        <button
          onClick={() => setLanguage(language === 'ta' ? 'en' : 'ta')}
          className="flex items-center space-x-1 px-2.5 py-1 bg-[#F7F3EC] border border-[#E6DFD5] rounded-full text-xs font-sans text-[#14100E]"
        >
          <Globe2 className="w-3.5 h-3.5 text-[#3E8B7A]" />
          <span>{language === 'ta' ? 'English' : 'தமிழ்'}</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'today' && (
        <div className="space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#69615B] tracking-wide uppercase">
              {language === 'ta' ? 'இன்று செய்ய வேண்டியது' : 'TODAY\'S ACTION'}
            </span>
            <span className="text-[11px] font-sans text-[#C42A6B] bg-[#FAF0F4] px-2 py-0.5 rounded-full font-bold">
              {activeAdvisory?.status === 'ACKNOWLEDGED' ? 'முடிக்கப்பட்டது' : 'புதிய அறிவிப்பு'}
            </span>
          </div>

          {/* Action Advisory Card */}
          <div className="bg-[#FFFCF7] border-2 border-[#C42A6B] rounded-2xl p-4 shadow-sm space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#14100E]">
                {language === 'ta' ? 'குளம் TTK-042' : 'POND TTK-042'}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 bg-[#FCF4E2] text-[#8C6212] rounded-full border border-[#D9A441]">
                {language === 'ta' ? 'நிலை: நல்ல வாய்ப்பு' : 'Status: Candidate'}
              </span>
            </div>

            {/* Main Instruction */}
            <div className="space-y-1">
              <h2 className="text-base font-bold text-[#C42A6B] leading-snug">
                {language === 'ta'
                  ? activeAdvisory?.tamilInstruction || 'வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும்.'
                  : activeAdvisory?.englishInstruction || 'Field check required this Friday.'}
              </h2>
              <p className="text-xs text-[#69615B] leading-relaxed">
                {language === 'ta'
                  ? activeAdvisory?.tamilDetails || 'தற்போதைய நீர்மட்டத்தை அப்படியே பராமரிக்கவும். கள ஆய்வில் உப்புத்தன்மையை அளவிடவும்.'
                  : activeAdvisory?.englishDetails || 'Maintain current water level (18 cm) and verify salinity threshold.'}
              </p>
            </div>

            {/* Voice Audio Action Button */}
            <div className="pt-2 border-t border-[#F7F3EC] flex flex-col space-y-2">
              <button
                onClick={speakTamilAdvisory}
                className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all ${
                  isPlayingVoice
                    ? 'bg-[#C42A6B] text-white animate-pulse'
                    : 'bg-[#F7F3EC] hover:bg-[#E6DFD5] text-[#14100E] border border-[#E6DFD5]'
                }`}
              >
                <Volume2 className={`w-4 h-4 ${isPlayingVoice ? 'animate-bounce' : 'text-[#C42A6B]'}`} />
                <span>{isPlayingVoice ? 'பேசுகிறது...' : '🔊 கேட்டு அறிய'}</span>
              </button>

              {voiceError && (
                <p className="text-[11px] text-[#DE6A45] font-sans bg-[#FDF0EB] p-2 rounded-lg text-center">
                  {voiceError}
                </p>
              )}
            </div>

            {/* Acknowledgement Action Button */}
            <button
              onClick={handleAcknowledge}
              disabled={activeAdvisory?.status === 'ACKNOWLEDGED'}
              className={`w-full py-3 rounded-xl text-xs font-bold text-white flex items-center justify-center space-x-2 transition-all shadow-xs ${
                activeAdvisory?.status === 'ACKNOWLEDGED'
                  ? 'bg-[#3E8B7A] cursor-default'
                  : guidedDemoStep === 2
                  ? 'bg-[#C42A6B] hover:bg-[#A8225A] pulse-highlight'
                  : 'bg-[#C42A6B] hover:bg-[#A8225A]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {activeAdvisory?.status === 'ACKNOWLEDGED'
                  ? '✓ சரிபார்க்கப்பட்டது (Acknowledged)'
                  : '✓ சரி (Acknowledge)'}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Income Tab */}
      {activeTab === 'income' && (
        <div className="space-y-4 flex-1">
          <span className="text-xs font-bold text-[#69615B] uppercase tracking-wide">
            {language === 'ta' ? 'என் வருமானம்' : 'MY INCOME'}
          </span>

          <div className="bg-[#F7F3EC] p-4 rounded-2xl border border-[#E6DFD5] space-y-3">
            <div className="flex items-center justify-between border-b border-[#E6DFD5] pb-2">
              <span className="text-xs text-[#69615B]">குளம் TTK-042 (அறுவடை)</span>
              <span className="text-xs font-mono font-bold text-[#3E8B7A]">DEMO</span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#69615B]">அறுவடை எடை:</span>
                <span className="font-bold text-[#14100E]">18.4 kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69615B]">தரச் சோதனை:</span>
                <span className="font-bold text-[#C42A6B]">GRADE A (86.4% Hatchability)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#69615B]">விற்பனை நிலை:</span>
                <span className="font-bold text-[#3E8B7A]">
                  {farmerIncome.status === 'PAYMENT_RECEIVED' ? 'பணம் உறுதிப்படுத்தப்பட்டது' : 'விற்பனை உறுதிப்படுத்தப்பட்டது'}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#E6DFD5] flex items-center justify-between">
              <span className="text-xs font-bold text-[#14100E]">மொத்த தொகை:</span>
              <span className="text-lg font-bold text-[#C42A6B]">
                ₹{farmerIncome.totalIncomeINR.toLocaleString('en-IN')}{' '}
                <span className="text-[10px] text-[#69615B] font-mono">DEMO</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Phone Navigation Bar */}
      <div className="pt-3 border-t border-[#E6DFD5] grid grid-cols-4 gap-1 text-center font-sans">
        <button
          onClick={() => setActiveTab('today')}
          className={`flex flex-col items-center space-y-0.5 py-1.5 rounded-lg text-[11px] font-semibold ${
            activeTab === 'today' ? 'text-[#C42A6B] bg-[#FAF0F4]' : 'text-[#69615B]'
          }`}
        >
          <Home className="w-4 h-4" />
          <span>இன்று</span>
        </button>

        <button
          onClick={() => setActiveTab('ponds')}
          className={`flex flex-col items-center space-y-0.5 py-1.5 rounded-lg text-[11px] font-semibold ${
            activeTab === 'ponds' ? 'text-[#C42A6B] bg-[#FAF0F4]' : 'text-[#69615B]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>குளங்கள்</span>
        </button>

        <button
          onClick={() => setActiveTab('income')}
          className={`flex flex-col items-center space-y-0.5 py-1.5 rounded-lg text-[11px] font-semibold ${
            activeTab === 'income' ? 'text-[#C42A6B] bg-[#FAF0F4]' : 'text-[#69615B]'
          }`}
        >
          <IndianRupee className="w-4 h-4" />
          <span>வருமானம்</span>
        </button>

        <button
          onClick={() => setActiveTab('help')}
          className={`flex flex-col items-center space-y-0.5 py-1.5 rounded-lg text-[11px] font-semibold ${
            activeTab === 'help' ? 'text-[#C42A6B] bg-[#FAF0F4]' : 'text-[#69615B]'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>உதவி</span>
        </button>
      </div>
    </div>
  );
};
