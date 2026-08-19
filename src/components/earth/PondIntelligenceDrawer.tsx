import React, { useState } from 'react';
import type { Pond } from '../../types';
import { SourceBadge } from '../ui/SourceBadge';
import { ArtemiaEngine } from './ArtemiaEngine';
import { Cpu, ChevronDown, ChevronUp, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useApp } from '../../store/AppContext';
import { useNavigate } from 'react-router-dom';

interface PondIntelligenceDrawerProps {
  pond: Pond | null;
  onClose: () => void;
}

export const PondIntelligenceDrawer: React.FC<PondIntelligenceDrawerProps> = ({ pond, onClose }) => {
  const { sendAdvisory, guidedDemoStep, nextGuidedDemoStep, viewMode, language } = useApp();
  const navigate = useNavigate();

  const [whyExpanded, setWhyExpanded] = useState<boolean>(false);
  const [viewDetailsExpanded, setViewDetailsExpanded] = useState<boolean>(false);

  if (!pond) return null;

  const isMyPond = pond.isMyPond ?? (pond.id === 'TTK-042' || pond.id === 'TTK-001' || pond.id === 'TTK-007' || pond.id === 'TTK-015' || pond.id === 'TTK-023');
  const deviceId = pond.deviceId || `PN-SD-${pond.id.split('-')[1] || '042'}`;

  const handleSendAdvisoryAction = () => {
    sendAdvisory(pond.id);
    if (guidedDemoStep === 1) {
      nextGuidedDemoStep();
    }
  };

  return (
    <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-2xl space-y-5 text-[#11100F] relative overflow-y-auto max-h-[85vh] scrollbar-thin select-none">
      {/* Header & Ownership Badge */}
      <div className="flex items-start justify-between border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            {isMyPond && (
              <span className="px-2.5 py-0.5 text-xs font-mono font-extrabold bg-pink-600 text-white rounded-md shadow-xs flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> {language === 'ta' ? 'என் குளம் ✓' : 'MY POND ✓'}
              </span>
            )}
            <span className="font-heading font-extrabold text-xl text-[#11100F]">POND {pond.id}</span>
          </div>

          <p className="text-xs text-stone-600 font-mono flex items-center gap-1 mt-1 font-bold">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            {pond.village}, {pond.district} · {pond.areaAcres} Acres
          </p>
        </div>

        <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
          ✕
        </button>
      </div>

      {/* LEVEL 1 & LEVEL 2: FARMER MODE SIMPLE STATUS & ACTION (Section 1 & 25 Requirement) */}
      {viewMode === 'FARMER' ? (
        <div className="space-y-4 font-mono">
          {/* LEVEL 1: SIMPLE STATUS ANSWER */}
          <div className="bg-emerald-50 border-2 border-emerald-400 p-4 rounded-2xl flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-emerald-800 font-extrabold block uppercase">
                {language === 'ta' ? 'குளத்தின் தற்போதைய நிலை' : 'POND CONDITION'}
              </span>
              <h3 className="font-heading font-extrabold text-xl text-emerald-950 flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600 animate-pulse" />
                {language === 'ta' ? '🟢 நல்ல நிலை (GOOD)' : '🟢 GOOD CONDITION'}
              </h3>
            </div>
            <SourceBadge source="FIELD" />
          </div>

          {/* LEVEL 2: WHAT SHOULD I DO? (PROMINENT RECOMMENDATION) */}
          <div className="bg-rose-50 border-2 border-rose-400 p-4 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-rose-800 uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                {language === 'ta' ? 'இன்று செய்ய வேண்டிய நடவடிக்கை' : 'NEXT ACTION NEEDED'}
              </span>
              <SourceBadge source="MODEL" />
            </div>

            <p className="font-heading font-extrabold text-base text-rose-950">
              "{pond.recommendedActionTamil}"
            </p>

            <button
              onClick={handleSendAdvisoryAction}
              className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-extrabold rounded-xl shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{language === 'ta' ? 'அறிவுறுத்தல் அனுப்ப (SEND ADVISORY)' : 'SEND ADVISORY TO FARMER'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* LEVEL 3 TOGGLE: HIDE RAW DATA BEHIND [ WHY? / ஏன்? ] (Section 26 Requirement) */}
          <div className="border-2 border-stone-300 rounded-2xl overflow-hidden bg-stone-50">
            <button
              onClick={() => setWhyExpanded(!whyExpanded)}
              className="w-full px-4 py-3 bg-white font-mono text-xs font-extrabold text-[#11100F] flex items-center justify-between hover:bg-stone-100 cursor-pointer"
            >
              <span>{language === 'ta' ? 'ஏன் இந்த பரிந்துரை? (WHY THIS ACTION?)' : 'WHY THIS ACTION?'}</span>
              {whyExpanded ? <ChevronUp className="w-4 h-4 text-stone-500" /> : <ChevronDown className="w-4 h-4 text-stone-500" />}
            </button>

            {whyExpanded && (
              <div className="p-4 space-y-2 font-mono text-xs border-t border-stone-200 text-stone-900 bg-white">
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>தண்ணீரின் உப்பு அளவு ({pond.salinityPpt} ppt) உகந்த வரம்பை எட்டியுள்ளது.</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>வானிலை: 32.4°C அதிக ஆவியாதல் எதிர்பார்க்கப்படுகிறது.</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>சாதன இணைப்பு ({deviceId}) நேரலையில் உள்ளது.</span>
                </div>
              </div>
            )}
          </div>

          {/* LEVEL 3 TECHNICAL DATA TOGGLE */}
          <div className="border border-stone-200 rounded-2xl overflow-hidden bg-stone-50">
            <button
              onClick={() => setViewDetailsExpanded(!viewDetailsExpanded)}
              className="w-full px-4 py-2.5 bg-white font-mono text-xs font-bold text-stone-700 flex items-center justify-between hover:bg-stone-100 cursor-pointer"
            >
              <span>{language === 'ta' ? 'அளவீட்டு விபரங்கள் (VIEW DATA DETAILS)' : 'VIEW DATA DETAILS'}</span>
              {viewDetailsExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {viewDetailsExpanded && (
              <div className="p-4 space-y-2 text-xs font-mono bg-white border-t border-stone-200">
                <div className="flex justify-between">
                  <span>தண்ணீர் உப்பு அளவு (Salinity):</span>
                  <span className="font-extrabold">{pond.salinityPpt} ppt</span>
                </div>
                <div className="flex justify-between">
                  <span>வெப்பநிலை (Temperature):</span>
                  <span className="font-extrabold">{pond.temperatureC}°C</span>
                </div>
                <div className="flex justify-between">
                  <span>நீர்மட்டம் (Depth):</span>
                  <span className="font-extrabold">{pond.waterDepthCm} cm</span>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* OPERATOR MODE FULL TECHNICAL TELEMETRY (Section 11 Requirement) */
        <div className="space-y-4 font-mono">
          <div className="bg-[#FAF8F5] border border-stone-300 p-3.5 rounded-xl text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-bold uppercase flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-blue-600" /> SMART PAN DEVICE CHAIN
              </span>
              <span className="flex items-center gap-1 font-extrabold text-emerald-800 text-[11px]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> CONNECTED
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-200 text-[#11100F]">
              <span>FARMER: <strong>{pond.owner}</strong></span>
              <span>DEVICE ID: <strong className="text-blue-700">{deviceId}</strong></span>
              <span className="text-stone-500 text-[11px]">Last Sync: <strong>2 min ago</strong></span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold block">SALINITY</span>
              <span className="font-extrabold text-base text-[#11100F]">{pond.salinityPpt} ppt</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold block">TEMPERATURE</span>
              <span className="font-extrabold text-base text-[#11100F]">{pond.temperatureC}°C</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold block">WATER DEPTH</span>
              <span className="font-extrabold text-base text-[#11100F]">{pond.waterDepthCm} cm</span>
            </div>
            <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-500 font-bold block">AI CONFIDENCE</span>
              <span className="font-extrabold text-base text-pink-700">{pond.modelConfidencePercent}%</span>
            </div>
          </div>

          <ArtemiaEngine
            salinityPpt={pond.salinityPpt}
            temperatureC={pond.temperatureC}
            waterDepthCm={pond.waterDepthCm}
            suitabilityScore={pond.modelConfidencePercent}
          />
        </div>
      )}

      {/* Action Footer */}
      <div className="pt-2 border-t border-stone-200 flex justify-between gap-2">
        <button
          onClick={() => navigate('/farmer')}
          className="flex-1 py-3 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-extrabold rounded-2xl shadow-md cursor-pointer"
        >
          {language === 'ta' ? 'விவசாயி கைபேசி வடிவம் பார்க்க →' : 'VIEW FARMER MOBILE UX →'}
        </button>
      </div>
    </div>
  );
};
