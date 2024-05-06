import { FontAwesome } from '@expo/vector-icons'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {Link, Tabs, withLayoutContext } from 'expo-router'
import { Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function BillingListNavigator(){
    return(
       
        <TopTabs>
            <TopTabs.Screen name='billing' options={ {title:'Active' ,}}/>
        </TopTabs>

    ) 
}