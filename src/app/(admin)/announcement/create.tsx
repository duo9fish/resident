
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAnnouncement, useDeleteAnnouncement, useInsertAnnouncement, useUpdateAnnouncement } from '@/api/announcements';
import * as FileSystem from'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase';

import uuid from 'react-native-uuid';
import RemoteImage from '@/components/RemoteImage';
uuid.v4(); //


// Define the component for creating or updating product announcements
const CreateAnnouncementScreen = () => {

    // State variables for title, sender, and content of the announcement
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    
    const defaultImage = 'null';


    const [errors, setErrors] = useState('');// validation purpose

    const [image, setImage] = useState<string | null>(null); // Allow image state to be string or null

    //Update/Edit the announcement follow the id pass
    const { announcement_id: idString } = useLocalSearchParams();
    //Safely parse the announcement ID from query parameters
    let announcement_id = 0; // Default value if no valid id is found
    if (Array.isArray(idString)) {
        announcement_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        announcement_id = parseFloat(idString);
    }
    //const announcement_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    
    //to differentiate the purpose whether update or add an announcement
    const isUpdating = !!announcement_id;

    const { mutate: insertAnnouncement } = useInsertAnnouncement();
    const { mutate: updateAnnouncement } = useUpdateAnnouncement();
    const {data: updatingAnnouncement}= useAnnouncement(announcement_id);
    const {mutate:deleteAnnouncement} = useDeleteAnnouncement();

    useEffect(()=>{
        if(updatingAnnouncement){
            setTitle(updatingAnnouncement.title);
            setSender(updatingAnnouncement.sender);
            setContent(updatingAnnouncement.content);
            setImage(updatingAnnouncement.image);
            setDate(updatingAnnouncement.date?? '');
        }
    },[updatingAnnouncement]);


    const router = useRouter();

    // Extract the date and time now
    const now = new Date();
    const currentdate = now.toLocaleDateString();
    //const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Function to reset all input fields
    const resetFields = () => {
        setTitle('');
        setSender('');
        setContent('');
    }

    //Validate the input
    const validateInput = () => {
        setErrors(''); //reset input field that not validate
        if (!title) {
            setErrors('Title is required');
            return false;
        }
        if (!content) {
            setErrors('Content is required');
            return false;
        }
        if (!sender) {
            setErrors('Sender is required');
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

        const imagePath = await uploadImage();

        // Save in the database
        insertAnnouncement({ title, image: imagePath, sender, content,date:currentdate}, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });

    };

    //Edit/Update announcement
    const onUpdate = async () => {
        if (!validateInput()) {
            return;
        }

        const imagePath = await uploadImage();

        //Save in the database
        updateAnnouncement({ announcement_id,title, image:imagePath, sender, content,date:currentdate}, {
            onSuccess: () => {
                console.log(announcement_id);
                resetFields();
                router.back();
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
        deleteAnnouncement(announcement_id, {
          onSuccess: () => {
            resetFields();
            router.replace('/(admin)/announcement/announcement');
          },
        });
      };
    //COnfirmDelete
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Confirm to delete this announcement?', [
            { text: 'Cancel' },
            {
                text: 'Delete',
                style: 'destructive',

                onPress: onDelete,
            },

        ]);
    };

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
          return;
        }
      
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });
        const filePath = `${uuid.v4()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
          .from('announcement-images')
          .upload(filePath, decode(base64), { contentType });
      
        if (data) {
          return data.path;
        }
      };

    //Render UI
    return (
        <View style={styles.container}>

            <Stack.Screen options={{ title: isUpdating ? 'Update Announcement' : 'Add Announcement', headerStyle: {
                        backgroundColor: Colors.light.tint,
                    },
                    headerTintColor: 'white', }} />

            {/* Announcement Image */}
            <RemoteImage path={image || 'https://i.imgur.com/xL5dgei.png'} fallback={image ||'https://i.imgur.com/xL5dgei.png'} style={styles.image}/>
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

            {/* Announcement Sender */}
            <Text style={styles.label}>Sender</Text>
            <TextInput
                value={sender}
                onChangeText={setSender} //Updates sender state on change
                placeholder='Sender'
                style={styles.input}
            />

            {/* Announcement Content */}
            <Text style={styles.label}>Content</Text>
            <TextInput
                value={content}
                onChangeText={setContent} //Updates content state on change
                placeholder='Announcement Content'
                style={styles.input}
            />



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

export default CreateAnnouncementScreen;

