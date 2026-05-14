import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import ImageSlider from './ImageSlider';
import Footer from './Footer';
import bg from '../img/bghome.png';
import rombs from '../img/rombs.png';
import carnival from '../img/carnival.png';
import paper from '../img/bgpaper.png';
import mask from '../img/mask.png';

const HomePagePC = () => {
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
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center pt-[2rem]">

      {/* главный блок */}
      <section className="relative w-full max-w-[1770px]">
        <img src={bg} alt="bg" className="w-full h-[888px] object-cover mx-auto rounded-xl"/>

        <div className="absolute top-5 left-0 w-full z-30 p-4">
          <div className="ml-[1.5rem]">
            {<Header></Header>}
          </div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none top-[33rem] right-[60rem]">
          <h1 className="text-[#C5A059] text-[15rem] font-gv drop-shadow-lg underline decoration-2 underline-offset-[1.5rem]">Баута</h1>
        </div>

        <div className='bg-[#0A0A0A] absolute px-[3rem] rounded-full flex items-center justify-center z-10 pointer-events-none top-[37.8rem] right-[64rem]'>
          <h2 className='text-transparent text-[1.3rem] bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 font-kreadon drop-shadow-lg'>Карнавальные костюмы</h2>
        </div>
      </section>

      {/* второй блок */}
      <section className='bg-[#0A0A0A] pb-[5rem]'>
        <img src={rombs} alt='rombs' className='relative mt-[5rem]'></img>

        <div className=''>
          <div className='absolute w-full flex items-center justify-center z-10 pointer-events-none top-[67.4rem]'>
            <h2 className='text-center leading-[2.8rem] text-transparent text-[2.3rem] bg-clip-text bg-gradient-to-r from-gray-400 via-gray-50 to-gray-400 font-gv drop-shadow-lg'>
              Недаром же венецианский карнавал всегда начинается с «полёта ангела» над площадью Сан-Марко. <br></br>
              Это своего рода символ карнавала, рожденный как мираж в зыбком морском воздухе, между землёю и небом.
            </h2>
          </div>

          <div className='absolute w-full flex items-center justify-center z-10 pointer-events-none top-[76.5rem]'>
            <p className='font-kreadon drop-shadow-lg text-[#C5A059] text-[1.5rem]'>– Виктор Меркушев, «Итальянские впечатления. Рим, Флоренция, Венеция»</p>
          </div>
        </div>

        <div className="flex mt-[5rem] ml-[5rem] gap-10 items-start">
          <img src={carnival} alt='carnival' className='w-[38rem] object-cover'/>

          <div className='text-justify w-full px-[7rem] text-[1.8rem] pt-[4rem]'>
            <p>
              <span className='text-[#C5A059] leading-[0rem]'>
                <span className='font-gv text-[2.5rem]'>В</span>енецианский карнавал 
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
              
            <p className='text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 pt-[1rem]'>
              Истоки карнавала восходят к Средневековью. Он просуществовал несколько веков, пока его не упразднили в 1797 году.
              Традиция была возрождена в 1979 году, и сейчас это мероприятие ежегодно привлекает около 3 миллионов посетителей. 
            </p>

            <div className='flex justify-center'>
              <button className='font-sf italic text-gray-50 bg-[#8B1E1E] rounded-full text-[1.7rem] px-[18rem] mt-[2rem] hover:scale-110 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition duration-300'
              onClick={()=>CustomNavigation('/history')}>Узнать больше</button>
            </div>
          </div>
        </div>
      </section>

      {/* третий блок */}
      <section className='bg-[#0A0A0A]'>
        <div className='relative w-full'>
          <img src={paper} alt="bgpaper" className="w-full object-cover mx-auto rounded-xl"/>

          <div className='absolute left-0 bottom-[1rem] w-full h-full flex flex-col items-center justify-center z-10 '>
            <img src={mask} alt='mask' className='w-[20rem]'></img>

            <h2 className='font-gv text-[#731A1A] text-[4rem] mt-[20px]'>Магазин «Баута» – это карнавал без границ!</h2>

            <div className='mx-[12rem] pt-[1rem]'>
              <p className="text-[1.9rem] text-[#0A0A0A] text-justify leading-relaxed font-playfair [-webkit-text-stroke:0.2px_#0A0A0A]">
                <span className="float-left mr-5 mt-2 text-[5rem] leading-[0.8] font-gv text-[#0A0A0A]">У</span>
                нас вы найдёте всё, чтобы создать неповторимый венецианский образ: от строгой элегантности классической Бауты до кокетливых полумасок Коломбины, от роскошных парчовых плащей до изящных аксессуаров – вееров, перчаток, треугольок и кружевных воротников.
                <span className="block mt-4 font-playfair">Мы собрали коллекцию, в которой каждый сможет выбрать костюм под свою роль:</span>
              </p>
            </div>

            <div className="w-full max-w-[1200px] px-4 mt-8">
              {<ImageSlider></ImageSlider>}
            </div>

            <div className='mx-[12rem] pt-[6rem]'>
              <p className="text-[2rem] text-[#0A0A0A] text-justify leading-relaxed font-playfair [-webkit-text-stroke:0.2px_#0A0A0A]">
                <span className="float-left mr-3 mt-5 text-[6rem] leading-[0.8] font-gv text-[#0A0A0A]">М</span>
                ы знаем: настоящий карнавал начинается с деталей. Поэтому в «Бауте» вы найдёте не только костюмы, но и маски ручной работы, страусовые перья, маскарадные шляпы и даже грим, чтобы завершить образ.
              </p>
            </div>

            <div className='flex justify-center'>
              <button className='font-sf italic text-[#f0d29a] bg-[#8B1E1E] rounded-full text-[2rem] px-[18rem] mt-[2.5rem] hover:scale-110 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition duration-300'
              onClick={()=>CustomNavigation('/shop')}>Перейти в магазин</button>
            </div>
          </div>
        </div>
      </section>

      {<Footer></Footer>}
    </div>
  );
};

export default HomePagePC;