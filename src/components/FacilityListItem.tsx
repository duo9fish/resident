import { Text, View, StyleSheet, Image, Pressable } from 'react-native';
import React from 'react';
import {  Tables } from '../types';
import { Link, useSegments } from 'expo-router';

type FacilityListItemProps = {
    facilities: Tables<'facilities'>;
}

//Define a functional component contain each modules
const FacilityListItem = ({ facilities }: FacilityListItemProps) => {

const segments = useSegments();

    return (
        <Link href={`/${segments[0]}/facility/${facilities.facility_id}`as  `${string}:${string}`} asChild>
            
        
            <Pressable style={styles.container}>

                <Text style={styles.title}>{facilities.type}</Text>

                <View style={styles.desc }>
                    <Text style={styles.sender}>Sender: {facilities.date}</Text>
                    <Text style={styles.sender}>Sender: {facilities.start_time}</Text>
                    <Text style={styles.date}>{facilities.end_time}</Text>
                </View>

                <Text style={styles.title}>status: {facilities.status}</Text>

                <View style={styles.separator} />



            </Pressable>
        </Link>
    );
}

export default FacilityListItem;

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
