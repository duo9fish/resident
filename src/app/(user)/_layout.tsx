import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '../../constants/Colors';
import { useColorScheme } from '@components/useColorScheme';
import { useClientOnlyValue } from '../../components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProvider';


// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {session} = useAuth();

  //redirect user if not authenticated
  if(!session){
    return <Redirect href={'/'}/>
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          //headerShown: false,
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
  {/* Hide modules from display*/ }
  <Tabs.Screen name='announcement' options={{href: null ,headerShown: false,}}/>
  <Tabs.Screen name='billing' options={{href: null ,headerShown: false,}}/>
  <Tabs.Screen name='feedback' options={{href: null ,headerShown: false,}}/>
  <Tabs.Screen name='visitor' options={{href: null ,headerShown: false,}}/>
  <Tabs.Screen name='facility' options={{href: null ,headerShown: false,}}/>
  
      
    </Tabs>
    
  );
}
