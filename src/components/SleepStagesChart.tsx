import React, {useMemo} from 'react';
import BarChart from './BarChart';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import {SleepSession, getSleepStagesChartData} from '../services/SleepSession';
import {formatTime12HourClock} from '../services/Datetime';

/**
 * A bar chart showing sleep stages across the night e.g. deep, light, awake, out
 */
export default function SleepStagesChart({session}: {session: SleepSession}) {
  const {barData, startTime, endTime} = useMemo(
    () => getSleepStagesChartData(session),
    [session],
  );

  return (
    <View style={{opacity: 0.8}}>
      <BarChart data={barData} width="100%" height={50} radius={4} />
      <View style={styles.labelSection}>
        <View>
          <Text style={styles.labelText}>
            {formatTime12HourClock(startTime)}
          </Text>
          <Text style={styles.labelText}>Asleep</Text>
        </View>
        <View>
          <Text style={styles.labelTextRight}>
            {formatTime12HourClock(endTime)}
          </Text>
          <Text style={styles.labelTextRight}>Awake</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelSection: {
    marginTop: 8,
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
