import { Stack } from 'expo-router';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen name="visitor" options={{ headerShown: true, title:'Visitor', headerStyle: { backgroundColor: '#2EAED1',}}} />
    </Stack>
  );
}
