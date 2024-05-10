import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

import { useFacility, useUpdateFacility } from '@/api/facilities';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from '@/components/RemoteImage';
import Button from '@/components/Button';


// Feedback Details Page

const FacilityDetailScreen = () => {


    //access the specific announcement which user want to read
    const { facility_id: idString } = useLocalSearchParams();
    //const facility_id = parseFloat(typeof idString == 'string' ? idString : idString[0])

    //Safely parse the announcement ID from query parameters
    let facility_id = 0; // Default value if no valid id is found
    if (Array.isArray(idString)) {
        facility_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        facility_id = parseFloat(idString);
    }
    const { data: facility, error, isLoading } = useFacility(facility_id);
    const { mutate: updateFacility } = useUpdateFacility();

    const defaultImage = 'null';



    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch facility</Text>
    }
    if (!facility) {
        return <Text>facility Not Found</Text>
    }

     //Approve application
     const onApprove = async () => {       
        //Save in the database
        updateFacility({ facility_id,status:'Approved'}, {
            onSuccess: () => {
                //router.back();
            }
        });
    }

    //Approve application
    const onReject = async () => {       
        //Save in the database
        updateFacility({ facility_id,status:'Rejected'}, {
            onSuccess: () => {
                //router.back();
            }
        });
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Facility', headerRight: () => (
                        //ignore the error
                        <Link href={`/(user)/facility/update?facility=${facility_id}` as `${string}:${string}`} asChild>

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
                }} />
                
            <Stack.Screen options={{ title: "Facility" }} />
            <Text style={styles.title}>{facility.type}</Text>

            <View style={styles.desc}>
                <Text style={styles.title}>{facility.start_time }</Text>
                <Text style={styles.title}>{facility.end_time}</Text>
                <Text style={styles.date}>{facility.date}</Text>

            </View>
            <Text>ann: {facility.status}</Text>

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




export default FacilityDetailScreen;