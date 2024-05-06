import { FlatList, View, Text, Image } from 'react-native';

import React from 'react';

import billings from '@assets/data/billing';
// Importing the ModuleListItem component from its relative path
import BillingListItem from '@/components/BillingListItem';

export default function BillingScreen() {
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

