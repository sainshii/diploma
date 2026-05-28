// HistoryPagePhone.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import bghistory from '../img/bghistoryphone.webp';
import historysec3 from '../img/history3phone.webp';
import redmask from '../img/redmask.webp';
import mask1 from '../img/mask1.svg';
import mask2 from '../img/mask2.svg';
import mask3 from '../img/mask3.svg';

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const MaskSection = () => {
  const [expandedMask, setExpandedMask] = useState(null);

  const MaskCard = ({ img, alt, year, description, index }) => {
    const isOpen = expandedMask === index;
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, []);

    return (
      <div
        className="bg-white/5 backdrop-blur-md border border-[#D5B77C]/30 rounded-xl flex flex-col items-center active:bg-white/10 transition cursor-pointer"
        onClick={() => setExpandedMask(isOpen ? null : index)}
      >
        {/* Верхняя часть с маской и годом */}
        <div className="flex flex-col items-center pt-4 pb-4">
          <img src={img} alt={alt} className="w-24 h-auto opacity-60 invert" />
          <span className="text-xl font-kreadon text-[#D5B77C] mt-2">{year}</span>
        </div>

        {/* Анимированный контейнер текста */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            maxHeight: isOpen ? `${contentHeight}px` : '0px',
          }}
        >
          <div ref={contentRef} className="pb-5 px-4">
            <p
              className="font-kreadon text-[#ddd3c3] text-center text-sm leading-relaxed transform transition-all duration-500 ease-in-out"
              style={{
                transform: isOpen ? 'translateY(0px)' : 'translateY(10px)',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {description}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <MaskCard
        img={mask1}
        alt="1797"
        year="1797"
        index={0}
        description={
          <>
            <span className="text-[#D5B77C] font-bold">1797 год:</span> Наполеон Бонапарт запретил карнавал. Венеция погрузилась во тьму на долгие годы.
          </>
        }
      />
      <MaskCard
        img={mask2}
        alt="1979"
        year="1979"
        index={1}
        description={
          <>
            <span className="text-[#D5B77C] font-bold">1979 год:</span> Карнавал вернулся! Первые уличные шествия и маски снова заполнили площади Венеции.
          </>
        }
      />
      <MaskCard
        img={mask3}
        alt="Сегодня"
        year="Сегодня"
        index={2}
        description={
          <>
            <span className="text-[#D5B77C] font-bold">Сегодня:</span> Карнавал — это грандиозный фестиваль, привлекающий миллионы туристов со всего мира.
          </>
        }
      />
    </div>
  );
};

const HistoryPagePhone = () => {
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
      <div className="border border-white/20 rounded-lg overflow-hidden">
        <button
          onClick={handleToggle}
          className="w-full text-left py-3 px-4 flex justify-between items-center backdrop-blur-md bg-black/5 active:bg-white/10 transition-colors"
        >
          <span className="font-kreadon text-base text-transparent bg-clip-text bg-gradient-to-r from-[#202020] via-[#5f5f5f] to-[#202020]">
            {title}
          </span>
          <span className="text-black text-lg transition-transform duration-300">
            {isOpen ? '−' : '+'}
          </span>
        </button>
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="p-4 backdrop-blur-xs bg-white/10 font-kreadon text-justify text-xs leading-relaxed text-[#202020]">
            {text}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white pt-16">
      <Helmet>
        <title>История Венецианского карнавала – от Средневековья до наших дней</title>
        <meta
          name="description"
          content="Узнайте, как зародился карнавал в Венеции, почему маски стали символом свободы и как праздник возродился спустя 200 лет. Интересные факты и традиции."/>
      </Helmet>

      <Suspense fallback={null}>
	      <Header />
      </Suspense>

      {/* ПЕРВЫЙ БЛОК */}
      <section className="px-4 pt-4">
        <div className="grid grid-cols-1 grid-rows-1">
          <img
            src={bghistory}
            alt="bghistory"
            className="w-full h-auto col-start-1 row-start-1 object-cover"
          />
          <div className="col-start-1 row-start-1 z-10 flex items-center justify-center p-4 mt-[-11rem] mr-[2rem]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#a58f65] via-[#ddd3c3] to-[#9e885f] text-[6rem] font-younglove drop-shadow-lg text-center">
              История
            </h1>
          </div>
        </div>
      </section>

      {/* ВТОРОЙ БЛОК */}
      <section className="mt-8 px-4">
        <div className="text-center mt-4">
          <h2 className="font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B] text-xl">
            Венецианский карнавал имеет долгую историю,
          </h2>
          <h3 className="font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B] text-lg mt-[-0.7rem]">
            уходящую корнями как минимум в <span className="text-sm">XII</span> век.
          </h3>
        </div>
        <img src={redmask} alt="redmask" className="w-3/4 mx-auto mt-4" />
        <div className="mt-4 space-y-3 text-justify text-xs font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#9C865B]">
          <p>
            В католической традиции карнавал празднуют перед началом Великого поста, который
            представляет собой 40-дневный период поста и покаяния перед Пасхой. Карнавал – возможность
            поесть, выпить и повеселиться перед покаянием.
          </p>
          <p>
            Итальянское слово carnevale происходит от латинского carne vale, что означает «прощай,
            мясо». Во время двухнедельного карнавала венецианцы могли вдоволь наесться мяса и
            раскрепоститься перед Великим постом.
          </p>
        </div>
      </section>

      {/* ТРЕТИЙ БЛОК */}
      <section className="mt-8 px-4">
        <div className="grid grid-cols-1 grid-rows-1">
          <img
            src={historysec3}
            alt="historysec3"
            className="w-full h-auto col-start-1 row-start-1 object-cover rounded-xl"
          />
          <div className="col-start-1 row-start-1 z-10 flex flex-col items-center justify-center p-4 mt-[8rem]">
            <h2 className="font-gv text-[#0A0A0A] text-2xl text-center mb-4 drop-shadow-lg">
              Карнавал в эпоху Возрождения
            </h2>
            <div className="w-full space-y-2">
              <AccordionItem
                title="📜 Истоки и первое упоминание"
                text="Карнавал был популярен еще в Средние века и расцвел в эпоху Возрождения. Прокламация 1296 года Сената Венецианской республики – самое раннее письменное свидетельство о Венецианском карнавале. В ней объявлялось о проведении публичного праздника перед Великим постом, где разрешалось всё, что обычно было под запретом."
                index={0}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <AccordionItem
                title="🎭 Маски и свобода"
                text="В эпоху Возрождения на городских площадях выступали артисты в масках, и люди всех сословий и вероисповеданий собирались вместе. Они ели, танцевали, участвовали в шествиях и представлениях. Скрывая лица под масками Bauta, Moretta или Volto, венецианцы стирали социальные границы."
                index={1}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
              <AccordionItem
                title="✨ Пик популярности (XVII–XVIII вв.)"
                text="Пик популярности Венецианского карнавала пришелся на XVII и XVIII века. Тщательно продуманные и почти мистические празднества, фантастические наряды и изысканные маски привлекали людей со всей Европы."
                index={2}
                activeIndex={activeIndex}
                setActiveIndex={setActiveIndex}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ЧЕТВЁРТЫЙ БЛОК: ПЛАВНАЯ АНИМАЦИЯ ТЕКСТА */}
      <section className="mt-8 px-4 mb-8">
        <h2 className="font-gv text-transparent bg-clip-text bg-gradient-to-r from-[#9C865B] via-[#D5B77C] to-[#cfb98d] text-3xl text-center my-4">
          Возрождение спустя 200 лет
        </h2>
        <MaskSection />
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default HistoryPagePhone;