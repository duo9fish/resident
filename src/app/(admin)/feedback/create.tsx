
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFeedback, useDeleteFeedback, useInsertFeedback, useUpdateFeedback } from '@/api/feedbacks';
import { Picker } from '@react-native-picker/picker';

// Define the component for creating or updating a feedback
const CreateFormScreen = () => {

    // State variables for title, sender, and content of the announcement
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('Processed'); // Default status
    const [category, setCategory] = useState(''); // Default status
    const [solution, setSolution] = useState(''); 

    const [errors, setErrors] = useState('');// validation purpose

    const [image, setImage] = useState<string | null>(null); // Allow image state to be string or null

    //Update/Edit the announcement follow the id pass
    const { feedback_id: idString } = useLocalSearchParams();
    const feedback_id = parseFloat(typeof idString == 'string'? idString: idString?.[0]);

    
    
    //to differentiate the purpose whether update or add an announcement
    const isUpdating = !!feedback_id;

    const { mutate: insertFeedback } = useInsertFeedback();
    const { mutate: updateFeedback } = useUpdateFeedback();
    const {data: updatingFeedback}= useFeedback(feedback_id);
    const {mutate:deleteFeedback} = useDeleteFeedback();

    useEffect(()=>{
        if(updatingFeedback){
            setTitle(updatingFeedback.title);
            setComment(updatingFeedback.comment);
            setImage(updatingFeedback.image);
            setDate(updatingFeedback.date);
            setSolution(updatingFeedback.solution);
        }
    },[updatingFeedback]);


    const router = useRouter();

    // Extract the date and time now
    const now = new Date();
    const currentdate = now.toLocaleDateString();
    //const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Function to reset all input fields
    const resetFields = () => {
        setTitle('');
        setComment('');
        setImage('');
    }

    //Validate the input
    const validateInput = () => {
        setErrors(''); //reset input field that not validate
        if (!title) {
            setErrors('Title is required');
            return false;
        }
        if (!comment) {
            setErrors('Comment is required');
            return false;
        }
        if (!solution) {
            setErrors('Comment is required');
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
    const onCreate = () => {

        if (!validateInput()) {
            return;
        }

        // Save in the database
        insertFeedback({ title, image, comment,date:currentdate,status,category,solution}, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });

    };

    //Edit/Update announcement
    const onUpdate = () => {

        if (!validateInput()) {
            return;
        }

        //Save in the database
        updateFeedback({ feedback_id,title, image, comment,date:currentdate,status, category,solution}, {
            onSuccess: () => {
                console.log(feedback_id);
                resetFields();
                router.replace('/(admin)/feedback/feedback');

            }
            
        });
    }

    //Render UI
    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? 'Propose Solution' : 'Raise Feedback' }} />

            {/* Announcement Image */}
            <Image source={{ uri: image || 'https://i.imgur.com/xL5dgei.png' }} style={styles.image} />
            {/* Upload image */}
            <Text  style={styles.textButton}>
                Image</Text>

            {/* Set Category     */}
            <Text style={styles.label}> Category</Text> 
            <Picker selectedValue={category} onValueChange={itemValue => setCategory(itemValue)} style={styles.input} enabled={false} >
                <Picker.Item label="Maintenance Issues" value="Maintenance Issues" />
                <Picker.Item label="Amenities Feedback" value="Amenities Feedback" />
                <Picker.Item label="Security Concerns" value="Security Concerns" />
                <Picker.Item label="Noise Complaints" value="Noise Complaints" />
                <Picker.Item label="Billing and Payments" value="Billing and Payments" />
                <Picker.Item label="Other Issues" value="Noise Complaints" />
            </Picker>    

            {/* Announcement Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle} //Updates title state on change
                placeholder='Title'
                style={styles.input}
                editable={false} 
            />

            {/* Feedback comment */}
            <Text style={styles.label}>Comment</Text>
            <TextInput
                value={comment}
                onChangeText={setComment} //Updates content state on change
                placeholder='Feedback Comment'
                
                editable={false} 
                style={styles.input}
            />

            {/* Solution for feedback */}
            <Text style={styles.label}>Solution</Text>
            <TextInput
                value={solution}
                onChangeText={setSolution} //Updates solution state on change
                placeholder='Solution for feedback...'
                style={styles.inputSolution}

            />



            {/* error Message for invalid input */}
            <Text style={{ color: 'red' }}>{errors}</Text>

            <Button onPress={onSubmit} text={isUpdating ? 'Submit' : 'Submit'} />

            {/* {isUpdating && (
                <Text onPress={confirmDelete} style={styles.textButton}> Delete </Text>
            )} */}


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
        color: '#757474',
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
    inputSolution:{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
        color: 'black',
    }
})

export default CreateFormScreen;

