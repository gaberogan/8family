type SleepStage = 'awake' | 'out' | 'light' | 'deep';

type TimeseriesDataPoint = [string, number];

interface SleepSession {
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

interface SleepIntervals {
  intervals: SleepSession[];
}
