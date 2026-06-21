import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom'; // ← добавлен Link
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo.svg';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const CustomNavigation = (path) => {
        const token = localStorage.getItem('token');
        const protectedRoutes = ['/profile', '/cart'];
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите')) {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
        setMobileMenuOpen(false);
    };

    const menuItems = [
        { text: 'лавная', firstLetter: 'Г', path: '/' },
        { text: 'стория', firstLetter: 'И', path: '/history' },
        { text: 'аски и персонажи', firstLetter: 'М', path: '/masks' },
        { text: 'аталог', firstLetter: 'К ', path: '/shop' },
    ];

    return (
        <div>
            {/* ПК */}
            <header
                className={`
                    fixed z-50 hidden md:flex items-center overflow-hidden rounded-full border-[1px] border-[#C5A059]/40
                    lg:gap-[20px] lg:px-[1.5rem] lg:py-2 lg:mx-[1.5rem]
                    2xl:gap-[20px] 2xl:px-[2.4rem] 2xl:py-2 2xl:mx-[2.1rem]
                `}
            >
                <div className='absolute inset-0 backdrop-blur-sm bg-white/5 border-none z-[-1]'></div>

                <Link to="/" className="flex-shrink-0">
                    <img
                        src={logo}
                        alt='logo'
                        className={`
                            lg:w-[4.5rem] lg:h-[4.5rem]
                            2xl:w-[6rem] 2xl:h-[6rem]
                            hover:scale-90 duration-500 transition bg-[#0A0A0A] hover:bg-[#0A0A0A]/70 rounded-full border-[1px] border-[#C5A059]/40
                        `}
                    />
                </Link>

                <div
                    className={`
                        bg-[#0A0A0A] rounded-full border-[1px] border-[#C5A059]/30
                        lg:w-[41rem] lg:h-[3rem]
                        2xl:w-[45rem] 2xl:h-[3.5rem]
                    `}
                >
                    <div className='flex justify-center font-sf font-thin items-center h-full
                    lg:gap-[8px]
                    2xl:gap-[8px]'>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <button
                                    key={item.text}
                                    className={`
                                        flex items-center relative rounded-full z-10
                                        lg:px-[16px] lg:py-0
                                        2xl:px-[18px]
                                        ${isActive ? 'text-[#0A0A0A]' : 'text-[#C5A059] hover:text-[#0A0A0A] hover:bg-[#C5A059] duration-500 transition'}
                                    `}
                                    onClick={() => CustomNavigation(item.path)}
                                >
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
                                    <span
                                        className={`
                                            relative z-10 font-gv
                                            lg:text-[25px]
                                            2xl:text-[25px]
                                            mr-1
                                        `}
                                    >
                                        {item.firstLetter}
                                    </span>
                                    <span
                                        className={`
                                            relative z-10 font-sf
                                            lg:text-[18px]
                                            2xl:text-[20px]
                                        `}
                                    >
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Корзина, профиль, выход */}
                <div
                    className={`
                        lg:ml-[18rem]
                        2xl:ml-[30rem]
                    `}
                >
                    <div
                        className={`
                            bg-[#8B1E1E] rounded-full border-[0.1rem] border-[#0A0A0A]/60 flex items-center justify-center
                            lg:w-[10rem] lg:h-[3rem] lg:gap-2
                            2xl:w-[13rem] 2xl:h-[3.6rem] 2xl:gap-2
                        `}
                    >
                        <button
                            onClick={() => CustomNavigation('/cart')}
                            className={`
                                p-1 flex items-center rounded-full relative transition-all duration-500
                                ${location.pathname === '/cart'
                                    ? 'bg-[#C5A059] text-[#8B1E1E]'
                                    : 'bg-transparent text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059]'
                                }
                                lg:p-1.5
                                2xl:p-2
                            `}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='
                                lg:w-[23px] lg:h-[23px]
                                2xl:w-[26px] 2xl:h-[26px]'>
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </span>
                        </button>

                        <button
                            onClick={() => CustomNavigation('/profile')}
                            className={`
                                p-1 flex items-center rounded-full relative transition-all duration-500
                                ${(location.pathname === '/profile' || location.pathname === '/login')
                                    ? 'bg-[#C5A059] text-[#8B1E1E]'
                                    : 'bg-transparent text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059]'
                                }
                                lg:p-1.5
                                2xl:p-2
                            `}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='
                                lg:w-[23px] lg:h-[23px]
                                2xl:w-[26px] 2xl:h-[26px]'>
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                            </span>
                        </button>

                        {localStorage.getItem('token') && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('token');
                                    window.location.reload();
                                }}
                                className={`
                                    text-[#C5A059] hover:text-[#8B1E1E] hover:bg-[#C5A059] transition duration-300 rounded-full flex items-center
                                    lg:p-1.5
                                    2xl:p-2
                                `}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className='
                                lg:w-[23px] lg:h-[23px]
                                2xl:w-[26px] 2xl:h-[26px]'>
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* Мобильный */}
            <header className="fixed z-50 top-0 left-0 w-full flex items-center justify-between px-3 py-2 bg-transparent backdrop-blur-sm md:hidden">
                <Link to="/">
                    <img src={logo} alt="logo" className="w-[2.5rem] h-[2.5rem] rounded-full border-[1px] border-[#C5A059]/40 bg-[#0A0A0A]" />
                </Link>

                <div className="flex items-center gap-3">
                    <button onClick={() => CustomNavigation('/cart')} className="text-[#C5A059] p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                    </button>
                    <button onClick={() => CustomNavigation('/profile')} className="text-[#C5A059] p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                    </button>
                    <button onClick={() => setMobileMenuOpen(true)} className="text-[#C5A059] p-1 flex flex-col gap-1">
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                        <span className="block w-5 h-[1px] bg-current rounded-full" />
                    </button>
                </div>
            </header>

            {/* Боковое меню */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-[60] md:hidden"
                            onClick={() => setMobileMenuOpen(false)}
                        />
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-64 bg-[#0A0A0A] border-[1px] border-[#C5A059]/40 z-[70] flex flex-col p-6 md:hidden"
                        >
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="self-end text-[#C5A059] mb-8"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
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
                                            {item.firstLetter}
                                            <span className="font-sf text-[1rem] pl-[3px]">{item.text}</span>
                                        </span>
                                    </button>
                                );
                            })}
                            {localStorage.getItem('token') && (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        window.location.reload();
                                    }}
                                    className="mt-auto py-3 px-4 text-left text-red-500 hover:bg-red-500/10 rounded-lg flex items-center gap-3 font-sf"
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