import React from 'react';
import { useApp } from '../../store/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="pointer-events-auto bg-[#FFFCF7] border border-[#E6DFD5] text-[#14100E] p-4 rounded-xl shadow-lg flex items-start space-x-3"
          >
            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-[#C42A6B] shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-[#3E8B7A] shrink-0 mt-0.5" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-[#D9A441] shrink-0 mt-0.5" />}
            
            <div className="flex-1 text-sm font-medium pr-2">{toast.message}</div>
            
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#69615B] hover:text-[#14100E] transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
