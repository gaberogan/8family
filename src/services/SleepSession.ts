import {fetchJSON} from './Fetch';
import {BarData} from '../components/BarChart';
import {User, usersState} from './User';
import {BLUE, PURPLE, YELLOW} from './Color';

export type SleepStage = 'awake' | 'out' | 'light' | 'deep';

export type TimeseriesDataPoint = [string, number];

export interface SleepSession {
  id: string;
  ts: string;
  stages: {
    stage: SleepStage;
    duration: number;
  }[];
  score: number;
  timeseries: {
    tnt: TimeseriesDataPoint[];
    tempRoomC: TimeseriesDataPoint[];
    tempBedC: TimeseriesDataPoint[];
    respiratoryRate: TimeseriesDataPoint[];
    heartRate: TimeseriesDataPoint[];
    heating: TimeseriesDataPoint[]; // Ignore this
  };
}

export interface SleepSessions {
  intervals: SleepSession[];
}

/**
 * Fetch sleep sessions for each user
 */
export const fetchSleepSessions = async () => {
  const newUsers: User[] = await Promise.all(
    usersState.get().map(async user => ({
      ...user,
      sessions: await fetchJSON(user.sessionsUrl),
    })),
  );

  usersState.set(newUsers);
};

type SleepSessionWithTimestamps = (SleepSession['stages'][0] & {
  timestamp: number;
})[];

/**
 * e.g. returns [{ stage: 'awake', duration: 3600000, timestamp: 1708107579195 }, ...]
 */
export const getSleepStagesWithTimestamps = (session: SleepSession) => {
  const startTime = getSleepSessionStartTime(session);

  // Sleep stages with { timestamp }
  let stages = session.stages as SleepSessionWithTimestamps;

  // Don't count time out of bed
  stages = stages.filter(x => x.stage !== 'out');

  // Copy all sleep stages, change duration to ms
  stages = stages.map(x => ({
    ...x,
    duration: x.duration * 1000,
  }));

  // Add timestamp to sleep stages
  stages.forEach((stage, index) => {
    stage.timestamp =
      index === 0
        ? startTime
        : stages[index - 1].timestamp + stages[index - 1].duration;
  });

  return stages;
};

/**
 * Return start time of sleep session in ms
 */
export const getSleepSessionStartTime = (session: SleepSession) => {
  return new Date(session.ts).getTime();
};

/**
 * Return end time of sleep session in ms
 */
export const getSleepSessionEndTime = (stages: SleepSessionWithTimestamps) => {
  const lastStage = stages.slice(-1)[0];
  return lastStage.timestamp + lastStage.duration;
};

/**
 * Return bar chart data for sleep session e.g. [{value: 3, color: 'yellow'}, ...]
 */
export const getSleepStagesChartData = (session: SleepSession, bars = 30) => {
  const stages = getSleepStagesWithTimestamps(session);
  const startTime = new Date(session.ts).getTime();
  const endTime = getSleepSessionEndTime(stages);
  const timeAsleep = endTime - startTime;
  const timeInterval = timeAsleep / (bars - 1);

  const barData = new Array(bars).fill(0).map((__, index) => {
    const time = startTime + timeInterval * index;

    const stage = stages.find(
      x => time >= x.timestamp && time <= x.timestamp + x.duration,
    )?.stage;

    return {
      out: {value: 0, color: 'black'} as BarData,
      awake: {value: 3, color: YELLOW},
      light: {value: 2, color: BLUE},
      deep: {value: 1, color: PURPLE},
    }[stage!];
  });

  return {
    barData,
    startTime,
    endTime,
  };
};
