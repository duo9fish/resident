import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen name="list" options={{ headerShown: true, title:'Facility', headerStyle: {
                        backgroundColor: Colors.light.tint,
                    },
                    headerTintColor: '#FFFFFF',}} />
    </Stack>
  );
}
