import { FlatList, View, Text, Image, ActivityIndicator } from 'react-native';

import React from 'react';

//import billings from '@assets/data/billing';
// Importing the ModuleListItem component from its relative path
import BillingListItem from '@/components/BillingListItem';
import { useBillingList } from '@/api/billings';

export default function BillingScreen() {

  const { data: billings, error, isLoading } = useBillingList();

  if (isLoading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to fetch billings</Text>
  }

  

  return (
    <View >
      <FlatList
        data={billings}
        style={{  backgroundColor: 'white',}}
        //render all the item from module data
        renderItem={({ item }) => <BillingListItem billings={item} />}
        //numColumns={2}
        //contentContainerStyle={{ gap: 10 }}
      />
      
    </View>
  );
}

