// MasksPage.jsx
import React, { Suspense, lazy } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';

const MasksPagePC = lazy(() => import('./MasksPagePC'));
const MasksPagePhone = lazy(() => import('./MasksPagePhone'));

const MasksPage = () => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Загрузка...</div>}>
      {isMobile ? <MasksPagePhone /> : <MasksPagePC />}
    </Suspense>
  );
};

export default MasksPage;