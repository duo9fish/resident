import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, Pressable, ActivityIndicator, Alert } from 'react-native';

import billings from '@assets/data/billing';
import Button from '@/components/Button';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { initialisePaymentSheet, openPaymentSheet } from '@/lib/stripe'
import { useBilling } from '@/api/billings';
import { presentPaymentSheet } from '@stripe/stripe-react-native';

// Announcement Details Page

const BillingDetailScreen = () => {

    //access the specific billing which user want to read
    const { billing_id:idString } = useLocalSearchParams();
    const billing_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    
    const { data: billing, error, isLoading } = useBilling(billing_id);
   
    // const checkOut = async (price: number) => {
    //     await initialisePaymentSheet(Math.floor(price * 100));
        
    //     await openPaymentSheet();
    //     console.log(error);
    
    // }
    
    const addToPayment = () => {
        if (!billing) {
            return;
        }
        //checkOut(billing.price);
        Alert.alert("Payment Successful");
        
    }


    const defaultImage = 'null';

    if (isLoading) {
        return <ActivityIndicator />
    }

    if (!billing) {
        return <Text>Billing Not Found</Text>
    }

    return (

        <View style={{ backgroundColor: 'white' }}>
             <Stack.Screen
                options={{
                    title: 'Billing', headerTintColor: '#FFFFFF', headerStyle: {backgroundColor: Colors.light.tint,// Change this line with your desired color
                },
                }} />
            <Stack.Screen options={{ title: billing?.title }} />
            <Text>ID: {billing_id}</Text>

            <Text style={styles.title}>MYR {billing.price}</Text>

            <Text style={styles.title}>{billing.title}</Text>



            <Button onPress={addToPayment} text="Pay Now"></Button>


        </View>

    )
}

const styles = StyleSheet.create({
    container: {},
    image: {
        //height: 40,
        width: '100%',
        aspectRatio: 1,
    },
    desc: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 15,

    },
    title: {
        fontSize: 15,
        //fontWeight: '700',


        //alignItems: 'center',
    },
    sender: {
        //fontSize: 12,
        //fontWeight: '600',
        flex: 1,
        color: '#111111',
    },
    date: {
        //fontSize: 12.5,
        //fontWeight: '600',
        color: '#111111',
    }
})




export default BillingDetailScreen;
