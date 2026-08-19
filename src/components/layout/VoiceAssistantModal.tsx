import React, { useState } from 'react';
import { X, Mic, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../store/AppContext';

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, language } = useApp();

  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [activeAnswer, setActiveAnswer] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  if (!isVoiceModalOpen) return null;

  const sampleQuestions = [
    {
      qTa: 'என் குளத்தில் என்ன நிலை?',
      qEn: 'What is my pond condition?',
      aTa: 'வணக்கம் முத்து! குளம் TTK-042 நல்ல நிலையில் உள்ளது. வெள்ளிக்கிழமை நேரில் ஒருமுறை சரிபார்க்கவும்.',
      aEn: 'Hello Muthu! Pond TTK-042 is in good condition. Check it in person this Friday.',
    },
    {
      qTa: 'இன்று மழை வருமா?',
      qEn: 'Will it rain today?',
      aTa: 'இன்று மழைக்கு வாய்ப்பில்லை. வெயில் அதிகமாக இருக்கும். ஆவியாதல் நன்றாக நடக்கும்.',
      aEn: 'No rain forecast today. Sunny weather will promote healthy evaporation.',
    },
    {
      qTa: 'எந்த குளத்தை பார்க்க வேண்டும்?',
      qEn: 'Which pond needs checking?',
      aTa: 'குளம் 04 (TTK-044) குளத்தை இன்று சரிபார்க்கவும். உப்பு அளவு மாறியுள்ளது.',
      aEn: 'Pond 04 needs checking today as salinity has changed.',
    },
    {
      qTa: 'ஆர்டீமியா அறுவடை செய்யலாமா?',
      qEn: 'Can I harvest Artemia?',
      aTa: 'குளம் TTK-015 அறுவடைக்கு தயாராக உள்ளது. உடனடியாக அறுவடை தொடங்கலாம்.',
      aEn: 'Pond TTK-015 is ready for Artemia cyst harvest.',
    },
  ];

  const handleAskQuestion = (qTa: string, qEn: string, aTa: string, aEn: string) => {
    const textQuestion = language === 'ta' ? qTa : qEn;
    const textAnswer = language === 'ta' ? aTa : aEn;
    setActiveQuestion(textQuestion);
    setActiveAnswer(textAnswer);

    // Speak answer in Tamil / English
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(textAnswer);
        utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
        utterance.rate = 0.9;
        utterance.onstart = () => setIsPlayingAudio(true);
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlayingAudio(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-pink-500 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-[#11100F]">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-pink-700">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-[#11100F]">
                {language === 'ta' ? '🎙️ குரல் உதவி (Ask PANNAI)' : '🎙️ Voice Assistant (Ask PANNAI)'}
              </h3>
              <p className="text-xs font-mono font-bold text-stone-600">
                {language === 'ta' ? 'எளிய தமிழில் கேள்வி கேட்கவும்' : 'Ask everyday questions in simple Tamil'}
              </p>
            </div>
          </div>

          <button onClick={() => setIsVoiceModalOpen(false)} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Question Selector List */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-extrabold text-stone-700 uppercase block">
            {language === 'ta' ? 'கேள்வியைத் தேர்ந்தெடுக்கவும்:' : 'SELECT A QUESTION:'}
          </span>

          <div className="space-y-2 font-mono text-xs">
            {sampleQuestions.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleAskQuestion(sq.qTa, sq.qEn, sq.aTa, sq.aEn)}
                className="w-full text-left p-3.5 rounded-2xl bg-[#FAF8F5] hover:bg-pink-50 border-2 border-stone-200 hover:border-pink-300 font-extrabold text-[#11100F] transition-all flex items-center justify-between cursor-pointer"
              >
                <span>🗣️ "{language === 'ta' ? sq.qTa : sq.qEn}"</span>
                <Sparkles className="w-4 h-4 text-pink-600 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Answer Display */}
        {activeAnswer && (
          <div className="bg-pink-50 border-2 border-pink-400 p-4 rounded-2xl space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between border-b border-pink-200 pb-1.5">
              <span className="font-extrabold text-pink-900 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-pink-700" />
                {language === 'ta' ? 'பண்ணை உதவி பதில்:' : 'PANNAI ANSWER:'}
              </span>
              {isPlayingAudio && (
                <span className="flex items-center gap-1 text-[11px] font-bold text-pink-700 animate-pulse">
                  <Volume2 className="w-3.5 h-3.5" />
                  {language === 'ta' ? 'பேசுகிறது...' : 'Speaking...'}
                </span>
              )}
            </div>

            {activeQuestion && (
              <p className="text-xs font-mono text-pink-800 font-bold">
                🗣️ "{activeQuestion}"
              </p>
            )}

            <p className="text-sm font-heading font-extrabold text-[#11100F] leading-relaxed">
              "{activeAnswer}"
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
