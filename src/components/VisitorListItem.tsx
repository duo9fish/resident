import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';

type VisitorListItemProps = {
  visitors: Tables<'visitors'>;
};

const VisitorListItem = ({ visitors }: VisitorListItemProps) => {
  const segments = useSegments();

  // Helper function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '#FFAB1A';
      case 'approved':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'black';
    }
  };

  // Handle button press event
  const handleStatusPress = () => {
    // Add your logic here for handling the button press
    console.log(`Status button pressed for visitor ${visitors.visitor_id}`);
  };

  return (
    <Link href={`/${segments[0]}/visitor/${visitors.visitor_id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{visitors.type}</Text>
        <View style={styles.desc}>
          <Text style={styles.sender}>Sender: {visitors.name}</Text>
          <Text style={styles.date}>{visitors.date}</Text>
        </View>
        <View style={styles.vehicleStatusContainer}>
          <Text style={styles.vehicle}>
            {visitors.vehicle_number ? visitors.vehicle_number : 'Walk-in Visitor'}
          </Text>
          <Pressable style={[styles.statusButton, { borderColor: 'blue' }]} onPress={handleStatusPress}>
            <Text style={[styles.statusText, { color: getStatusColor(visitors.status || ''), fontSize: 10 }]}>
              {visitors.status}
            </Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
      </Pressable>
    </Link>
  );
};

export default VisitorListItem;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 15,
  },
  desc: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
  sender: {
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
    color: '#111111',
  },
  date: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#111111',
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  vehicleStatusContainer: {
    flexDirection: 'row', // Keep items in a row
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // This will place the first item on the left and the last item on the right
    marginTop: 10,
    marginBottom: 15,
  },
  vehicle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // This makes the vehicle text expand, pushing the status button to the right
  },
});
