import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import { StatusBadge, DemoBadge } from '../ui/Badge';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  History,
  MapPin,
  Thermometer,
  Droplets,
  Ruler,
  Satellite,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const PondDrawer: React.FC = () => {
  const { selectedPond, sendAdvisory, guidedDemoStep, nextGuidedDemoStep } = useApp();
  const [showHistory, setShowHistory] = useState(false);
  const navigate = useNavigate();

  if (!selectedPond) {
    return (
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-6 text-center text-[#69615B] h-full flex flex-col items-center justify-center space-y-3">
        <MapPin className="w-8 h-8 text-[#8FBFB4]" />
        <p className="font-heading font-semibold text-sm text-[#14100E]">No Pond Selected</p>
        <p className="text-xs">Click any salt pan polygon on the map to inspect satellite telemetry and field observations.</p>
      </div>
    );
  }

  const handleSendAdvisory = () => {
    sendAdvisory(selectedPond.id);
    if (guidedDemoStep === 1) {
      nextGuidedDemoStep();
      navigate('/farmer');
    }
  };

  return (
    <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-sm space-y-5 relative h-full flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="font-heading font-bold text-xl text-[#14100E]">POND {selectedPond.id}</h2>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B] flex items-center space-x-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#3E8B7A]" />
              <span>{selectedPond.village}, {selectedPond.district}</span>
            </p>
          </div>
          <StatusBadge status={selectedPond.status} />
        </div>

        {/* Satellite Guardrail Badge */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#F7F3EC] border border-[#E6DFD5] rounded-full text-[11px] text-[#69615B]">
          <Satellite className="w-3.5 h-3.5 text-[#3E8B7A]" />
          <span>Satellite-assisted · Field-validated</span>
        </div>
      </div>

      {/* Model Confidence & Area */}
      <div className="grid grid-cols-2 gap-3 bg-[#F7F3EC] p-3.5 rounded-xl border border-[#E6DFD5]">
        <div>
          <span className="text-[11px] text-[#69615B] uppercase font-mono tracking-wider">AREA</span>
          <p className="font-heading font-bold text-lg text-[#14100E]">{selectedPond.areaAcres} acres</p>
        </div>
        <div>
          <span className="text-[11px] text-[#69615B] uppercase font-mono tracking-wider">MODEL CONFIDENCE</span>
          <p className="font-heading font-bold text-lg text-[#C42A6B]">
            {selectedPond.modelConfidencePercent}% <span className="text-xs font-normal text-[#69615B]">· DEMO</span>
          </p>
        </div>
      </div>

      {/* Telemetry Details */}
      <div className="space-y-2.5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#69615B]">ENVIRONMENTAL TELEMETRY</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5] flex items-center space-x-2.5">
            <Droplets className="w-4 h-4 text-[#3E8B7A]" />
            <div>
              <span className="text-[10px] text-[#69615B] block">SALINITY</span>
              <span className="font-bold text-[#14100E]">{selectedPond.salinityPpt} ppt</span>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5] flex items-center space-x-2.5">
            <Thermometer className="w-4 h-4 text-[#DE6A45]" />
            <div>
              <span className="text-[10px] text-[#69615B] block">TEMP</span>
              <span className="font-bold text-[#14100E]">{selectedPond.temperatureC} °C</span>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5] flex items-center space-x-2.5">
            <Ruler className="w-4 h-4 text-[#D9A441]" />
            <div>
              <span className="text-[10px] text-[#69615B] block">DEPTH</span>
              <span className="font-bold text-[#14100E]">{selectedPond.waterDepthCm} cm</span>
            </div>
          </div>
          <div className="bg-white p-2.5 rounded-lg border border-[#E6DFD5] flex items-center space-x-2.5">
            <Calendar className="w-4 h-4 text-[#8FBFB4]" />
            <div>
              <span className="text-[10px] text-[#69615B] block">FIELD CHECK</span>
              <span className="font-semibold text-[#14100E]">{selectedPond.lastFieldCheck}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Block */}
      <div className="bg-[#FAF0F4] border border-[#F3CBDC] p-4 rounded-xl space-y-2">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-[#C42A6B]" />
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-[#C42A6B]">
            RECOMMENDED ACTION
          </span>
        </div>
        <p className="font-heading font-bold text-base text-[#14100E]">
          {selectedPond.recommendedAction}
        </p>
        <p className="text-xs text-[#69615B] leading-relaxed">
          Potential Artemia cyst production window approaching. Maintain current water depth and verify salinity parameters during Friday field visit.
        </p>
        <div className="text-xs font-tamil text-[#C42A6B] bg-white/80 p-2 rounded-lg border border-[#F3CBDC]">
          {selectedPond.recommendedActionTamil}
        </div>
      </div>

      {/* History Drawer Toggle */}
      <button
        onClick={() => setShowHistory(!showHistory)}
        className="w-full text-xs font-medium text-[#69615B] hover:text-[#14100E] flex items-center justify-center space-x-1 py-1"
      >
        <History className="w-3.5 h-3.5" />
        <span>{showHistory ? 'Hide Pond History' : 'View Pond Historical Timeline'}</span>
      </button>

      {/* History View */}
      {showHistory && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-[#F7F3EC] p-3 rounded-xl border border-[#E6DFD5] space-y-2 text-xs"
        >
          <span className="font-bold text-[11px] text-[#14100E] block border-b border-[#E6DFD5] pb-1">
            POND {selectedPond.id} TIMELINE
          </span>
          <div className="space-y-2 text-[11px]">
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3E8B7A] mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-[#14100E]">Satellite Observation</span> — 2 days ago (Sentinel-2)
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D9A441] mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-[#14100E]">Field Salinity Check</span> — Yesterday (92 ppt verified)
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C42A6B] mt-1 shrink-0" />
              <div>
                <span className="font-semibold text-[#14100E]">Advisory Generated</span> — Action: Field Check Friday
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 border-t border-[#E6DFD5]">
        <button
          onClick={handleSendAdvisory}
          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center space-x-2 transition-transform active:scale-98 ${
            guidedDemoStep === 1
              ? 'bg-[#C42A6B] hover:bg-[#A8225A] pulse-highlight'
              : 'bg-[#C42A6B] hover:bg-[#A8225A]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>SEND FARMER ADVISORY</span>
        </button>
      </div>
    </div>
  );
};
