import { Tabs, withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SafeAreaView } from 'react-native-safe-area-context';
import {  Text, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function VisitorListNavigator() {
  return (
    
      <TopTabs >
        <TopTabs.Screen name="create" options={{ title: 'Visitor' }} />
        <TopTabs.Screen name="visitor" options={{ title: 'Visitor History' }} />
      </TopTabs>

  );
}