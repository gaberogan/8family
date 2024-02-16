import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {usersState} from '../services/User';
import SleepStagesChart from '../components/SleepStagesChart';
import DatePicker from '../components/DatePicker';
import {getSleepSessionStartTime} from '../services/SleepSession';
import CircularProgress from 'react-native-circular-progress-indicator';
import SleepFacts from '../components/SleepFacts';

export default function SleepDetailScreen() {
  const route = useRoute<any>();
  const userId = route.params.userId;
  const users = usersState.useValue();
  const user = users.find(x => x.id === userId)!;

  const [sessionIndex, setSessionIndex] = useState(0);
  const numSessions = user.sessions!.intervals.length;

  const canGoPrev = sessionIndex !== numSessions - 1;
  const canGoNext = sessionIndex !== 0;

  // Lower index in array is forward in time e.g. [0] = last night
  const onPrev = () => canGoPrev && setSessionIndex(sessionIndex + 1);
  const onNext = () => canGoNext && setSessionIndex(sessionIndex - 1);

  const session = user.sessions!.intervals[sessionIndex];

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={styles.container}>
      <DatePicker
        timestamp={getSleepSessionStartTime(session)}
        onNext={onNext}
        onPrev={onPrev}
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
      />
      <View style={styles.sleepQualityContainer}>
        <CircularProgress
          value={session.score}
          valueSuffix="%"
          title="Sleep Quality"
          titleFontSize={14}
          radius={80}
          activeStrokeWidth={10}
          inActiveStrokeWidth={6}
          progressValueColor="#fff"
          titleColor="#fff"
          activeStrokeColor="#1D42B4"
          activeStrokeSecondaryColor={'#02289a'}
          inActiveStrokeColor={'#1D42B4'}
          inActiveStrokeOpacity={0.2}
        />
      </View>
      <View style={styles.sleepChartContainer}>
        <SleepStagesChart session={session} />
      </View>
      <View style={styles.sleepFactsContainer}>
        <SleepFacts session={session} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sleepQualityContainer: {
    alignItems: 'center',
    padding: 12,
  },
  sleepChartContainer: {
    padding: 12,
  },
  sleepFactsContainer: {
    padding: 12,
  },
});
