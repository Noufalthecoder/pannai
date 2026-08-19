import type { Pond, Advisory, Batch, BatchPassport, MarketLot, FarmerIncomeRecord, SimilarityGroup } from '../types';

// Centralized Seeded Demo Data around Thoothukudi / Tharuvaikulam Salt Pan Belt (Lat ~8.90, Lng ~78.16)

export const SIMILARITY_GROUPS: SimilarityGroup[] = [
  {
    id: 'Group 01',
    groupNumber: 1,
    pondIds: ['TTK-007', 'TTK-023', 'TTK-002', 'TTK-003', 'TTK-004', 'TTK-005', 'TTK-006', 'TTK-008'],
    pondCount: 8,
    similarityScorePercent: 89,
    patternLabel: 'Similar Pattern',
    representativePondId: 'TTK-007',
    anomalyPondId: 'TTK-023',
    status: 'SUITABLE',
    lastValidatedDaysAgo: 2,
    description: 'Ponds with similar satellite spatial reflectivity, water surface area trends, and hypersaline evaporation signatures.',
  },
  {
    id: 'Group 02',
    groupNumber: 2,
    pondIds: ['TTK-001', 'TTK-009', 'TTK-010', 'TTK-011', 'TTK-012', 'TTK-013'],
    pondCount: 6,
    similarityScorePercent: 84,
    patternLabel: 'Changing Pattern',
    representativePondId: 'TTK-001',
    status: 'FIELD CHECK',
    lastValidatedDaysAgo: 1,
    description: 'Low-salinity estuarine inflow signatures detected. Evaporation retention period required.',
  },
  {
    id: 'Group 03',
    groupNumber: 3,
    pondIds: ['TTK-015', 'TTK-014', 'TTK-016', 'TTK-017', 'TTK-018', 'TTK-019', 'TTK-020', 'TTK-021', 'TTK-022', 'TTK-024', 'TTK-025'],
    pondCount: 11,
    similarityScorePercent: 92,
    patternLabel: 'Stable Pattern',
    representativePondId: 'TTK-015',
    status: 'HARVEST WINDOW',
    lastValidatedDaysAgo: 1,
    description: 'High salinity stability (>100 ppt) across all 11 compartments. Inoculation and cyst harvest ready.',
  },
  {
    id: 'Group 04',
    groupNumber: 4,
    pondIds: ['TTK-042', 'TTK-026', 'TTK-027', 'TTK-028', 'TTK-029', 'TTK-031', 'TTK-032', 'TTK-033', 'TTK-034', 'TTK-035', 'TTK-036', 'TTK-037'],
    pondCount: 12,
    similarityScorePercent: 78,
    patternLabel: 'Needs Verification',
    representativePondId: 'TTK-042',
    status: 'CANDIDATE',
    lastValidatedDaysAgo: 3,
    description: 'Approaching biological threshold. Ground refractometer verification recommended.',
  },
  {
    id: 'Group 05',
    groupNumber: 5,
    pondIds: ['TTK-030', 'TTK-038', 'TTK-039', 'TTK-040', 'TTK-041', 'TTK-043', 'TTK-044', 'TTK-045', 'TTK-046', 'TTK-047', 'TTK-048', 'TTK-049', 'TTK-050'],
    pondCount: 13,
    similarityScorePercent: 94,
    patternLabel: 'Stable Pattern',
    representativePondId: 'TTK-030',
    status: 'SUITABLE',
    lastValidatedDaysAgo: 4,
    description: 'Consistently high spatial stability across eastern coastal salt brine channels.',
  },
];

