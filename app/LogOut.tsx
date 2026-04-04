// app/LogOut.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LogOut() {
  const router = useRouter();

  const handleLogout = async () => {
    // 1. On efface le token de la mémoire
    await AsyncStorage.removeItem('userToken');
    // 2. On redirige vers l'écran de Login
    router.replace('/Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header simple pour revenir en arrière si on change d'avis */}
      <View className="flex-row items-center px-6 py-4 border-b border-gray-100">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#071426" />
        </TouchableOpacity>
        <Text className="ml-4 text-xl font-bold text-[#071426]">Déconnexion</Text>
      </View>

      {/* Contenu central */}
      <View className="flex-1 justify-center items-center px-10 bg-[#071426]">
        <View className="bg-white p-8 rounded-[30px] w-full items-center shadow-xl">
          <Ionicons name="log-out-outline" size={60} color="#EF4444" />
          
          <Text className="mt-4 text-xl font-bold text-[#071426] text-center">
            Souhaitez-vous vous déconnecter ?
          </Text>
          
         

          <View className="flex-row w-full gap-4 mt-8">
            {/* Bouton Annuler */}
            <TouchableOpacity 
              onPress={() => router.back()}
              className="items-center flex-1 py-4 border border-gray-200 rounded-2xl"
            >
              <Text className="font-bold text-gray-600">Annuler</Text>
            </TouchableOpacity>

            {/* Bouton Confirmer */}
            <TouchableOpacity 
              onPress={handleLogout}
              className="items-center flex-1 py-4 bg-red-600 rounded-2xl"
            >
              <Text className="font-bold text-white">Quitter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}