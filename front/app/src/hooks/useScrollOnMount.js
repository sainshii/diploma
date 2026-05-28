import { useEffect } from 'react';

export const useScrollOnMount = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};