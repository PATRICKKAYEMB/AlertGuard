import { View, Text, TextInput } from 'react-native';

export const Input = ({ label, placeholder, secure = false }: { label: string, placeholder: string, secure?: boolean }) => (
  <View className="mb-5">
    <Text className="text-gray-500 font-bold mb-2 ml-1 text-xs uppercase tracking-widest">{label}</Text>
    <TextInput 
      secureTextEntry={secure}
      placeholder={placeholder}
      className="bg-gray-100 p-4 rounded-2xl text-gray-900 border border-gray-200 focus:border-blue-500"
    />
  </View>
);