import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import harlequin from '../img/harlequin.jpg';
import pierrot from '../img/pierrot.jpg';
import columbina from '../img/columbina.jpg';
import { useIsMobile } from '../hooks/useIsMobile';  // импортируем наш хук

const slides = [
  { img: harlequin, title: 'Арлекин' },
  { img: pierrot, title: 'Пьеро' },
  { img: columbina, title: 'Коломбина' },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();  // определяем устройство

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  // На мобильных показываем заголовок и затемнение всегда
  const showOverlay = isMobile ? true : hovered;

  const variants = {
    enter: (direction) => ({
      x: direction * 100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction * -100,
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-[1300px] mx-auto flex items-center justify-center px-14 max-md:px-2">
      {/* Контейнер с картинкой */}
      <div
        className={`relative w-[90rem] h-[600px] flex items-center justify-center overflow-hidden rounded-[7rem] lg:border-[0.2rem] border-[#8B1E1E] shadow-2xl 
          max-md:w-3/4 max-md:h-[8rem] max-md:rounded-2xl border-[0.1rem]`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.img
            key={currentIndex}
            src={slides[currentIndex].img}
            alt={`slider-${currentIndex}`}
            className="absolute w-full h-full object-cover"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />
        </AnimatePresence>

        {/* Градиентное затемнение снизу */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#8B1E1E] to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Заголовок */}
        <motion.div
          className="absolute bottom-8 left-[15rem] w-full text-center text-[#C5A059] font-gv text-[7rem] pointer-events-none z-10 drop-shadow-2xl 
            max-md:left-[3.8rem] max-md:-translate-x-1/2 max-md:text-xl max-md:bottom-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showOverlay ? 1 : 0, y: showOverlay ? 0 : 20 }}
          transition={{ duration: 0.4 }}
        >
          {slides[currentIndex].title}
        </motion.div>
      </div>

      {/* Левая стрелка */}
      <button
        onClick={prevSlide}
        className="absolute left-[-3rem] top-1/2 -translate-y-1/2 z-20 text-[#8B1E1E] hover:scale-125 transition-all duration-200 group 
          max-md:left-2 max-md:scale-100"
        aria-label="Предыдущий слайд"
      >
        <svg
          width="120" height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:fill-[#8B1E1E] group-hover:stroke-[#8B1E1E] transition-colors duration-200 max-md:w-10 max-md:h-10"
        >
          <polygon points="15,18 9,12 15,6" />
        </svg>
      </button>

      {/* Правая стрелка */}
      <button
        onClick={nextSlide}
        className="absolute right-[-3rem] top-1/2 -translate-y-1/2 z-20 text-[#8B1E1E] hover:scale-125 transition-all duration-200 group 
          max-md:right-2 max-md:scale-1000"
        aria-label="Следующий слайд"
      >
        <svg
          width="120" height="120"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:fill-[#8B1E1E] group-hover:stroke-[#8B1E1E] transition-colors duration-200 max-md:w-10 max-md:h-10"
        >
          <polygon points="9,18 15,12 9,6" />
        </svg>
      </button>

      {/* Точки внизу */}
      <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 flex lg:gap-3 z-20 max-md:bottom-[-1rem] gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-[#8B1E1E] scale-110' : 'lg:border-[2px] border-[1px] border-[#8B1E1E] hover:bg-gray-300'
            } max-md:w-[5px] max-md:h-[5px]`}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            aria-label={`Перейти к слайду ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;