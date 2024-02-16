import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {useNavigation} from '@react-navigation/native';
import SleepStagesChart from './SleepStagesChart';
import {User} from '../services/User';

export default function SleepPreviewCard({user}: {user: User}) {
  const navigation = useNavigation<any>();

  if (!user.sessions) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SleepDetail', {
          userId: user.id,
        })
      }>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{user.name}</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </View>
        <SleepStagesChart session={user.sessions.intervals[0]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
});
