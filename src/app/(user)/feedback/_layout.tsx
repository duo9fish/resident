import { Stack } from 'expo-router';

export default function MenuStack() {
  return (
    <Stack>
      {/* <Stack.Screen name="index" options={{ title: 'Orders' }} /> */}
      <Stack.Screen
        name="list"
        options={{
          headerShown: true,
          title: 'Feedback',
          headerStyle: {
            backgroundColor: '#2EAED1', // Change the header background color
          },
          headerTintColor: '#FFFFFF', // Change the title (word) color
        }}
      />
    </Stack>
  );
}
