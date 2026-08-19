import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { BatchPassportView } from '../components/certified/BatchPassportView';
import { ArrowLeft } from 'lucide-react';
import { SourceBadge } from '../components/ui/SourceBadge';

export const PassportPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { getPassportByBatchId, passports } = useApp();

  const passport = (batchId && getPassportByBatchId(batchId)) || passports[0];

  return (
    <div className="min-h-screen bg-[#F7F3ED] py-10 px-4 text-[#11100F]">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <NavLink
            to="/certified"
            className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-stone-600 hover:text-[#11100F] bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to PANNAI Console</span>
          </NavLink>

          <div className="flex items-center space-x-2">
            <span className="font-heading font-bold text-lg text-[#11100F]">PANNAI</span>
            <SourceBadge source="LAB" />
          </div>
        </div>

        {passport ? (
          <BatchPassportView passport={passport} />
        ) : (
          <div className="bg-white p-8 text-center text-stone-500 rounded-2xl border border-stone-200">
            Passport Identifier Not Found.
          </div>
        )}

        <div className="text-center text-xs font-mono text-stone-500 pt-4 border-t border-stone-300">
          PANNAI Digital Traceability System · Public Verification Portal
        </div>
      </div>
    </div>
  );
};
