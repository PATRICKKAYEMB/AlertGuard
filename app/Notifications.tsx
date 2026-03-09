import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NotificationCard } from '../components/NotificationCard';
import { Header } from '@/components/Header';
import { socketService } from '@/services/socketService'; // Vérifie bien le chemin
import { useQuery } from '@tanstack/react-query';
import { trackingService } from '@/services/trackingService';

export default function Notifications() {
  const [realtimeNotifications, setRealtimeNotifications] = useState<any[]>([]);

  // 1. On récupère d'abord l'historique via l'API classique
  const { data: history, isLoading } = useQuery({
    queryKey: ['detections-history'],
    queryFn: trackingService.getDetections,
  });

  // 2. Connexion au WebSocket pour les alertes en direct
  useEffect(() => {
    const socket = socketService((newMsg) => {
      // On ajoute la nouvelle alerte en haut de la liste
      setRealtimeNotifications((prev) => [newMsg, ...prev]);
    });

    return () => socket.close(); // On ferme la connexion quand on quitte l'écran
  }, []);

  if (isLoading) return <ActivityIndicator className="flex-1 bg-[#071426]" color="#3B82F6" />;

  // On combine l'historique et le temps réel
  const allNotifications = [...realtimeNotifications, ...(history || [])];

  return (
    <ScrollView className="flex-1 p-6 bg-[#071426]">
       <Header title='Notifications'/>
       
       <View className='mt-8 mb-4 border-b border-[#1E3352]' />
       
      <Text className="mb-6 text-xs font-black tracking-widest text-gray-400 uppercase">
        {realtimeNotifications.length > 0 ? "⚠️ Alertes Récentes" : "Historique des détections"}
      </Text>

      {allNotifications.map((notif, index) => (
        <NotificationCard 
          key={notif.id || index}
          msg={`${notif.object_details?.label || 'Objet'} détecté : `} 
          msg2={notif.camera_details?.name || '(Source inconnue)'}
          isRead={notif.processed} 
          time={new Date(notif.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
        />
      ))}

      {allNotifications.length === 0 && (
        <Text className="mt-10 text-center text-gray-500">Aucune alerte pour le moment.</Text>
      )}
    </ScrollView>
  );
}