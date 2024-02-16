import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import BarChart, {BarData} from './BarChart';
import {SleepSession} from '../services/SleepSession';

export default function SleepFacts({session}: {session: SleepSession}) {
  return (
    <View style={styles.container}>
      <TossesAndTurns session={session} />
      <HeartRate session={session} />
      <BreathingRate session={session} />
      <RoomTemp session={session} />
      <BedTemp session={session} />
    </View>
  );
}

function TossesAndTurns({session}: {session: SleepSession}) {
  const totalTNT = session.timeseries.tnt
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);

  let color = 'red';
  totalTNT < 20 && (color = 'orange');
  totalTNT < 10 && (color = 'yellow');
  totalTNT < 5 && (color = 'lime');

  return (
    <Row
      title="Tosses n' Turns"
      value={totalTNT}
      unit="x"
      color={color}
      barData={[
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
      ]}
    />
  );
}

function HeartRate({session}: {session: SleepSession}) {
  const heartRateData = session.timeseries.heartRate;
  const heartRateSum = heartRateData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgHeartRate = Math.round(heartRateSum / heartRateData.length);

  let color = 'red';
  avgHeartRate < 80 && (color = 'orange');
  avgHeartRate < 75 && (color = 'yellow');
  avgHeartRate < 70 && (color = 'lime');

  return (
    <Row
      title="Heart Rate"
      value={avgHeartRate}
      unit="BPM"
      color={color}
      barData={[
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
      ]}
    />
  );
}

function BreathingRate({session}: {session: SleepSession}) {
  const breathRateData = session.timeseries.respiratoryRate;
  const breathRateSum = breathRateData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgBreathRate = Math.round(breathRateSum / breathRateData.length);

  let color = 'red';
  avgBreathRate < 30 && (color = 'orange');
  avgBreathRate < 25 && (color = 'yellow');
  avgBreathRate < 20 && (color = 'lime');

  return (
    <Row
      title="Breathing Rate"
      value={avgBreathRate}
      unit="BPM"
      color={color}
      barData={[
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
      ]}
    />
  );
}

function RoomTemp({session}: {session: SleepSession}) {
  const roomTempData = session.timeseries.tempRoomC;
  const roomTempSum = roomTempData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgRoomTemp = Math.round(roomTempSum / roomTempData.length);

  let color = 'red';
  avgRoomTemp < 28 && (color = 'orange');
  avgRoomTemp < 24 && (color = 'yellow');
  avgRoomTemp < 20 && (color = 'lime');

  return (
    <Row
      title="Room Temp"
      value={avgRoomTemp}
      unit="°C"
      color={color}
      barData={[
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
      ]}
    />
  );
}

function BedTemp({session}: {session: SleepSession}) {
  const bedTempData = session.timeseries.tempBedC;
  const bedTempSum = bedTempData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgBedTemp = Math.round(bedTempSum / bedTempData.length);

  let color = 'red';
  avgBedTemp < 38 && (color = 'orange');
  avgBedTemp < 36 && (color = 'yellow');
  avgBedTemp < 34 && (color = 'lime');

  return (
    <Row
      title="Bed Temp"
      value={avgBedTemp}
      unit="°C"
      color={color}
      barData={[
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
        {value: 2, color: 'red'},
      ]}
    />
  );
}

type RowProps = {
  title: string;
  value: number;
  unit: string;
  color: string;
  barData: BarData[];
};

function Row({title, value, unit, color, barData}: RowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowValue}>
        <Text style={[styles.text, {color}]}>
          {value}
          <Text style={[styles.smallText, {color}]}>{unit}</Text>
        </Text>
      </View>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.chart}>
        <BarChart data={barData} width={100} height={28} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chart: {
    padding: 8,
    marginLeft: 'auto',
  },
  rowValue: {
    width: 60,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 12,
    paddingLeft: 12,
  },
  smallText: {
    fontSize: 10,
  },
});
