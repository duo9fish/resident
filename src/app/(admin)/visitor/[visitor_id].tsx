import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable,  } from 'react-native';

import { useUpdateVisitor, useVisitor } from '@/api/visitors';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from '@/components/RemoteImage';
import Button from '@/components/Button'; // Import custom button
import { useState } from 'react';

// Feedback Details Page

const VisitorDetailScreen = () => {


    const [status, setStatus] = useState(' '); //set null

    //access the specific announcement which user want to read
    const { visitor_id: idString } = useLocalSearchParams();
    //const visitor_id = parseFloat(typeof idString == 'string' ? idString : idString[0])

    //Safely parse the announcement ID from query parameters
    let visitor_id = 0; // Default value if no valid id is found
    if (Array.isArray(idString)) {
        visitor_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        visitor_id = parseFloat(idString);
    }
    const { data: visitor, error, isLoading } = useVisitor(visitor_id);
    const { mutate: updateVisitor } = useUpdateVisitor();

    const defaultImage = 'null';



    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch visitor</Text>
    }
    if (!visitor) {
        return <Text>visitor Not Found</Text>
    }

    //Approve application
    const onApprove = async () => {       
        //Save in the database
        updateVisitor({ visitor_id,status:'Approved'}, {
            onSuccess: () => {
                //router.back();
            }
        });
    }

    //Approve application
    const onReject = async () => {       
        //Save in the database
        updateVisitor({ visitor_id,status:'Rejected'}, {
            onSuccess: () => {
                //router.back();
            }
        });
    }


    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Visitor', 
                    // headerRight: () => (
                    //     <Link href={`/(user)/visitor/update?visitor_id=${visitor_id}` as `${string}:${string}`} asChild>

                    //         <Pressable>
                    //             {({ pressed }) => (
                    //                 <FontAwesome
                    //                     name="pencil"
                    //                     size={25}
                    //                     color={Colors.light.tint}
                    //                     style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    //                 />
                    //             )}
                    //         </Pressable>
                    //     </Link>
                    // )
                }} />
                
            <Stack.Screen options={{ title: "Handle Visitor Application" }} />
            <Text style={styles.title}>{visitor.name}</Text>

            <View style={styles.desc}>
                <Text style={styles.title}>{visitor.vehicle_number ? "Vehicle number" : ' '}</Text>
                <Text style={styles.title}>{visitor.vehicle_number ? visitor.vehicle_number : 'Walk-in Visitor'}</Text>
                <Text style={styles.date}>{visitor.date}</Text>

            </View>
            <Text>ann: {visitor.status}</Text>
            <Text>{visitor.type}</Text>


            <Button onPress={onApprove} text={'Approve'} />
            <Button onPress={onReject} text={'Reject'} />
        </View>


    )
}

const styles = StyleSheet.create({
    container: {},
    image: {
        //height: 40,
        width: '100%',
        aspectRatio: 1,
    },
    desc: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,

    },
    title: {
        fontSize: 15,
        //fontWeight: '700',


        //alignItems: 'center',
    },
    sender: {
        //fontSize: 12,
        //fontWeight: '600',
        flex: 1,
        color: '#111111',
    },
    date: {
        //fontSize: 12.5,
        //fontWeight: '600',
        color: '#111111',
    }
})




export default VisitorDetailScreen;