import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '../../../constants/Colors';
import { useColorScheme } from '@components/useColorScheme';
import { useClientOnlyValue } from '@components/useClientOnlyValue';

import { Stack } from 'expo-router'

// export default function AnnouncementStack() {
//     return(
//         <Stack>
//             {/* Header Name*/}
//             <Stack.Screen name="announcement" options={{title:'Announcement'}}/>
//         </Stack>
//     )
// }

export default function AnnouncementStack() {
    return (
        <Stack screenOptions={{

        }}>

            {/*Announcement Header*/}
            <Stack.Screen name="profile"
                options={{
                    title: 'Profile'
                    // headerRight: () => (
                    //     <Link href="/(admin)/announcement/create" asChild>
                    //         <Pressable>
                    //             {({ pressed }) => (
                    //                 <FontAwesome
                    //                     name="plus-square-o"
                    //                     size={25}
                    //                     color={Colors.light.tint}
                    //                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    //                 />
                    //             )}
                    //         </Pressable>
                    //     </Link>
                    // ),
                }} />

{/* <Stack.Screen name="create"
                options={{
                    title: 'Edit', headerShown: true
                    
                }} /> */}


            {/* <Stack.Screen name="[announcement_id]"
                options={{
                    title: 'Announcement', headerRight: () => (
                        <Link href="/(admin)/announcement/create" asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    )
                }} /> */}
        </Stack>

    );
}