import React from 'react';
import Header from './Header';
import bg from '../img/bghome.png';

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center pt-[2rem]">

      <div className="relative w-full max-w-[1400px]">
        <img src={bg} alt="bg" className="w-full h-[675px] object-cover mx-auto rounded-xl"/>

        <div className="absolute top-5 left-0 w-full z-30 p-4">
          <div className="ml-[3rem]">
            <Header />
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none top-[25rem] right-[50rem]">
          <h1 className="text-[#C5A059] text-[12rem] font-gv drop-shadow-lg">Баута</h1>
        </div>

        <div className='bg-[#0A0A0A] absolute px-[3rem] rounded-full flex items-center justify-center z-10 pointer-events-none top-[28.5rem] right-[52rem]'>
          <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 font-kreadon drop-shadow-lg'>Карнавальные костюмы</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;