
import { View, Text, StyleSheet, TextInput, Image, Alert, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import { Redirect, Stack, router, useLocalSearchParams, useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Picker } from '@react-native-picker/picker';

import { useBilling, useDeleteBilling, useInsertBilling, useUpdateBilling, } from '@/api/billings';


// Define the component for creating or updating billing
const CreateBillingScreen = () => {

    // State variables for title, sender, and content of the billing
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState('');// validation purpose
    //due date variable
    const [dueDate, setDueDate] = useState(new Date());
    const [formattedDueDate, setFormattedDueDate] = useState(dueDate.toLocaleDateString()); // State for the formatted date string
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [status, setStatus] = useState('pending'); // Default status

    //Update/Edit the billing follow the id pass
    const { billing_id: idString } = useLocalSearchParams();

    let billing_id = 0; // Default value if no valid id is found
    if (Array.isArray(idString)) {
        billing_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        billing_id = parseFloat(idString);
    }

    //to differentiate the purpose whether update or add an billing
    const isUpdating = !!billing_id;

    const { mutate: insertBilling } = useInsertBilling();
    const { mutate: updateBilling } = useUpdateBilling();
    const { data: updatingBilling } = useBilling(billing_id);
    const { mutate: deleteBilling } = useDeleteBilling();

    // Extract the date and time now
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    useEffect(() => {
        if (updatingBilling) {
            setTitle(updatingBilling.title);
            setPrice(updatingBilling.price.toString());
            setStatus(updatingBilling.status);
            //setDueDate(updatingBilling.dueDate);
        }
    }, [updatingBilling]);


    // Function to reset all input fields
    const resetFields = () => {
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

    const onSubmit = () => {
        if (isUpdating) {
            onUpdateCreate();
        } else {
            onCreate();
        }

    }

    //add new Biling
    const onCreate = async () => {

        if (!validateInput()) {
            return;
        }

        insertBilling({ title, price, status, dueDate:formattedDueDate }, {
            onSuccess: () => {
                resetFields();
               
                router.back();
            }
        });

    }

    //Edit/Update announcement
    const onUpdateCreate = async () => {
        if (!validateInput()) {
            return;
        }

        //Save in the database
        updateBilling({ title, price, status, dueDate:formattedDueDate }, {
            onSuccess: () => {
                console.log(billing_id);
                resetFields();

                router.back();

            }

        });
    }

    //Delete
    const onDelete = () => {
        deleteBilling(billing_id, {
            onSuccess: () => {
                resetFields();
                router.back();
                router.back();
            },
        });
    };
    //COnfirmDelete
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Confirm to delete this billing?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',

                onPress: onDelete,
            },

        ]);
    };



    //Render UI
    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? 'Update Biling' : 'Add Billing' }} />


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
                                setDueDate(selectedDate); // Update the Date object
                                setFormattedDueDate(selectedDate.toLocaleDateString()); // Update the formatted date string
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
            <Text style={{ color: 'red' }}>{errors}</Text>

            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />



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
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
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