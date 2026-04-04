// services/api.ts
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = 'http://172.16.224.228:8000'; 


// --- NOUVELLE FONCTION POUR LE WEBSOCKET ---
export const getAuthToken = async () => {
  try {
    return await AsyncStorage.getItem('userToken');
  } catch (error) {
    console.error("Erreur lors de la récupération du token AsyncStorage", error);
    return null;
  }
};

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    if (config.url?.includes('/connexion/')) {
      return config;
    }

    const token = await getAuthToken(); // Utilisation de la nouvelle fonction
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Erreur 401 : Nettoyage du token");
      await AsyncStorage.removeItem('userToken');
    }
    return Promise.reject(error);
  }
);