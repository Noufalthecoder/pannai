import type { QCTest, QualityGrade } from '../types';

export const qcService = {
  calculateGrade(hatchabilityPercent: number, moisturePercent: number): QualityGrade {
    if (hatchabilityPercent >= 80 && moisturePercent <= 8.0) {
      return 'GRADE A';
    } else if (hatchabilityPercent >= 70 && moisturePercent <= 10.0) {
      return 'GRADE B';
    }
    return 'UNQUALIFIED';
  },

  async runImagePurityAssessment(_samplePhotoUrl?: string): Promise<{ imagePurityPercent: number; debrisEstimatePercent: number }> {
    return {
      imagePurityPercent: 94.2,
      debrisEstimatePercent: 5.8,
    };
  },

  async recordPhysicalQC(params: {
    batchId: string;
    physicalHatchabilityPercent: number;
    moisturePercent: number;
    labTechnician: string;
  }): Promise<QCTest> {
    const grade = this.calculateGrade(params.physicalHatchabilityPercent, params.moisturePercent);
    return {
      id: `QC-${params.batchId}`,
      batchId: params.batchId,
      physicalHatchabilityPercent: params.physicalHatchabilityPercent,
      moisturePercent: params.moisturePercent,
      imagePurityPercent: 94.2,
      testDate: new Date().toISOString().split('T')[0],
      labTechnician: params.labTechnician,
      passed: grade !== 'UNQUALIFIED',
      notes: `Physical hatch test verified: ${params.physicalHatchabilityPercent}%. Moisture: ${params.moisturePercent}%. Grade assigned: ${grade}`,
      isDemo: true,
    };
  },
};
