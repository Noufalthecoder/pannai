import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { GuidedDemoBar } from '../components/layout/GuidedDemoBar';
import { GuidedDemoModal } from '../components/demo/GuidedDemoModal';
import { ToastContainer } from '../components/ui/ToastContainer';
import { AppProvider } from '../store/AppContext';

import { LandingPage } from '../pages/LandingPage';
import { EarthPage } from '../pages/EarthPage';
import { FarmerPage } from '../pages/FarmerPage';
import { OperationsPage } from '../pages/OperationsPage';
import { CertifiedPage } from '../pages/CertifiedPage';
import { MarketPage } from '../pages/MarketPage';
import { PassportPage } from '../pages/PassportPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { MoatPage } from '../pages/MoatPage';
import { BusinessModelPage } from '../pages/BusinessModelPage';

import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../store/AppContext';
import { Languages, Play, ArrowRight } from 'lucide-react';

import { ModeToggleBar } from '../components/layout/ModeToggleBar';
import { MobileBottomNav } from '../components/layout/MobileBottomNav';
import { VoiceAssistantModal } from '../components/layout/VoiceAssistantModal';
import { PersistentHelpModal } from '../components/layout/PersistentHelpModal';

import { Logo } from '../components/ui/Logo';

const AppLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, startGuidedDemo } = useApp();

  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <div className="min-h-screen bg-[#F7F3ED] flex flex-col text-[#11100F]">
        <GuidedDemoBar />
        {/* Sleek Landing Page Header */}
        <header className="bg-[#11100F] text-white border-b border-stone-800/80 px-4 sm:px-8 py-3 sticky top-0 z-30 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <Logo variant="full" size="md" theme="dark" />
          </Link>


          <div className="flex items-center gap-2 sm:gap-4">
            {/* Language Toggle */}
            <div className="flex items-center gap-1 bg-stone-900 rounded-lg p-1 border border-stone-800 text-xs">
              <Languages className="w-3.5 h-3.5 text-stone-400 ml-1.5 hidden sm:inline-block" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-medium transition-all ${
                  language === 'en' ? 'bg-pink-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ta')}
                className={`px-2 py-0.5 rounded text-[11px] font-tamil font-medium transition-all ${
                  language === 'ta' ? 'bg-pink-600 text-white font-semibold' : 'text-stone-400 hover:text-white'
                }`}
              >
                தமிழ்
              </button>
            </div>

            {/* Guided Demo & Launch Console Buttons */}
            <button
              onClick={() => {
                startGuidedDemo();
                navigate('/earth');
              }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-white font-mono text-xs font-semibold border border-stone-700 transition-all cursor-pointer"
            >
              <Play className="w-3 h-3 text-pink-400 fill-current" />
              <span>GUIDED DEMO</span>
            </button>

            <button
              onClick={() => navigate('/earth')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-pink-600 hover:bg-pink-500 text-white font-mono text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <span>LAUNCH PLATFORM</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </main>
        <GuidedDemoModal />
        <ToastContainer />
        <VoiceAssistantModal />
        <PersistentHelpModal />
      </div>
    );
  }

  // Console Layout with Fixed Left Sidebar & Mode Toggle Bar
  return (
    <div className="min-h-screen bg-[#F7F3ED] flex text-[#11100F] pb-16 lg:pb-0">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 lg:ml-[240px] pt-14 lg:pt-0">
        <ModeToggleBar />
        <GuidedDemoBar />
        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-[1600px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
      <MobileBottomNav />
      <GuidedDemoModal />
      <ToastContainer />
      <VoiceAssistantModal />
      <PersistentHelpModal />
    </div>
  );
};




export const AppRouter: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Passport Route (Standalone layout) */}
          <Route path="/passport/:batchId" element={<PassportPage />} />

          {/* Standard Operating System Application Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="earth" element={<EarthPage />} />
            <Route path="farmer" element={<FarmerPage />} />
            <Route path="operations" element={<OperationsPage />} />
            <Route path="certified" element={<CertifiedPage />} />
            <Route path="market" element={<MarketPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="moat" element={<MoatPage />} />
            <Route path="business-model" element={<BusinessModelPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
};

