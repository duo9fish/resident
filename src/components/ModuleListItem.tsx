import { Text, View, StyleSheet, Image, Pressable, Linking  } from 'react-native';
import React from 'react';
import { Module } from '../types';
import { Link, useSegments,  } from 'expo-router';

// Define a TypeScript type for the props of ModuleListItem component
type ModuleListItemProps = {
  module: Module;
}

//const router = useRouter();

//default image
export const defaultImage = 'https://i.imgur.com/RbQGLZK.png';

//Define a functional component contain each modules
const ModuleListItem = ({ module }: ModuleListItemProps) => {

  const segments = useSegments();
    console.log(segments);

  return (
    
    // <Link href={module.link} asChild>
    <Link href={`/${segments[0]}/${module.link}` as  `${string}:${string}`} asChild>

    
   
      

      <Pressable style={styles.container}>
        <Image source={{ uri: module.image || defaultImage }} style={styles.image} />
        <Text style={styles.title}>{module.name}</Text>



      </Pressable>
    </Link>
  );
}

export default ModuleListItem;

//remove to index
// export default function ModuleScreen() {
//   return (

//     <View >
//       <ModuleListItem module={modules[0]}/>
//       <ModuleListItem module={modules[2]}/>


//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    width: 90,
    //flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
    //backgroundColor: 'white',
    // paddingLeft: 10,
    // paddingRight: 10,
    //borderRadius:15,
    //marginTop: 15,
    //marginBottom: 15,
    //padding: 10,

  },
  title: {
    fontSize: 15,
    fontWeight: '400',


    //alignItems: 'center',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {

    width: 38,
    height: 70,

  }
});
