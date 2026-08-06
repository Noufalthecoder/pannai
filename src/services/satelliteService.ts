import type { SatelliteObservation } from '../types';

export const satelliteService = {
  async getLatestObservation(pondId: string): Promise<SatelliteObservation> {
    return {
      date: new Date().toISOString().split('T')[0],
      salinityEstimatePpt: pondId === 'TTK-042' ? 90 : 85,
      ndviValue: -0.12,
      waterSurfaceTempC: 32.4,
      confidenceScorePercent: pondId === 'TTK-042' ? 82 : 78,
      imageryProvider: 'Copernicus Sentinel-2 L2A (DEMO)',
      isDemo: true,
    };
  },

  async getHistoricalIndices(_pondId: string) {
    return [
      { date: 'Jul 15', salinityPpt: 65, reflectance: 0.08 },
      { date: 'Jul 22', salinityPpt: 74, reflectance: 0.12 },
      { date: 'Jul 29', salinityPpt: 85, reflectance: 0.18 },
      { date: 'Aug 05', salinityPpt: 92, reflectance: 0.23 },
    ];
  },
};
