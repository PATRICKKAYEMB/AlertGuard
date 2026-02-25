import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBadge?: boolean;
}

export const Header = ({ title, showBadge = true }: HeaderProps) => {
  const router = useRouter(); // C'est ici qu'on active la navigation

  return (
    <View className="bg-blue-500">
      <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-50">
        <View>
          <Text className="text-gray-400 text-[10px] font-black uppercase tracking-[2px]">Sentry Vision</Text>
          <Text className="text-2xl font-black text-gray-900">{title}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push('/Notifications')} // Action de la cloche
          activeOpacity={0.7}
          className="relative p-3 bg-gray-50 rounded-2xl"
        >
          <Ionicons name="notifications-outline" size={24} color="#111827" />
          {showBadge && (
            <View className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full top-3 right-3" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};