import React from 'react';
import { X, ShieldCheck, CheckCircle2, Truck, ArrowRight, UserCheck, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { MarketOrder } from '../../types';
import { SourceBadge } from '../ui/SourceBadge';


interface OrderDetailModalProps {
  order: MarketOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus?: (orderId: string, status: MarketOrder['status']) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onUpdateStatus,
}) => {
  const navigate = useNavigate();

  if (!isOpen || !order) return null;

  const stages = [
    { label: 'ORDER PLACED', active: order.stagesCompleted.orderPlaced },
    { label: 'BUYER CONFIRMED', active: order.stagesCompleted.buyerConfirmed },
    { label: 'BATCH VERIFIED', active: order.stagesCompleted.batchVerified },
    { label: 'PACKED', active: order.stagesCompleted.packed },
    { label: 'DISPATCHED', active: order.stagesCompleted.dispatched },
    { label: 'IN TRANSIT', active: order.stagesCompleted.inTransit, current: order.status === 'IN_TRANSIT' },
    { label: 'DELIVERED', active: order.stagesCompleted.delivered, current: order.status === 'DELIVERED' },
    { label: 'PAYOUT RELEASED', active: order.stagesCompleted.payoutReleased, current: order.status === 'COMPLETED' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#11100F]/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-6 text-[#11100F] max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-xl text-[#11100F]">ORDER {order.id}</span>
              <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-pink-100 text-pink-800 rounded border border-pink-300">
                {order.status.replace('_', ' ')}
              </span>
              <SourceBadge source="DEMO" />
            </div>
            <p className="text-xs text-stone-500 font-mono mt-0.5">
              PLACED ON {order.orderDate} · BATCH {order.batchId}
            </p>
          </div>

          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Visual 8-Stage Order Timeline (Section 9 Requirement) */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-stone-700 uppercase block">
            VISUAL FULFILLMENT TIMELINE
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            {stages.map((st, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center gap-2 font-bold ${
                  st.current
                    ? 'bg-pink-600 text-white border-pink-600 shadow-sm animate-pulse'
                    : st.active
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-stone-50 text-stone-400 border-stone-200'
                }`}
              >
                {st.active ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> : <span className="w-3.5 h-3.5 rounded-full border border-stone-400 shrink-0" />}
                <span className="truncate">{st.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Producer + Buyer Verification Badges (Section 11 Requirement) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200 space-y-1">
            <span className="text-[10px] text-stone-500 font-bold block uppercase flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-pink-600" /> PRODUCER VERIFICATION
            </span>
            <p className="font-extrabold text-[#11100F]">{order.producerName}</p>
            <p className="text-[11px] text-emerald-700 font-bold">✓ PANNAI VERIFIED SALT PRODUCER ({order.originPondId})</p>
          </div>

          <div className="bg-[#FAF8F5] p-3.5 rounded-xl border border-stone-200 space-y-1">
            <span className="text-[10px] text-stone-500 font-bold block uppercase flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> BUYER VERIFICATION
            </span>
            <p className="font-extrabold text-[#11100F]">{order.buyerCompany}</p>
            <p className="text-[11px] text-emerald-700 font-bold">✓ PANNAI BUYER VERIFIED ({order.buyerLocation})</p>
          </div>
        </div>

        {/* Order Specifications */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono bg-stone-50 p-4 rounded-xl border border-stone-200">
          <div>
            <span className="text-[10px] text-stone-500 block">PRODUCT</span>
            <span className="font-extrabold text-[#11100F]">{order.productName}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block">QUANTITY</span>
            <span className="font-extrabold text-pink-600">{order.quantityKg} kg</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block">QUALITY GRADE</span>
            <span className="font-extrabold text-emerald-800">{order.grade}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-500 block">HATCHABILITY</span>
            <span className="font-extrabold text-emerald-800">86.4% <SourceBadge source="LAB" /></span>
          </div>
        </div>

        {/* Simple Logistics Panel (Section 12 Requirement) */}
        <div className="bg-blue-50/90 border border-blue-200 p-4 rounded-xl text-xs font-mono space-y-2">
          <span className="font-bold text-blue-900 uppercase block flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-blue-700" /> LOGISTICS & FULFILLMENT STATUS
          </span>
          <div className="grid grid-cols-3 gap-2 text-stone-900">
            <div>
              <span className="text-[10px] text-stone-500 block">DISPATCHED</span>
              <span className="font-bold">{order.dispatchedDate || '19 AUG 2026'}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">CURRENT STATUS</span>
              <span className="font-bold text-blue-800">{order.status.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-[10px] text-stone-500 block">EXPECTED DELIVERY</span>
              <span className="font-bold">{order.expectedDeliveryDate || '21 AUG 2026'}</span>
            </div>
          </div>
        </div>

        {/* Transparent Farmer Payout Breakdown (Section 13 Requirement) */}
        <div className="bg-[#FAF8F5] border-2 border-stone-300 p-4 rounded-xl text-xs font-mono space-y-2 text-[#11100F]">
          <div className="flex justify-between items-center border-b border-stone-200 pb-2">
            <span className="font-extrabold flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-pink-600" /> FINANCIAL SETTLEMENT BREAKDOWN
            </span>
            <SourceBadge source="DEMO" />
          </div>

          <div className="space-y-1 text-[#11100F]">
            <div className="flex justify-between">
              <span>Gross Order Value:</span>
              <span className="font-bold">₹{order.totalValueINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>PANNAI Platform Fee (3%):</span>
              <span>- ₹{order.platformFeeINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Cold-Chain Logistics Fee:</span>
              <span>- ₹{order.logisticsFeeINR.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-pink-700 pt-2 border-t border-stone-300">
              <span>Farmer Net Payout:</span>
              <span>₹{order.netPayoutINR.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-3 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              navigate(`/passport/${order.batchId}`);
            }}
            className="px-4 py-2.5 bg-[#FAF8F5] hover:bg-stone-200 text-stone-800 font-mono text-xs font-bold rounded-xl border border-stone-300 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>VIEW DIGITAL PASSPORT</span>
          </button>

          {onUpdateStatus && order.status !== 'COMPLETED' && (
            <button
              onClick={() => {
                const next = order.status === 'IN_TRANSIT' ? 'DELIVERED' : 'COMPLETED';
                onUpdateStatus(order.id, next);
                onClose();
              }}
              className="px-6 py-2.5 bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <span>PROGRESS TO {order.status === 'IN_TRANSIT' ? 'DELIVERED' : 'COMPLETED PAYOUT'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
