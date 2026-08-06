import React, { createContext, useContext, useState } from 'react';
import type {
  Pond,
  Advisory,
  Batch,
  BatchPassport,
  MarketLot,
  BuyerReservation,
  FarmerIncomeRecord,
  GuidedDemoStep,
  QCTest,
} from '../types';
import {
  SEEDED_PONDS,
  INITIAL_ADVISORY,
  INITIAL_BATCH,
  INITIAL_PASSPORT,
  INITIAL_MARKET_LOTS,
  INITIAL_FARMER_INCOME,
} from '../data/demoData';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  ponds: Pond[];
  selectedPond: Pond | null;
  setSelectedPondId: (id: string | null) => void;
  advisories: Advisory[];
  sendAdvisory: (pondId: string) => void;
  acknowledgeAdvisory: (advisoryId: string) => void;
  
  batches: Batch[];
  addHarvestAndCreateBatch: (pondId: string, weightKg: number, photoUrl?: string, fieldNotes?: string) => Batch;
  updateBatchStage: (batchId: string, nextStage: Batch['currentStage']) => void;
  recordQCAndCertify: (batchId: string, hatchability: number, moisture: number, technician: string) => { batch: Batch; passport: BatchPassport };
  
  passports: BatchPassport[];
  getPassportByBatchId: (batchId: string) => BatchPassport | undefined;
  
  marketLots: MarketLot[];
  publishMarketLot: (batchId: string, pricePerKgINR: number) => MarketLot;
  
  reservations: BuyerReservation[];
  reserveMarketLot: (lotId: string, buyerName: string, buyerCompany: string, buyerType: BuyerReservation['buyerType'], quantityKg: number) => BuyerReservation;
  
  farmerIncome: FarmerIncomeRecord;
  confirmPaymentToFarmer: (amountINR: number) => void;
  
  guidedDemoStep: GuidedDemoStep;
  setGuidedDemoStep: (step: GuidedDemoStep) => void;
  startGuidedDemo: () => void;
  nextGuidedDemoStep: () => void;
  resetGuidedDemo: () => void;
  
  language: 'ta' | 'en';
  setLanguage: (lang: 'ta' | 'en') => void;
  
  toasts: Toast[];
  addToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ponds] = useState<Pond[]>(SEEDED_PONDS);
  const [selectedPondId, setSelectedPondIdState] = useState<string | null>('TTK-042');
  const [advisories, setAdvisories] = useState<Advisory[]>([INITIAL_ADVISORY]);
  const [batches, setBatches] = useState<Batch[]>([INITIAL_BATCH]);
  const [passports, setPassports] = useState<BatchPassport[]>([INITIAL_PASSPORT]);
  const [marketLots, setMarketLots] = useState<MarketLot[]>(INITIAL_MARKET_LOTS);
  const [reservations, setReservations] = useState<BuyerReservation[]>([]);
  const [farmerIncome, setFarmerIncome] = useState<FarmerIncomeRecord>(INITIAL_FARMER_INCOME);
  const [guidedDemoStep, setGuidedDemoStep] = useState<GuidedDemoStep>(null);
  const [language, setLanguage] = useState<'ta' | 'en'>('ta');
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const selectedPond = ponds.find((p) => p.id === selectedPondId) || null;

  const setSelectedPondId = (id: string | null) => {
    setSelectedPondIdState(id);
  };

  // Advisory Operations
  const sendAdvisory = (pondId: string) => {
    const targetPond = ponds.find((p) => p.id === pondId);
    if (!targetPond) return;

    const newAdvisory: Advisory = {
      id: `ADV-${pondId}-${Date.now().toString().slice(-4)}`,
      pondId,
      date: new Date().toISOString().split('T')[0],
      englishTitle: `Action Advisory: ${pondId}`,
      englishInstruction: targetPond.recommendedAction,
      englishDetails: 'Maintain water level and verify salinity threshold during field visit.',
      tamilTitle: `செயல் ஆலோசனை: ${pondId}`,
      tamilInstruction: targetPond.recommendedActionTamil,
      tamilDetails: 'தற்போதைய நீர்மட்டத்தை அப்படியே பராமரிக்கவும். கள ஆய்வில் உப்புத்தன்மையை அளவிடவும்.',
      status: 'SENT',
      sentAt: new Date().toISOString(),
      isDemo: true,
    };

    setAdvisories((prev) => [newAdvisory, ...prev]);
    addToast(`Advisory sent to producer ${targetPond.owner} (${pondId})`);
  };

  const acknowledgeAdvisory = (advisoryId: string) => {
    setAdvisories((prev) =>
      prev.map((a) => (a.id === advisoryId ? { ...a, status: 'ACKNOWLEDGED' as const, acknowledgedAt: new Date().toISOString() } : a))
    );
    addToast('அறிவுறுத்தல் பெறப்பட்டது (Advisory Acknowledged)', 'info');
  };

  // Harvest & Batch Operations
  const addHarvestAndCreateBatch = (pondId: string, weightKg: number): Batch => {
    const targetPond = ponds.find((p) => p.id === pondId);
    const batchId = `PN-TUT-${new Date().toISOString().slice(2, 10).replace(/-/g, '')}-${Math.floor(10 + Math.random() * 89)}`;
    const harvestId = `HARV-${pondId}-${Date.now().toString().slice(-4)}`;

    const newBatch: Batch = {
      id: batchId,
      harvestId,
      pondId,
      producerName: targetPond?.owner || 'Muthu Swamy',
      receivedWeightKg: weightKg,
      processedWeightKg: Number((weightKg * 0.88).toFixed(1)),
      currentStage: 'RECEIVED',
      stageTimestamps: {
        RECEIVED: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        CLEANING: null,
        SEPARATION: null,
        DEHYDRATION: null,
        DRYING: null,
        QC: null,
        CERTIFIED: null,
      },
      isCertified: false,
      createdAt: new Date().toISOString().split('T')[0],
      isDemo: true,
    };

    setBatches((prev) => [newBatch, ...prev]);
    addToast(`Harvest Received: ${weightKg} kg · Batch ${batchId} Created`);
    return newBatch;
  };

  const updateBatchStage = (batchId: string, nextStage: Batch['currentStage']) => {
    setBatches((prev) =>
      prev.map((b) => {
        if (b.id !== batchId) return b;
        return {
          ...b,
          currentStage: nextStage,
          stageTimestamps: {
            ...b.stageTimestamps,
            [nextStage]: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        };
      })
    );
    addToast(`Batch ${batchId} progressed to ${nextStage}`);
  };

  // QC & Digital Passport Operations
  const recordQCAndCertify = (batchId: string, hatchability: number, moisture: number, technician: string) => {
    const grade = hatchability >= 80 && moisture <= 8.0 ? 'GRADE A' : 'GRADE B';
    const targetBatch = batches.find((b) => b.id === batchId) || INITIAL_BATCH;
    const targetPond = ponds.find((p) => p.id === targetBatch.pondId) || SEEDED_PONDS[0];

    const qcTest: QCTest = {
      id: `QC-${batchId}`,
      batchId,
      physicalHatchabilityPercent: hatchability,
      moisturePercent: moisture,
      imagePurityPercent: 94.2,
      testDate: new Date().toISOString().split('T')[0],
      labTechnician: technician,
      passed: true,
      notes: `Lab physical test recorded. Hatchability: ${hatchability}%. Moisture: ${moisture}%.`,
      isDemo: true,
    };

    const passport: BatchPassport = {
      id: `PASSPORT-${batchId}`,
      batchId,
      grade,
      productName: `PANNAI Artemia Cysts (${grade === 'GRADE A' ? 'Premium Hatchery Grade' : 'Standard Grade'})`,
      origin: `${targetPond.village}, ${targetPond.district}, Tamil Nadu, India`,
      pondId: targetPond.id,
      harvestDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      hatchabilityPercent: hatchability,
      moisturePercent: moisture,
      imagePurityPercent: 94.2,
      weightKg: targetBatch.processedWeightKg || targetBatch.receivedWeightKg,
      qrCodeUrl: `${window.location.origin}/passport/${batchId}`,
      blockchainVerificationHash: `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 10)}`,
      issuedAt: new Date().toISOString(),
      certifier: 'PANNAI Quality Lab — Thoothukudi Bio-Hub',
      isDemo: true,
    };

    const updatedBatch: Batch = {
      ...targetBatch,
      currentStage: 'CERTIFIED',
      grade,
      qcTest,
      isCertified: true,
      passportId: passport.id,
      stageTimestamps: {
        ...targetBatch.stageTimestamps,
        QC: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        CERTIFIED: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    };

    setBatches((prev) => prev.map((b) => (b.id === batchId ? updatedBatch : b)));
    setPassports((prev) => [passport, ...prev.filter((p) => p.batchId !== batchId)]);
    addToast(`QC Certified: ${grade} Digital Passport Issued!`);

    return { batch: updatedBatch, passport };
  };

  const getPassportByBatchId = (batchId: string) => {
    return passports.find((p) => p.batchId === batchId);
  };

  // B2B Marketplace Operations
  const publishMarketLot = (batchId: string, pricePerKgINR: number): MarketLot => {
    const passport = getPassportByBatchId(batchId) || INITIAL_PASSPORT;

    const newLot: MarketLot = {
      id: `LOT-${batchId.slice(-3)}`,
      batchId,
      title: `PANNAI A${Math.floor(passport.hatchabilityPercent)} — Artemia Cysts`,
      grade: passport.grade,
      quantityKg: passport.weightKg,
      origin: passport.origin,
      harvestDate: passport.harvestDate,
      hatchabilityPercent: passport.hatchabilityPercent,
      moisturePercent: passport.moisturePercent,
      pricePerKgINR,
      status: 'AVAILABLE',
      sellerName: 'PANNAI Bioeconomy Operations (Thoothukudi Cluster)',
      passportUrl: `/passport/${batchId}`,
      isDemo: true,
    };

    setMarketLots((prev) => [newLot, ...prev.filter((l) => l.batchId !== batchId)]);
    addToast(`Lot ${newLot.id} published to B2B Marketplace!`);
    return newLot;
  };

  const reserveMarketLot = (
    lotId: string,
    buyerName: string,
    buyerCompany: string,
    buyerType: BuyerReservation['buyerType'],
    quantityKg: number
  ) => {
    const targetLot = marketLots.find((l) => l.id === lotId) || marketLots[0];

    const newReservation: BuyerReservation = {
      id: `RES-${Date.now().toString().slice(-5)}`,
      lotId,
      batchId: targetLot.batchId,
      buyerName,
      buyerCompany,
      buyerType,
      quantityKg,
      totalAmountINR: quantityKg * targetLot.pricePerKgINR,
      reservedAt: new Date().toISOString(),
      status: 'RESERVED',
      isDemo: true,
    };

    setMarketLots((prev) => prev.map((l) => (l.id === lotId ? { ...l, status: 'RESERVED' as const } : l)));
    setReservations((prev) => [newReservation, ...prev]);
    addToast(`Reservation Confirmed for ${buyerCompany} (${quantityKg} kg)`);

    return newReservation;
  };

  // Farmer Payment Confirmation
  const confirmPaymentToFarmer = (amountINR: number) => {
    setFarmerIncome((prev) => ({
      ...prev,
      totalIncomeINR: amountINR,
      status: 'PAYMENT_RECEIVED',
    }));
    addToast(`பணம் உறுதிப்படுத்தப்பட்டது: ₹${amountINR.toLocaleString('en-IN')} (Payment Recorded)`, 'success');
  };

  // Guided Demo Engine
  const startGuidedDemo = () => {
    setGuidedDemoStep(1);
    setSelectedPondIdState('TTK-042');
    addToast('Starting Guided Demo: 01 DETECT (Pond TTK-042)', 'info');
  };

  const nextGuidedDemoStep = () => {
    if (guidedDemoStep === 1) setGuidedDemoStep(2);
    else if (guidedDemoStep === 2) setGuidedDemoStep(3);
    else if (guidedDemoStep === 3) setGuidedDemoStep(4);
    else if (guidedDemoStep === 4) setGuidedDemoStep(5);
    else if (guidedDemoStep === 5) setGuidedDemoStep(null);
  };

  const resetGuidedDemo = () => {
    setGuidedDemoStep(null);
    addToast('Guided Demo Reset', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        ponds,
        selectedPond,
        setSelectedPondId,
        advisories,
        sendAdvisory,
        acknowledgeAdvisory,
        batches,
        addHarvestAndCreateBatch,
        updateBatchStage,
        recordQCAndCertify,
        passports,
        getPassportByBatchId,
        marketLots,
        publishMarketLot,
        reservations,
        reserveMarketLot,
        farmerIncome,
        confirmPaymentToFarmer,
        guidedDemoStep,
        setGuidedDemoStep,
        startGuidedDemo,
        nextGuidedDemoStep,
        resetGuidedDemo,
        language,
        setLanguage,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
