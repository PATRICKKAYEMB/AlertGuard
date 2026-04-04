import React, { useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { authService } from '../services/authService';
import { registerForPushNotifications } from '@/services/notificationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/services/api';



export default function Login() {
 const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: async (data) => {
  // On récupère le token peu importe le format du backend
  const token = data.tokens?.access || data.access;

  if (token) {
    await AsyncStorage.setItem('userToken', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    console.log("✅ Token sauvé, redirection vers le Dashboard...");
    
    // On redirige sans délai pour tester
    router.replace('/(tabs)');
  } else {
    console.error("❌ Erreur : Aucun token trouvé dans la réponse du serveur", data);
    Alert.alert("Erreur", "Le serveur n'a pas renvoyé de jeton de connexion.");
  }
},
    onError: (error: any) => {
      const errorMsg = error.response?.data?.detail || "Email ou mot de passe incorrect";
      Alert.alert("Erreur de connexion", errorMsg);
    }
  });

 const handleLogin = async () => {
  try {
    if (!email || !password) {
      Alert.alert("Champs vides", "Veuillez remplir tous les champs.");
      return;
    }

    // NETTOYAGE RADICAL pour éviter que l'intercepteur ne bloque sur un vieux token
    await AsyncStorage.removeItem('userToken');
    delete api.defaults.headers.common['Authorization'];

    console.log("🚀 Lancement de la mutation...");
    loginMutation.mutate({ email, password });
  } catch (err) {
    console.error("Erreur locale avant mutation:", err);
  }
};

  return (
    <SafeAreaView className="justify-center flex-1 px-8 bg-white">
      <View className="mb-12">
        <Text className="text-5xl italic font-black tracking-tighter text-center text-blue-600">connexion</Text>
       
      </View>

      <Input 
        label="Email Professionnel" 
        placeholder="agent@security.com" 
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <Input 
        label="Mot de passe" 
        placeholder="••••••••" 
        secureTextEntry={true} 
        value={password}
        onChangeText={setPassword}
      />

     <View className="mt-4">
        {loginMutation.isPending ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : (
          <Button 
            title="Se connecter" 
            onPress={handleLogin} 
          />
        )}
      </View>

     
    </SafeAreaView>
  );
}