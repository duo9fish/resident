import { Stack } from 'expo-router';

import Colors from '@/constants/Colors';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen name="list" options={{ headerShown: true, title:'Visitor', 
          headerStyle: {
            backgroundColor: Colors.light.tint, // Change the header background color
          },
          headerTintColor: '#FFFFFF', // Change the title (word) color
        }} />
    </Stack>
  );
}
