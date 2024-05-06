import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';

import React from 'react';
// Importing the ModuleListItem component from its relative path
import AnnouncementListItem from '@/components/AnnouncementListItem';
import { useAnnouncementList } from '@/api/announcements';

export default function AnnouncementScreen() {

  const { data: announcements, error, isLoading } = useAnnouncementList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch announcements</Text>
  }

  return (
    <View >
      <FlatList
        data={announcements}
        style={{  backgroundColor: 'white',}}
        //render all the item from module data
        renderItem={({ item }) => <AnnouncementListItem announcements={item} />}
        //numColumns={2}
        //contentContainerStyle={{ gap: 10 }}
      />
      
    </View>
  );
}

