
import { Alert } from "react-native";
import { supabase } from "./supabase"
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";


const fetchPaymentSheetParams = async (price: number) =>{
    const{data, error}=await supabase.functions.invoke('payment-sheet',{body: {price}})
    if(data){
        return data;
    }
    Alert.alert('Error fetching payment sheet')
    return {};
}

export const initialisePaymentSheet = async (price:number)=>{
    console.log("Initialising payment sheet, for: ", price);
    const {paymentIntent,publishableKey} = await fetchPaymentSheetParams(price);
    
    if(!paymentIntent|| !publishableKey) return;

    await initPaymentSheet({
        merchantDisplayName: "PV12 Condominium",
        paymentIntentClientSecret: paymentIntent,
        defaultBillingDetails:{
            name: 'lun ',
        },
    })
}

export const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();
  
    if (error) {
      console.log(error.message);
      return false;
    }
    return true;
  };