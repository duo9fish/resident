
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useFeedback, useDeleteFeedback, useInsertFeedback, useUpdateFeedback } from '@/api/feedbacks';

// Define the component for creating or updating a feedback
const CreateFormScreen = () => {

    // State variables for title, sender, and content of the announcement
    const [title, setTitle] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');

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
        insertFeedback({ title, image, comment,date:currentdate}, {
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
        updateFeedback({ feedback_id,title, image, comment,date:currentdate}, {
            onSuccess: () => {
                console.log(feedback_id);
                resetFields();
                router.replace('/(user)/feedback/list/feedback');

            }
            
        });
    }

    // Function to handle image selection from the device gallery
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    //Delete
    const onDelete = () => {
        deleteFeedback(feedback_id, {
          onSuccess: () => {
            resetFields();
            //router.replace('/(user)/feedback/announcement');
          },
        });
      };
    //COnfirmDelete
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Confirm to delete this feedback?', [
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

            <Stack.Screen options={{ title: isUpdating ? 'Edit Feedback' : 'Upload Feedback' }} />

            {/* Announcement Image */}
            <Image source={{ uri: image || 'https://i.imgur.com/xL5dgei.png' }} style={styles.image} />
            {/* Upload image */}
            <Text onPress={pickImage} style={styles.textButton}>
                Select image</Text>

            {/* Announcement Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle} //Updates title state on change
                placeholder='Title'
                style={styles.input}
            />

            {/* Announcement Content */}
            <Text style={styles.label}>Comment</Text>
            <TextInput
                value={comment}
                onChangeText={setComment} //Updates content state on change
                placeholder='Feedback Comment'
                style={styles.input}
            />



            {/* error Message for invalid input */}
            <Text style={{ color: 'red' }}>{errors}</Text>

            <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Submit'} />

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
    }
})

export default CreateFormScreen;

