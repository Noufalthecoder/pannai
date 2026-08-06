import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { QCForm } from '../components/certified/QCForm';
import { BatchPassportView } from '../components/certified/BatchPassportView';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { DemoBadge } from '../components/ui/Badge';
import { useNavigate } from 'react-router-dom';

export const CertifiedPage: React.FC = () => {
  const { batches, passports } = useApp();
  const navigate = useNavigate();

  const [activeBatchId, setActiveBatchId] = useState<string>('PN-TUT-260806-018');

  const activeBatch = batches.find((b) => b.id === activeBatchId) || batches[0];
  const activePassport = passports.find((p) => p.batchId === activeBatchId) || passports[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-[#FFFCF7] border border-[#E6DFD5] rounded-2xl p-5 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#FAF0F4] border border-[#F3CBDC] flex items-center justify-center text-[#C42A6B]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-heading font-bold text-xl text-[#14100E]">PANNAI CERTIFIED</h1>
              <DemoBadge />
            </div>
            <p className="text-xs text-[#69615B]">
              Physical Lab Quality Control · Hatchability Certification · Digital Batch Passport Generation
            </p>
          </div>
        </div>

        {/* Batch Selector */}
        <select
          value={activeBatchId}
          onChange={(e) => setActiveBatchId(e.target.value)}
          className="px-3.5 py-2 bg-[#F7F3EC] border border-[#E6DFD5] rounded-xl text-xs font-bold text-[#14100E]"
        >
          {batches.map((b) => (
            <option key={b.id} value={b.id}>
              Batch {b.id} ({b.pondId}) — {b.isCertified ? 'CERTIFIED' : 'PENDING QC'}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: QC Form */}
        <div className="lg:col-span-5">
          <QCForm batch={activeBatch} />
        </div>

        {/* Right Column: Issued Passport */}
        <div className="lg:col-span-7 space-y-4">
          {activePassport ? (
            <div className="space-y-3">
              <BatchPassportView passport={activePassport} />

              <div className="text-center">
                <button
                  onClick={() => navigate(`/passport/${activePassport.batchId}`)}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-[#C42A6B] hover:underline"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Standalone Public Passport Page (/passport/{activePassport.batchId})</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-[#FFFCF7] p-8 text-center text-[#69615B] rounded-2xl border border-[#E6DFD5]">
              No certified passport generated yet for this batch. Complete QC to issue passport.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
