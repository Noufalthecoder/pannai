import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../../store/AppContext';
import {
  Globe,
  BarChart3,
  UserCheck,
  Activity,
  Award,
  ShoppingBag,
  TrendingUp,
  ShieldAlert,
  Play,
  Languages,
  Menu,
  X,
} from 'lucide-react';

interface NavItem {
  to: string;
  labelEn: string;
  labelTa: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface NavGroup {
  titleEn: string;
  titleTa: string;
  items: NavItem[];
}

import { Logo } from '../ui/Logo';

export const Sidebar: React.FC = () => {
  const { language, setLanguage, startGuidedDemo } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const groups: NavGroup[] = [
    {
      titleEn: 'INTELLIGENCE',
      titleTa: 'அறிவுத்தளம்',
      items: [
        { to: '/earth', labelEn: 'Earth', labelTa: 'புவி தரவு (Earth)', icon: Globe },
        { to: '/analytics', labelEn: 'Analytics', labelTa: 'பகுப்பாய்வு', icon: BarChart3 },
      ],
    },
    {
      titleEn: 'FARM',
      titleTa: 'பண்ணை',
      items: [
        { to: '/farmer', labelEn: 'Farmer', labelTa: 'உற்பத்தியாளர்', icon: UserCheck },
        { to: '/operations', labelEn: 'Operations', labelTa: 'செயல்பாடுகள்', icon: Activity },
      ],
    },
    {
      titleEn: 'VALUE',
      titleTa: 'மதிப்பு',
      items: [
        { to: '/certified', labelEn: 'Certified', labelTa: 'சான்றிதழ்', icon: Award },
        { to: '/market', labelEn: 'Market', labelTa: 'சந்தை', icon: ShoppingBag },
      ],
    },
    {
      titleEn: 'VENTURE',
      titleTa: 'நிறுவனம்',
      items: [
        { to: '/business-model', labelEn: 'Business', labelTa: 'வணிக மாதிரி', icon: TrendingUp },
        { to: '/moat', labelEn: 'Moat', labelTa: 'defensibility (Moat)', icon: ShieldAlert },
      ],
    },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#11100F] text-[#F7F3ED] border-r border-stone-800/80 select-none">
      {/* Brand Header with Old 3x3 Grid Logo */}
      <div className="p-4 border-b border-stone-800/80">
        <NavLink to="/" onClick={() => setMobileOpen(false)} className="block group">
          <Logo variant="full" size="md" theme="dark" />
        </NavLink>

        {/* Language Toggle */}
        <div className="mt-4 flex items-center justify-between bg-stone-900/90 rounded-md p-1 border border-stone-800 text-xs">
          <span className="flex items-center gap-1.5 px-2 text-stone-400 text-[11px]">
            <Languages className="w-3.5 h-3.5 text-stone-400" />
            <span>Lang</span>
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                language === 'en'
                  ? 'bg-pink-600 text-white font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('ta')}
              className={`px-2.5 py-0.5 rounded text-[11px] font-tamil font-medium transition-all ${
                language === 'ta'
                  ? 'bg-pink-600 text-white font-semibold shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              தமிழ்
            </button>
          </div>
        </div>
      </div>


      {/* Navigation Groups */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {groups.map((group) => (
          <div key={group.titleEn}>
            <h3 className="px-3 text-[10px] font-mono tracking-widest text-stone-400 uppercase font-semibold mb-2">
              {language === 'ta' ? group.titleTa : group.titleEn}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all relative ${
                        isActive
                          ? 'bg-stone-800/90 text-white font-semibold shadow-inner'
                          : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900/60'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-pink-500 rounded-r" />
                        )}
                        <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-stone-500'}`} />
                        <span className={language === 'ta' ? 'font-tamil' : ''}>
                          {language === 'ta' ? item.labelTa : item.labelEn}
                        </span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer: Demo Mode & Guided Tour */}
      <div className="p-4 border-t border-stone-800/80 bg-stone-950/60 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-wider text-pink-400 font-semibold uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
            DEMO MODE
          </span>
          <span className="text-[9px] font-mono text-stone-400">v2.4 REAL TIME</span>
        </div>

        <button
          onClick={() => {
            setMobileOpen(false);
            startGuidedDemo();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-semibold tracking-wider transition-all shadow-md active:scale-98 cursor-pointer"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>START GUIDED DEMO</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile/Tablet Top Navigation Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#11100F] text-white flex items-center justify-between px-4 z-40 border-b border-stone-800 shadow-md">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-heading font-bold text-lg text-white">PANNAI</span>
          <span className="font-tamil text-xs text-stone-400">பண்ணை</span>
        </NavLink>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 border border-stone-700 text-stone-200 text-xs font-mono font-bold rounded-lg cursor-pointer transition-colors"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-4 h-4 text-pink-400" /> : <Menu className="w-4 h-4 text-pink-400" />}
          <span>{mobileOpen ? 'CLOSE' : 'MENU (வழிசெலுத்தல்)'}</span>
        </button>
      </div>

      {/* Desktop Fixed Left Sidebar */}
      <aside className="hidden lg:block fixed top-0 left-0 bottom-0 w-[240px] z-30 shadow-2xl">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative w-[260px] max-w-[85vw] h-full shadow-2xl z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