// Helper to generate 50 realistic salt pan pond polygons in Tharuvaikulam cluster
const generate50Ponds = (): Pond[] => {
  const basePonds: Partial<Pond>[] = [
    {
      id: 'TTK-007',
      name: 'Veerapandian East 7',
      localName: 'Veerapandian',
      owner: 'Muthu Swamy',
      village: 'Tharuvaikulam',
      district: 'Thoothukudi',
      lat: 8.9050,
      lng: 78.1610,
      salinityPpt: 78,
      temperatureC: 31.0,
      waterDepthCm: 22,
      status: 'SUITABLE',
      groupNumber: 1,
      isRepresentative: true,
      isMyPond: true,
      deviceId: 'PN-SD-007',
      recommendedAction: 'Selected as representative pond for Group 01.',
      recommendedActionTamil: 'குழு 01-ன் பிரதிநிதி குளமாக தேர்வு செய்யப்பட்டுள்ளது. குளத்தை நேரில் சரிபார்க்கவும்.',
    },
    {
      id: 'TTK-023',
      name: 'Veerapandian North 23',
      localName: 'Veerapandian Anomaly',
      owner: 'Muthu Swamy',
      village: 'Tharuvaikulam',
      district: 'Thoothukudi',
      lat: 8.9080,
      lng: 78.1640,
      salinityPpt: 80,
      temperatureC: 31.5,
      waterDepthCm: 20,
      status: 'FIELD CHECK',
      groupNumber: 1,
      isAnomaly: true,
      isMyPond: true,
      deviceId: 'PN-SD-023',
      recommendedAction: 'Pond TTK-023 differs from Group 01 recent pattern. Field check required.',
      recommendedActionTamil: '⚠️ குளத்தில் மாற்றம் உள்ளது. குளம் TTK-023-ஐ நேரில் சரிபார்க்கவும்.',
    },
    {
      id: 'TTK-001',
      name: 'Kalam Ponds Compartment 1',
      localName: 'Kalam',
      owner: 'Shanmugam K.',
      village: 'Therespuram',
      district: 'Thoothukudi',
      lat: 8.8950,
      lng: 78.1520,
      salinityPpt: 45,
      temperatureC: 29.8,
      waterDepthCm: 35,
      status: 'FIELD CHECK',
      groupNumber: 2,
      isRepresentative: true,
      isMyPond: true,
      deviceId: 'PN-SD-001',
      recommendedAction: 'Selected as representative pond for Group 02.',
      recommendedActionTamil: 'ஆவியாதல் நேரத்தை அதிகரிக்கவும். குளத்தை நேரில் சரிபார்க்கவும்.',
    },
    {
      id: 'TTK-015',
      name: 'Mullakadu Salt Compartment 15',
      localName: 'Mullakadu',
      owner: 'Muthu Swamy',
      village: 'Mullakadu',
      district: 'Thoothukudi',
      lat: 8.8820,
      lng: 78.1410,
      salinityPpt: 110,
      temperatureC: 33.5,
      waterDepthCm: 15,
      status: 'SUITABLE',
      groupNumber: 3,
      isRepresentative: true,
      isMyPond: true,
      deviceId: 'PN-SD-015',
      recommendedAction: 'Selected as representative pond for Group 03.',
      recommendedActionTamil: 'ஆர்டீமியா அறுவடை செய்ய ஏற்ற நிலை உள்ளது. தொடர்ந்து கண்காணிக்கவும்.',
    },
    {
      id: 'TTK-042',
      name: 'Tharuvaikulam North Compartment 42',
      localName: 'Tharuvaikulam',
      owner: 'Muthu Swamy',
      village: 'Tharuvaikulam',
      district: 'Thoothukudi',
      lat: 8.9124,
      lng: 78.1685,
      salinityPpt: 92,
      temperatureC: 32.4,
      waterDepthCm: 18,
      status: 'CANDIDATE',
      groupNumber: 4,
      isRepresentative: true,
      isMyPond: true,
      deviceId: 'PN-SD-042',
      recommendedAction: 'Selected as representative pond for Group 04.',
      recommendedActionTamil: 'வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும்.',
    },
    {
      id: 'TTK-030',
      name: 'Kovalam Brine Salt Pan 30',
      localName: 'Kovalam',
      owner: 'Arumugam P.',
      village: 'Kovalam',
      district: 'Thoothukudi',
      lat: 8.9210,
      lng: 78.1750,
      salinityPpt: 96,
      temperatureC: 32.0,
      waterDepthCm: 19,
      status: 'SUITABLE',
      groupNumber: 5,
      isRepresentative: true,
      isMyPond: false,
      recommendedAction: 'Selected as representative pond for Group 05.',
      recommendedActionTamil: 'தொடர்ந்து கண்காணிக்கவும்.',
    },
  ];

  const fullList: Pond[] = [];

  // Generate 50 ponds systematically across 5 groups
  for (let i = 1; i <= 50; i++) {
    const padId = `TTK-${String(i).padStart(3, '0')}`;
    const foundBase = basePonds.find((b) => b.id === padId);

    let groupNum = 5;
    if (i <= 8) groupNum = 1;
    else if (i <= 14) groupNum = 2;
    else if (i <= 25) groupNum = 3;
    else if (i <= 37) groupNum = 4;
    else groupNum = 5;

    const baseLat = 8.88 + (i * 0.0012);
    const baseLng = 78.14 + (i * 0.0011);

    const poly = [
      { lat: baseLat + 0.0008, lng: baseLng - 0.0008 },
      { lat: baseLat + 0.0009, lng: baseLng + 0.0009 },
      { lat: baseLat - 0.0007, lng: baseLng + 0.0008 },
      { lat: baseLat - 0.0008, lng: baseLng - 0.0007 },
    ];

    if (foundBase) {
      fullList.push({
        id: foundBase.id!,
        name: foundBase.name!,
        localName: foundBase.localName || `Pond ${i}`,
        groupNumber: foundBase.groupNumber || groupNum,
        isRepresentative: foundBase.isRepresentative || false,
        isAnomaly: foundBase.isAnomaly || false,
        owner: foundBase.owner || 'Salt Pan Producer',
        village: foundBase.village || 'Tharuvaikulam',
        district: 'Thoothukudi',
        lat: foundBase.lat!,
        lng: foundBase.lng!,
        polygon: poly,
        areaAcres: Number((1.5 + (i % 3) * 0.5).toFixed(1)),
        salinityPpt: foundBase.salinityPpt!,
        temperatureC: foundBase.temperatureC!,
        waterDepthCm: foundBase.waterDepthCm!,
        status: foundBase.status!,
        modelConfidencePercent: 82 + (i % 15),
        lastSatelliteObservation: '2 days ago',
        lastFieldCheck: 'Yesterday',
        recommendedAction: foundBase.recommendedAction || 'Continue monitoring',
        recommendedActionTamil: foundBase.recommendedActionTamil || 'தொடர்ந்து கண்காணிக்கவும்',
        isMyPond: foundBase.isMyPond ?? (i <= 5),
        deviceId: foundBase.deviceId || `PN-SD-${String(i).padStart(3, '0')}`,
        isDemo: true,
      });
    } else {
      const defaultStatus = groupNum === 1 ? 'SUITABLE' : groupNum === 2 ? 'FIELD CHECK' : groupNum === 3 ? 'HARVEST WINDOW' : groupNum === 4 ? 'CANDIDATE' : 'SUITABLE';
      const defaultSalinity = groupNum === 1 ? 79 : groupNum === 2 ? 52 : groupNum === 3 ? 104 : groupNum === 4 ? 88 : 95;

      fullList.push({
        id: padId,
        name: `Tharuvaikulam Salt Compartment ${i}`,
        localName: `Pond ${String(i).padStart(2, '0')}`,
        groupNumber: groupNum,
        isRepresentative: false,
        isAnomaly: false,
        owner: i % 2 === 0 ? 'Muthu Swamy' : 'Shanmugam K.',
        village: 'Tharuvaikulam',
        district: 'Thoothukudi',
        lat: baseLat,
        lng: baseLng,
        polygon: poly,
        areaAcres: Number((1.2 + (i % 4) * 0.4).toFixed(1)),
        salinityPpt: defaultSalinity + (i % 5),
        temperatureC: Number((30 + (i % 4) * 0.6).toFixed(1)),
        waterDepthCm: 16 + (i % 8),
        status: defaultStatus,
        modelConfidencePercent: 80 + (i % 18),
        lastSatelliteObservation: '2 days ago',
        lastFieldCheck: '2 days ago',
        recommendedAction: 'Continue monitoring pattern',
        recommendedActionTamil: 'தொடர்ந்து கண்காணிக்கவும்',
        isMyPond: i === 7 || i === 23 || i === 1 || i === 15 || i === 42,
        deviceId: `PN-SD-${String(i).padStart(3, '0')}`,
        isDemo: true,
      });
    }
  }

  return fullList;
};

