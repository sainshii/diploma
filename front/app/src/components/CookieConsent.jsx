import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#1A1A1A] border-t border-[#C5A059]/40 text-gray-300 p-4 z-50 flex flex-col md:flex-row items-center justify-between gap-3">
      <p className="text-sm max-w-2xl text-center md:text-left">
        Мы используем файлы cookie для корректной работы сайта, а также обрабатываем персональные данные (имя, email, адрес доставки) с целью оформления заказов. 
        Продолжая использовать сайт, вы соглашаетесь с{' '}
        <a href="/privacy" className="text-[#C5A059] underline hover:text-white transition">
          политикой обработки персональных данных
        </a>.
      </p>
      <button
        onClick={handleAccept}
        className="bg-[#C5A059] text-[#0A0A0A] font-sf font-semibold px-6 py-2 rounded-full hover:bg-[#dfb872] transition whitespace-nowrap"
      >
        Принять
      </button>
    </div>
  );
};

export default CookieConsent;