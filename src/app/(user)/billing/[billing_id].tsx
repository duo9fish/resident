import { Link, Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import billings from '@assets/data/billing';
import Button from '@/components/Button';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

import { useBilling } from '@/api/billings';

// Announcement Details Page

const BillingDetailScreen = () => {

    //access the specific billing which user want to read
    const { billing_id:idString } = useLocalSearchParams();
    const billing_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    const { data: billing, error, isLoading } = useBilling(billing_id);

    const addToPayment = () => {
        if (!billing) {
            return;
        }
        //console.warn("Adding to Payment", billing)
        //router.push('/cart');
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
                    title: 'Billing'
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