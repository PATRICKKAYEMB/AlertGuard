import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { socketService } from '@/services/socketService';
import { View, ActivityIndicator } from 'react-native';
import "../global.css";

const queryClient = new QueryClient();

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();
  const qc = useQueryClient();

  // 1. Vérification du Token à chaque changement de route
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, [segments]);

  // 2. Logique de Redirection Automatique (VITAL)
  useEffect(() => {
    if (isAuthenticated === null) return;

    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inTabsGroup) {
      // Pas de token mais tente d'aller dans le Dashboard -> Retour au Login
      router.replace('/Login');
    } else if (isAuthenticated && segments[0] === 'Login') {
      // Token présent sur la page Login -> Direction Dashboard
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  // 3. 🛰️ ACTIVATION DU TEMPS RÉEL (Socket)
  useEffect(() => {
    if (isAuthenticated) {
      const ws = socketService((data) => {
        console.log("🔔 Alerte AlertGuard reçue:", data);
        // Rafraîchit les stats et les listes de détection automatiquement
        qc.invalidateQueries({ queryKey: ['stats'] });
        qc.invalidateQueries({ queryKey: ['detections'] });
      });

      return () => ws.close(); 
    }
  }, [isAuthenticated, qc]);

  if (isAuthenticated === null) {
    return (
      <View className="flex-1 justify-center items-center bg-[#071426]">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}