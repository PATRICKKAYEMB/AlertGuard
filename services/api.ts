import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // On utilise AsyncStorage pour la cohérence

export const BASE_URL = 'http://10.47.8.228:8000'; 

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    // 🛡️ PROTECTION : On n'ajoute pas de token pour la route de connexion
    if (config.url?.includes('/connexion/')) {
      return config;
    }

    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Token attaché à la requête");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
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