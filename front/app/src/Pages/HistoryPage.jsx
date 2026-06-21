import React, { Suspense, lazy } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const HistoryPagePC = lazy(() => import('./HistoryPagePC'));
const HistoryPagePhone = lazy(() => import('./HistoryPagePhone'));

const HistoryPage = () => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Загрузка...</div>}>
      {isMobile ? <HistoryPagePhone /> : <HistoryPagePC />}
    </Suspense>
  );
};

export default HistoryPage;