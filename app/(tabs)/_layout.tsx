import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#2563eb',
      tabBarStyle: { height: 90, paddingBottom: 30 },
      headerShown:false
      // On définit ici le header personnalisé pour tous les onglets
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard',
          header: () => <Header title="Dashboard" />, // Utilisation du composant
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="tracking" 
        options={{ 
          title: 'Suivi Live',
          header: () => <Header title="Tracking" />, // Utilisation du composant
          tabBarIcon: ({ color }) => <Ionicons name="radar" size={24} color={color} />
        }} 
      />
      <Tabs.Screen 
        name="[id]" 
        options={{ 
          header: () => <Header title="Détails Menace" showBadge={false} />,
        }} 
      />
    </Tabs>
  );
}