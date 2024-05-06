import { FlatList, View, Text, Image } from 'react-native';

import React from 'react';

import modules from '@assets/data/modules';
// Importing the ModuleListItem component from its relative path
import ModuleListItem from '@/components/ModuleListItem';

export default function ModuleScreen() {
  return (
    <View >

      <View style={{ flexDirection: 'row', backgroundColor: 'white', margin: 15 }}>
        {/*  Text */}
        <View style={{ justifyContent: 'space-around', flex: 2 / 3, margin: 10 }}>
          <Text>Welcome Back,</Text>
          <Text>Mr Cai Xu Kun</Text>
        </View>
        {/*  Image */}
        <View style={{ flex: 1 / 3, margin: 10 }}>
          <Image style={{ width: 110, height: 110 }} source={{ uri: 'https://i.mydramalist.com/274dPc.jpg' }} />
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

