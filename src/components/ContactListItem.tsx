import { Text, View, StyleSheet, Image, Pressable, TouchableOpacity, ScrollView, Linking } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';
import { useColorScheme } from 'react-native';
import RemoteImage from './RemoteImage';
import { FontAwesome5 } from '@expo/vector-icons';

// Define a TypeScript type for the props of ModuleListItem component
// type AnnouncementListItemProps = {
//     announcements: Announcement;
// }

type ContactListItemProps = {
    contacts: Tables<'contacts'>;
}

const handleCallPress = (phoneNumber: string) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                console.log("Phone calls are not supported on this device.");
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((error) => console.log("An error occurred:", error));
};

//Define a functional component contain each modules
const ContactListItem = ({ contacts }: ContactListItemProps) => {

    const segments = useSegments();
    //console.log(segments);

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>EMERGENCY</Text>
            </View>

            <View  style={styles.contactContainer}>
                <View style={styles.iconContainer}>
                    <FontAwesome5 name={contacts.icon} size={24} color="#fff" />
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{contacts.title}</Text>
                    {contacts.number && <Text style={styles.number}>{contacts.number}</Text>}
                </View>
                {contacts.number && (
                    <TouchableOpacity style={styles.callButton} onPress={() => handleCallPress(contacts.number)}>
                        <FontAwesome5 name="phone-alt" size={24} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>

        </ScrollView>
    );
}

export default ContactListItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    headerText: {
        color: '#1A1A1A',
        fontSize: 18,
        fontWeight: 'bold',
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1976D2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    iconContainer: {
        backgroundColor: '#0D47A1',
        padding: 8,
        borderRadius: 20,
        marginRight: 16,
    },
    detailsContainer: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    number: {
        color: '#fff',
        fontSize: 14,
    },
    callButton: {
        backgroundColor: '#0D47A1',
        padding: 8,
        borderRadius: 20,
    },



});
