import { FlatList, View, Text, Image, Alert } from 'react-native';

import React, { useEffect, useState } from 'react';

import modules from '@assets/data/modules';
// Importing the ModuleListItem component from its relative path
import ModuleListItem from '@/components/ModuleListItem';
import { Session } from '@supabase/supabase-js';
import { useAuth } from '@/providers/AuthProvider';
import Avatar from '@/components/Avatar';
import { supabase } from '@/lib/supabase';



export default function ModuleScreen() {
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
  return (
    <View >

      <View style={{ flexDirection: 'row', backgroundColor: 'white', margin: 15 }}>
        {/*  Text */}
        <View style={{ justifyContent: 'space-around', flex: 2 / 3, margin: 10 }}>
          <Text>Welcome Back,</Text>
          <Text>Mr {fullName}</Text>
        </View>
        {/*  Image */}
        <View style={{ flex: 1 / 3, margin: 10 }}>
        <Avatar
          size={110}
          url={avatarUrl}
          onUpload={(url: string) => {
            setAvatarUrl(url);
            ;
          }}
          showUploadButton={false} 
        />
        </View>
      </View>


      <FlatList
        data={modules}
        style={{ margin: 15, backgroundColor: 'white', borderRadius: 10, paddingBottom: 15 }}
        //render all the item from module data
        renderItem={({ item }) => <ModuleListItem module={item} />}
        numColumns={4}
        contentContainerStyle={{ gap: 10 }}
      />

    </View>
  );
}

