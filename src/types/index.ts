export type PondStatus =
  | 'TOO DILUTE'
  | 'APPROACHING'
  | 'CANDIDATE'
  | 'FIELD CHECK'
  | 'SUITABLE'
  | 'HARVEST WINDOW';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface SatelliteObservation {
  date: string;
  salinityEstimatePpt: number;
  ndviValue: number;
  waterSurfaceTempC: number;
  confidenceScorePercent: number;
  imageryProvider: string;
  isDemo: boolean;
}

export interface FieldObservation {
  date: string;
  fieldSalinityPpt: number;
  waterDepthCm: number;
  temperatureC: number;
  checkedBy: string;
  notes?: string;
  isDemo: boolean;
}

export interface Pond {
  id: string; // e.g. TTK-042
  name: string;
  owner: string;
  village: string;
  district: string;
  lat: number;
  lng: number;
  polygon: LatLng[];
  areaAcres: number;
  salinityPpt: number;
  temperatureC: number;
  waterDepthCm: number;
  status: PondStatus;
  modelConfidencePercent: number;
  lastSatelliteObservation: string; // e.g. "2 days ago"
  lastFieldCheck: string; // e.g. "Yesterday"
  recommendedAction: string;
  recommendedActionTamil: string;
  isMyPond?: boolean;
  deviceId?: string;
  isDemo: boolean;
}


export interface Advisory {
  id: string;
  pondId: string;
  date: string;
  englishTitle: string;
  englishInstruction: string;
  englishDetails: string;
  tamilTitle: string;
  tamilInstruction: string;
  tamilDetails: string;
  status: 'PENDING' | 'SENT' | 'ACKNOWLEDGED';
  sentAt?: string;
  acknowledgedAt?: string;
  isDemo: boolean;
}

export interface Harvest {
  id: string;
  pondId: string;
  producerName: string;
  rawHarvestWeightKg: number;
  harvestDate: string;
  photoUrl?: string;
  receivedBy: string;
  fieldNotes?: string;
  isDemo: boolean;
}

export type BatchStage =
  | 'RECEIVED'
  | 'CLEANING'
  | 'SEPARATION'
  | 'DEHYDRATION'
  | 'DRYING'
  | 'QC'
  | 'CERTIFIED';

export type QualityGrade = 'GRADE A' | 'GRADE B' | 'UNQUALIFIED';

export interface QCTest {
  id: string;
  batchId: string;
  physicalHatchabilityPercent: number; // e.g. 86.4%
  moisturePercent: number; // e.g. 6.1%
  imagePurityPercent: number; // e.g. 94.2% (machine-assisted)
  testDate: string;
  labTechnician: string;
  passed: boolean;
  notes: string;
  isDemo: boolean;
}

export interface Batch {
  id: string; // e.g. PN-TUT-260806-018
  harvestId: string;
  pondId: string;
  producerName: string;
  receivedWeightKg: number;
  processedWeightKg?: number;
  currentStage: BatchStage;
  stageTimestamps: Record<BatchStage, string | null>;
  grade?: QualityGrade;
  qcTest?: QCTest;
  isCertified: boolean;
  passportId?: string;
  createdAt: string;
  isDemo: boolean;
}

export interface BatchPassport {
  id: string; // e.g. PASSPORT-PN-TUT-260806-018
  batchId: string;
  grade: QualityGrade;
  productName: string;
  origin: string; // "Tharuvaikulam, Thoothukudi, Tamil Nadu"
  pondId: string;
  harvestDate: string;
  hatchabilityPercent: number;
  moisturePercent: number;
  imagePurityPercent: number;
  weightKg: number;
  qrCodeUrl: string;
  blockchainVerificationHash: string;
  issuedAt: string;
  certifier: string;
  isDemo: boolean;
}

export interface MarketLot {
  id: string; // LOT-018
  batchId: string;
  title: string; // PANNAI A86 Artemia Cysts
  grade: QualityGrade;
  quantityKg: number;
  origin: string;
  harvestDate: string;
  hatchabilityPercent: number;
  moisturePercent: number;
  pricePerKgINR: number;
  status: 'AVAILABLE' | 'RESERVED' | 'SOLD';
  sellerName: string;
  passportUrl: string;
  isDemo: boolean;
}

export interface BuyerReservation {
  id: string;
  lotId: string;
  batchId: string;
  buyerName: string;
  buyerCompany: string;
  buyerType: 'Shrimp Hatchery' | 'Marine Fish Hatchery' | 'Aquaculture Distributor' | 'Ornamental Breeder';
  quantityKg: number;
  totalAmountINR: number;
  reservedAt: string;
  status: 'RESERVED' | 'CONFIRMED' | 'PAID' | 'DISPATCHED';
  isDemo: boolean;
}

export interface FarmerIncomeRecord {
  pondId: string;
  batchId: string;
  harvestWeightKg: number;
  ratePerKgINR: number;
  totalIncomeINR: number;
  status: 'PROCESSED' | 'SALE_CONFIRMED' | 'PAYMENT_RECEIVED';
  date: string;
  isDemo: boolean;
}

export type DataSourceType = 'SATELLITE' | 'FIELD' | 'WEATHER' | 'LAB' | 'MODEL' | 'DEMO';

export type GuidedDemoStep = 1 | 2 | 3 | 4 | 5 | 6 | null;

export type PlatformViewMode = 'FARMER' | 'OPERATOR';

export type SimpleStatusWord = 'GOOD' | 'WATCH' | 'CHECK' | 'ACTION_NEEDED';


export type OrderStageStatus = 'PENDING' | 'CONFIRMED' | 'IN_TRANSIT' | 'DELIVERED' | 'COMPLETED';

export interface MarketOrder {
  id: string; // PN-ORD-00821
  lotId: string;
  batchId: string;
  productName: string;
  grade: QualityGrade;
  quantityKg: number;
  pricePerKgINR: number;
  totalValueINR: number;
  platformFeeINR: number;
  logisticsFeeINR: number;
  netPayoutINR: number;
  buyerName: string;
  buyerCompany: string;
  buyerType: string;
  buyerLocation: string;
  buyerDistanceKm: number;
  producerName: string;
  originPondId: string;
  orderDate: string;
  dispatchedDate?: string;
  expectedDeliveryDate?: string;
  deliveredDate?: string;
  status: OrderStageStatus;
  stagesCompleted: {
    orderPlaced: boolean;
    buyerConfirmed: boolean;
    batchVerified: boolean;
    packed: boolean;
    dispatched: boolean;
    inTransit: boolean;
    delivered: boolean;
    payoutReleased: boolean;
  };
  isDemo: boolean;
}

export interface MarketBuyerRequest {
  id: string;
  buyerName: string;
  buyerCompany: string;
  region: 'Local' | 'Southeast Asia' | 'Middle East' | 'Sri Lanka';
  buyerType: string;
  demandKg: number;
  product: string;
  requiredGrade: QualityGrade;
  requiredHatchabilityPercent: number;
  distanceKm?: number;
  indicativePriceINR: number;
  matchScorePercent: number;
  matchReasons: string[];
  isDemo: boolean;
}


