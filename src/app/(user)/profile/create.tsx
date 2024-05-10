import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { StyleSheet, View, Alert, ScrollView } from 'react-native';
import { Button, Input } from 'react-native-elements';

import { useAuth } from '@/providers/AuthProvider';
import Avatar from '@/components/Avatar';
import { router } from 'expo-router';



export default function ProfileScreen() {
    const { session } = useAuth();

    const [image, setImage] = useState<string | null>(null); // Allow image state to be string or null
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('');
    const [fullName, setFullname] = useState('');
    const [website, setWebsite] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [unitNo, setUnitNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');

    useEffect(() => {
        if (session) getProfile();
    }, [session]);

    async function getProfile() {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url, full_name,unit_no, phone_no`)
                .eq('id', session?.user.id)
                .single();
            if (error && status !== 406) {
                throw error;
            }

            if (data) {
                setUsername(data.username || '');
                setWebsite(data.website || '');
                setAvatarUrl(data.avatar_url || '');
                setFullname(data.full_name || '');
                setUnitNo(data.unit_no || ''); // Set the unit number
      setPhoneNo(data.phone_no || ''); // Set the phone number
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }

    async function updateProfile({
        username,
        website,
        avatar_url,
        full_name,
        unit_no, // Add unit_no
  phone_no, // Add phone_no
    }: {
        username: string;
        website: string;
        avatar_url: string;
        full_name: string;
        unit_no: string; // Add unit_no type
  phone_no: string; // Add phone_no type
    }) {
        try {
            setLoading(true);
            if (!session?.user) throw new Error('No user on the session!');

            const updates = {
                id: session?.user.id,
                username,
                website,
                avatar_url,
                full_name,
                updated_at: new Date(),
                unit_no, // Include unit_no
      phone_no, // Include phone_no
            };

            const { error } = await supabase.from('profiles').upsert(updates);

            if (error) {
                throw error;
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message);
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <ScrollView style={styles.container}>
            <View style={{ alignItems: 'center' }}>
                <Avatar
                    size={200}
                    url={avatarUrl}
                    onUpload={(url: string) => {
                        setAvatarUrl(url);
                        updateProfile({
                            username,
                            website,
                            avatar_url: url,
                            full_name: fullName,
                            unit_no: unitNo, // Include unitNo
      phone_no: phoneNo, // Include phoneNo
                        });
                    }}
                />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Input label="Email" value={session?.user?.email} disabled />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Full name"
                    value={fullName || ''}
                    onChangeText={(text) => setFullname(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Username"
                    value={username || ''}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            

            <View style={styles.verticallySpaced}>
                <Input
                    label="Unit Number"
                    value={unitNo || ''}
                    onChangeText={(text) => setUnitNo(text)}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Phone Number"
                    value={phoneNo || ''}
                    onChangeText={(text) => setPhoneNo(text)}
                />
            </View>

            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title={loading ? 'Loading ...' : 'Update'}
                    onPress={() =>{
                        updateProfile({
                            username,
                            website,
                            avatar_url: avatarUrl,
                            full_name: fullName,
                            unit_no: unitNo, // Include unitNo
      phone_no: phoneNo, // Include phoneNo
                        })
                    }}
                    disabled={loading}
                />
            </View>

            <View style={styles.verticallySpaced}>

                <Button title='Sign Out' onPress={async () => await supabase.auth.signOut()} />
            </View>
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
});