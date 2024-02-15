import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Text from '../components/Text';
import SleepPreviewCard from '../components/SleepPreviewCard';

export default function HomeScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sleep Report</Text>
      <SleepPreviewCard />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginLeft: 2,
    marginBottom: 20,
  },
  cardTitle: {},
});
