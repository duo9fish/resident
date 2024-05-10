import { Stack } from 'expo-router';

export default function AnnouncementStack() {
    return (
        <Stack>
            {/* Header Name*/}
            <Stack.Screen 
                name="announcement" 
                options={{
                    title: 'Announcement',
                    headerStyle: {
                        backgroundColor: '#2EAED1', // Change this to the color you want
                    },
                    headerTintColor: 'white', // Change this to the color you want for the text
                }}
            />
        </Stack>
    );
}
