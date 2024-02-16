import {newRidgeState} from 'react-ridge-state';
import {SleepSessions} from './SleepSession';

export interface User {
  id: string;
  name: string;
  sessionsUrl: string;
  sessions?: SleepSessions;
}

export const usersState = newRidgeState<User[]>([
  {
    id: '1',
    name: 'Gabe',
    sessionsUrl:
      'https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json',
  },
  {
    id: '2',
    name: 'Alice',
    sessionsUrl:
      'https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json',
  },
  {
    id: '3',
    name: 'Bob',
    sessionsUrl:
      'https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json',
  },
]);
