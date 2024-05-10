import Colors from '@/constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import {Link, Stack, Tabs} from 'expo-router'
import { Pressable } from 'react-native'


export default function AnnouncementStack() {
    return(
        <Stack>
            
            {/*Billing Header*/}
            {/* <Stack.Screen name="billing"
                options={{
                    title: 'Billing', headerRight: () => (
                        <Link href="/(admin)/billing/create" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="plus-square-o"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }} /> */}
            <Tabs.Screen name='list' options={{ title: 'Billing',href: null,headerStyle: { backgroundColor: Colors.light.tint,}, headerTintColor: 'white', headerShown: true, headerRight: () => (
                        <Link href="/(admin)/billing/create" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="plus-square-o"
                                        size={25}
                                        color={Colors.dark.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                                
                            </Pressable>
                        </Link>
                        
                    )}} />
                
        </Stack>
    )
}
