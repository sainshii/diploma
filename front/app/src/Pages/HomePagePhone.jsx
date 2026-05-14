import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Footer from './Footer';
import bg from '../img/bghomephone.png';
import rombs from '../img/rombsphone.png';
import carnival from '../img/carnival.png';
import paper from '../img/bgpaperphone.png';
import mask from '../img/mask.png';

const HomePagePhone = () => {
  const navigate = useNavigate();
  const CustomNavigation = (path) => {
    const token = localStorage.getItem('token')
    const protectedRoutes = ['/shop']
    if (protectedRoutes.includes(path) && !token){
        if(window.confirm('Войдите')){
            navigate('/login')
        }
    }else{
        navigate(path)
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white pt-16">
      <Header />

      {/* Главный блок */}
      <section className="px-4 pt-4">
        <div className="grid grid-cols-1 grid-rows-1">
          <img src={bg} alt="bg" className="w-full h-auto col-start-1 row-start-1 object-cover"/>
          <div className="col-start-1 row-start-1 flex flex-col-reverse items-center justify-center text-center mt-[28rem] mr-4">
            <h1 className="text-[#C5A059] text-[6.5rem] font-gv drop-shadow-lg z-10 -mt-[2.8rem]">Баута</h1>
            <div className='bg-[#0A0A0A] px-[1.7rem] rounded-full flex justify-center pointer-events-none ml-[9rem]'>
                <h2 className="text-[0.6rem] font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 drop-shadow-md">Карнавальные костюмы</h2>
            </div>
          </div>
        </div>
        </section>

      {/* Второй блок */}
      <section className="px-6 mt-2">

        <div className="flex flex-col items-center mt-4 text-[0.8rem] text-justify">
            <img src={rombs} alt="rombs" className="w-full h-auto object-cover"/>
            <p className='mt-4'>
              <span className='text-[#C5A059] leading-[0rem]'>
                <span className='font-gv text-[1.5rem]'>В</span>енецианский карнавал 
              </span>
              <span className='text-gray-300'> (итал. </span>
              <span className='text-[#8B1E1E]'>Carnevale di Venezia</span>
              <span className='text-gray-300'>; венецианский </span>
              <span className='text-[#8B1E1E]'>Carnaval de Venessia</span>
              <span className='text-gray-300'>) – ежегодный фестиваль в Венеции, известный своими изысканными костюмами и масками.</span>
            </p>
            <p className='text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300'>
              Карнавал заканчивается в Жирный вторник (Martedì Grasso или Mardi Gras), за день до начала Великого поста в Пепельную среду.
            </p>
              
            <p className='text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 pt-[0.5rem]'>
              Истоки карнавала восходят к Средневековью. Он просуществовал несколько веков, пока его не упразднили в 1797 году.
              Традиция была возрождена в 1979 году, и сейчас это мероприятие ежегодно привлекает около 3 миллионов посетителей. 
            </p>

            <button className="mt-4 bg-[#8B1E1E] text-gray-200 rounded-full px-16 text-[0.7rem]"
            onClick={() => CustomNavigation('/history')}>Узнать больше</button>

            <img src={carnival} alt="carnival" className="w-3/4 rounded-xl mt-[1.5rem]" />
        </div>
      </section>

      {/* Третий блок — магазин */}
      <section className="mt-8 mb-8">
        <div className="relative">
          <img src={paper} alt="paper" className="w-full rounded-xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <img src={mask} alt="mask" className="w-1/5" />
            <h2 className="text-[#731A1A] text-[1.1rem] font-gv mt-2">Магазин «Баута» – это карнавал без границ!</h2>
            <div className='pt-[0.6rem] px-[0.8rem] mb-4'>
              <p className="text-[0.6rem] text-[#0A0A0A] text-justify leading-relaxed font-playfair [-webkit-text-stroke:0.1px_#0A0A0A]">
                <span className="float-left mr-2 mt-1 text-[1.5rem] leading-[0.8] font-gv text-[#0A0A0A]">У</span>
                нас вы найдёте всё, чтобы создать неповторимый венецианский образ: от строгой элегантности классической Бауты до кокетливых полумасок Коломбины, от роскошных парчовых плащей до изящных аксессуаров – вееров, перчаток, треугольок и кружевных воротников.
                <span className="block mt-2 font-playfair">Мы собрали коллекцию, в которой каждый сможет выбрать костюм под свою роль:</span>
              </p>
            </div>

            <ImageSlider />

            <div className='pt-[2rem] px-[0.8rem]'>
              <p className="text-[0.6rem] text-[#0A0A0A] text-justify leading-relaxed font-playfair [-webkit-text-stroke:0.1px_#0A0A0A]">
                <span className="float-left mr-2 mt-1 text-[1.5rem] leading-[0.8] font-gv text-[#0A0A0A]">М</span>
                ы знаем: настоящий карнавал начинается с деталей. Поэтому в «Бауте» вы найдёте не только костюмы, но и маски ручной работы, страусовые перья, маскарадные шляпы и даже грим, чтобы завершить образ.
              </p>
            </div>

            <button
              className="mt-4 bg-[#8B1E1E] text-[#f0d29a] text-[0.7rem] rounded-full px-16"
              onClick={() => CustomNavigation('/shop')}>Перейти в магазин</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePagePhone;