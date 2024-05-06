import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import { Link, Redirect } from 'expo-router';
import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/lib/supabase';

const index = () => {
  const {session, loading, isAdmin} = useAuth();

  if(loading){
    return<ActivityIndicator/>
  }

  //if user is not sign in, redirect to sign in page
  if(!session){
    return <Redirect href={'/sign-in'}/>
  }

  //After sign in, if not admin, redirect to user
  if(!isAdmin){
    return <Redirect href={'/(user)'}/>
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 10 }}>
      <Link href={'/(user)'} asChild>
        <Button text="User" />
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin" />
      </Link>
      {/* <Link href={'/sign-in'} asChild>
        <Button text="Sign in" />
      </Link> */}

      <Button onPress={()=> supabase.auth.signOut}  text="Sign Out" />
    </View>
  );
};

export default index;