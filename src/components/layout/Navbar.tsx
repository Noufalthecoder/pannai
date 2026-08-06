import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../ui/Logo';
import { DemoBadge } from '../ui/Badge';
import { useApp } from '../../store/AppContext';
import { Globe, Smartphone, Package, ShieldCheck, ShoppingBag, BarChart3, Play, Lightbulb, TrendingUp } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { startGuidedDemo, guidedDemoStep } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/earth', label: 'Earth', icon: Globe, highlight: true },
    { to: '/farmer', label: 'Farmer', icon: Smartphone },
    { to: '/operations', label: 'Operations', icon: Package },
    { to: '/certified', label: 'Certified', icon: ShieldCheck },
    { to: '/market', label: 'Market', icon: ShoppingBag },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/moat', label: 'Moat', icon: Lightbulb },
    { to: '/business-model', label: 'Business', icon: TrendingUp },
  ];

  return (
    <header className="bg-[#FFFCF7] border-b border-[#E6DFD5] sticky top-0 z-30 shadow-2xs">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Brand Logo */}
        <NavLink to="/" className="flex items-center">
          <Logo variant="full" size="md" />
        </NavLink>

        {/* Center Product Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.to);
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#F7F3EC] text-[#C42A6B] border border-[#E6DFD5]'
                    : 'text-[#69615B] hover:text-[#14100E] hover:bg-[#F7F3EC]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C42A6B]' : 'text-[#69615B]'}`} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          <DemoBadge label="DEMO MODE" />

          {guidedDemoStep === null && (
            <button
              onClick={startGuidedDemo}
              className="flex items-center space-x-2 bg-[#C42A6B] hover:bg-[#A8225A] text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-transform active:scale-95 shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>START GUIDED DEMO</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="lg:hidden flex items-center overflow-x-auto px-4 py-2 border-t border-[#E6DFD5] bg-[#F7F3EC] space-x-1 scrollbar-none">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname.startsWith(link.to);
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                isActive ? 'bg-[#FFFCF7] text-[#C42A6B] font-bold shadow-2xs' : 'text-[#69615B]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{link.label}</span>
            </NavLink>
          );
        })}
      </div>
    </header>
  );
};
