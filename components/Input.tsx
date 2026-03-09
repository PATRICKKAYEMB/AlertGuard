import { View, Text, TextInput } from 'react-native';

// On ajoute value et onChangeText aux types
interface InputProps {
  label: string;
  placeholder: string;
  secure?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  keyboardType?: "default" | "email-address" | "numeric";
}

export const Input = ({ 
  label, 
  placeholder, 
  secure = false, 
  value, 
  onChangeText,
  ...props // Permet de passer d'autres options natives si besoin
}: InputProps) => (
  <View className="mb-5">
    <Text className="mb-2 ml-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
      {label}
    </Text>
    <TextInput 
      secureTextEntry={secure}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#9CA3AF"
      className="p-4 text-gray-900 bg-gray-100 border border-gray-200 rounded-2xl focus:border-blue-500"
      {...props}
    />
  </View>
);