import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

import { useVisitor } from '@/api/visitors';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from '@/components/RemoteImage';


// Feedback Details Page

const VisitorDetailScreen = () => {


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
    //const { mutate: updateVisitor } = useUpdateVisitor();

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

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Visitor', headerStyle: {
                        backgroundColor: Colors.light.tint,
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
    },
    infoText: {
        fontSize: 16,
        marginBottom: 10,
        lineHeight: 24
    },
    infoContainer: {
        marginBottom: 20,
        marginLeft: 20
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        marginLeft: 20,
        marginTop: 10
    },
})




export default VisitorDetailScreen;
