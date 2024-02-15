import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Text from './Text';
import {useNavigation} from '@react-navigation/native';

export default function SleepPreviewCard() {
  const navigation = useNavigation<any>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('SleepDetail', {
          userId: 86,
        })
      }>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Gabe</Text>
          <Image
            source={require('../assets/arrow.png')}
            style={{width: 30, height: 30, resizeMode: 'contain'}}
          />
        </View>
        <View>
          <Text>CHART HERE</Text>
        </View>
        <View style={styles.labels}>
          <View>
            <Text style={styles.labelText}>11:33PM</Text>
            <Text style={styles.labelText}>Asleep</Text>
          </View>
          <View>
            <Text style={styles.labelTextRight}>8:02AM</Text>
            <Text style={styles.labelTextRight}>Awake</Text>
          </View>
        </View>
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
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  cardTitle: {},
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontWeight: '600',
  },
  labelTextRight: {
    fontWeight: '600',
    textAlign: 'right',
  },
});
