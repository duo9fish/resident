import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';

//import announcements from '@assets/data/announcement';
// Importing the ModuleListItem component from its relative path
import FeedbackListItem from '@/components/FeedbackListItem';
import { useFeedbackList } from '@/api/feedbacks';

export default function FeedbackScreen() {
  const { data: feedbacks, error, isLoading } = useFeedbackList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch feedback</Text>
  }

  return (
    <View >
      <FlatList
        data={feedbacks}
        style={{ backgroundColor: 'white', }}
        //render all the item from module data
        renderItem={({ item }) => <FeedbackListItem feedbacks={item} />}
      //numColumns={2}
      //contentContainerStyle={{ gap: 10 }}
      />

    </View>
  );
}

