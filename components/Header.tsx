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
    <View className="">
      <View className="flex-row items-center justify-between px-4 py-4 border-b border-gray-50">
        <View>
  
          <Text className="text-2xl font-black text-white">{title}</Text>
        </View>
        
        <TouchableOpacity 
          onPress={() => router.push('/Notifications')} // Action de la cloche
          activeOpacity={0.7}
          className="relative p-3 rounded-2xl"
        >
          <Ionicons name="notifications-outline" size={32} color="#FFFFFF" />
          {showBadge && (
          <View  className="absolute items-center justify-center w-[17px] h-[17px] bg-red-500 border-2 border-white rounded-full top-3 right-3" >
            <Text className='text-center text-[11px] text-white'>4</Text>
          </View>  
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};