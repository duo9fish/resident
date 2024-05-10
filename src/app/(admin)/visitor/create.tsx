
// import { View, Text, StyleSheet, TextInput, Image, Alert, ScrollView, TouchableOpacity } from 'react-native'
// import React from 'react'
// import Button from '@/components/Button'; // Import custom button
// import Colors from '@/constants/Colors';
// import * as ImagePicker from 'expo-image-picker';
// import { Redirect, Stack, useLocalSearchParams, useRouter } from 'expo-router';
// import { useEffect, useState } from 'react';
// import { useVisitor, useDeleteVisitor, useInsertVisitor, useUpdateVisitor } from '@/api/visitors';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { supabase } from '@/lib/supabase';
// import Icon from 'react-native-vector-icons/FontAwesome';


// // Define the component for creating or updating a feedback
// const CreateFormScreen = () => {

//     // State variables for title, sender, and content of the announcement
//     const [name, setName] = useState('');
//     const [vehicle_number, setVehicleNumber] = useState('');

//     const [contact_number, setContactNo] = useState(''); // Default status
//     const [type, setType] = useState(''); // Default status
//     const [status, setStatus] = useState('Pending'); //set null
//     const [date, setDate] = useState(new Date());
//     const [formattedDate, setFormattedDate] = useState(date.toLocaleDateString()); // State for the formatted date string
//     const [showDatePicker, setShowDatePicker] = useState(false);

//     const [errors, setErrors] = useState('');// validation purpose

//     //Update/Edit the announcement follow the id pass
//     const { visitor_id: idString } = useLocalSearchParams();
//     //const visitor_id = parseFloat(typeof idString == 'string'? idString: idString?.[0]); //ignore
//     //Safely parse the announcement ID from query parameters
//     let visitor_id = 0; // Default value if no valid id is found
//     if (Array.isArray(idString)) {
//         visitor_id = parseFloat(idString[0] || '0');
//     } else if (typeof idString === 'string') {
//         visitor_id = parseFloat(idString);
//     }

    
    
//     //to differentiate the purpose whether update or add an announcement
//     const isUpdating = !!visitor_id;

//     const { mutate: insertVisitor } = useInsertVisitor();
//     const { mutate: updateVisitor } = useUpdateVisitor();
//     const {data: updatingVisitor}= useVisitor(visitor_id);
//     const {mutate:deleteVisitor} = useDeleteVisitor();

//     useEffect(()=>{
//         if(updatingVisitor){
//             setName(updatingVisitor.name);
//             setVehicleNumber(updatingVisitor.vehicle_number?? '');
//             setContactNo(updatingVisitor.contact_number);
//             //setDate(updatingVisitor.date?? '');
//             setType(updatingVisitor.type?? '');
//         }
//     },[updatingVisitor]);


//     const router = useRouter();

//     // Extract the date and time now
//     const now = new Date();
//     const currentdate = now.toLocaleDateString();
//     //const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

//     // Function to reset all input fields
//     const resetFields = () => {
//         setName('');
//         setVehicleNumber('');
//         setContactNo('');
//         setType('');
//         setDate(new Date());
//     }

//     //Validate the input
//     const validateInput = () => {
//         setErrors(''); //reset input field that not validate
//         if (!name) {
//             setErrors('Title is required');
//             return false;
//         }
//         if (!contact_number) {
//             setErrors('Contact number is required');
//             return false;
//         }
//         if (!type) {
//             setErrors('Type is required');
//             return false;
//         }
//         return true;
//     };

//     const onSubmit = () => {
//         if (isUpdating) {
//             onUpdate();
//         } else {
//             onCreate();
//         }
//     }

//     //Add new Announcement
//     const onCreate = async () => {

//         if (!validateInput()) {
//             return;
//         }

//         // Save in the database
//         insertVisitor({ name, vehicle_number, contact_number,date:formattedDate,status,type}, {
//             onSuccess: () => {
//                 resetFields();
//             }
//         });

//     };

//     //Edit/Update announcement
//     const onUpdate = async () => {
//         if (!validateInput()) {
//             return;
//         }
//         //Save in the database
//         updateVisitor({ visitor_id,name, vehicle_number, contact_number,date:formattedDate,status,type}, {
//             onSuccess: () => {
//                 console.log(visitor_id);
//                 resetFields();
//                 router.back();

//             }
            
//         });
//     }