export const SEEDED_PONDS: Pond[] = generate50Ponds();

export const INITIAL_ADVISORY: Advisory = {
  id: 'ADV-TTK-042-8821',
  pondId: 'TTK-042',
  date: '2026-08-19',
  englishTitle: 'Action Advisory: Pond TTK-042',
  englishInstruction: 'FIELD CHECK FRIDAY',
  englishDetails: 'Maintain current water level. Biological Artemia production window detected.',
  tamilTitle: 'செயல் ஆலோசனை: குளம் TTK-042',
  tamilInstruction: 'வெள்ளிக்கிழமை குளத்தை நேரில் சரிபார்க்கவும்.',
  tamilDetails: 'தற்போதைய நீர்மட்டத்தை அப்படியே பராமரிக்கவும். ஆர்டீமியா உற்பத்தி செய்ய உகந்த சூழல் உள்ளது.',
  status: 'SENT',
  sentAt: '2026-08-19T08:30:00Z',
  isDemo: true,
};

export const INITIAL_BATCH: Batch = {
  id: 'PN-TUT-260806-018',
  harvestId: 'HARV-TTK042-9912',
  pondId: 'TTK-042',
  producerName: 'Muthu Swamy',
  receivedWeightKg: 18.4,
  processedWeightKg: 16.2,
  currentStage: 'CERTIFIED',
  stageTimestamps: {
    RECEIVED: '08:30 AM',
    CLEANING: '10:15 AM',
    SEPARATION: '11:45 AM',
    DEHYDRATION: '01:30 PM',
    DRYING: '03:00 PM',
    QC: '04:15 PM',
    CERTIFIED: '05:00 PM',
  },
  isCertified: true,
  passportId: 'PASSPORT-PN-TUT-260806-018',
  createdAt: '2026-08-06',
  isDemo: true,
};

