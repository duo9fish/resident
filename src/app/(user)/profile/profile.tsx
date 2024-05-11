import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { useAuth } from '@/providers/AuthProvider';
import Avatar from '@/components/Avatar';



const ProfileScreen = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState('');
  const [fullName, setFullname] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [unitNo, setUnitNo] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
 
  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
        setLoading(true);
        if (!session?.user) throw new Error('No user on the session!');

        const { data, error, status } = await supabase
            .from('profiles')
            .select(`username, website, avatar_url, full_name,unit_no, phone_no`)
            .eq('id', session?.user.id)
            .single();
        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            setUsername(data.username || '');
            setWebsite(data.website || '');
            setAvatarUrl(data.avatar_url || '');
            setFullname(data.full_name || '');
            setUnitNo(data.unit_no || ''); // Set the unit number
  setPhoneNo(data.phone_no || ''); // Set the phone number
        }
    } catch (error) {
        if (error instanceof Error) {
            Alert.alert(error.message);
        }
    } finally {
        setLoading(false);
    }
}

  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
    // Navigate to the EditProfileScreen or show a modal for editing
    router.push('(user)/profile/create')
  };

  return (
    
    <View style={styles.container}>
      <View style={styles.header}>
      {/* <Image style={{ width: 110, height: 110 }} source={{ uri: avatarUrl}} /> */}
      <Avatar
          size={200}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            ;
          }}
          showUploadButton={false} 
        />
        {/* <RemoteImage 
                path={avatarUrl || avatarUrl} 
                fallback={avatarUrl} 
                style={styles.image}
            /> */}
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="pencil" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      

      <View style={styles.userInfo}>
        <Text style={styles.name}>{fullName}</Text>
        <Text style={styles.unit}>Unit: {unitNo}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.email}>Email: {session?.user?.email}</Text>
        <Text style={styles.detail}>Phone No: {phoneNo}</Text>
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
    textAlign : 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 50,
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
  image: {
    width: '100%',
    height: 300, 
    resizeMode: 'contain',
},
});

export default ProfileScreen;
