import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { useProfileList } from '@/api/profiles';


const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: profiles, error, isLoading } = useProfileList();


  

  const handleEditProfile = () => {
    setIsEditing(true);
    // Navigate to the EditProfileScreen or show a modal for editing
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Image style={{ width: 110, height: 110 }} source={{ uri: 'https://i.mydramalist.com/274dPc.jpg' }} />
      
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.name}>{profiles.id}</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
        <Text style={styles.unit}>Unit 123</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.detail}>Phone: 123-456-7890</Text>
      </View>

      <Button title='Sign Out' onPress={async ()=>await supabase.auth.signOut()}/>

    </View>
    



  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editButton: {
    marginLeft: 16,
    padding: 8,
  },
  userInfo: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  unit: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default ProfileScreen;