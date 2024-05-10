import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image, ScrollView } from 'react-native';
import React from 'react';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

const AboutUsScreen = () => {
  return (
    <ScrollView style={styles.container}>
       <Image
         source={{ uri: 'https://maxihomes.com.my/wp-content/uploads/2019/11/PV12-Platinum-Lake-Setapak396x298-1.jpg' }} // Replace with your actual image URL
        style={styles.Image}
        resizeMode="cover" // This prop determines how to resize the image when the frame doesn't match the raw image dimensions
      />
      <Text style={styles.heading}>Welcome to Our Condominium App!</Text>
      <Text style={styles.text}>
        Our app is designed to enhance the living experience of our residents by providing a seamless interface for managing all aspects of condominium living.
      </Text>

      <Text style={styles.subHeading}>Our Mission</Text>
      <Text style={styles.text}>
        We aim to empower our residents with tools that make condominium living not just convenient but truly delightful.
      </Text>

      <Text style={styles.subHeading}>Key Features</Text>
      <Text style={styles.text}>1. Facility Booking: Reserve amenities easily from your device.</Text>
      <Text style={styles.text}>2. Maintenance Requests: Submit and track maintenance requests within seconds.</Text>
      <Text style={styles.text}>3. Community Notices: Stay updated with the latest community news and events.</Text>
      <Text style={styles.text}>4. Document Access: Retrieve condominium documents, like policies and meeting minutes, anytime.</Text>
      <Text style={styles.text}>5. Emergency COntact: Can directly call to management, fire fighter, hospital and polis.</Text>
      <Text style={styles.text}>6. Visitor Pass Login: Let resident request for their friend as a vistor to come into PV12 Condominium.</Text>

      <Text style={styles.subHeading}>Meet Our Team</Text>
      <Text style={styles.text}>
        Behind our app is a team of dedicated professionals passionate about making your living experience the best it can be.
      </Text>

      <Text style={styles.subHeading}>Resident Testimonials</Text>
      <Text style={styles.text}>
        “The facility booking feature is a game-changer! It’s so easy to use and really helpful.” - Jane
      </Text>

      <Text style={styles.subHeading}>Looking Ahead</Text>
      <Text style={styles.text}>
        We're constantly working to bring new features and improvements. Stay tuned for more updates!
      </Text>

      <Text style={styles.subHeading}>Get in Touch</Text>
      <Text style={styles.text}>
        Have suggestions or need help? We’re just a message away. Reach out to us at support PV12Setapak@condo.com or call us at 555-1234.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24
  },
  Image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginTop: 5,
    marginBottom: 15,
  }
});

export default AboutUsScreen;
