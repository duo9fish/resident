import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

//import announcements from '@assets/data/announcement';
// Importing the ModuleListItem component from its relative path
import VisitorListItem from '@/components/VisitorListItem';
import { useVisitorList } from '@/api/visitors';

export default function VisitorScreen() {
  const { data: visitors, error, isLoading } = useVisitorList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch visitor</Text>
  }

  return (
    <View >
      <FlatList
        data={visitors}
        style={{ backgroundColor: 'white', }}
        //render all the item from module data
        renderItem={({ item }) => <VisitorListItem visitors={item} />}
      //numColumns={2}
      //contentContainerStyle={{ gap: 10 }}
      />

    </View>
  );
}

