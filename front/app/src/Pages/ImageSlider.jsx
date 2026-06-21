import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import joker from '../img/joker.webp';
import pierrot from '../img/pierrot.webp';
import columbina from '../img/columbina.webp';
import { useIsMobile } from '../hooks/useIsMobile';

const slides = [
  { img: joker, title: 'Джокер' },
  { img: columbina, title: 'Коломбина' },
  { img: pierrot, title: 'Пьеро' },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hovered, setHovered] = useState(false);
  const isMobile = useIsMobile();

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

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
      <div
        className={`group relative flex items-center justify-center overflow-hidden shadow-2xl border-[#8B1E1E]
          border-[0.1rem]
          lg:w-[60rem] lg:h-[400px] lg:rounded-[5rem] lg:border-[0.15rem]
          2xl:w-[90rem] 2xl:h-[600px] 2xl:rounded-[7rem] 2xl:border-[0.2rem]
          max-md:w-3/4 max-md:h-[8rem] max-md:rounded-2xl`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="w-full h-full overflow-hidden transition-transform duration-500 group-hover:scale-110">
              <img
                src={slides[currentIndex].img}
                alt={`slider-${currentIndex}`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Градиент */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#8B1E1E] to-transparent pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: showOverlay ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Заголовок */}
        <motion.div
          className={`absolute w-full text-center text-[#C5A059] font-gv pointer-events-none z-10 drop-shadow-2xl
            bottom-8 left-[15rem] text-[7rem]
            lg:bottom-6 lg:left-[10rem] lg:text-[5rem]
            2xl:bottom-8 2xl:left-[15rem] 2xl:text-[7rem]
            max-md:left-[3.8rem] max-md:-translate-x-1/2 max-md:text-xl max-md:bottom-2`}
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
        className={`absolute top-1/2 -translate-y-1/2 z-20 text-[#8B1E1E] hover:scale-125 transition-all duration-200 group
          left-[-3rem]
          lg:left-[-2rem]
          2xl:left-[-3rem]
          max-md:left-2 max-md:scale-100`}
        aria-label="Предыдущий слайд"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`group-hover:fill-[#8B1E1E] group-hover:stroke-[#8B1E1E] transition-colors duration-200
            w-[120px] h-[120px] stroke-[0.6]
            lg:w-[90px] lg:h-[90px] lg:stroke-[0.5]
            2xl:w-[120px] 2xl:h-[120px] 2xl:stroke-[0.6]
            max-md:w-10 max-md:h-10`}
        >
          <polygon points="15,18 9,12 15,6" />
        </svg>
      </button>

      {/* Правая стрелка */}
      <button
        onClick={nextSlide}
        className={`absolute top-1/2 -translate-y-1/2 z-20 text-[#8B1E1E] hover:scale-125 transition-all duration-200 group
          right-[-3rem]
          lg:right-[-2rem]
          2xl:right-[-3rem]
          max-md:right-2 max-md:scale-100`}
        aria-label="Следующий слайд"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`group-hover:fill-[#8B1E1E] group-hover:stroke-[#8B1E1E] transition-colors duration-200
            w-[120px] h-[120px] stroke-[0.6]
            lg:w-[90px] lg:h-[90px] lg:stroke-[0.5]
            2xl:w-[120px] 2xl:h-[120px] 2xl:stroke-[0.6]
            max-md:w-10 max-md:h-10`}
        >
          <polygon points="9,18 15,12 9,6" />
        </svg>
      </button>

      {/* Точки */}
      <div className="absolute bottom-[-3rem] left-1/2 -translate-x-1/2 flex gap-1 lg:gap-3 z-20 max-md:bottom-[-1rem]">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-4 h-4 rounded-full transition-[background-color,transform] duration-500 ease-out
              ${index === currentIndex
                ? 'bg-[#8B1E1E] scale-110 border-transparent'
                : 'border-[0.1px] border-[#8B1E1E] bg-transparent'
              }
              lg:border-[2px]
              max-md:w-[6px] max-md:h-[6px]`}
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