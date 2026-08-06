export const paymentService = {
  async processFarmerPayout(_params: {
    pondId: string;
    batchId: string;
    farmerName: string;
    amountINR: number;
  }) {
    return {
      success: true,
      transactionRef: `PAY-TUT-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
      status: 'CONFIRMED' as const,
      isDemo: true,
    };
  },
};
