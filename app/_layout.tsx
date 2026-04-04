import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider, useQueryClient } from '@tanstack/react-query';
import { socketService } from '@/services/socketService';
import { NotificationProvider } from '@/context/NotificationContext';
import { View, ActivityIndicator } from 'react-native';
import "../global.css";

const queryClient = new QueryClient();

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const segments = useSegments();
  const router = useRouter();
  // On ne récupère plus qc (QueryClient) ici pour le socket

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token);
    };
    checkAuth();
  }, [segments]);

  useEffect(() => {
    if (isAuthenticated === null) return;
    const inTabsGroup = segments[0] === '(tabs)';

    if (!isAuthenticated && inTabsGroup) {
      router.replace('/Login');
    } else if (isAuthenticated && segments[0] === 'Login') {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated, segments]);

  // ❌ ON SUPPRIME LE BLOC useEffect DU SOCKET ICI !!
  // C'est le NotificationProvider qui gère tout maintenant.

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
      <Stack.Screen name='LogOut'/>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AppContent />
      </NotificationProvider>
    </QueryClientProvider>
  );
}