import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';

export default function Dashboard() {

  return (
    <ScrollView className="flex-1 p-6 bg-white">
       <Header title='tracking'/>

      <View className="bg-gray-900 p-8 rounded-[40px] mb-8 shadow-2xl">
        <Text className="mb-2 font-bold text-blue-400">Total Détections (24h)</Text>
        <Text className="text-5xl italic font-black text-white">42</Text>
      </View>

      <Text className="mb-4 text-xl font-black">Accès Rapides</Text>
      <View className="flex-row flex-wrap justify-between">
        {['Rapports', 'Caméras', 'Agents', 'Zones'].map((item) => (
          <View key={item} className="bg-gray-50 border border-gray-100 w-[48%] p-6 rounded-[30px] mb-4 items-center">
            <Text className="font-bold text-gray-700">{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}