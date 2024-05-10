import { Stack } from 'expo-router';
import { Colors } from 'react-native-elements';

export default function FeedbackStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen name="feedback" options={{ headerShown: true, title:'Feedback', headerStyle: { backgroundColor: '#16A4E3'}, headerTintColor: 'white',}} />
    </Stack>
  );
}
