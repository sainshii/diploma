import React, { Suspense, lazy } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const HomePagePC = lazy(() => import('./HomePagePC'));
const HomePagePhone = lazy(() => import('./HomePagePhone'));

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Загрузка...</div>}>
      {isMobile ? <HomePagePhone /> : <HomePagePC />}
    </Suspense>
  );
};

export default HomePage;