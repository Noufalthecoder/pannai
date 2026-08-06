import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
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

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F3EC] flex flex-col text-[#14100E]">
      <GuidedDemoBar />
      <Navbar />
      <main className="flex-1 p-4 sm:p-6 max-w-[1360px] w-full mx-auto">
        <Outlet />
      </main>
      <GuidedDemoModal />
      <ToastContainer />
    </div>
  );
};

export const AppRouter: React.FC = () => {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Passport Route (No Navbar / Standalone layout) */}
          <Route path="/passport/:batchId" element={<PassportPage />} />

          {/* Standard Console Application Layout */}
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
