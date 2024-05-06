import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

//import announcements from '@assets/data/announcement';

import { useAnnouncement } from '@/api/announcements';


// Announcement Details Page

const AnnouncementDetailScreen = () => {

    //access the specific announcement which user want to read
    const { announcement_id: idString } = useLocalSearchParams();
    const announcement_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    const { data: announcement, error, isLoading } = useAnnouncement(announcement_id);

    //const announcement = announcements.find((a) => a.id.toString() == announcement_id) //dummy

    const defaultImage = 'https://i.imgur.com/RbQGLZK.png';


    if (!announcement) {
        return <Text>Announcement Not Found</Text>
    }

    if (isLoading) {
        return <ActivityIndicator />
      }
    
      if (error) {
        return <Text>Failed to fetch announcements</Text>
      }
    

    return (
        <View>
            <Stack.Screen options={{ title: announcement?.title }} />
            <Text style={styles.title}>{announcement.title}</Text>

            <View style={styles.desc}>
                <Text style={styles.sender}>Sender: {announcement.sender}</Text>
                <Text style={styles.date}>{announcement.date}</Text>

            </View>
            <Text>ann: {announcement_id}</Text>
            <Text>{announcement.content}</Text>
            <Image source={{ uri: announcement.image || defaultImage }} style={styles.image}></Image>

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




export default AnnouncementDetailScreen;