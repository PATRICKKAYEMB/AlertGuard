import { View, Text, ActivityIndicator, ScrollView, RefreshControl } from 'react-native';
import { Header } from '@/components/Header';
import { useQuery } from '@tanstack/react-query';
import { trackingService } from '@/services/trackingService';

export default function Dashboard() {
  // 1. Récupération des statistiques réelles du backend
  const { data: stats, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['stats'],
    queryFn: trackingService.getStats,
 
  });

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-[#071426]">
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView 
      className="flex-1 bg-[#071426]"
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor="#3B82F6" />
      }
    >
      <View className="">
        <Header title='Dashboard'/>

        <View className='items-center w-full mt-10'>
          
          {/* Carte : Détections du Jour */}
          <View className="bg-[#FFF] p-8 rounded-[40px] mb-8 shadow-2xl h-[200px] w-full items-center justify-center">
            <Text className="mb-2 text-2xl font-bold text-center text-blue-500">
              Détections (Aujourd'hui)
            </Text>
            <Text className="mt-2 text-6xl italic font-black text-center text-blue-600">
              {stats?.today_events || 0}
            </Text>
          </View>

          {/* Carte : Activité 7 derniers jours */}
          <View className="bg-[#FFF] p-8 rounded-[40px] mb-8 shadow-2xl h-[200px] w-full items-center justify-center">
            <Text className="mb-2 text-2xl font-bold text-center text-blue-500">
              Total (7 derniers jours)
            </Text>
            <Text className="mt-2 text-6xl italic font-black text-center text-blue-600">
              {stats?.last_7_days_events || 0}
            </Text>
          </View>

          {/* Section rapide pour les objets détectés aujourd'hui */}
          <View className="w-full p-6 mb-8 rounded-3xl bg-[#0F1F35] border border-[#1E3352]">
            <Text className="mb-4 text-lg italic font-bold text-white uppercase">Objets par Caméra</Text>
            {stats?.events_by_camera?.map((cam: any, index: number) => (
              <View key={index} className="flex-row justify-between mb-2 border-b border-[#1E3352] pb-2">
                <Text className="text-[#94A3B8]">{cam.camera__name}</Text>
                <Text className="font-bold text-blue-400">{cam.total} alertes</Text>
              </View>
            ))}
          </View>

        </View>
      </View>
    </ScrollView>
  );
}