import { Stack, router, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';

import billings from '@assets/data/billing';
import Button from '@/components/Button';

// Announcement Details Page

const BillingDetailScreen = () => {

    //access the specific announcement which user want to read
    const { billing_id } = useLocalSearchParams();
    const billing = billings.find((b) => b.id.toString() == billing_id)

    const addToPayment = () => {
        if (!billing) {
            return;
        }
        console.warn("Adding to Payment", billing)
        //router.push('/cart');
    }



    if (!billing) {
        return <Text>Billing Not Found</Text>
    }

    return (

        <View style={{ backgroundColor: 'white' }}>
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