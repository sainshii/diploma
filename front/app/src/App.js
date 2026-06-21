import './input.css'
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from "./context/CartContext";
import CookieConsent from './components/CookieConsent';

const Home = lazy(() => import("./Pages/HomePage"));
const HistoryPage = lazy(() => import("./Pages/HistoryPage"));
const MasksPage = lazy(() => import("./Pages/MasksPage"));
const ShopPage = lazy(() => import("./Pages/ShopPage"));
const RegPage = lazy(() => import("./Pages/RegPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const Profile = lazy(() => import("./Pages/Profile"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const NotFoundPage = lazy(() => import('./Pages/NotFoundPage'));

const Loading = () => (
  <div className="w-full min-h-screen bg-[#0A0A0A] flex items-center justify-center">
    <p className="text-[#C5A059] font-gv text-3xl">Загрузка...</p>
  </div>
);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <HelmetProvider>
          <CartProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<HistoryPage />} />
                <Route path='/masks' element={<MasksPage />} />
                <Route path='/shop' element={<ShopPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path='/register' element={<RegPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <CookieConsent />
            </Suspense>
          </CartProvider>
        </HelmetProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;