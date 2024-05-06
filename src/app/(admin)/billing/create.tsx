
import { View, Text, StyleSheet, TextInput,Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams,useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

// Define the component for creating or updating billing
const CreateBillingScreen = () => {

    // State variables for title, sender, and content of the billing
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const[errors, setErrors] = useState('');// validation purpose
    //due date variable
    const [dueDate, setDueDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [status, setStatus] = useState('pending'); // Default status

    //Update/Edit the billing follow the id pass
    const {billing_id} = useLocalSearchParams();

    //to differentiate the purpose whether update or add an billing
    const isUpdating = !! billing_id;

    // Extract the date and time now
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });


    // Function to reset all input fields
    const resetFields = ()=>{
        setTitle('');
        setPrice('');
        setDueDate(new Date());
    }

    //Validate the input
    const validateInput = () => {
        setErrors(''); //reset input field that not validate
        if (!title) {
          setErrors('Title is required');
          return false;
        }
        if (!price) {
          setErrors('Price is required');
          return false;
        }
          //not number
        if (isNaN(parseFloat(price))) {
          setErrors('Price is not a number');
          return false;
        }
        if (!dueDate) {
            setErrors('Due Date is required');
            return false;
          }
          
        return true;
      };
    
    const onSubmit = ()=>{
        if(isUpdating) {
            onUpdateCreate();
        }else {
            onCreate();
        }
    }

    //add new Biling
    const onCreate = () => {
        if(!validateInput()){
            return;
        }

        console.warn('Creating billing', title, time, dueDate.toISOString());
        resetFields(); //Resets fields after creation

        // Save in the database

    }

    //Edit/Update announcement
    const onUpdateCreate = () => {
        if(!validateInput()){
            return;
        }

        console.warn('Updating billing');
        resetFields(); //Resets fields after creation
    }
    
    //Delete
    const onDelete=()=> {
       console.warn('DELETE!');
    };
    //COnfirmDelete
    const confirmDelete=()=> {
       Alert.alert('Confirm','Confirm to delete this billing?', [
        {text: 'Cancel'},
        {
            text: 'Delete',
            style:'destructive',
            
            onPress: onDelete,
        },

       ]);
    };

    //Render UI
    return (
        <View style={styles.container}>
            
            <Stack.Screen options={{title: isUpdating ? 'Update Biling':'Add Billing'}}/> 
            

            {/* Billing Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle} //Updates title state on change
                placeholder='Title'
                style={styles.input}
            />

            {/* Billing Price */}
            <Text style={styles.label}>Price</Text> 
            <TextInput
                value={price}
                onChangeText={setPrice} //Updates sender state on change
                placeholder='Price'
                style={styles.input}
            />

            
             {/* Due Date Picker and Icon */}
             <Text style={styles.label}>Due Date</Text> 
            <View style={styles.datePickerContainer}>
                <Text style={styles.input}>{dueDate.toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.icon}>
                    <Icon name="calendar" size={24} color={Colors.light.tint} />
                    
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={dueDate}
                        mode="date"
                        display="calendar"
                        style={{}}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            
                            if (selectedDate) {
                                setDueDate(selectedDate);
                            }
                        }}
                    />
                )}
            </View>

            {/* Set Status     */}
            <Text style={styles.label}> Status</Text> 
            <Picker selectedValue={status} onValueChange={itemValue => setStatus(itemValue)} style={styles.input}>
                <Picker.Item label="Pending" value="pending" />
                <Picker.Item label="Paid" value="paid" />
                <Picker.Item label="Cancelled" value="cancelled" />
            </Picker>
            

            {/* error Message for invalid input */}
            <Text style={{color:'red'}}>{errors}</Text>
            
            <Button onPress={onSubmit} text={isUpdating ? 'Update': 'Create'} />


        
            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>
            )}
        </View>
    )
}

//Style
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 10,
        
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'black',
        fontSize: 16,

    },
    textButton:{
        alignSelf:'center',
        fontWeight:'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    datePickerContainer: {
        flexDirection: 'row',
        
        alignItems: 'center',
        backgroundColor: 'white',
    },
    dateDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icon: {
        marginLeft: 10,
        backgroundColor: 'white',
    }
})

export default CreateBillingScreen;