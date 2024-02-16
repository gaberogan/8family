import {useEffect} from 'react';

export const useMounted = (func: any) => {
  useEffect(() => {
    func();
  }, []);
};
