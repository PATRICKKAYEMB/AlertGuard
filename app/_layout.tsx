import { Stack } from 'expo-router';
import "../global.css";

export default function RootLayout() {
  // TEST: Change à 'true' pour voir les onglets et le header
  const isAuthenticated = false; 

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        // Ici, le name doit être "index" car ton fichier est app/index.tsx
        <Stack.Screen 
          name="Login" 
          options={{ title: 'Connexion' }} 
        />
      ) : (
        <>
          {/* On ne met PAS de header ici pour laisser les Tabs gérer le leur */}
          <Stack.Screen name="(tabs)"options={{headerShown: false}}  /> 
          <Stack.Screen 
            name="notifications" 
            options={{ 
              presentation: 'modal', 
              headerShown: true, 
              title: 'Alertes de Sécurité' 
            }} 
          />
        </>
      )}
    </Stack>
  );
}