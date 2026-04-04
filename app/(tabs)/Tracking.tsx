import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { Header } from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import { BASE_URL } from '../../services/api';
import { trackingService } from '@/services/trackingService';

export default function Tracking() {
  const router = useRouter();

  const { data: detections, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['detections'],
    queryFn: trackingService.getDetections,
  
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#071426]">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <View className="flex-1  bg-[#071426]">
      <Header title='tracking'/>
      
      <FlatList 
        data={detections}
        keyExtractor={item => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#3B82F6" />
        }
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => router.push({ pathname: "/detail", params: { id: item.id } })}
            className="flex-row gap-3 p-6 mb-4 mt-6 rounded-lg shadow-sm bg-[#0F1F35] border-[1px] border-[#1E3352]"
          >
            {/* Zone de l'image corrigée */}
            <View className='w-20 h-20 overflow-hidden bg-[#1E3352] rounded-md border border-[#3B82F6]/20'>
                  {item.image ? (
                    <Image 
                      // Si item.image commence déjà par http, on ne rajoute pas BASE_URL
                      source={{ 
                        uri: item.image.startsWith('http') 
                          ? item.image 
                          : `${BASE_URL}${item.image}` 
                      }} 
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="items-center justify-center flex-1 bg-gray-900">
                      <Text className="text-[10px] text-gray-500">Pasimage</Text>
                    </View>
                  )}
                </View>

            <View className='flex-1'>
              <View className='flex-row justify-between '>
                <Text className='text-[#FFFFFF] font-bold'>
                  {item.object_details?.label || 'Objet détecté'}
                </Text>

                <Text className='text-[#94A3B8] text-xs'>
                  {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>

              <Text className='mt-1 font-semibold text-[#EF4444]'>
                confiance {Math.round(item.confidence * 100)}%
              </Text>
              
              {/* Correction de l'accès au nom de la caméra */}
              <Text className='text-[#94A3B8] text-xs'>
                {item.camera_details?.name || 'Caméra inconnue'}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <Text className='mt-4 text-[#94A3B8] uppercase text-center'>
        {new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' })}
      </Text> 
    </View>
  );
}