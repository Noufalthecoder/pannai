import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import { Home, Globe, ShoppingBag, Activity, HelpCircle } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const { language, setIsHelpModalOpen } = useApp();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#11100F] text-white border-t border-stone-800 z-40 flex items-center justify-around px-2 font-mono select-none">
      <NavLink
        to="/farmer"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-extrabold cursor-pointer transition-colors ${
            isActive ? 'text-pink-400 bg-stone-900' : 'text-stone-400 hover:text-white'
          }`
        }
      >
        <Home className="w-5 h-5 mb-0.5" />
        <span>{language === 'ta' ? 'முகப்பு' : 'HOME'}</span>
      </NavLink>

      <NavLink
        to="/earth"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-extrabold cursor-pointer transition-colors ${
            isActive ? 'text-pink-400 bg-stone-900' : 'text-stone-400 hover:text-white'
          }`
        }
      >
        <Globe className="w-5 h-5 mb-0.5" />
        <span>{language === 'ta' ? 'பண்ணை' : 'FARM'}</span>
      </NavLink>

      <NavLink
        to="/market"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-extrabold cursor-pointer transition-colors ${
            isActive ? 'text-pink-400 bg-stone-900' : 'text-stone-400 hover:text-white'
          }`
        }
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span>{language === 'ta' ? 'சந்தை' : 'MARKET'}</span>
      </NavLink>

      <NavLink
        to="/operations"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-extrabold cursor-pointer transition-colors ${
            isActive ? 'text-pink-400 bg-stone-900' : 'text-stone-400 hover:text-white'
          }`
        }
      >
        <Activity className="w-5 h-5 mb-0.5" />
        <span>{language === 'ta' ? 'ஆர்டர்' : 'ORDERS'}</span>
      </NavLink>

      <button
        onClick={() => setIsHelpModalOpen(true)}
        className="flex flex-col items-center justify-center h-full w-full py-1 text-[11px] font-extrabold text-amber-400 hover:text-amber-300 cursor-pointer"
      >
        <HelpCircle className="w-5 h-5 mb-0.5" />
        <span>{language === 'ta' ? 'உதவி' : 'HELP'}</span>
      </button>
    </div>
  );
};
