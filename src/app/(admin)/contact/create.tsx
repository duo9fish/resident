
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import React from 'react'
import Button from '@/components/Button'; // Import custom button
import Colors from '@/constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useContact, useDeleteContact, useInsertContact, useUpdateContact } from '@/api/contacts';
import * as FileSystem from'expo-file-system';
import { decode } from 'base64-arraybuffer';
import { supabase } from '@/lib/supabase';

import uuid from 'react-native-uuid';
import RemoteImage from '@/components/RemoteImage';
uuid.v4(); //


// Define the component for creating or updating product announcements
const CreateContactScreen = () => {

    // State variables for title, sender, and content of the Contact
    const [title, setTitle] = useState('');
    const [sender, setSender] = useState('');
    const [content, setContent] = useState('');
    const [date, setDate] = useState('');
    
    const defaultImage = 'null';


    const [errors, setErrors] = useState('');// validation purpose

    const [image, setImage] = useState<string | null>(null); // Allow image state to be string or null

    //Update/Edit the Contact follow the id pass
    const { contact_id: idString } = useLocalSearchParams();
    //Safely parse the contact ID from query parameters
    let contact_id = 0; // Default value if no valid id is found
    if (Array.isArray(idString)) {
        contact_id = parseFloat(idString[0] || '0');
    } else if (typeof idString === 'string') {
        contact_id = parseFloat(idString);
    }
    //const contact_id = parseFloat(typeof idString == 'string' ? idString : idString[0])
    
    //to differentiate the purpose whether update or add an contact
    const isUpdating = !!contact_id;

    const { mutate: insertContact } = useInsertContact();
    const { mutate: updateContact } = useUpdateContact();
    const {data: updatingContact}= useContact(contact_id);
    const {mutate:deleteContact} = useDeleteContact();

    useEffect(()=>{
        if(updatingContact){
            setTitle(updatingContact.title);
            setSender(updatingContact.icon);
            setContent(updatingContact.number);
            setImage(updatingContact.category);
        }
    },[updatingContact]);


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

    //Add new Contact
    const onCreate = async () => {
        if (!validateInput()) {
            return;
        }

        const imagePath = await uploadImage();

        // Save in the database
        insertContact({ title, image: imagePath, sender, content,date:currentdate}, {
            onSuccess: () => {
                resetFields();
                router.back();
            }
        });

    };

    //Edit/Update Contact
    const onUpdate = async () => {
        if (!validateInput()) {
            return;
        }

        const imagePath = await uploadImage();

        //Save in the database
        updateContact({ contact_id,title, image:imagePath, sender, content,date:currentdate}, {
            onSuccess: () => {
                console.log(contact_id);
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
        deleteContact(contact_id, {
          onSuccess: () => {
            resetFields();
            router.replace('/(admin)/contact/contact');
          },
        });
      };
    //COnfirmDelete
    const confirmDelete = () => {
        Alert.alert('Confirm', 'Confirm to delete this contact?', [
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

            <Stack.Screen options={{ title: isUpdating ? 'Update contact' : 'Add contact' }} />

            {/* contact Image */}
            <RemoteImage path={image || 'https://i.imgur.com/xL5dgei.png'} fallback={image ||'https://i.imgur.com/xL5dgei.png'} style={styles.image}/>
            {/* Upload image */}
            <Text onPress={pickImage} style={styles.textButton}>
                Select image</Text>

            {/* contact Title */}
            <Text style={styles.label}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle} //Updates title state on change
                placeholder='Title'
                style={styles.input}
            />

            {/* contact Sender */}
            <Text style={styles.label}>Sender</Text>
            <TextInput
                value={sender}
                onChangeText={setSender} //Updates sender state on change
                placeholder='Sender'
                style={styles.input}
            />

            {/* contact Content */}
            <Text style={styles.label}>Content</Text>
            <TextInput
                value={content}
                onChangeText={setContent} //Updates content state on change
                placeholder='contact Content'
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

export default CreateContactScreen;

