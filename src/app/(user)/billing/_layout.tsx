import {Stack} from 'expo-router'

export default function AnnouncementStack() {
    return(
        <Stack>
            {/* Header Name*/}
            <Stack.Screen name="billing" options={{title:'Billing'}}/>
        </Stack>
    )
}