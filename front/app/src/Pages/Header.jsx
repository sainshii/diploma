import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../img/logo.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const CustomNavigation = (path) => {
        const token = localStorage.getItem('token');
        const protectedRoutes = ['/profile', '/shop'];
        if (protectedRoutes.includes(path) && !token) {
            if (window.confirm('Войдите')) {
                navigate('/login');
            }
        } else {
            navigate(path);
        }
    };

    const menuItems = [
        { text: 'лавная', firstLetter: 'Г', path: '/' },
        { text: 'стория', firstLetter: 'И', path: '/history' },
        { text: 'аски и персонажи', firstLetter: 'М', path: '/masks' },
        { text: 'агазин', firstLetter: 'М', path: '/shop' },
    ];

    return (
        <div>
            <header className='flex gap-[30px]'>
                <img src={logo} alt='logo' className='w-[5rem] h-[5rem] rounded-full border-2 border-[#8B1E1E]' />

                {/* страницы */}
                <div className='bg-[#0A0A0A] w-[35rem] h-[2.5rem] mt-[1.2rem] rounded-full border-2 border-[#8B1E1E]'>
                    <div className='flex justify-center gap-[10px] font-sf font-thin items-center h-full'>
                        {menuItems.map((item) => {
                            const isActive = location.pathname === item.path;

                            return (
                                <button
                                    key={item.text}
                                    className={`flex items-center relative px-[25px] rounded-full z-10 ${ //активная кнопка
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
                                    
                                    {/* текст */}
                                    <span className='relative z-10 font-gv text-[18px]'>
                                        {item.firstLetter}
                                    </span>
                                    <span className='relative z-10 font-sf text-[15px]'>
                                        {item.text}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* корзина, профиль, выход */}
                <div className="ml-[24rem]">
                    <div className="bg-[#8B1E1E] w-[12rem] h-[2.5rem] mt-[1.1rem] rounded-full border-2 border-[#0A0A0A] flex items-center justify-center gap-4">

                        {/* корзина */}
                        <button
                            onClick={() => CustomNavigation('/cart')}
                            className={`p-1 flex items-center rounded-full relative transition-all duration-500 ${
                                location.pathname === '/cart'
                                    ? 'bg-[#C5A059] text-[#8B1E1E]'  // Активная
                                    : 'bg-transparent text-[#C5A059] hover:text-[#0A0A0A]'  // Неактивная
                            }`}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                            </span>
                        </button>
                        
                        {/* профиль*/}
                        <button
                            onClick={() => CustomNavigation('/login')}
                            className={`p-1 flex items-center rounded-full relative transition-all duration-500 ${
                                location.pathname === '/login'
                                    ? 'bg-[#C5A059] text-[#8B1E1E]'  // Активная
                                    : 'bg-transparent text-[#C5A059] hover:text-[#0A0A0A]'  // Неактивная
                            }`}
                        >
                            <span className="relative z-10 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                                className="text-[#C5A059] hover:text-[#0A0A0A] transition duration-300 p-1 flex items-center"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </button>
                        )}

                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;