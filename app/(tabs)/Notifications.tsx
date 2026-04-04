import { ScrollView, View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NotificationCard } from '../../components/NotificationCard';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { Header } from '@/components/Header';
import { notificationService } from '@/services/notificationService';
import { useNotifications } from '@/context/NotificationContext';



export default function Notifications() {
  const queryClient = useQueryClient();
  const [realtimeNotifications, setRealtimeNotifications] = useState<any[]>([]);
  const { resetBadge, lastNotification } = useNotifications();

 
  const { data: notifications, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['notifications-history'],
    queryFn: notificationService.getNotifications,
  });

  useEffect(() => {
    resetBadge();
    queryClient.invalidateQueries({ queryKey: ['stats'] });
  }, []);

  useEffect(() => {
    if (lastNotification) {
      setRealtimeNotifications((prev) => [lastNotification, ...prev]);
    }
  }, [lastNotification]);

  if (isLoading) return <ActivityIndicator className="flex-1 bg-[#071426]" color="#3B82F6" size="large" />;

  // Fusion des données
  const allNotifications = [...realtimeNotifications, ...(notifications || [])];

  return (

    <View className="flex-1 bg-[#071426]">
      <Header title='Alertes Live'/>
      <ScrollView 
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <View className="px-6">
         
          <View className='mt-8 mb-4 border-b border-[#1E3352]' />

          {allNotifications.map((notif, index) => (
            <NotificationCard 
              key={notif.id || index}
              // Utilisation directe des champs de ton modèle Django
              msg={notif.title} 
              msg2={notif.message}
              isRead={true} // Car on vient de faire resetBadge()
              time={new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
            />
          ))}

          {allNotifications.length === 0 && (
            <Text className="mt-10 text-center text-gray-500">Aucune notification.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}