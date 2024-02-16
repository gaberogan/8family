import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Text from '../components/Text';
import SleepPreviewCard from '../components/SleepPreviewCard';
import {usersState} from '../services/User';
import {useMounted} from '../services/React';
import {fetchSleepSessions} from '../services/SleepSession';

export default function HomeScreen() {
  useMounted(fetchSleepSessions);

  const users = usersState.useValue();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sleep Report</Text>
      <View style={styles.sessionCards}>
        {users.map((user, index) => (
          <SleepPreviewCard key={index} user={user} />
        ))}
      </View>
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
  sessionCards: {
    gap: 12,
  },
});
