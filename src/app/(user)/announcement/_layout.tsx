import { Stack } from 'expo-router';
import Colors from '../../../constants/Colors';

export default function AnnouncementStack() {
    return (
        <Stack>
            {/* Header Name*/}
            <Stack.Screen 
                name="announcement" 
                options={{
                    title: 'Announcement',
                    headerStyle: {
                        backgroundColor: Colors.light.tint, // Change this to the color you want
                    },
                    headerTintColor: 'white', // Change this to the color you want for the text
                }}
            />
        </Stack>
    );
}
