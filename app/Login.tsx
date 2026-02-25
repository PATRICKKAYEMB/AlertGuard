import { View, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';


export default function Login() {
  const router = useRouter();
  return (
    <SafeAreaView className="justify-center flex-1 px-8 bg-white">
      <View className="mb-12">
        <Text className="text-5xl italic font-black tracking-tighter text-blue-600">SENTRY</Text>
        <Text className="text-lg text-gray-400">Sécurité IA de haut niveau.</Text>
      </View>
      <Input label="Email Professionnel" placeholder="agent@security.com" />
      <Input label="Mot de passe" placeholder="••••••••" secure />
      <Button title="Accéder au Terminal" onPress={() => router.replace('/')} />
    </SafeAreaView>
  );
}