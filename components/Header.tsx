// components/Header.tsx
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNotifications } from '@/context/NotificationContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Header = ({ title }: { title: string }) => {
  const { unreadCount } = useNotifications();
  const router = useRouter();

  return (
    // PARTIE DU DESSUS EN BLANC
    <SafeAreaView className="bg-white" edges={['top']}>
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100">
        {/* Titre en NOIR pour contraster avec le blanc */}
        <Text className="text-2xl font-black text-[#071426] uppercase">
          {title}
        </Text>
        

        <View className="flex-row items-center gap-3 space-x-4">

             
              
               <TouchableOpacity className="relative" onPress={() => router.push('/Notifications')}>
                {/* Icône de cloche en NOIR ou BLEU FONCÉ */}
                <Ionicons name="notifications-outline" size={30} color="#071426" />
                
                {unreadCount > 0 && (
                  <View className="absolute items-center justify-center w-5 h-5 bg-red-600 border-2 border-white rounded-full -top-1 -right-1">
                    <Text className="text-[10px] text-white font-bold">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

               <TouchableOpacity className="relative" onPress={() => router.push('/LogOut')}>
                <Ionicons name="ellipsis-vertical" size={28} color="#071426" />
                
              </TouchableOpacity>
        
        </View>
       
      </View>
    </SafeAreaView>
  );
};