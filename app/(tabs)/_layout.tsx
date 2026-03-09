import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '@/components/Header';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#2563eb',
      tabBarStyle: { height: 90, paddingBottom: 30 },
      headerShown: false
    }}>
      <Tabs.Screen 
        name="index" 
        options={{ 
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />
        }} 
      />
      {/* CORRECTION : On utilise "Tracking" avec un T majuscule comme dans tes logs */}
      <Tabs.Screen 
        name="Tracking" 
        options={{ 
          title: 'Suivi Live',
          // "radar" n'existe pas, on met "analytics" à la place
          tabBarIcon: ({ color }) => <Ionicons name="analytics" size={24} color={color} />
        }} 
      />
      
      {/* ON ENLÈVE [id] d'ici. Les routes dynamiques ne sont généralement pas des onglets */}
    </Tabs>
  );
}