export const INITIAL_PASSPORT: BatchPassport = {
  id: 'PASSPORT-PN-TUT-260806-018',
  batchId: 'PN-TUT-260806-018',
  grade: 'GRADE A',
  productName: 'PANNAI Artemia Cysts (Premium Hatchery Grade)',
  origin: 'Tharuvaikulam, Thoothukudi, Tamil Nadu, India',
  pondId: 'TTK-042',
  harvestDate: '06 AUG 2026',
  hatchabilityPercent: 86.4,
  moisturePercent: 6.1,
  imagePurityPercent: 94.2,
  weightKg: 16.2,
  qrCodeUrl: 'https://pannai.app/passport/PN-TUT-260806-018',
  blockchainVerificationHash: '0x8f9c1a4e2b7d3f6c8a0b5e9d2f4c1a7b',
  issuedAt: '2026-08-06T17:00:00Z',
  certifier: 'PANNAI Quality Lab — Thoothukudi Bio-Hub',
  isDemo: true,
};

export const INITIAL_MARKET_LOTS: MarketLot[] = [
  {
    id: 'LOT-018',
    batchId: 'PN-TUT-260806-018',
    title: 'PANNAI A86 — Artemia Cysts',
    grade: 'GRADE A',
    quantityKg: 16.2,
    origin: 'Tharuvaikulam, Thoothukudi, TN',
    harvestDate: '06 AUG 2026',
    hatchabilityPercent: 86.4,
    moisturePercent: 6.1,
    pricePerKgINR: 3200,
    status: 'AVAILABLE',
    sellerName: 'PANNAI Bioeconomy Operations (Thoothukudi Cluster)',
    passportUrl: '/passport/PN-TUT-260806-018',
    isDemo: true,
  },
];

export const INITIAL_MARKET_ORDERS: import('../types').MarketOrder[] = [
  {
    id: 'PN-ORD-00821',
    lotId: 'LOT-018',
    batchId: 'PN-TUT-260806-018',
    productName: 'PANNAI Artemia Cysts (Grade A)',
    grade: 'GRADE A',
    quantityKg: 10,
    pricePerKgINR: 3200,
    totalValueINR: 32000,
    platformFeeINR: 960,
    logisticsFeeINR: 1200,
    netPayoutINR: 29840,
    buyerName: 'R. K. Swamy',
    buyerCompany: 'Thoothukudi Shrimp Hatchery Ltd',
    buyerType: 'Aquaculture Hatchery',
    buyerLocation: 'Thoothukudi, Tamil Nadu',
    buyerDistanceKm: 18,
    producerName: 'Muthu Swamy',
    originPondId: 'TTK-042',
    orderDate: '18 AUG 2026',
    dispatchedDate: '18 AUG 2026',
    expectedDeliveryDate: '19 AUG 2026',
    status: 'IN_TRANSIT',
    stagesCompleted: {
      orderPlaced: true,
      buyerConfirmed: true,
      batchVerified: true,
      packed: true,
      dispatched: true,
      inTransit: true,
      delivered: false,
      payoutReleased: false,
    },
    isDemo: true,
  },
];

export const INITIAL_BUYER_REQUESTS: import('../types').MarketBuyerRequest[] = [
  {
    id: 'REQ-SE-01',
    buyerName: 'Thoothukudi Hatchery Hub',
    buyerCompany: 'Thoothukudi Commercial Hatcheries',
    region: 'Local',
    buyerType: 'Local Hatchery',
    demandKg: 25,
    product: 'Artemia Cysts Grade A',
    requiredGrade: 'GRADE A',
    requiredHatchabilityPercent: 85,
    distanceKm: 18,
    indicativePriceINR: 3200,
    matchScorePercent: 92,
    matchReasons: [
      'Proximity within 50 km local delivery radius',
      'Batch PN-TUT-260806-018 meets 86.4% hatchability requirement',
      'Direct payout settlement verified',
    ],
    isDemo: true,
  },
];

export const INITIAL_FARMER_INCOME: FarmerIncomeRecord = {
  pondId: 'TTK-042',
  batchId: 'PN-TUT-260806-018',
  harvestWeightKg: 18.4,
  ratePerKgINR: 2800,
  totalIncomeINR: 51520,
  status: 'PAYMENT_RECEIVED',
  date: '2026-08-18',
  isDemo: true,
};
