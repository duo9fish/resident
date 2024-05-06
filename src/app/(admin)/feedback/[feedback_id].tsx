import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

import { useFeedback } from '@/api/feedbacks';

// Feedback Details Page

const FeedbackDetailScreen = () => {


    //access the specific announcement which user want to read
    const { feedback_id: idString } = useLocalSearchParams();
    const feedback_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    const { data: feedback, error, isLoading } = useFeedback(feedback_id);


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
        //redirect to resolve feedback page
        router.replace(`/(admin)/feedback/create?feedback_id=${feedback_id}` )
        // <View>
        //     <Stack.Screen
        //         options={{
        //             title: 'Feedback', headerRight: () => (
        //                 //ignore the error
        //                 <Link href={`/(user)/feedback/update?feedback_id=${feedback_id}` as `${string}:${string}`} asChild>

        //                     <Pressable>
        //                         {({ pressed }) => (
        //                             <FontAwesome
        //                                 name="pencil"
        //                                 size={25}
        //                                 color={Colors.light.tint}
        //                                 style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
        //                             />
        //                         )}
        //                     </Pressable>
        //                 </Link>
        //             )
        //         }} />
        //     <Stack.Screen options={{ title: feedback?.title }} />
        //     <Text style={styles.title}>{feedback.title}</Text>

        //     <View style={styles.desc}>
        //         <Text style={styles.sender}>id: {feedback.feedback_id}</Text>
        //         <Text style={styles.date}>{feedback.date}</Text>

        //     </View>
        //     <Text>ann: {feedback_id}</Text>
        //     <Text>{feedback.comment}</Text>
        //     <Image source={{ uri: feedback.image || defaultImage }} style={styles.image}></Image>

        // </View>

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




export default FeedbackDetailScreen;