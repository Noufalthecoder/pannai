import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { QCForm } from '../components/certified/QCForm';
import { BatchPassportView } from '../components/certified/BatchPassportView';
import { SourceBadge } from '../components/ui/SourceBadge';
import { ShieldCheck, ExternalLink, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const CertifiedPage: React.FC = () => {
  const { batches, passports, viewMode, language } = useApp();
  const navigate = useNavigate();

  const [activeBatchId, setActiveBatchId] = useState<string>('PN-TUT-260806-018');

  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const activePassport = passports.find((p) => p.batchId === activeBatchId) || passports[0];

  return (
    <div className="space-y-8 max-w-5xl mx-auto text-[#11100F] font-mono select-none">
      {/* Header */}
      <div className="bg-white border-2 border-stone-300 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 border-2 border-emerald-300 flex items-center justify-center text-emerald-800 font-bold">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-extrabold text-xl text-[#11100F]">
                {language === 'ta' ? 'PANNAI சான்றிதழ்' : 'PANNAI CERTIFIED'}
              </h1>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-700 font-bold mt-0.5">
              {language === 'ta'
                ? 'சரிபார்க்கப்பட்ட தர சான்றிதழ் விவரங்கள்'
                : 'Verified Supply Trust Layer · Physical Lab Quality Control'}
            </p>
          </div>
        </div>

        {/* Batch Selector */}
        <select
          value={activeBatchId}
          onChange={(e) => setActiveBatchId(e.target.value)}
          className="px-3.5 py-2 bg-[#FAF8F5] border-2 border-stone-300 rounded-xl text-xs font-mono font-bold text-[#11100F]"
        >
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              Batch {b.id} ({b.pondId}) — {b.isCertified ? 'CERTIFIED' : 'PENDING QC'}
            </option>
          ))}
        </select>
      </div>

      {/* FARMER MODE SIMPLE CERTIFICATION CARD (Section 12 Requirement) */}
      {viewMode === 'FARMER' ? (
        <div className="bg-emerald-50 border-3 border-emerald-500 rounded-3xl p-6 shadow-md space-y-4 text-emerald-950">
          <div className="flex items-center justify-between border-b-2 border-emerald-200 pb-3">
            <span className="font-heading font-extrabold text-2xl flex items-center gap-2 text-emerald-900">
              <CheckCircle2 className="w-7 h-7 text-emerald-700" />
              {language === 'ta' ? '✓ VERIFIED (சான்றளிக்கப்பட்டது)' : '✓ QUALITY VERIFIED'}
            </span>
            <SourceBadge source="LAB" />
          </div>

          <p className="text-sm font-heading font-extrabold leading-relaxed text-stone-900">
            {language === 'ta'
              ? '"இந்த பொருளின் தரம் ஆய்வகத்தில் பரிசோதிக்கப்பட்டு 100% சரிபார்க்கப்பட்டுள்ளது."'
              : '"Product quality has been physical lab-tested and 100% verified."'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-4 rounded-2xl border-2 border-emerald-300">
            <div>
              <span className="text-[10px] text-stone-500 block font-bold">BATCH ID</span>
              <span className="font-extrabold text-[#11100F]">{activeBatch.id}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block font-bold">QUANTITY</span>
              <span className="font-extrabold text-pink-700">{activeBatch.receivedWeightKg} kg</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block font-bold">QUALITY</span>
              <span className="font-extrabold text-emerald-800">GRADE A</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block font-bold">DATE</span>
              <span className="font-extrabold text-stone-900">{activeBatch.createdAt}</span>
            </div>
          </div>
        </div>
      ) : (
        /* OPERATOR MODE DETAILED TRUST SYSTEM (Section 12 Requirement) */
        <div className="space-y-6">
          <div className="bg-white border-2 border-stone-300 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="space-y-1">
              <span className="text-xs font-mono font-extrabold text-pink-700 uppercase">TRUST SYSTEM PROVENANCE</span>
              <h2 className="font-heading font-extrabold text-2xl text-[#11100F]">
                VERIFIED SUPPLY. NOT JUST PREDICTED SUPPLY.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-purple-200 space-y-1">
                <span className="font-bold text-purple-900">MODEL ESTIMATE</span>
                <p className="text-stone-600 font-sans">Remote sensing & satellite algorithms.</p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-amber-200 space-y-1">
                <span className="font-bold text-amber-900">FIELD MEASUREMENT</span>
                <p className="text-stone-600 font-sans">Refractometer salinity & depth by producer.</p>
              </div>

              <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-emerald-200 space-y-1">
                <span className="font-bold text-emerald-900">LAB VERIFIED</span>
                <p className="text-stone-600 font-sans">24-hr lab physical hatchability test.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5">
              <QCForm batch={activeBatch} />
            </div>

            <div className="lg:col-span-7 space-y-4">
              {activePassport ? (
                <div className="space-y-3">
                  <BatchPassportView passport={activePassport} />
                  <div className="text-center pt-2">
                    <button
                      onClick={() => navigate(`/passport/${activePassport.batchId}`)}
                      className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-pink-600 hover:underline cursor-pointer"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Open Standalone Passport Page (/passport/{activePassport.batchId})</span>
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
