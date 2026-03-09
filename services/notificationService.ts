import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import Constants from 'expo-constants'; // Ajoute cet import
import { api } from './api';

export const registerForPushNotifications = async () => {
  // Empêche le crash sur Expo Go
  if (Constants.appOwnership === 'expo') {
    console.warn("⚠️ Notifications désactivées : Vous utilisez Expo Go. Testez sur un 'Development Build' pour le FCM.");
    return;
  }

  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') return;

    const tokenData = await Notifications.getDevicePushTokenAsync();
    const token = tokenData.data;

    await api.post('/notifications/devices/', {
      registration_id: token,
      type: Platform.OS,
    });
  } catch (error) {
    console.log("Erreur notif (probablement Expo Go):", error);
  }
};