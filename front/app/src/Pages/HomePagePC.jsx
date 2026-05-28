import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import bg from '../img/bghome.webp';
import rombs from '../img/rombs.webp';
import carnival from '../img/carnival.webp';
import paper from '../img/bgpaper.webp';
import mask from '../img/mask.svg';

const Header = lazy(() => import('./Header'));
const ImageSlider = lazy(() => import('./ImageSlider'));
const Footer = lazy(() => import('./Footer'));

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const HomePagePC = () => {
  useScrollOnMount();
  const navigate = useNavigate();

  // ---- состояние формы обратной связи ----
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

  // Общие классы для полей ввода
  const inputClasses = `w-full bg-[#1b1b1b] rounded-2xl pl-[1rem] border-b-2 border-[#C5A059]/40 text-white text-lg py-2 px-1 outline-none 
  focus:border-[#C5A059] transition-colors duration-300 placeholder-gray-500
    lg:text-base 
    2xl:text-lg`;
  const labelClasses = `block text-[#C5A059] font-sf text-lg mb-1 lg:text-base 2xl:text-lg`;

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>Баута – магазин венецианских масок и карнавальных костюмов</title>
        <meta name="description" content="Карнавальные маски ручной работы, плащи, шляпы и аксессуары. Создайте неповторимый венецианский образ. Доставка по всей России." />
      </Helmet>

      {/* главный блок */}
      <section
        className={`
          relative w-full mx-auto
          lg:max-w-[1400px]
          2xl:max-w-[1770px]
        `}
      >
        <img
          src={bg}
          alt="bg"
          className={`
            w-full object-cover mx-auto rounded-xl
            lg:h-[703px]
            2xl:h-[888px]
          `}
        />

        <div className="absolute left-0 w-full z-30 p-4
        lg:top-2
        2xl:top-3">
          <div className="ml-[1.5rem]">
            <Suspense fallback={null}>
	            <Header />
            </Suspense>
          </div>
        </div>

        <div
          className={`
            absolute inset-0 flex items-center justify-center z-10 pointer-events-none
            lg:top-[26rem] lg:right-[44rem]
            2xl:top-[33rem] 2xl:right-[60rem]
          `}
        >
          <h1
            className={`
              text-[#C5A059] font-gv drop-shadow-lg underline decoration-2 underline-offset-[1.5rem]
              lg:text-[13rem]
              2xl:text-[15rem]
            `}
          >
            Баута
          </h1>
        </div>

        <div
          className={`
            bg-[#0A0A0A] absolute rounded-full flex items-center justify-center z-10 pointer-events-none
            lg:top-[29.3rem] lg:right-[47.6rem] lg:px-[2rem]
            2xl:top-[37.8rem] 2xl:right-[64rem] 2xl:px-[3rem]
          `}
        >
          <h2
            className={`
              text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-50 to-gray-400 font-kreadon drop-shadow-lg
              lg:text-[1.1rem]
              2xl:text-[1.3rem]
            `}
          >
            Карнавальные костюмы
          </h2>
        </div>
      </section>

      {/* второй блок */}
      <section className="bg-[#0A0A0A] pb-[5rem]">
        <img
          src={rombs}
          alt="rombs"
          className={`
            relative
            lg:mt-[3rem]
            2xl:mt-[5rem]
          `}
        />

        <div>
          <div
            className={`
              absolute w-full flex items-center justify-center z-10 pointer-events-none
              lg:top-[52rem]
              2xl:top-[67.4rem]
            `}
          >
            <h2
              className={`
                text-center text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-50 to-gray-400 font-gv drop-shadow-lg
                lg:leading-tight lg:text-[1.8rem]
                2xl:leading-[2.8rem] 2xl:text-[2.3rem]
              `}
            >
              Недаром же венецианский карнавал всегда начинается с «полёта ангела» над площадью Сан-Марко. <br />
              Это своего рода символ карнавала, рожденный как мираж в зыбком морском воздухе, между землёю и небом.
            </h2>
          </div>

          <div
            className={`
              absolute w-full flex items-center justify-center z-10 pointer-events-none
              lg:top-[59.4rem]
              2xl:top-[76.5rem]
            `}
          >
            <p
              className={`
                font-kreadon drop-shadow-lg text-[#C5A059]
                lg:text-[1.2rem]
                2xl:text-[1.5rem]
              `}
            >
              – Виктор Меркушев, «Итальянские впечатления. Рим, Флоренция, Венеция»
            </p>
          </div>
        </div>

        <div
          className={`
            flex items-start
            lg:mt-[3rem] lg:ml-[3rem] lg:gap-6
            2xl:mt-[5rem] 2xl:ml-[5rem] 2xl:gap-10
          `}
        >
          <img
            src={carnival}
            alt="carnival"
            className={`
              object-cover
              lg:w-[25rem]
              2xl:w-[38rem]
            `}
          />

          <div
            className={`
              text-justify w-full
              lg:px-[4rem] lg:text-[1.3rem] lg:pt-[3.2rem]
              2xl:px-[7rem] 2xl:text-[1.8rem] 2xl:pt-[4rem]
            `}
          >
            <p>
              <span className="text-[#C5A059] leading-[0rem]">
                <span
                  className={`
                    font-gv
                    lg:text-[2rem]
                    2xl:text-[2.5rem]
                  `}
                >
                  В
                </span>
                енецианский карнавал
              </span>
              <span className="text-gray-300"> (итал. </span>
              <span className="text-[#8B1E1E]">Carnevale di Venezia</span>
              <span className="text-gray-300">; венецианский </span>
              <span className="text-[#8B1E1E]">Carnaval de Venessia</span>
              <span className="text-gray-300">) – ежегодный фестиваль в Венеции, известный своими изысканными костюмами и масками.</span>
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300">
              Карнавал заканчивается в Жирный вторник (Martedì Grasso или Mardi Gras), за день до начала Великого поста в Пепельную среду.
            </p>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-50 to-gray-300 
            lg:pt-[0.5rem]
            2xl:pt-[1rem]">
              Истоки карнавала восходят к Средневековью. Он просуществовал несколько веков, пока его не упразднили в 1797 году.
              Традиция была возрождена в 1979 году, и сейчас это мероприятие ежегодно привлекает около 3 миллионов посетителей.
            </p>

            <div className="flex justify-center">
              <button
                className={`
                  font-sf italic text-gray-50 bg-[#8B1E1E] rounded-full hover:scale-110 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition duration-300
                  lg:text-[1.3rem] lg:px-[10rem] lg:mt-[1.5rem]
                  2xl:text-[1.6rem] 2xl:px-[18rem] 2xl:mt-[2rem]
                `}
                onClick={() => navigate('/history')}
              >
                Узнать больше
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* третий блок */}
      <section className="bg-[#0A0A0A]">
        <div className="relative w-full">
          <img src={paper} alt="bgpaper" className="w-full object-cover mx-auto rounded-xl" />

          <div className="absolute left-0 bottom-[1rem] w-full h-full flex flex-col items-center justify-center z-10 lg:px-[1.8rem] 2xl:px-0">
            <img
              src={mask}
              alt="mask"
              className={`
                lg:w-[15rem]
                2xl:w-[20rem]
              `}
            />

            <h2
              className={`
                font-gv text-[#731A1A]
                lg:text-[3.3rem] lg:mt-[15px]
                2xl:text-[4rem] 2xl:mt-[20px]
              `}
            >
              Магазин «Баута» – это карнавал без границ!
            </h2>

            <div
              className={`
                lg:mx-[6rem] lg:pt-[0.8rem]
                2xl:mx-[12rem] 2xl:pt-[1rem]
              `}
            >
              <p
                className={`
                  text-[#0A0A0A] text-justify leading-relaxed font-playfair
                  lg:text-[1.5rem] lg:[-webkit-text-stroke:0.15px_#0A0A0A]
                  2xl:text-[1.9rem] 2xl:[-webkit-text-stroke:0.2px_#0A0A0A]
                `}
              >
                <span
                  className={`
                    float-left leading-[0.8] font-gv text-[#0A0A0A]
                    lg:text-[4.5rem] lg:mr-4 lg:mt-1
                    2xl:text-[5rem] 2xl:mr-5 2xl:mt-2
                  `}
                >
                  У
                </span>
                нас вы найдёте всё, чтобы создать неповторимый венецианский образ: от строгой элегантности классической Бауты до кокетливых полумасок Коломбины, от роскошных парчовых плащей до изящных аксессуаров – вееров, перчаток, треугольок и кружевных воротников.
                <span className="block mt-4 font-playfair">Мы собрали коллекцию, в которой каждый сможет выбрать костюм под свою роль:</span>
              </p>
            </div>

            <div
              className={`
                w-full px-4 mt-8
                lg:max-w-[900px]
                2xl:max-w-[1200px]
              `}
            >
              <Suspense fallback={null}>
                <ImageSlider />
              </Suspense>
            </div>

            <div
              className={`
                lg:mx-[6rem] lg:pt-[5rem]
                2xl:mx-[12rem] 2xl:pt-[6rem]
              `}
            >
              <p
                className={`
                  text-[#0A0A0A] text-justify leading-relaxed font-playfair
                  lg:text-[1.6rem] lg:[-webkit-text-stroke:0.15px_#0A0A0A]
                  2xl:text-[2rem] 2xl:[-webkit-text-stroke:0.2px_#0A0A0A]
                `}
              >
                <span
                  className={`
                    float-left leading-[0.8] font-gv text-[#0A0A0A]
                    lg:text-[4.5rem] lg:mr-2 lg:mt-3
                    2xl:text-[6rem] 2xl:mr-3 2xl:mt-5
                  `}
                >
                  М
                </span>
                ы знаем: настоящий карнавал начинается с деталей. Поэтому в «Бауте» вы найдёте не только костюмы, но и маски ручной работы, страусовые перья, маскарадные шляпы и даже грим, чтобы завершить образ.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                className={`
                  font-sf italic text-[#f0d29a] bg-[#8B1E1E] rounded-full hover:scale-110 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition duration-300
                  lg:text-[1.5rem] lg:px-[10rem] lg:mt-[2rem]
                  2xl:text-[1.7rem] 2xl:px-[18rem] 2xl:mt-[2.5rem]
                `}
                onClick={() => navigate('/shop')}
              >
                Перейти в каталог
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ФОРМА ОБРАТНОЙ СВЯЗИ ===== */}
      <section className="w-full bg-[#0A0A0A] pt-16 
      lg:pt-[6rem] 
      2xl:pt-[8rem]">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-6 2xl:px-12">
          <h2 className="text-[#C5A059] font-gv text-5xl text-center 
          lg:text-5xl lg:mb-3
          2xl:text-6xl 2xl:mb-3">
            Свяжитесь с нами
          </h2>
          <p className="text-gray-400 font-sf text-xl text-center mb-12 
          lg:text-lg 
          2xl:text-xl">
            Есть вопросы или пожелания? Заполните форму, и мы ответим в ближайшее время.
          </p>

          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-8 border border-[#C5A059]/40 rounded-2xl p-8 
            lg:p-6 
            2xl:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
            <div>
              <label className={labelClasses}>Сообщение</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className={`${inputClasses} resize-none`}
                placeholder="Введите сообщение..."
              />
            </div>

            <button
              type="submit"
              disabled={formLoading}
              className="w-full bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf text-xl hover:bg-[#C5A059] hover:text-[#8B1E1E] transition disabled:opacity-50 
              lg:text-lg lg:py-1
              2xl:text-xl 2xl:py-2"
            >
              {formLoading ? 'Отправка...' : 'Отправить'}
            </button>

            {formStatus === 'success' && (
              <p className="text-green-400 text-center text-lg mt-4">
                Сообщение успешно отправлено!
              </p>
            )}
            {formStatus === 'error' && (
              <p className="text-red-400 text-center text-lg mt-4">
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

export default HomePagePC;