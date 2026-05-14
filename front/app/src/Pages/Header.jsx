import React, { useState } from 'react'; // добавили useState
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // ← новое состояние

    const CustomNavigation = (path) => {
        const token = localStorage.getItem('token');
        const protectedRoutes = ['/profile', '/shop', '/cart'];
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите')) {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
        setMobileMenuOpen(false); // закрываем меню при переходе
    };

    const menuItems = [
        { text: 'лавная', firstLetter: 'Г', path: '/' },
        { text: 'стория', firstLetter: 'И', path: '/history' },
        { text: 'аски и персонажи', firstLetter: 'М', path: '/masks' },
        { text: 'аталог', firstLetter: 'К  ', path: '/shop' },
    ];

    return (
        <div>
            {/* ========== ДЕСКТОПНЫЙ ХЕДЕР (не меняли, только добавили скрытие на мобильных) ========== */}
            <header className='fixed z-50 hidden md:flex gap-[30px] items-center px-12 py-2 overflow-hidden rounded-full border-[1px] border-[#C5A059]'>
                
                {/* Слой с размытием (прозрачный, без бордеров) */}
                <div className='absolute inset-0 backdrop-blur-sm bg-transparent border-none z-[-1]'></div>

                <img src={logo} alt='logo' className='w-[6rem] h-[6rem] rounded-full border-2 border-[#8B1E1E]' />

                {/* страницы */}
                <div className='bg-[#0A0A0A] w-[43rem] h-[3.5rem] rounded-full border-2 border-[#8B1E1E]'>
                    <div className='flex justify-center gap-[10px] font-sf font-thin items-center h-full'>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.text}
                                    className={`flex items-center relative px-[25px] rounded-full z-10 ${
                                        isActive ? 'text-[#0A0A0A]' : 'text-[#C5A059] hover:text-[#0A0A0A] hover:bg-[#C5A059] duration-300 transition px-[8px]'
                                    }`}
                                    onClick={() => CustomNavigation(item.path)}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="gold-highlight"
                                            className="absolute inset-0 bg-[#C5A059] rounded-full"
                                            transition={{
                                                type: 'spring',
                                                stiffness: 300,
                                                damping: 30,
                                            }}
                                        />
                                    )}
                                    
                                    <span className='relative z-10 font-gv text-[25px] mr-1'>
                                        {item.firstLetter}
                                    </span>
                                    <span className='relative z-10 font-sf text-[20px]'>
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* корзина, профиль, выход */}
                <div className="ml-[35rem]">
                    <div className="bg-[#8B1E1E] w-[12rem] h-[4rem] rounded-full border-2 border-[#0A0A0A] flex items-center justify-center gap-4">

                        {/* корзина */}
                        <button
                            onClick={() => CustomNavigation('/cart')}
                            className={`p-1 flex items-center rounded-full relative transition-all duration-500 ${
                                location.pathname === '/cart'
                                    ? 'bg-[#C5A059] text-[#8B1E1E] p-2'
                                    : 'bg-transparent text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059] p-2'
                            }`}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </span>
                        </button>
                        
                        {/* профиль*/}
                        <button
                            onClick={() => CustomNavigation('/profile')}
                            className={`p-1 flex items-center rounded-full relative transition-all duration-500 ${
                                location.pathname === '/login'
                                    ? 'bg-[#C5A059] text-[#8B1E1E] p-2'
                                    : 'bg-transparent text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059] p-2'
                            }`}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                        </button>
                        
                        {/* Выход */}
                        {localStorage.getItem('token') && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }}
                                className="text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059] transition duration-300 p-2 rounded-full flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* ========== МОБИЛЬНЫЙ ХЕДЕР (новый, видим только на мобильных) ========== */}
            <header className="fixed z-50 top-0 left-0 w-full flex items-center justify-between px-3 py-2 bg-transperent backdrop-blur-sm md:hidden">
                {/* Лого */}
                <img src={logo} alt="logo" className="w-[2.5rem] h-[2.5rem] rounded-full border-[0.1rem] border-[#8B1E1E]" />

                {/* Контейнер для иконок и бургера */}
                <div className="flex items-center gap-3">
                    {/* Корзина */}
                    <button
                        onClick={() => CustomNavigation('/cart')}
                        className="text-[#C5A059] p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </button>

                    {/* Профиль (или логин) */}
                    <button
                        onClick={() => CustomNavigation('/profile')}
                        className="text-[#C5A059] p-1"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>

                    {/* Бургер-иконка */}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="text-[#C5A059] p-1 flex flex-col gap-1"
                    >
                        {/* Три полоски */}
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                    </button>
                </div>
            </header>

            {/* Боковое меню*/}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Затемнение фона */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[60] md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />

                        {/* Панель меню */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-64 bg-[#0A0A0A] border-l border-[#8B1E1E] z-[70] flex flex-col p-6 md:hidden"
                        >
                            {/* Кнопка закрытия (крестик) */}
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="self-end text-[#C5A059] mb-8"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>

                            {/* Пункты навигации */}
                            {menuItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <button
                                        key={item.text}
                                        onClick={() => CustomNavigation(item.path)}
                                        className={`text-left py-1 px-4 rounded-full mb-1 flex items-center gap-3 ${
                                            isActive ? 'bg-[#C5A059] text-[#0A0A0A]' : 'text-[#C5A059] hover:bg-[#C5A059]/10'
                                        }`}
                                    >
                                        <span className="font-gv text-xl">
                                            {item.firstLetter}<span className="font-sf text-[1rem] pl-[3px]">{item.text}</span>
                                        </span>
                                    </button>
                                );
                            })}

                            {/* Выход (если залогинен) */}
                            {localStorage.getItem('token') && (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }}
                                    className="mt-auto py-3 px-4 text-left text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-3"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                    Выйти
                                </button>
                            )}
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Header;