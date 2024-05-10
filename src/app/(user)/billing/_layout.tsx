import {Stack} from 'expo-router'
import Colors from '@/constants/Colors';

export default function AnnouncementStack() {
    return(
        <Stack>
            {/* Header Name*/}
            <Stack.Screen name="billing" options={{title:'Billing', headerTintColor: '#FFFFFF', headerStyle: {backgroundColor: Colors.light.tint,// Change this line with your desired color
                },}}/>
        </Stack>
    )
}
