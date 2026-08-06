import type { MarketLot, BuyerReservation } from '../types';

export const marketplaceService = {
  async recommendRoute(lot: MarketLot) {
    if (lot.grade === 'GRADE A' && lot.hatchabilityPercent >= 80) {
      return {
        primaryRoute: 'PREMIUM SHRIMP / MARINE FISH HATCHERY',
        confidence: 'HIGH',
        estimatedValuePerKg: `₹${lot.pricePerKgINR}`,
        buyerSegment: 'Commercial Penaeus vannamei & Seabass Hatcheries',
        alternatives: [
          { route: 'Ornamental Aquatics & Broodstock Feeds', suitability: 'Secondary' },
          { route: 'Biomass / Artemia Enrichment Formulations', suitability: 'Tertiary' },
        ],
        disclaimer: 'Final destination subject to product-specific QC and buyer laboratory clearance.',
      };
    }
    return {
      primaryRoute: 'ORNAMENTAL BREEDING / BIOMASS MARKET',
      confidence: 'MEDIUM',
      estimatedValuePerKg: `₹${lot.pricePerKgINR * 0.75}`,
      buyerSegment: 'Ornamental Fish Breeders & Formulated Feed Processing',
      alternatives: [],
      disclaimer: 'Final destination subject to product-specific QC and buyer laboratory clearance.',
    };
  },

  async reserveLot(params: {
    lotId: string;
    batchId: string;
    buyerName: string;
    buyerCompany: string;
    buyerType: BuyerReservation['buyerType'];
    quantityKg: number;
    pricePerKg: number;
  }): Promise<BuyerReservation> {
    return {
      id: `RES-${Date.now().toString().slice(-6)}`,
      lotId: params.lotId,
      batchId: params.batchId,
      buyerName: params.buyerName,
      buyerCompany: params.buyerCompany,
      buyerType: params.buyerType,
      quantityKg: params.quantityKg,
      totalAmountINR: params.quantityKg * params.pricePerKg,
      reservedAt: new Date().toISOString(),
      status: 'RESERVED',
      isDemo: true,
    };
  },
};
