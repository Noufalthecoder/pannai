import type { Advisory } from '../types';

export const advisoryService = {
  async sendAdvisory(advisory: Advisory): Promise<{ success: boolean; advisory: Advisory }> {
    const updated = {
      ...advisory,
      status: 'SENT' as const,
      sentAt: new Date().toISOString(),
    };
    return { success: true, advisory: updated };
  },

  async acknowledgeAdvisory(_advisoryId: string): Promise<{ success: boolean }> {
    return { success: true };
  },
};
