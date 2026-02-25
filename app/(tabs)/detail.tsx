import { View, Text, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { Header } from '@/components/Header';


export default function TrackingDetail() {
  const { id } = useLocalSearchParams();
  return (
    <View className="flex-1 p-6 bg-white">
        <Header title='tracking'/>
      <View className="w-full h-80 bg-black rounded-[40px] items-center justify-center mb-8 border-4 border-gray-100">
        <Text className="font-mono text-red-500">LIVE_STREAM_ID_{id}</Text>
      </View>
      <View className="mb-auto">
        <Text className="mb-2 text-3xl font-black">Analyse Active</Text>
        <Text className="italic leading-6 text-gray-500">
          Le sujet porteur  objet suspect a été localisé. Coordonnées envoyées aux unités intervention les plus proches.
        </Text>
      </View>
      <Button title="Déclencher l'Alarme" variant="danger" onPress={() => {}} />
    </View>
  );
}