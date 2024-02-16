import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from './Text';
import BarChart, {BarData} from './BarChart';
import {
  SleepSession,
  getSleepSessionEndTime,
  getSleepSessionStartTime,
  getSleepStagesWithTimestamps,
} from '../services/SleepSession';
import {GREEN, ORANGE, RED, YELLOW} from '../services/Color';

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
  // Get total TNT data for the night
  const tntData = session.timeseries.tnt;
  const totalTNT = tntData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);

  let color = RED;
  totalTNT < 20 && (color = ORANGE);
  totalTNT < 10 && (color = YELLOW);
  totalTNT < 5 && (color = GREEN);

  // Get TNT data by hour, currently it's a list of times
  const endTime = getSleepSessionEndTime(getSleepStagesWithTimestamps(session));
  const startTime = getSleepSessionStartTime(session);
  const oneHour = 3600 * 1000;
  const numDataPoints = Math.floor((endTime - startTime) / oneHour);

  const tntByHour = new Array(numDataPoints).fill(0);
  tntData.forEach(([time, value]) => {
    const timeMs = new Date(time).getTime();
    const hoursSinceNightStart = Math.floor((timeMs - startTime) / oneHour);
    tntByHour[hoursSinceNightStart] += value;
  });

  const barData = tntByHour.map(value => {
    let unitColor = RED;
    value < 3 && (unitColor = ORANGE);
    value < 2 && (unitColor = YELLOW);
    value < 1 && (unitColor = GREEN);
    return {value, color: unitColor};
  });

  return (
    <Row
      title="Tosses n' Turns"
      value={totalTNT}
      unit="x"
      color={color}
      barData={barData}
    />
  );
}

function HeartRate({session}: {session: SleepSession}) {
  let heartRateData = session.timeseries.heartRate;
  const heartRateSum = heartRateData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgHeartRate = Math.round(heartRateSum / heartRateData.length);
  const minHeartRate = Math.min(...heartRateData.map(([_, value]) => value));

  function getColor(value: number) {
    let color = RED;
    value < 80 && (color = ORANGE);
    value < 75 && (color = YELLOW);
    value < 70 && (color = GREEN);
    return color;
  }

  const barData = fillHolesInHourlyTimeseries(heartRateData).map(
    ([_, value]) => ({
      value: Math.max(value - (minHeartRate - 1), 0),
      color: getColor(value),
    }),
  );

  return (
    <Row
      title="Heart Rate"
      value={avgHeartRate}
      unit="BPM"
      color={getColor(avgHeartRate)}
      barData={barData}
    />
  );
}

function BreathingRate({session}: {session: SleepSession}) {
  let breathRateData = session.timeseries.respiratoryRate;
  const breathRateSum = breathRateData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgBreathRate = Math.round(breathRateSum / breathRateData.length);
  const minBreathRate = Math.min(...breathRateData.map(([_, value]) => value));

  function getColor(value: number) {
    let color = RED;
    value < 30 && (color = ORANGE);
    value < 25 && (color = YELLOW);
    value < 20 && (color = GREEN);
    return color;
  }

  const barData = fillHolesInHourlyTimeseries(breathRateData).map(
    ([_, value]) => ({
      value: Math.max(value - (minBreathRate - 1), 0),
      color: getColor(value),
    }),
  );

  return (
    <Row
      title="Breathing Rate"
      value={avgBreathRate}
      unit="BPM"
      color={getColor(avgBreathRate)}
      barData={barData}
    />
  );
}

function RoomTemp({session}: {session: SleepSession}) {
  let roomTempData = session.timeseries.tempRoomC;
  const roomTempSum = roomTempData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgRoomTemp = Math.round(roomTempSum / roomTempData.length);
  const minRoomTemp = Math.min(...roomTempData.map(([_, value]) => value));

  function getColor(value: number) {
    let color = RED;
    value < 28 && (color = ORANGE);
    value < 24 && (color = YELLOW);
    value < 20 && (color = GREEN);
    return color;
  }

  const barData = fillHolesInHourlyTimeseries(roomTempData).map(
    ([_, value]) => ({
      value: Math.max(value - (minRoomTemp - 1), 0),
      color: getColor(value),
    }),
  );

  return (
    <Row
      title="Room Temp"
      value={avgRoomTemp}
      unit="°C"
      color={getColor(avgRoomTemp)}
      barData={barData}
    />
  );
}

function BedTemp({session}: {session: SleepSession}) {
  let bedTempData = session.timeseries.tempBedC;
  const bedTempSum = bedTempData
    .map(x => x[1])
    .reduce((acc, current) => acc + current, 0);
  const avgBedTemp = Math.round(bedTempSum / bedTempData.length);
  const minBedTemp = Math.min(...bedTempData.map(([_, value]) => value));

  function getColor(value: number) {
    let color = RED;
    value < 38 && (color = ORANGE);
    value < 36 && (color = YELLOW);
    value < 34 && (color = GREEN);
    return color;
  }

  const barData = fillHolesInHourlyTimeseries(bedTempData).map(
    ([_, value]) => ({
      value: Math.max(value - (minBedTemp - 1), 0),
      color: getColor(value),
    }),
  );

  return (
    <Row
      title="Bed Temp"
      value={avgBedTemp}
      unit="°C"
      color={getColor(avgBedTemp)}
      barData={barData}
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

/**
 * Some time series have holes i.e. 12pm, 1pm, 3pm, this fills them with 0's
 */
function fillHolesInHourlyTimeseries(data: [string, number][]) {
  const startTime = new Date(data[0][0]).getTime();
  const endTime = new Date(data.slice(-1)[0][0]).getTime();
  const oneHour = 3600 * 1000;
  const numDataPoints = (endTime - startTime) / oneHour;

  const filledData = new Array(numDataPoints).fill(0).map((_, index) => {
    const time = startTime + oneHour * index;
    const isoTime = new Date(time).toISOString();
    const dataPoint = data.find(([x]) => x === isoTime);
    return dataPoint || [isoTime, 0];
  }) as [string, number][];

  return filledData;
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
