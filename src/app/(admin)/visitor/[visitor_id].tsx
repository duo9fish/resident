import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image } from 'react-native';
import { useVisitor, useUpdateVisitor } from '@/api/visitors';
import { Link, Stack,useLocalSearchParams } from 'expo-router';
import Button from '@/components/Button'; // Assuming Button is a styled component

const VisitorDetailScreen = () => {
    const [status, setStatus] = useState('');

    const { visitor_id: idString } = useLocalSearchParams();
    let visitor_id = parseFloat(Array.isArray(idString) ? idString[0] : idString || '0');
    const { data: visitor, error, isLoading } = useVisitor(visitor_id);
    const { mutate: updateVisitor } = useUpdateVisitor();

    if (isLoading) return <ActivityIndicator size="large" color="#0000ff" />;

    if (error) return <Text style={styles.errorText}>Failed to fetch visitor details.</Text>;

    if (!visitor) return <Text style={styles.errorText}>Visitor not found.</Text>;

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
                    title: 'Visitor', headerStyle: {
                        backgroundColor: '#2EAED1',
                    },
                    headerTintColor: '#FFFFFF', // Change the title (word) color// headerRight: () => (
                        //     //ignore the error
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
                
        <Text style={styles.header}>Visitor Details</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Name: {visitor.name}</Text>
                <Text style={styles.infoText}>Date: {visitor.date}</Text>
                <Text style={styles.infoText}>Vehicle PlatNo: {visitor.vehicle_number || 'Walk-in Visitor'}</Text>
                <Text style={styles.infoText}>Status: {visitor.status}</Text>
                <Text style={styles.infoText}>Type: {visitor.type}</Text>
            </View>
            {visitor.status === 'Pending' && (
                <Button onPress={onApprove} text={'Approve'} />
                
            )}
            {visitor.status === 'Pending' && (
                <Button onPress={onReject} text={'Reject'} />
                
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 20,
        marginTop: 10
    },
    errorText: {
        color: 'red',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: '100%',
        height: 200, // Fixed height, adjust as necessary
        marginBottom: 20
    },
    infoContainer: {
        marginBottom: 20,
        marginLeft: 20
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    }
});

export default VisitorDetailScreen;
