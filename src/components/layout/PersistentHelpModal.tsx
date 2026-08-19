import React from 'react';
import { X, PhoneCall, Mic, BookOpen, HelpCircle } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const PersistentHelpModal: React.FC = () => {
  const { isHelpModalOpen, setIsHelpModalOpen, setIsVoiceModalOpen, language } = useApp();

  if (!isHelpModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-amber-500 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 text-[#11100F]">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#11100F]">
                {language === 'ta' ? 'உங்களுக்கு உதவி தேவைப்படுகிறதா?' : 'Do you need help?'}
              </h3>
              <p className="text-xs font-mono font-bold text-stone-600">Thoothukudi Bioeconomy Support Hub</p>
            </div>
          </div>

          <button onClick={() => setIsHelpModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 3 Simple Help Options (Section 21 Requirement) */}
        <div className="space-y-3 font-mono text-xs">
          {/* Option 1: Call Support */}
          <a
            href="tel:+919443210890"
            className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-400 font-extrabold text-emerald-950 flex items-center justify-between transition-all cursor-pointer block"
          >
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <span className="font-heading font-extrabold text-sm block">
                  {language === 'ta' ? '📞 தொலைபேசி உதவி' : '📞 Call Support'}
                </span>
                <span className="text-[11px] text-stone-700 font-bold">Dr. K. Arumugam (+91 94432 10890)</span>
              </div>
            </div>
          </a>

          {/* Option 2: Ask PANNAI Voice */}
          <button
            onClick={() => {
              setIsHelpModalOpen(false);
              setIsVoiceModalOpen(true);
            }}
            className="w-full p-4 rounded-2xl bg-pink-50 hover:bg-pink-100 border-2 border-pink-400 font-extrabold text-pink-950 flex items-center justify-between transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-pink-700 shrink-0" />
              <div>
                <span className="font-heading font-extrabold text-sm block">
                  {language === 'ta' ? '🎙️ குரல் வழிகாட்டல்' : '🎙️ Ask PANNAI Voice'}
                </span>
                <span className="text-[11px] text-stone-700 font-bold">
                  {language === 'ta' ? 'தமிழில் கேள்வி கேட்கலாம்' : 'Ask everyday questions in simple Tamil'}
                </span>
              </div>
            </div>
          </button>

          {/* Option 3: How it works */}
          <div className="p-4 rounded-2xl bg-stone-50 border-2 border-stone-300 space-y-2">
            <span className="font-heading font-extrabold text-sm text-[#11100F] flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-700" />
              {language === 'ta' ? '📖 எப்படி செயல்படுகிறது?' : '📖 How it works'}
            </span>
            <div className="space-y-1 text-[11px] text-stone-900 font-bold leading-relaxed">
              <p>1. PANNAI உங்கள் குளத்தின் நிலையை தானாகவே கண்காணிக்கிறது.</p>
              <p>2. பச்சை 🟢 நல்ல நிலை, சிவப்பு 🔴 நேரில் சரிபார்க்க வேண்டும்.</p>
              <p>3. தரம் சரிபார்க்கப்பட்டதும் வாங்குபவர் மூலம் பணம் நேரடியாக கிடைக்கும்.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
