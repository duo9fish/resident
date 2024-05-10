import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useContactList } from '@/api/contacts'; // Make sure to import the useContactList hook

const ContactList = () => {
  const { data: contacts, error, isLoading } = useContactList(); // Use the useContactList hook to fetch contacts

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>EMERGENCY</Text>
      </View>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error.message}</Text>
      ) : (
        contacts?.map((contact) => (
          <View key={contact.contact_id} style={styles.contactContainer}>
            <View style={styles.iconContainer}>
              <FontAwesome5 name={contact.icon} size={24} color="#fff" />
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{contact.title}</Text>
              {contact.number && <Text style={styles.number}>{contact.number}</Text>}
            </View>
            {contact.number && (
              <TouchableOpacity style={styles.callButton} onPress={() => handleCallPress(contact.number)}>
                <FontAwesome5 name="phone-alt" size={24} color="#fff" />
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

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

export default ContactList;
