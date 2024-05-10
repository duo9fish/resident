import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
// import announcements from '@assets/data/announcement';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAnnouncement } from '@/api/announcements';
import RemoteImage from '@/components/RemoteImage';
import { useState, useEffect } from 'react';

// Announcement Details Page

const AnnouncementDetailScreen = () => {

    //access the specific announcement which user want to read
    const { announcement_id: idString } = useLocalSearchParams();
    const announcement_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    const { data: announcement, error, isLoading } = useAnnouncement(announcement_id);

    //const announcement = announcements.find((a) => a.id.toString() == announcement_id)

    const defaultImage = 'null';
    const [hasImage, setHasImage] = useState(false);

    useEffect(() => {
        setHasImage(Boolean(announcement?.image));
    }, [announcement?.image]);

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (!announcement) {
        return <Text>Announcement Not Found</Text>
    }

    
    if (error) {
        return <Text>Failed to fetch announcements</Text>
    }
    
    const containerStyle = {
        ...styles.container,
        marginTop: hasImage ? 0 : -250, // Adjust the value as needed
      };

    return (
        <View>
            <Stack.Screen
                options={{
                    title: 'Announcement', headerRight: () => (
                        //direct to dynamic update announcement page
                        <Link href={`/(admin)/announcement/create?announcement_id=${announcement_id}`} asChild>
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
                    ),
                    headerStyle: {
                        backgroundColor: '#2EAED1',
                    },
                }} />
            <Stack.Screen options={{ title: announcement?.title }} />
            {hasImage && (
                <RemoteImage
                    path={announcement?.image || defaultImage}
                    fallback={defaultImage}
                    style={styles.image}
                />
            )}
            <Text style={styles.title}>{announcement.title}</Text>

            <View style={styles.desc}>
                <Text style={styles.sender}>Sender: {announcement.sender}</Text>
                <Text style={styles.date}>Date:{announcement.date}</Text>

            </View>
            <Text style={styles.ann}>ann: {announcement_id}</Text>
            <Text style={styles.content}>{announcement.content}</Text>

        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'contain',
        marginTop: 5,
        marginBottom: 15,
    },
    desc: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        marginBottom: 0,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    sender: {
        fontSize: 15,
        fontWeight: '600',
        flex: 1,
        color: '#444',
        marginBottom: 20,
        marginLeft: 20,
    },
    date: {
        fontSize: 15,
        color: '#666',
        fontWeight: '600',
        marginRight: 20,
    },
    content: {
        fontSize: 16,
        lineHeight: 22,
        marginHorizontal: 20, // Add horizontal margin
        marginVertical: 10, // Add vertical margin
        color: '#333',
    },
    errorMessage: {
        fontSize: 18,
        color: 'red',
    },
    ann: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10,
    },  
})

export default AnnouncementDetailScreen;
