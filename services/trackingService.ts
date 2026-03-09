import { api } from './api';

export const trackingService = {
  // Cette méthode est celle utilisée par ton useQuery
  getDetections: async () => {
    const { data } = await api.get('/detection-events/');
    return data;
  },

  getDetectionDetail: async (id: string | number) => {
    const { data } = await api.get(`/detection-events/${id}/`);
    return data;
  },

  // Pour ton futur Dashboard
  getStats: async () => {
    const { data } = await api.get('/detection-events/stats/');
    return data;
  }
};