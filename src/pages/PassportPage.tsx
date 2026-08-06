import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { BatchPassportView } from '../components/certified/BatchPassportView';
import { Logo } from '../components/ui/Logo';
import { ArrowLeft } from 'lucide-react';

export const PassportPage: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { getPassportByBatchId, passports } = useApp();

  const passport = (batchId && getPassportByBatchId(batchId)) || passports[0];

  return (
    <div className="min-h-screen bg-[#F7F3EC] py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <NavLink
            to="/certified"
            className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#69615B] hover:text-[#14100E] bg-[#FFFCF7] px-3 py-2 rounded-xl border border-[#E6DFD5]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to PANNAI Console</span>
          </NavLink>

          <Logo variant="full" size="sm" />
        </div>

        {passport ? (
          <BatchPassportView passport={passport} />
        ) : (
          <div className="bg-[#FFFCF7] p-8 text-center text-[#69615B] rounded-3xl border border-[#E6DFD5]">
            Passport Identifier Not Found.
          </div>
        )}

        <div className="text-center text-xs text-[#69615B] pt-4 border-t border-[#E6DFD5]">
          PANNAI Digital Traceability System · Public Verification Portal
        </div>
      </div>
    </div>
  );
};
