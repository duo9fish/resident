import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, View, Text, Image, StyleSheet, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { useFacility, useUpdateFacility } from '@/api/facilities';
import { FontAwesome } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import RemoteImage from '@/components/RemoteImage';
import Button from '@/components/Button';
import React, { useState } from 'react';

const FacilityDetailScreen = () => {
  const { facility_id: idString } = useLocalSearchParams();
  let facility_id = 0;
  if (Array.isArray(idString)) {
    facility_id = parseFloat(idString[0] || '0');
  } else if (typeof idString === 'string') {
    facility_id = parseFloat(idString);
  }
  const { data: facility, error, isLoading } = useFacility(facility_id);
  const { mutate: updateFacility } = useUpdateFacility();
  const [remark, setRemark] = useState('');
  const [showRemark, setShowRemark] = useState(false); // Add a state to control the visibility of the remark

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch facility</Text>;
  }
  if (!facility) {
    return <Text>Facility Not Found</Text>;
  }

  const onApprove = async () => {
    updateFacility({ facility_id, status: 'Approved', remark });
    setShowRemark(true); // Show the remark after approving
  };

  const onReject = async () => {
    updateFacility({ facility_id, status: 'Rejected', remark });
    setShowRemark(true); // Show the remark after rejecting
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Facility',
          headerStyle: {
            backgroundColor: Colors.light.tint,
          },
          headerTintColor: 'white',
          headerRight: () => (
            <Link href={`/(user)/facility/update?facility=${facility_id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={25}
                    color={Colors.dark.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{facility.type}</Text>
        <View style={styles.desc}>
          <Text style={styles.detail}>Start Time: {facility.start_time}</Text>
        </View>
        <View style={styles.desc}>
          <Text style={styles.detail}>End Time: {facility.end_time}</Text>
        </View>
        <Text style={styles.detail}>Facility Date: {facility.date}</Text>
        <Text style={styles.detail}>Status: {facility.status}</Text>
        <TextInput
          style={styles.remarkInput}
          placeholder="Enter remark"
          multiline={true}
          value={remark}
          onChangeText={setRemark}
        />
        {showRemark && <Text style={styles.remarkText}>Remark: {facility.remark}</Text>}
        <View style={styles.buttons}>
          <Button onPress={onApprove} text={'Submit'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  desc: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  remarkInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    textAlignVertical: 'top',
  },
  remarkText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default FacilityDetailScreen;
