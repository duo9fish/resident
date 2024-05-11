import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

import { useFeedback } from '@/api/feedbacks';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from '@/components/RemoteImage';


// Feedback Details Page

const FeedbackDetailScreen = () => {


    //access the specific announcement which user want to read
    const { feedback_id: idString } = useLocalSearchParams();
    const feedback_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    const { data: feedback, error, isLoading } = useFeedback(feedback_id);

    const defaultImage = 'null';



    if (isLoading) {
        return <ActivityIndicator />
    }

    if (error) {
        return <Text>Failed to fetch feedbacks</Text>
    }
    if (!feedback) {
        return <Text>Feedback Not Found</Text>
    }

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Feedback',  headerRight: () => (
                        //ignore the error
                        <Link href={`/(user)/feedback/update?feedback_id=${feedback_id}` as `${string}:${string}`} asChild>

                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="pencil"
                                        size={25}
                                        color={Colors.dark.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                    headerStyle: {
                        backgroundColor: Colors.light.tint,
                    },
                    headerTintColor: '#FFFFFF', // Change the title (word) color
                }} />
                
            <Stack.Screen options={{ title: feedback?.title }} />
            <Text style={styles.title}>{feedback.category}</Text>
            <Text style={styles.title}>{feedback.title}</Text>
            <RemoteImage path={feedback?.image || defaultImage} fallback={defaultImage} style={styles.image}/>
            <View style={styles.desc}>
                <Text style={styles.sender}>Id: {feedback.feedback_id}</Text>
                <Text style={styles.date}>Date: {feedback.date}</Text>

            </View>
            <Text style={styles.content}>Status: {feedback.status}</Text>
            
            <Text style={styles.content}>Comment: {feedback.comment}</Text>
            <Text style={styles.content}>Remark: {feedback.remarks}</Text>

            {/* Only show the solution if status is "processed" */}
            {feedback.status === 'Processed' && (
                <Text style={styles.content}>Solution received :{feedback.solution}</Text>
            )}
            

        </View>

    )
}

const styles = StyleSheet.create({
    container: {},
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginTop: 5,
        marginBottom: 15,
    },
    desc: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,

    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    sender: {
        fontSize: 17,
        fontWeight: '600',
        flex: 1,
        color: '#444',
        marginBottom: 5,
        marginLeft: 20,
    },
    date: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        marginRight: 15,
    },
    com: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    content: {
        fontSize: 16,
        lineHeight: 22,
        marginHorizontal: 20, // Add horizontal margin
        marginVertical: 10, // Add vertical margin
        color: '#333',
    },
})




export default FeedbackDetailScreen;
