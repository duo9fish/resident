import { Stack } from 'expo-router';

export default function FeedbackStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen name="feedback" options={{ headerShown: true, title:'Feedback'}} />
    </Stack>
  );
}