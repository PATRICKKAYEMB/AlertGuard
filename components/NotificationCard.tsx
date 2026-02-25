import { View, Text } from 'react-native';

export const NotificationCard = ({ msg, isRead, time }: { msg: string, isRead: boolean, time: string }) => (
  <View className={`p-5 rounded-3xl mb-3 flex-row items-center border ${isRead ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-200'}`}>
    <View className={`w-3 h-3 rounded-full mr-4 ${isRead ? 'bg-gray-300' : 'bg-blue-600'}`} />
    <View className="flex-1">
      <Text className={`text-base ${isRead ? 'text-gray-500' : 'text-gray-900 font-bold'}`}>{msg}</Text>
      <Text className="mt-1 text-xs text-gray-400">{time}</Text>
    </View>
  </View>
);