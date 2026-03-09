import { api } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Change l'import ici

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const { data } = await api.post('/connexion/', credentials);
    
    // TRÈS IMPORTANT : Vérifie si c'est data.tokens.access ou data.access
    // D'après ton code actuel, c'est data.tokens.access
    const token = data.tokens?.access || data.access; 

    if (token) {
      await AsyncStorage.setItem('userToken', token);
      // On attache immédiatement le token à axios pour les prochaines requêtes (stats, etc.)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    
    return data;
  },

  logout: async () => {
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];
  }
};