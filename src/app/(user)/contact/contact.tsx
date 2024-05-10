import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

//test
const ContactList = () => {
  const contactData = [
    {
      id: 1,
      title: 'PV12 Management',
      icon: 'phone-alt',
      number: '03-4145 0250',
      category: 'EMERGENCY',
    },
    {
      id: 2,
      title: 'Police Setapak',
      icon: 'car',
      number: '03-4023 2222',
      category: 'EMERGENCY',
    },
    {
      id: 3,
      title: 'Columbia Asia Hospital Setapak',
      icon: 'hospital',
      number: '03-4145 9999',
      category: 'GENERAL',
    },
    {
      id: 4,
      title: 'Malaysian Red Crescent',
      icon: 'plus-circle',
      number: '03-2142 8122',
      category: 'GENERAL',
    },
    {
      id: 5,
      title: 'Malaysian Red Crescent',
      icon: 'plus-circle',
      number: '03-2141 8227',
      category: 'GENERAL',
    },
    {
      id: 6,
      title: 'Civil Defence Ambulance',
      icon: 'ambulance',
      number: '03-2687 1400',
      category: 'GENERAL',
    },
    {
      id: 7,
      title: 'Fire Fighting Setapak',
      icon: 'fire-extinguisher',
      number: '03-4023 5544',
      category: 'GENERAL',
    },
  ];

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
      {contactData.map((contact) => (
        <View key={contact.id} style={styles.contactContainer}>
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
      ))}
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