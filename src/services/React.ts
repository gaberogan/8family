import {useEffect} from 'react';

/**
 * Hook that runs when a component has mounted
 */
export const useMounted = (func: any) => {
  useEffect(() => {
    func();
  }, []);
};
