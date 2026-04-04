// services/notificationService.ts
import { api } from './api';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const notificationService = {
  // Enregistrement FCM
  registerForPushNotifications: async () => {
    const tokenData = await Notifications.getDevicePushTokenAsync();
    await api.post('/notifications/fcm-tokens/', { // Vérifie que l'URL est bien fcm-tokens
        fcm_token: tokenData.data,
        device_type: Platform.OS,
    });
  },

 

  getNotifications: async () => {
    const { data } = await api.get('/notifications/'); 
    return data;
  },

  // Action YouTube Style
  markAllAsRead: async () => {
    await api.post('/notifications/mark_all_as_read/');
  }
};