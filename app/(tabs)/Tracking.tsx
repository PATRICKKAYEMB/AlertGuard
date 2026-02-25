import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';


const DATA = [
  { id: '101', object: 'Arme à feu', loc: 'Parking A', status: 'Recherché' },
  { id: '102', object: 'Machette', loc: 'Zone Fret', status: 'Interception' },
];

export default function Tracking() {
  const router = useRouter();
  return (
    <View className="flex-1 p-6 bg-gray-50">
      <Header title='tracking'/>
      <FlatList 
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push("/detail")}
            className="bg-white p-6 rounded-[30px] mb-4 border-l-8 border-red-500 shadow-sm"
          >
            <Text className="mb-1 text-xs font-black text-red-500 uppercase">{item.status}</Text>
            <Text className="text-xl font-bold text-gray-900">{item.object}</Text>
            <Text className="mt-1 italic text-gray-400">{item.loc}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}