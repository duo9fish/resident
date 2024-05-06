import {Stack} from 'expo-router'

export default function AnnouncementStack() {
    return(
        <Stack>
            {/* Header Name*/}
            <Stack.Screen name="announcement" options={{title:'Announcement'}}/>
        </Stack>
    )
}