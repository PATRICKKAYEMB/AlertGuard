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

  // Reset au montage de la page
  useEffect(() => {
    resetBadge();
    queryClient.invalidateQueries({ queryKey: ['stats'] });
  }, []);

  // Gestion des nouvelles notifications WebSocket
  useEffect(() => {
    if (lastNotification) {
      // On vérifie si elle n'est pas déjà dans la liste temps réel pour éviter les doublons
      setRealtimeNotifications((prev) => {
        const exists = prev.find(n => n.id === lastNotification.id);
        if (exists) return prev;
        return [lastNotification, ...prev];
      });
    }
  }, [lastNotification]);

  if (isLoading) return <ActivityIndicator className="flex-1 bg-[#071426]" color="#3B82F6" size="large" />;

  // Fusion intelligente : On enlève de la liste "historique" ce qui est déjà dans "temps réel"
  const history = (notifications || []).filter(
    (n: any) => !realtimeNotifications.find(rn => rn.id === n.id)
  );
  const allNotifications = [...realtimeNotifications, ...history];

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
              // SOLUTION : Clé composite pour éviter l'erreur "Encountered two children with same key"
              key={`notif-${notif.id || index}-${index}`}
              msg={notif.title} 
              msg2={notif.message}
              isRead={true} 
              // Utilise le champ 'time_ago' si ton backend le renvoie, sinon formatage sécurisé
              time={notif.time_ago || (notif.created_at ? new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--")} 
            />
          ))}

          {allNotifications.length === 0 && (
            <Text className="mt-10 text-center text-gray-500">Aucune notification pour le moment.</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}




