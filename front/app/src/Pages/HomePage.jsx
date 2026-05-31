import React, { Suspense, lazy } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { Helmet } from 'react-helmet-async';

// Ленивая загрузка компонентов (чтобы мобильный код не грузился на ПК и наоборот)
const HomePagePC = lazy(() => import('./HomePagePC'));
const HomePagePhone = lazy(() => import('./HomePagePhone'));

const HomePage = () => {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Загрузка...</div>}>
      <Helmet>
        <meta name="yandex-verification" content="f506a36d67eb2707" />
      </Helmet>
      {isMobile ? <HomePagePhone /> : <HomePagePC />}
    </Suspense>
  );
};

export default HomePage;