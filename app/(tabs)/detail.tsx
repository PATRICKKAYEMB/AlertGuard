import { View, Text, Image, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Header } from '@/components/Header';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { trackingService } from '@/services/trackingService';
import { BASE_URL } from '@/services/api';

export default function TrackingDetail() {
  const { id } = useLocalSearchParams();

  // Récupération des détails de la détection via le backend
  const { data: event, isLoading } = useQuery({
    queryKey: ['detection', id],
    queryFn: () => trackingService.getDetectionDetail(id as string),
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#071426]">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View className='flex-1 bg-[#071426]'>
    <Header title='details'/>
      
        <View className="px-2 py-6">
          
          
          {/* Affichage de l'image réelle capturée par le Jetson Nano */}
              <View className="items-center justify-center w-full mb-8 overflow-hidden bg-black border-4 border-gray-800 rounded-lg h-80">
                {event?.image ? (
                  <Image 
                    source={{ 
                      uri: event.image.startsWith('http') 
                        ? event.image 
                        : `${BASE_URL}${event.image}` 
                    }} 
                    className="w-full h-full"
                    resizeMode="contain"
                  />
                ) : (
                  <View className="items-center justify-center flex-1">
                      <Ionicons name="image-outline" size={48} color="#1E3352" />
                      <Text className="mt-2 text-gray-500">Aucune image</Text>
                  </View>
                )}
              </View>
          

          <View className="flex-row items-center justify-between px-2">
            <View>
              <Text className="text-2xl font-bold text-white ">
                {event?.object_details?.label || "Objet Détecté"}
              </Text>
              <Text className='text-[#94A3B8]'>Event ID: #{event?.id || id}</Text>
            </View>

            <View>
              <Text className={`p-1 text-[12px] font-bold rounded-lg border-2 ${
                event?.object_details?.danger_level > 3 
                ? 'text-[#F87171] bg-[#7F1D1D] border-red-500' 
                : 'text-orange-400 bg-orange-900 border-orange-500'
              }`}>
                {event?.object_details?.danger_level > 3 ? 'HIGH Danger' : 'Warning'}
              </Text>
            </View>
          </View>

          <View className='flex-row w-full gap-2 px-2 mt-3 '>
            <View className='flex-1 px-3 py-5 rounded-lg bg-[#0F1F35] border-[1px] border-[#1E3352]'>
              <View className='flex-row items-center gap-2 '>
                <Ionicons name='shield-checkmark' size={16}  color={"#94A3B8"}/>
                <Text className='text-[12px] font-semibold  text-[#64748B]'>CONFIANCE</Text>
              </View>
              <Text className='text-2xl font-bold text-[#3B82F6]'>
                {Math.round((event?.confidence || 0) * 100)}%
              </Text>
            </View>
            
            <View className='flex-1 px-3 py-5 rounded-lg bg-[#0F1F35] border-[1px] border-[#1E3352]'>
              <View className='flex-row items-center gap-2 '>
                <Ionicons name='time-outline' size={16} color={"#94A3B8"} />
                <Text className='text-[12px] font-semibold text-[#64748B] '>HEURE</Text>
              </View>
              <Text className='text-2xl font-bold text-[#3B82F6]'>
                {new Date(event?.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          </View>

          <Text className='mx-2 my-6 text-[#64748B] text-base'>INFORMATION SUR LA DETECTION</Text>
          
          {/* Source de la Caméra */}
          <View className='flex-row w-full gap-3 px-2 py-3 rounded-lg bg-[#0F1F35] border-[1px] border-[#1E3352] mx-2'>
              <View className='p-3 rounded-lg bg-[#111827]'>
                  <Ionicons name='videocam' size={16} color={"#3B82F6"}/>
              </View>
              <View className='flex-1'>
                <Text className='text-[#94A3B8]'>Camera Source</Text>
                <Text className='text-lg font-bold text-[#F8FAFC]'>
                  {event?.camera_details?.name || "Source inconnue"}
                </Text>
              </View>
          </View>

          {/* Emplacement de la Caméra */}
          <View className='flex-row w-full gap-3 px-2 py-3 rounded-lg bg-[#14263F] border-[1px] border-[#1E3352] mt-3 mx-2'>
              <View className='p-3 rounded-lg bg-[#111827]'>
                  <Ionicons name='location' size={16} color={"#3B82F6"}/>
              </View>
              <View className='flex-1'>
                <Text className='text-[#94A3B8]'>Localisation</Text>
                <Text className='text-lg font-bold text-[#F8FAFC]'>
                  {event?.camera_details?.location || "Lubumbashi - Zone RDC"}
                </Text>
              </View>
          </View>
        </View>
    
    </View>
  );
}