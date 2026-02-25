import { Text, TouchableOpacity } from 'react-native';

export const Button = ({ title, onPress, variant = 'primary' }: { title: string, onPress: () => void, variant?: 'primary' | 'danger' }) => (
  <TouchableOpacity 
    onPress={onPress}
    className={`p-5 rounded-2xl items-center shadow-md ${variant === 'primary' ? 'bg-blue-600' : 'bg-red-600'}`}
  >
    <Text className="text-lg font-bold tracking-tight text-white">{title}</Text>
  </TouchableOpacity>
);