//     //Delete
//     const onDelete = () => {
//         deleteVisitor(visitor_id, {
//           onSuccess: () => {
//             resetFields();
//             //router.replace('/(user)/feedback/announcement');
//           },
//         });
//       };
//     //COnfirmDelete
//     const confirmDelete = () => {
//         Alert.alert('Confirm', 'Confirm to delete this visitor?', [
//             { text: 'Cancel' },
//             {
//                 text: 'Delete',
//                 style: 'destructive',

//                 onPress: onDelete,
//             },

//         ]);
//     };

//     //Render UI
//     return (
//         <ScrollView contentContainerStyle={styles.container}>

//             <Stack.Screen options={{ title: isUpdating ? 'Edit Feedback' : 'Visitor Application' }} />

//             {/* Set Category     */}
//             <Text style={styles.label}> Category</Text> 
//             <Picker selectedValue={type} onValueChange={itemValue => setType(itemValue)} style={styles.input}>
//                 <Picker.Item label="Delivery" value="Delivery" />
//                 <Picker.Item label="Drop-Off/Pick Up" value="Drop-Off/Pick Up" />
//                 <Picker.Item label="Visitor" value="Visitor" />
//                 <Picker.Item label="Overnight" value="Overnight" />
//                 <Picker.Item label="Contractor/Worker" value="Contractor/Worker" />
//             </Picker>    

//             {/* Announcement Title */}
//             <Text style={styles.label}>Name</Text>
//             <TextInput
//                 value={name}
//                 onChangeText={setName} //Updates title state on change
//                 placeholder='name'
//                 style={styles.input}
//             />

//             {/* vehicle number */}
//             <Text style={styles.label}>Vehicle Number (Leave Blank if walk-in)</Text>
//             <TextInput
//                 value={vehicle_number}
//                 onChangeText={setVehicleNumber} //Updates content state on change
//                 placeholder='vehicle number'
//                 style={styles.input}
//             />

//             {/* contact no*/}
//             <Text style={styles.label}>Contact Number</Text>
//             <TextInput
//                 value={contact_number}
//                 onChangeText={setContactNo} //Updates content state on change
//                 placeholder='contact number'
//                 style={styles.input}
//             />

//             {/* Due Date Picker and Icon */}
//             <Text style={styles.label}>Due Date</Text>
//             <View style={styles.datePickerContainer}>
//                 <Text style={styles.input}>{date.toLocaleDateString()}</Text>
//                 <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.icon}>
//                     <Icon name="calendar" size={24} color={Colors.light.tint} />

//                 </TouchableOpacity>
//                 {showDatePicker && (
//                     <DateTimePicker
//                         value={date}
//                         mode="date"
//                         display="calendar"
//                         style={{}}
//                         onChange={(event, selectedDate) => {
//                             setShowDatePicker(false);
//                             if (selectedDate) {
//                                 setDate(selectedDate); // Update the Date object
//                                 setFormattedDate(selectedDate.toLocaleDateString()); // Update the formatted date string
//                             }
                            
//                         }}
//                     />
                    
//                 )}
//             </View>



//             {/* error Message for invalid input */}
//             <Text style={{ color: 'red' }}>{errors}</Text>

//             <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Submit'} />

//             {isUpdating && (
//                 <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>
//             )}
//         </ScrollView>
//     )
// }

// //Style
// const styles = StyleSheet.create({
//     container: {
//         flexGrow: 1, // Add this line to make the ScrollView fill the available height
//         //flex: 1,
//         justifyContent: 'center',
//         padding: 10,
//         paddingBottom: 30,
//     },
//     input: {
//         backgroundColor: "white",
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 5,
//         marginBottom: 20,
//     },
//     label: {
//         color: 'black',
//         fontSize: 16,

//     },
//     inputContent: {
//         color: 'black',
//         fontSize: 16,
//         height: 40,

//     },
//     image: {
//         width: '50%',
//         aspectRatio: 1,
//         alignSelf: 'center',
//     },
//     textButton: {
//         alignSelf: 'center',
//         fontWeight: 'bold',
//         color: Colors.light.tint,
//         marginVertical: 10,
//     },
//     icon: {
//         marginLeft: 10,
//         backgroundColor: 'white',
//     },
//     datePickerContainer: {
//         flexDirection: 'row',

//         alignItems: 'center',
//         backgroundColor: 'white',
//     },
// })

// export default CreateFormScreen;

