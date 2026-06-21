import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import bg from '../img/bghomephone.webp';
import rombs from '../img/rombsphone.webp';
import carnival from '../img/carnival.webp';
import paper from '../img/bgpaperphone.webp';
import mask from '../img/mask.svg';

const Header = lazy(() => import('./Header'));
const ImageSlider = lazy(() => import('./ImageSlider'));
const Footer = lazy(() => import('./Footer'));

const API_URL = 'https://bauta-backend.onrender.com';

const HomePagePhone = () => {
  useScrollOnMount();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    } finally {
      setFormLoading(false);
    }
  };

  const inputClasses = "w-full bg-[#1b1b1b] rounded-2xl pl-3 border-b-2 border-[#C5A059]/40 text-white text-sm py-2 px-2 outline-none focus:border-[#C5A059] transition-colors duration-300 placeholder-gray-500";
  const labelClasses = "block text-[#C5A059] font-sf text-sm mb-1";

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white pt-16">
      <Helmet>
        <title>Баута – магазин венецианских масок и карнавальных костюмов</title>
        <meta name="description" content="Карнавальные маски ручной работы, плащи, шляпы и аксессуары. Создайте неповторимый венецианский образ. Доставка по всей России." />
      </Helmet>

      <Suspense fallback={null}>
        <Header />
      </Suspense>

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
            onClick={() => navigate('/history')}>Узнать больше</button>

            <img src={carnival} alt="carnival" className="w-3/4 rounded-xl mt-[1.5rem]" />
        </div>
      </section>

      {/* Третий блок */}
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

            <Suspense fallback={null}>
              <ImageSlider />
            </Suspense>

            <div className='pt-[2rem] px-[0.8rem]'>
              <p className="text-[0.6rem] text-[#0A0A0A] text-justify leading-relaxed font-playfair [-webkit-text-stroke:0.1px_#0A0A0A]">
                <span className="float-left mr-1 mt-1 text-[1.5rem] leading-[0.8] font-gv text-[#0A0A0A]">М</span>
                ы знаем: настоящий карнавал начинается с деталей. Поэтому в «Бауте» вы найдёте не только костюмы, но и маски ручной работы, страусовые перья, маскарадные шляпы и даже грим, чтобы завершить образ.
              </p>
            </div>

            <button
              className="mt-4 bg-[#8B1E1E] text-[#f0d29a] text-[0.7rem] rounded-full px-16"
              onClick={() => navigate('/shop')}>Перейти в каталог</button>
          </div>
        </div>
      </section>

      <section className="w-full bg-[#0A0A0A] pt-5 pb-8 px-4">
        <div className="max-w-md mx-auto">
          <h2 className="text-[#C5A059] font-gv text-3xl text-center mb-2">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-400 font-sf text-sm text-center mb-6">
            Есть вопросы или пожелания? Заполните форму, и мы ответим в ближайшее время.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 border border-[#C5A059]/40 rounded-2xl p-5"
          >
            <div>
              <label className={labelClasses}>Имя</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="Введите имя"
              />
            </div>
            <div>
              <label className={labelClasses}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="example@mail.ru"
              />
            </div>
            <div>
              <label className={labelClasses}>Сообщение</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className={`${inputClasses} resize-none`}
                placeholder="Введите сообщение..."
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf text-base py-2 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition disabled:opacity-50"
            >
              {formLoading ? 'Отправка...' : 'Отправить'}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-400 text-center text-sm mt-3">
                Сообщение успешно отправлено!
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-400 text-center text-sm mt-3">
                Произошла ошибка. Попробуйте ещё раз.
              </p>
            )}
          </form>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePagePhone;