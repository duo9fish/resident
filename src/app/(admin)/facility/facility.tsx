import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

//import announcements from '@assets/data/announcement';
// Importing the ModuleListItem component from its relative path
import FacilityListItem from '@/components/FacilityListItem';
import { useFacilityList } from '@/api/facilities';

export default function FacilityScreen() {
  const { data: facilities, error, isLoading } = useFacilityList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch facility</Text>
  }

  return (
    <View >
      <FlatList
        data={facilities}
        style={{ backgroundColor: 'white', }}
        //render all the item from module data
        renderItem={({ item }) => <FacilityListItem facilities={item} />}
      //numColumns={2}
      //contentContainerStyle={{ gap: 10 }}
      />

    </View>
  );
}

