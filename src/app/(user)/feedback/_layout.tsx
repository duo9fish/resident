import {Stack} from 'expo-router'

export default function FeedbackStack() {
    return(
        <Stack>
            {/* Header Name*/}
            <Stack.Screen name="create" options={{title:'Feedback'}}/>
            
        </Stack>
    )
}