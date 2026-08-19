import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { SourceBadge } from '../ui/SourceBadge';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  History,
  MapPin,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';


export const PondDrawer: React.FC = () => {
  const { selectedPond, sendAdvisory, guidedDemoStep, nextGuidedDemoStep } = useApp();
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  if (!selectedPond) {
    return (
      <div className="bg-white border border-stone-200/90 rounded-2xl p-6 text-center text-stone-500 h-full flex flex-col items-center justify-center space-y-3">
        <MapPin className="w-8 h-8 text-stone-400" />
        <p className="font-heading font-semibold text-sm text-[#11100F]">No Pond Selected</p>
        <p className="text-xs max-w-xs">Select any salt pan on the map to inspect satellite telemetry and field status.</p>
      </div>
    );
  }

  const handleSendAdvisory = () => {
    sendAdvisory(selectedPond.id);
    if (guidedDemoStep === 1 || guidedDemoStep === 2) {
      nextGuidedDemoStep();
      navigate('/farmer');
    }
  };

  const getStatusBadge = () => {
    switch (selectedPond.status) {
      case 'CANDIDATE':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'FIELD CHECK':
        return 'bg-rose-50 text-rose-900 border-rose-300';
      case 'SUITABLE':
        return 'bg-emerald-50 text-emerald-900 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-800 border-stone-300';
    }
  };

  return (
    <div className="bg-white border border-stone-200/90 rounded-2xl p-5 shadow-sm space-y-5 relative h-full flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading font-bold text-xl text-[#11100F]">POND {selectedPond.id}</h2>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-500 flex items-center space-x-1 mt-0.5 font-mono">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              <span>{selectedPond.village}, {selectedPond.district}</span>
            </p>
          </div>
          <span className={`px-2.5 py-1 text-[11px] font-mono font-bold uppercase rounded-md border ${getStatusBadge()}`}>
            {selectedPond.status}
          </span>
        </div>
      </div>

      {/* Primary Key Measurements (Section 8 requirement) */}
      <div className="space-y-2">
        <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-semibold">
          PRIMARY MEASUREMENTS
        </span>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* SALINITY */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono">SALINITY</span>
              <SourceBadge source="FIELD" />
            </div>
            <p className="font-bold text-lg text-[#11100F]">{selectedPond.salinityPpt} ppt</p>
          </div>

          {/* TEMPERATURE */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono">TEMP</span>
              <SourceBadge source="SATELLITE" />
            </div>
            <p className="font-bold text-lg text-[#11100F]">{selectedPond.temperatureC}°C</p>
          </div>

          {/* WATER DEPTH */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono">WATER DEPTH</span>
              <SourceBadge source="FIELD" />
            </div>
            <p className="font-bold text-lg text-[#11100F]">{selectedPond.waterDepthCm} cm</p>
          </div>

          {/* MODEL CONFIDENCE */}
          <div className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200/80 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500 font-mono">CONFIDENCE</span>
              <SourceBadge source="MODEL" />
            </div>
            <p className="font-bold text-lg text-purple-700">{selectedPond.modelConfidencePercent}%</p>
          </div>
        </div>
      </div>

      {/* PANNAI RECOMMENDATION (Prioritizing Decisions over Data) */}
      <div className="bg-amber-50/90 border border-amber-200/90 p-4 rounded-xl space-y-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-amber-700" />
          <span className="font-mono font-bold text-xs uppercase tracking-wider text-amber-900">
            PANNAI RECOMMENDATION
          </span>
        </div>
        <p className="font-heading font-bold text-sm text-[#11100F]">
          FIELD CHECK REQUIRED
        </p>
        <p className="text-xs text-amber-900 leading-relaxed">
          "Verify salinity and water depth before proceeding."
        </p>
        <div className="text-xs font-tamil font-medium text-amber-900 bg-white/90 p-2 rounded-lg border border-amber-200">
          {selectedPond.recommendedActionTamil}
        </div>
      </div>

      {/* Historical Timeline Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full text-xs font-mono text-stone-500 hover:text-stone-900 flex items-center justify-center space-x-1 py-1 cursor-pointer"
      >
        <History className="w-3.5 h-3.5" />
        <span>{showHistory ? 'Hide Timeline' : 'View Observation Timeline'}</span>
      </button>

      {/* Historical Timeline */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[#FAF8F5] p-3 rounded-xl border border-stone-200 text-xs space-y-2 font-mono"
        >
          <span className="font-bold text-[11px] text-[#11100F] block border-b border-stone-200 pb-1">
            TIMELINE HISTORY · {selectedPond.id}
          </span>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center justify-between">
              <span>Sentinel-2 Satellite Scan</span>
              <SourceBadge source="SATELLITE" timestamp="2d ago" />
            </div>
            <div className="flex items-center justify-between">
              <span>Ground Salinity Refractometer</span>
              <SourceBadge source="FIELD" timestamp="Yesterday" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Primary Action Button */}
      <div className="pt-2 border-t border-stone-200">
        <button
          onClick={handleSendAdvisory}
          className={`w-full py-3 px-4 rounded-xl text-xs font-mono font-bold text-white shadow-md flex items-center justify-center space-x-2 transition-all cursor-pointer ${
            guidedDemoStep === 1 || guidedDemoStep === 2
              ? 'bg-pink-600 hover:bg-pink-500 demo-highlight'
              : 'bg-pink-600 hover:bg-pink-500'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>SEND FARMER ADVISORY</span>
        </button>
      </div>
    </div>
  );
};
