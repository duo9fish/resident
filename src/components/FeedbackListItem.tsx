import { Text, View, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Tables } from '../types';
import { Link, useSegments } from 'expo-router';

type FeedbackListItemProps = {
  feedbacks: Tables<'feedbacks'>;
};

const FeedbackListItem = ({ feedbacks }: FeedbackListItemProps) => {
  const segments = useSegments();

  // Helper function to determine the status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { backgroundColor: 'white', textColor: '#FFAB1A' };
      case 'processed':
        return { backgroundColor: 'white', textColor: 'green' };
      case 'rejected':
        return { backgroundColor: 'white', textColor: 'red' };
      default:
        return { backgroundColor: 'white', textColor: 'black' };
    }
  };

  const { backgroundColor, textColor } = getStatusColor(feedbacks.status || '');
  // Handle button press event
  const handleStatusPress = () => {
    // Add your logic here for handling the button press
    console.log(`Status button pressed for visitor ${feedbacks.feedback_id}`);
  };

  return (
    <Link href={`/${segments[0]}/feedback/${feedbacks.feedback_id}`} asChild>
      <Pressable style={styles.container}>
        <Text style={styles.title}>{feedbacks.title}</Text>
        <View style={styles.desc}>
          <Text style={styles.sender}>Sender: {feedbacks.feedback_id}</Text>
          <Text style={styles.date}>{feedbacks.date}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.category}>{feedbacks.category}</Text>
          <Pressable style={[styles.statusButton, { borderColor: 'blue' }]} onPress={handleStatusPress}>
            <Text style={[styles.statusText, { color: textColor }]}>
              {feedbacks.status}
            </Text>
          </Pressable>
        </View>
        <View style={styles.separator} />
      </Pressable>
    </Link>
  );
};

export default FeedbackListItem;

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
    marginBottom: 15,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
  sender: {
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
    color: '#111111',
  },
  date: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#111111',
  },
  statusContainer: {
    flexDirection: 'row', // Keep items in a row
    alignItems: 'center', // Align items vertically in the center
    justifyContent: 'space-between', // This will place the first item on the left and the last item on the right
    marginTop: 10,
    marginBottom: 15,
  },
  category: {
    fontSize: 15,
    fontWeight: '700',
    marginRight: 10,
  },
  statusButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: '#F0F0F0',
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
