import {SleepSession} from '../services/SleepSession';
import {fillHolesInHourlyTimeseries, getHeartRateData} from './SleepFacts';
import sessionJson from '../mocks/session.json';
import {GREEN, RED} from '../services/Color';

const session = sessionJson as unknown as SleepSession;

describe('getHeartRateData', () => {
  it('calculates average heart rate correctly', () => {
    const results = getHeartRateData(session);
    expect(results.avgHeartRate).toBe(84);
  });

  it('assigns colors based on heart rate values', () => {
    const results = getHeartRateData(session);
    expect(results.barData[0].color).toBe(RED);
    expect(results.barData[1].color).toBe(RED);
    expect(results.barData[2].color).toBe(RED);
    expect(results.barData[3].color).toBe(GREEN);
    expect(results.barData[4].color).toBe(RED);
    expect(results.barData[5].color).toBe(RED);
  });
});

describe('fillHolesInHourlyTimeseries', () => {
  it('fills holes in hourly timeseries', () => {
    const heartRateData = session.timeseries.heartRate;
    expect(heartRateData.length).toBe(5);
    const filledHeartRateData = fillHolesInHourlyTimeseries(heartRateData);
    expect(filledHeartRateData.length).toBe(6);
    expect(filledHeartRateData).toEqual([
      ['2017-03-09T08:00:00.000Z', 80.01],
      ['2017-03-09T09:00:00.000Z', 86],
      ['2017-03-09T10:00:00.000Z', 81],
      ['2017-03-09T11:00:00.000Z', 0],
      ['2017-03-09T12:00:00.000Z', 83],
      ['2017-03-09T13:00:00.000Z', 88],
    ]);
  });
});
