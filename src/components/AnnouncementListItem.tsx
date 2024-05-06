import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import { Announcement } from '../types';
import { Link, useSegments } from 'expo-router';
import { useColorScheme } from 'react-native';

// Define a TypeScript type for the props of ModuleListItem component
type AnnouncementListItemProps = {
    announcements: Announcement;
}



//Define a functional component contain each modules
const AnnouncementListItem = ({ announcements }: AnnouncementListItemProps) => {

const segments = useSegments();
//console.log(segments);

    return (
        <Link href={`/${segments[0]}/announcement/${announcements.id}`as  `${string}:${string}`} asChild>
            
        
            <Pressable style={styles.container}>

                <Text style={styles.title}>{announcements.title}</Text>

                <View style={styles.desc }>
                    <Text style={styles.sender}>Sender: {announcements.sender}</Text>
                    <Text style={styles.date}>{announcements.date}</Text>

                </View>
                <View style={styles.separator} />



            </Pressable>
        </Link>
    );
}

export default AnnouncementListItem;

const styles = StyleSheet.create({
    container: {
        //width: 90,
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        //backgroundColor: 'white',
        paddingLeft: 25,
        paddingRight: 25,
        //borderRadius:15,
        marginTop: 15,
        //marginBottom: 12,
        //padding: 10,

    },
    desc:{
        justifyContent: 'space-around', 
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,
        
    },
    title: {
        fontSize: 15,
        fontWeight: '700',


        //alignItems: 'center',
    },
    separator: {
        //marginVertical: 30,
        height: 1,
        //width: '80%',
        backgroundColor: 'black',
    },
    sender: {
        fontSize: 12,
        fontWeight: '600',
        flex: 1,
        color: '#111111',
    },
    date: {
        fontSize: 12.5,
        fontWeight: '600',
        color: '#111111',
    }

});
