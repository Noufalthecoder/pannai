import React, { useState } from 'react';
import { X, MapPin, CheckCircle2, ArrowRight, Cpu } from 'lucide-react';
import { useApp } from '../../store/AppContext';

interface PondRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PondRegisterModal: React.FC<PondRegisterModalProps> = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [step, setStep] = useState<number>(1);
  const [farmLocation, setFarmLocation] = useState<string>('Tharuvaikulam, Thoothukudi');
  const [pondName, setPondName] = useState<string>('Tharuvaikulam South Compartment 46');
  const [areaAcres, setAreaAcres] = useState<number>(2.2);
  const [deviceId, setDeviceId] = useState<string>('PN-SD-046');

  if (!isOpen) return null;

  const handleFinishRegistration = () => {
    addToast(`POND TTK-046 ✓ REGISTERED (Associated with Muthu Swamy)`, 'success');
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 text-[#11100F]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-pink-600 uppercase font-semibold block">
              FARMER ONBOARDING WIZARD
            </span>
            <h3 className="font-heading font-extrabold text-lg text-[#11100F]">REGISTER YOUR POND</h3>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Step Progress Bar */}
        <div className="grid grid-cols-5 gap-1 font-mono text-[10px]">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s <= step ? 'bg-pink-600' : 'bg-stone-200'
              }`}
            />
          ))}
        </div>

        {/* Step 1: Locate your farm */}
        {step === 1 && (
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block uppercase">STEP 1: LOCATE YOUR FARM</label>
              <p className="text-stone-500 font-sans text-[11px]">Enter your salt-pan cluster or village location.</p>
            </div>
            <div className="relative">
              <MapPin className="w-4 h-4 text-pink-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={farmLocation}
                onChange={(e) => setFarmLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
              />
            </div>
            <div className="bg-pink-50 p-3 rounded-xl border border-pink-200 text-pink-900 text-[11px]">
              ✓ GPS Lat: 8.9124, Lng: 78.1685 detected (Thoothukudi Coastal Belt)
            </div>
          </div>
        )}

        {/* Step 2: Select or draw boundary */}
        {step === 2 && (
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block uppercase">STEP 2: CONFIRM POND BOUNDARY</label>
              <p className="text-stone-500 font-sans text-[11px]">Satellite GIS boundary auto-detected from Sentinel-2 tile.</p>
            </div>
            <div className="bg-stone-900 text-white p-4 rounded-xl border border-stone-800 space-y-2 text-center">
              <div className="w-full h-28 bg-stone-800 rounded-lg flex items-center justify-center border border-dashed border-stone-600">
                <span className="text-pink-400 font-bold">🗺️ BOUNDARY POLYGON READY (4 COORDINATES)</span>
              </div>
              <p className="text-[10px] text-stone-400 font-mono">Pond Area: {areaAcres} Acres</p>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Pond Details */}
        {step === 3 && (
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block uppercase">STEP 3: POND IDENTIFICATION</label>
              <p className="text-stone-500 font-sans text-[11px]">Assign a name and verify ownership records.</p>
            </div>
            <div>
              <label className="text-[10px] text-stone-500 block mb-1">POND COMPARTMENT NAME</label>
              <input
                type="text"
                value={pondName}
                onChange={(e) => setPondName(e.target.value)}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="text-[10px] text-stone-500 block mb-1">SURFACE AREA (ACRES)</label>
              <input
                type="number"
                step="0.1"
                value={areaAcres}
                onChange={(e) => setAreaAcres(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
              />
            </div>
          </div>
        )}

        {/* Step 4: Connect PANNAI Smart Device */}
        {step === 4 && (
          <div className="space-y-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="font-bold text-stone-700 block uppercase">STEP 4: CONNECT PANNAI SMART PAN DEVICE</label>
              <p className="text-stone-500 font-sans text-[11px]">Pair your physical IoT probe serial number.</p>
            </div>
            <div className="relative">
              <Cpu className="w-4 h-4 text-blue-600 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={deviceId}
                onChange={(e) => setDeviceId(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-stone-300 rounded-xl font-bold"
              />
            </div>
            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Smart Pan Device PN-SD-046 probe detected · Live Telemetry Ready</span>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 5 && (
          <div className="space-y-4 text-xs font-mono text-center py-2">
            <div className="w-12 h-12 rounded-full bg-emerald-100 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-700">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="font-heading font-extrabold text-lg text-[#11100F]">POND TTK-046 ✓ REGISTERED</h4>
              <p className="text-stone-600 font-sans">
                Successfully associated with your farmer account. Monitoring active.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
          {step > 1 && step < 5 ? (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="px-4 py-2 bg-[#FAF8F5] hover:bg-stone-200 text-stone-700 font-mono text-xs font-bold rounded-xl border border-stone-300 cursor-pointer"
            >
              BACK
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep((s) => s + 1)}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishRegistration}
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded-xl shadow-md cursor-pointer"
            >
              START MONITORING MY POND
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
