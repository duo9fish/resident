
import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFacility, useDeleteFacility, useInsertFacility, useUpdateFacility } from '@/api/facilities';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '@/lib/supabase';
import Icon from 'react-native-vector-icons/FontAwesome';


// Define the component for creating or updating a feedback
const CreateFormScreen = () => {
    //Add remark
    // State variables for title, sender, and content of the announcement
    const [start_time, setStartTime] = useState(new Date());
    const [end_time, setEndTime] = useState(new Date());
    const [date, setDate] = useState(new Date());
    const [status, setStatus] = useState('Pending');
    const [type, setType] = useState('');
    const [no_of_pax, setNoOfPax] = useState('');

    const [formattedDate, setFormattedDate] = useState(date.toLocaleDateString()); // State for the formatted date string
    const [formattedStartTime, setFormattedStartTime] = useState(start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // State for the formatted date string
    const [formattedEndTime, setFormattedEndTime] = useState(end_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // State for the formatted date string
    const [showDatePicker, setShowDatePicker] = useState(false);

    

    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

    const [errors, setErrors] = useState('');// validation purpose

    //Update/Edit the announcement follow the id pass
    const { facility_id: idString } = useLocalSearchParams();
    let facility_id = 0;
    if (Array.isArray(idString)) {
        facility_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        facility_id = parseFloat(idString);
    }

    
    
    //to differentiate the purpose whether update or add an announcement
    const isUpdating = !!facility_id;

    const { mutate: insertFacility } = useInsertFacility();
    const { mutate: updateFacility } = useUpdateFacility();
    const { data: updatingFacility } = useFacility(facility_id);
    const { mutate: deleteFacility } = useDeleteFacility();


    useEffect(() => {
        if (updatingFacility) {
            //setName(updatingFacility.name);
            setType(updatingFacility.type || '');
            setStatus(updatingFacility.status|| '');
            setNoOfPax(updatingFacility.no_of_pax|| '');
        }
    }, [updatingFacility]);

    const router = useRouter();

    // Extract the date and time now
    const now = new Date();
    //const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const resetFields = () => {
        setType('');
        setStatus('Pending');
        setNoOfPax('');
        setDate(new Date());
        setStartTime(new Date());
        setEndTime(new Date());
    };

    //Validate the input
    const validateInput = () => {
        setErrors(''); //reset input field that not validate
        if (!no_of_pax) {
            setErrors('No of pax is required');
            return false;
        }
        if (isNaN(parseFloat(no_of_pax))) {
            setErrors('No of pax is not a number');
            return false;
        }
        if (!type) {
            setErrors('Type is required');
            return false;
        }
        return true;
    };

    const onSubmit = () => {
        if (isUpdating) {
            onUpdate();
        } else {
            onCreate();
        }
    }

    //Add new Announcement
    const onCreate = async () => {

        if (!validateInput()) {
            return;
        }

        // Save in the database
        insertFacility({ start_time:formattedStartTime, end_time:formattedEndTime, date:formattedDate, status, type, no_of_pax }, {
            onSuccess: () => {
                resetFields();
                Alert.alert('Success', 'Facility created successfully');
            }
        });

    };

    //Edit/Update announcement
    const onUpdate = async () => {
        if (!validateInput()) {
            return;
        }
        //Save in the database
        updateFacility({ facility_id, start_time:formattedStartTime, end_time:formattedEndTime, date:formattedDate, status, type, no_of_pax}, {
            onSuccess: () => {
                console.log(facility_id);
                resetFields();
                router.back();

            }
            
        });
    }


    //Delete
    const onDelete = () => {
        deleteFacility(facility_id, {
          onSuccess: () => {
            resetFields();
            //router.replace('/(user)/feedback/announcement');
          },
        });
      };
    //COnfirmDelete
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Confirm to delete this visitor?', [
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
        <ScrollView contentContainerStyle={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? 'Edit Facility' : 'Book Facility' }} />

            {/* Set Category     */}
            <Text style={styles.label}> Category</Text> 
            <Picker selectedValue={type} onValueChange={itemValue => setType(itemValue)} style={styles.input}>
                <Picker.Item label="Swimming Pool" value="Swimming Pool" />
                <Picker.Item label="Gym Room" value="Gym Room" />
                <Picker.Item label="Badminton Court" value="Badminton Court" />
            </Picker>    


            {/* Due Date Picker and Icon */}
            <Text style={styles.label}>Date</Text>
            <View style={styles.datePickerContainer}>
                <Text style={styles.input}>{date.toLocaleDateString()}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.icon}>
                    <Icon name="calendar" size={24} color={Colors.light.tint} />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="calendar"
                        style={{}}
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) {
                                setDate(selectedDate); // Update the Date object
                                setFormattedDate(selectedDate.toLocaleDateString()); // Update the formatted date string
                            }
                            
                        }}
                    />
                    
                )}
            </View>

            
{/* Start Time Picker */}
<Text style={styles.label}>Start Time</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.dateTimePickerContainer}>
                <Text style={styles.input}>{start_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                <Icon name="clock-o" size={24} color={Colors.light.tint} />
            </TouchableOpacity>
            {showStartTimePicker && (
                <DateTimePicker
                    value={start_time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowStartTimePicker(false);
                        if (selectedTime) {
                            setStartTime(selectedTime);
                            setFormattedStartTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // Update the formatted date string
                        }
                    }}
                />
            )}

            {/* End Time Picker */}
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.dateTimePickerContainer}>
                <Text style={styles.input}>{end_time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</Text>
                <Icon name="clock-o" size={24} color={Colors.light.tint} />
            </TouchableOpacity>
            {showEndTimePicker && (
                <DateTimePicker
                    value={end_time}
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        setShowEndTimePicker(false);
                        if (selectedTime) {
                            setEndTime(selectedTime);
                            setFormattedEndTime(selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })); // Update the formatted date string
                        }
                    }}
                />
            )}
            

            <Text style={styles.label}>Number of Participants</Text>
            <TextInput
                value={no_of_pax}
                onChangeText={setNoOfPax}
                placeholder="Number of participants"
                keyboardType="numeric"
                style={styles.input}
            />



            {/* error Message for invalid input */}
            <Text style={{ color: 'red' }}>{errors}</Text>

            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Submit'} />

            {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>
            )}
        </ScrollView>
    )
}

//Style
const styles = StyleSheet.create({
    container: {
        flexGrow: 1, // Add this line to make the ScrollView fill the available height
        //flex: 1,
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 30,
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
    inputContent: {
        color: 'black',
        fontSize: 16,
        height: 40,

    },
    image: {
        width: '50%',
        aspectRatio: 1,
        alignSelf: 'center',
    },
    textButton: {
        alignSelf: 'center',
        fontWeight: 'bold',
        color: Colors.light.tint,
        marginVertical: 10,
    },
    icon: {
        marginLeft: 10,
        backgroundColor: 'white',
    },
    datePickerContainer: {
        flexDirection: 'row',

        alignItems: 'center',
        backgroundColor: 'white',
    },
    dateTimePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
        padding: 10,
    },
})

export default CreateFormScreen;

