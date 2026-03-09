import { View, Text } from 'react-native';

export const NotificationCard = ({ msg, msg2, isRead, time }: { msg: string, msg2: string, isRead: boolean, time: string }) => (
  <View className={`p-5 rounded-3xl mb-3 flex-row items-center border ${isRead ? 'bg-[#071426] ' : 'bg-[#0F1F35] border-blue-200'}`}>
    <View className={`w-3 h-3 rounded-full mr-4 ${isRead ? 'bg-gray-300' : 'bg-blue-600'}`} />
    <View className="flex-1">
      <Text className={`text-base ${isRead ? 'text-white' : 'text-white font-bold'}`}>{msg} <Text className='font-bold text-orange-600'>{msg2}</Text></Text>
      <Text className="mt-1 text-xs text-gray-400">{time}</Text>
    </View>
  </View>
);