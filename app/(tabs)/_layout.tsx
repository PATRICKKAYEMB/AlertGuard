import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function TabsLayout() {
  return (
    <>
      {/* Barre d'état blanche avec icônes noires */}
      <StatusBar style="dark" backgroundColor="#FFFFFF" translucent={false} />
      
      <Tabs screenOptions={{ 
        tabBarActiveTintColor: '#2563eb', 
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: { 
          height: 80, 
          paddingBottom: 10,
          backgroundColor: '#FFFFFF', 
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
        },
      }}>
      
        <Tabs.Screen 
          name="index" 
          options={{ 
            title: 'Dashboard',
            tabBarIcon: ({ color }) => <Ionicons name="grid" size={24} color={color} />
          }} 
        />

       
        <Tabs.Screen 
          name="Tracking" 
          options={{ 
            title: 'Suivi Live',
            tabBarIcon: ({ color }) => <Ionicons name="analytics" size={24} color={color} />
          }} 
        />


       
        <Tabs.Screen 
          name="Notifications"
          options={{ href: null }}
        />

        <Tabs.Screen 
          name="detail"
          options={{ href: null }} 
        />
      </Tabs>
    </>
  );
}