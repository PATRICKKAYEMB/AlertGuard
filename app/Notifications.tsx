import { ScrollView, View, Text } from 'react-native';
import { NotificationCard } from '../components/NotificationCard';
import { Header } from '@/components/Header';

export default function Notifications() {
  return (
    <ScrollView className="flex-1 p-6 bg-gray-50">
       <Header title='tracking'/>
      <Text className="mb-4 text-xs font-black tracking-widest text-gray-400 uppercase"> salut</Text>
      <NotificationCard msg="Arme détectée : Entrée Nord (Cam 04)" isRead={false} time="Il y a 2 min" />
      <NotificationCard msg="Couteau détecté : Cafétéria (Cam 09)" isRead={false} time="Il y a 10 min" />
      <Text className="my-4 text-xs italic font-black tracking-widest text-center text-gray-400 uppercase">--- Anciennes alertes ---</Text>
      <NotificationCard msg="Mise à jour système v2.4 terminée" isRead={true} time="Hier" />
    </ScrollView>
  );
}