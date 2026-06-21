import React, { useState, useEffect } from 'react';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Tilt from 'react-parallax-tilt';
import bghistory from '../img/bghistory.webp';
import historysec2 from '../img/history2.webp';
import historysec3 from '../img/history3.webp';
import historysec4 from '../img/history4.webp';
import redmask from '../img/redmask.webp';
import mask1 from '../img/mask1.svg';
import mask2 from '../img/mask2.svg';
import mask3 from '../img/mask3.svg';

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const HistoryPagePC = () => {

  useScrollOnMount();

  const [activeIndex, setActiveIndex] = useState(null);

  const AccordionItem = ({ title, text, index, activeIndex, setActiveIndex }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(activeIndex === index);
    }, [activeIndex, index]);

    const handleToggle = () => {
      setActiveIndex(activeIndex === index ? null : index);
    };

    return (
      <div className="border-s-8 border-black/50 rounded-lg overflow-hidden border-[0.1rem]">
        <button
          onClick={handleToggle}
          className="w-full text-left px-6 flex justify-between items-center backdrop-blur-md bg-black/5 hover:bg-white/20 border border-white/20 transition-colors duration-300
          lg:py-3
          2xl:py-4"
        >
          <span
            className={`font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-[#202020] via-[#5f5f5f] to-[#202020]
              lg:text-lg
              2xl:text-2xl
            `}
          >
            {title}
          </span>
          <span
            className={`text-black transition-transform duration-300
              lg:text-lg
              2xl:text-2xl
            `}
          >
            {isOpen ? '−' : '+'}
          </span>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div
            className={`backdrop-blur-xs bg-white/10 font-kreadon text-justify leading-relaxed text-[#202020]
              lg:text-[1rem] lg:p-4
              2xl:text-[1.3rem] 2xl:p-6
            `}
          >
            {text}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>История Венецианского карнавала – от Средневековья до наших дней</title>
        <meta name="description" content="Узнайте, как зародился карнавал в Венеции, почему маски стали символом свободы и как праздник возродился спустя 200 лет. Интересные факты и традиции." />
      </Helmet>
      {/* Главная */}
      <section
        className={`relative w-full mx-auto
          lg:max-w-[1400px]
          2xl:max-w-[1770px]
        `}
      >
        <img
          src={bghistory}
          alt="bghistory"
          className={`w-full object-cover mx-auto rounded-xl
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
          className={`absolute flex items-center justify-center z-10 pointer-events-none
            lg:top-[6rem] lg:right-[16rem]
            2xl:top-[8rem] 2xl:right-[20rem]
          `}
        >
          <h1
            className={`text-transparent bg-clip-text bg-gradient-to-r from-[#a58f65] via-[#ddd3c3] to-[#9e885f] font-younglove drop-shadow-lg
              lg:text-[12rem]
              2xl:text-[15rem]
            `}
          >
            История
          </h1>
        </div>
      </section>

      {/* Второй блок */}
      <section className="relative w-full mt-[1rem] overflow-hidden">
        <img
          src={historysec2}
          alt="historysec2"
          className={`w-full object-cover mx-auto rounded-xl
            lg:h-[900px]
            2xl:h-[1120px]
          `}
        />

        <Tilt
          className="absolute inset-0 z-10 w-full h-full"
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          transitionSpeed={2000}
          perspective={1000}
          scale={1.02}
        >
          <img
            src={redmask}
            alt="redmask"
            className={`h-auto object-contain mx-auto
              lg:w-[55%] lg:mt-[7rem]
              2xl:w-[52%] 2xl:mt-[10rem]
            `}
          />
        </Tilt>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 pointer-events-none
            lg:top-[-50rem]
            2xl:top-[-61rem]
          `}
        >
          <h2
            className={`font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B] text-center leading-tight
              lg:text-[2.7rem]
              2xl:text-6xl 2xl:leading-tight
            `}
          >
            Венецианский карнавал имеет долгую историю,
          </h2>
          <h3
            className={`font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B] text-center leading-tight
              lg:text-[2.3rem] lg:-mt-4
              2xl:text-5xl 2xl:-mt-[1.5rem] 2xl:mr-[1.5rem] 2xl:leading-tight
            `}
          >
            ⠀уходящую корнями как минимум в{' '}
            <span
              className={`lg:text-2xl 2xl:text-4xl`}
            >
              X||
            </span>{' '}
            век.
          </h3>
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none">
          <div
            className={`absolute
              lg:top-[19.1rem] lg:left-[4.3rem] lg:w-[22rem]
              2xl:top-[23.5rem] 2xl:left-[5.5rem] 2xl:w-[30rem]
            `}
          >
            <p
              className={`text-justify font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B]
                lg:text-[1.1rem]
                2xl:text-[1.5rem]
              `}
            >
              В католической традиции карнавал празднуют перед началом Великого поста, который представляет собой 40-дневный период поста и покаяния перед Пасхой.
              Карнавал – возможность поесть, выпить и повеселиться перед покаянием, которое предваряет Великий пост.
            </p>
          </div>

          <div
            className={`absolute
              lg:top-[38rem] lg:left-[60rem] lg:w-[27rem]
              2xl:top-[46rem] 2xl:left-[75rem] 2xl:w-[35rem]
            `}
          >
            <p
              className={`text-justify font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B]
                lg:text-[1.2rem]
                2xl:text-[1.5rem]
              `}
            >
              Итальянское слово carnevale происходит от латинского carne vale, что означает «прощай, мясо».
              Во время двухнедельного карнавала венецианцы могли вдоволь наесться мяса и раскрепоститься перед Великим постом.
              Великий пост начинается в Пепельную среду и заканчивается в Чистый четверг. После карнавала венецианцы традиционно размышляют о своей жизни, каются и готовятся к Пасхе.
            </p>
          </div>
        </div>
      </section>

      {/* Третий блок */}
      <section className="relative w-full 
      lg:mt-[-2rem]
      2xl:mt-[-1rem]">
        <div
          className={`w-full mx-auto rounded-xl shadow-2xl p-12 overflow-hidden
            lg:h-[900px]
            2xl:h-[1000px]
          `}
        >
          <img
            src={historysec3}
            alt="historysec3"
            className="w-full h-full object-contain scale-102"
          />

          <div
            className={`absolute inset-0 flex flex-col items-center justify-center pointer-events-auto
              lg:right-[40rem] lg:bottom-[10rem]
              2xl:right-[52rem] 2xl:bottom-[13rem]
            `}
          >
            <h2
              className={`font-gv text-[#0A0A0A] text-center leading-tight drop-shadow-lg
                lg:text-6xl lg:mb-6
                2xl:text-7xl 2xl:mb-8
              `}
            >
              Карнавал в эпоху Возрождения
            </h2>

            <div
              className={`space-y-3
                lg:w-[75%] lg:max-w-[900px]
                2xl:w-[80%] 2xl:max-w-[1200px]
              `}
            >
              <AccordionItem
                title="📜 Истоки и первое упоминание"
                text="Карнавал был популярен еще в Средние века и расцвел в эпоху Возрождения. Прокламация 1296 года Сената Венецианской республики – самое раннее письменное свидетельство о Венецианском карнавале. В ней объявлялось о проведении публичного праздника перед Великим постом, где разрешалось всё, что обычно было под запретом."
                index={0}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <AccordionItem
                title="🎭 Маски и свобода"
                text="В эпоху Возрождения на городских площадях выступали артисты в масках, и люди всех сословий и вероисповеданий собирались вместе. Они ели, танцевали, участвовали в шествиях и представлениях. Скрывая лица под масками Bauta, Moretta или Volto, венецианцы стирали социальные границы. Дворяне смешивались с простолюдинами, а акробаты становились главными звездами площади Сан-Марко."
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <AccordionItem
                title="✨ Пик популярности (XVII–XVIII вв.)"
                text="Пик популярности Венецианского карнавала пришелся на XVII и XVIII века. Тщательно продуманные и почти мистические празднества, фантастические наряды и изысканные маски привлекали людей со всей Европы. В это время карнавал превратился в грандиозный театр под открытым небом, где каждый житель Венеции и гость города мог стать актером. Именно тогда зародились знаменитые традиции, которые мы знаем сегодня."
                index={2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Четвертый блок */}
      <section
        className={`relative w-full rounded-xl
          lg:-mt-[2rem] lg:h-[720px]
          2xl:-mt-[3rem] 2xl:h-[900px]
        `}
      >
        <img
          src={historysec4}
          alt="historysec4"
          className="absolute inset-0 w-full h-full object-contain"
        />

        <div
          className={`relative z-10 w-full h-full flex flex-col items-center justify-center inset-0
            lg:mt-[-1.2rem]
            2xl:mt-[-1.8rem]
          `}
        >
          <h2
            className={`font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#cfb98d] text-center leading-tight
              lg:text-7xl lg:mb-8 lg:ml-8 lg:leading-tight
              2xl:text-[6rem] 2xl:mb-12 2xl:ml-10 2xl:leading-tight
            `}
          >
            Возрождение спустя 200 лет
          </h2>

          <div
            className={`flex flex-wrap justify-center max-w-[1400px]
              lg:gap-[5rem] lg:mt-[-0.5rem]
              2xl:gap-[8rem] 2xl:mt-[-1rem]
            `}
          >
            <div
              className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105
                lg:w-48 lg:h-60 lg:p-6
                2xl:w-64 2xl:h-80 2xl:p-8
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div
                  className={`rounded-full bg-white/5 backdrop-blur-md border border-[#D5B77C]/30
                    lg:w-[15rem] lg:h-[12rem]
                    2xl:w-[20rem] 2xl:h-[16rem]
                  `}
                />
              </div>
              <img
                src={mask1}
                alt="mask1"
                className={`relative z-10 h-auto opacity-60 group-hover:opacity-100 transition-all duration-700 drop-shadow-lg
                  lg:w-[9rem] lg:mt-[-1.4rem]
                  2xl:w-[12rem] 2xl:mt-[-1.8rem]
                `}
              />
              <span
                className={`relative z-10 font-kreadon text-[#ddd3c3] opacity-60 group-hover:opacity-100 transition-all duration-700
                  lg:text-xl lg:mt-[-1.2rem]
                  2xl:text-2xl 2xl:mt-[-1.6rem]
                `}
              >
                1797
              </span>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-[#1A1510]/90 backdrop-blur-sm border border-[#D5B77C]/40 rounded-lg 
                  opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 
                  transition-all duration-700 ease-out pointer-events-none group-hover:pointer-events-auto
                  lg:w-64 lg:p-4 lg:mt-[-0.6rem] lg:text-[0.8rem]
                  2xl:w-80 2xl:p-6 2xl:mt-[-0.8rem] 2xl:text-[1rem]
                `}
              >
                <p className="font-kreadon text-[#ddd3c3] text-center leading-relaxed">
                  <span className="text-[#D5B77C] font-bold">1797 год:</span> Наполеон Бонапарт запретил карнавал. Венеция погрузилась во тьму на долгие годы.
                </p>
              </div>
            </div>

            <div
              className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105
                lg:w-48 lg:h-60 lg:p-6
                2xl:w-64 2xl:h-80 2xl:p-8
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div
                  className={`rounded-full bg-white/5 backdrop-blur-md border border-[#D5B77C]/30
                    lg:w-[15rem] lg:h-[12rem]
                    2xl:w-[20rem] 2xl:h-[16rem]
                  `}
                />
              </div>
              <img
                src={mask2}
                alt="mask2"
                className={`relative z-10 h-auto opacity-60 group-hover:opacity-100 transition-all duration-700 drop-shadow-lg
                  lg:w-[7rem] lg:mt-[-0.8rem] lg:mr-[0.4rem]
                  2xl:w-[10rem] 2xl:mt-[-1rem] 2xl:mr-[0.6rem]
                `}
              />
              <span
                className={`relative z-10 font-kreadon text-[#ddd3c3] opacity-60 group-hover:opacity-100 transition-all duration-700
                  lg:text-xl lg:mt-[-0.1rem]
                  2xl:text-2xl 2xl:mt-[-0.2rem]
                `}
              >
                1979
              </span>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-[#1A1510]/90 backdrop-blur-sm border border-[#D5B77C]/40 rounded-lg 
                  opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 
                  transition-all duration-700 ease-out pointer-events-none group-hover:pointer-events-auto
                  lg:w-64 lg:p-4 lg:mt-[-0.6rem] lg:text-[0.8rem]
                  2xl:w-80 2xl:p-6 2xl:mt-[-0.8rem] 2xl:text-[1rem]
                `}
              >
                <p className="font-kreadon text-[#ddd3c3] text-center leading-relaxed">
                  <span className="text-[#D5B77C] font-bold">1979 год:</span> Карнавал вернулся! Первые уличные шествия и маски снова заполнили площади Венеции.
                </p>
              </div>
            </div>

            <div
              className={`group relative flex flex-col items-center justify-center cursor-pointer transition-all duration-500 hover:scale-105
                lg:w-48 lg:h-60 lg:p-6
                2xl:w-64 2xl:h-80 2xl:p-8
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
                <div
                  className={`rounded-full bg-white/5 backdrop-blur-md border border-[#D5B77C]/30
                    lg:w-[15rem] lg:h-[12rem]
                    2xl:w-[20rem] 2xl:h-[16rem]
                  `}
                />
              </div>
              <img
                src={mask3}
                alt="mask3"
                className={`relative z-10 h-auto opacity-60 group-hover:opacity-100 transition-all duration-700 drop-shadow-lg
                  lg:w-[10rem] lg:mt-[0.4rem]
                  2xl:w-[13rem] 2xl:mt-[0.5rem]
                `}
              />
              <span
                className={`relative z-10 font-kreadon text-[#ddd3c3] opacity-60 group-hover:opacity-100 transition-all duration-700
                  lg:text-xl lg:mt-[0.9rem]
                  2xl:text-2xl 2xl:mt-[1.2rem]
                `}
              >
                Сегодня
              </span>

              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 bg-[#1A1510]/90 backdrop-blur-sm border border-[#D5B77C]/40 rounded-lg 
                  opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 
                  transition-all duration-700 ease-out pointer-events-none group-hover:pointer-events-auto
                  lg:w-64 lg:p-4 lg:mt-[-0.6rem] lg:text-[0.8rem]
                  2xl:w-80 2xl:p-6 2xl:mt-[-0.8rem] 2xl:text-[1rem]
                `}
              >
                <p className="font-kreadon text-[#ddd3c3] text-center leading-relaxed">
                  <span className="text-[#D5B77C] font-bold">Сегодня:</span> Карнавал — это грандиозный фестиваль, привлекающий миллионы туристов со всего мира.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HistoryPagePC;