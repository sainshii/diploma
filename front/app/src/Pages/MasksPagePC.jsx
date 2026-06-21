import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import bgmasks from '../img/bgmasks.webp'
import goldenmask from '../img/goldenmask.webp'
import rombs from '../img/rombs.webp'
import mask1 from '../img/mask1.webp'
import mask2 from '../img/mask2.webp'
import mask3 from '../img/mask3.webp'
import mask4 from '../img/mask4.webp'
import mask5 from '../img/mask5.webp'
import mask6 from '../img/mask6.webp'

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const masks = [
  { id: 1, image: mask1, title: 'Баута', description: 'Баута — самая популярная венецианская маска благодаря практичности: в ней можно есть и пить, не снимая, сохраняя полную анонимность. Выдвинутая вперёд нижняя часть меняет голос, делая человека неузнанным. Изначально маска была чёрной, позже стала белой, а классический карнавальный костюм сочетает оба цвета. Маска вошла в обиход в XVII веке, что важно учитывать при костюмировании более ранних эпох.' },
  { id: 2, image: mask2, title: 'Венецианская дама', description: 'Венецианская Дама (Dama di Venezia) — маска, олицетворяющая роскошную титулованную венецианку времён Тициана и Чинквеченто. Наряд включал великолепное платье, обилие драгоценностей, фантазийный головной убор или сложную причёску. Маска крепилась лентами, иногда имела ручку. Позволить костюм могли лишь очень богатые венецианки: помимо дорогих тканей, использовалось всё, что стекалось в Венецию с торговых путей.' },
  { id: 3, image: mask3, title: 'Кот', description: 'Кот (Gatto) — единственная анималистическая маска венецианского карнавала. По легенде, бедный китайский торговец прибыл с котом, истребившим грызунов; дож наградил купца, а кота поселил во дворце. Другой китаец, решив, что за кота дают столько золота, сколько он весит, привёз дорогие шелка, но получил взамен того же кота. Венецианцы действительно ценили кошек на вес золота.' },
  { id: 4, image: mask4, title: 'Джокер', description: 'Джокер (Jester) — маска на грани с комедией дель арте. Весёлый авантюрист и обманщик, мог осмеять короля безнаказанно. Шут считался символическим близнецом-противоположностью правителя. Костюм шили из ярких лоскутков, а трёххвостый убор с бубенцами символизировал уши и хвост осла. Детали образа — неизменный смех и поддельный скипетр.' },
  { id: 5, image: mask5, title: 'Вольто', description: 'Вольто (Volto, Ларва) — самая распространённая венецианская маска, полностью скрывающая лицо. Отверстие на уровне рта позволяет есть и пить, сохраняя анонимность. «Larva» значит «призрак» — белая маска придавала отстранённый вид. В паре с чёрным плащом и треуголкой стирала социальные различия. Появилась в XVI–XVII веках.' },
  { id: 6, image: mask6, title: 'Моретта', description: 'Моретта (Moretta, Servetta Muta) — овальная маска из чёрного бархата. Держалась с помощью пуговицы, зажатой во рту, лишая возможности говорить — отсюда название «немая служанка». Подчёркивала аристократическую бледность и загадочность. Была популярна у знатных венецианок в XVIII веке.' },
]

const MasksPagePC = () => {

  useScrollOnMount();

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0)
  const total = masks.length

  const prevIndex = (current - 1 + total) % total
  const nextIndex = (current + 1) % total

  const goToLeft = () => setCurrent(prevIndex)
  const goToRight = () => setCurrent(nextIndex)

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>Маски и персонажи Венецианского карнавала</title>
        <meta name="description" content="Баута, Венецианская дама, Кот, Вольто и другие легендарные маски. Значение, история и костюмы для каждого образа. Выберите свою роль для карнавала!" />
      </Helmet>

      {/* Главный блок */}
      <section className={`relative w-full mx-auto z-10
        lg:max-w-[1400px]
        2xl:max-w-[1770px]
      `}>
        <img
          src={bgmasks}
          alt="bgmasks"
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
        <div className={`absolute flex flex-col z-10 pointer-events-none
          lg:top-[11rem]
          2xl:top-[17rem]
        `}>
          <h1 className={`text-transparent bg-clip-text bg-gradient-to-r from-[#250808] via-[#C5A059] to-[#250808] font-younglove drop-shadow-lg leading-tight
            lg:text-[15rem]
            2xl:text-[18rem]
          `}>Маски</h1>
          <h2 className={`text-transparent bg-clip-text bg-gradient-to-r from-[#8b5c27] via-[#C5A059] to-[#533115] font-younglove drop-shadow-lg leading-tight
            lg:text-[7.5rem] lg:-mt-[9.5rem] lg:ml-[16rem]
            2xl:text-[8.5rem] 2xl:-mt-[10.5rem] 2xl:ml-[23rem]
          `}>и персонажи</h2>
        </div>
      </section>

      {/* Второй блок */}
      <section className={`relative w-full bg-[#0A0A0A] mx-auto z-0
        lg:max-w-[1200px] lg:-mt-8
        2xl:max-w-[1770px] 2xl:-mt-12
      `}>
        <div className="flex flex-col md:flex-row items-start gap-8 py-12 
        2xl:px-8">
          <div className={`flex-shrink-0 w-full
            md:w-[30rem]
            lg:md:w-[22rem]
            2xl:md:w-[30rem]
          `}>
            <img
              src={goldenmask}
              alt="goldenmask"
              className={`relative h-auto object-cover shadow-lg
                lg:-top-6 lg:left-[-1rem] lg:w-[25rem]
                2xl:-top-8 2xl:left-[4rem] 2xl:w-[28rem]
              `}
            />
          </div>
          <div className="flex-1 pt-4">
            <p className={`mb-[1rem] text-justify font-kreadon leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#796a4f] via-[#DBBE84] to-[#796a4f]
              lg:mt-[1rem] lg:ml-[3rem] lg:text-xl
              2xl:mt-[3rem] 2xl:px-[5rem] 2xl:text-2xl
            `}>
              <span className={`font-gv
                lg:text-4xl lg:mr-1
                2xl:text-5xl 2xl:mr-1
              `}>М</span>
              аски – ключевой элемент венецианского карнавала, который имеет глубокое историческое и культурное значение. Они не просто скрывают лицо, но и несут в себе сложную систему смыслов, связанных с анонимностью, театральностью, социальными изменениями и праздничной атмосферой.
            </p>
            <h2 className={`text-center text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999] font-younglove
              lg:text-[4rem] lg:mb-[3rem]
              2xl:text-[5rem] 2xl:mb-[1.8rem]
            `}>Основные значения масок</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 
            lg:gap-[5rem]
            2xl:gap-6">
              <div className="relative hover:scale-110 transition duration-500">
                <div className="relative z-10 font-kreadon text-center">
                  <span className={`absolute inset-0 text-center font-gv text-[#FFFFFF]/10 w-full
                    lg:text-[25rem] lg:top-[-12rem] lg:left-[-1rem]
                    2xl:text-[35rem] 2xl:top-[-16rem] 2xl:left-[-2rem]
                  `}>1</span>
                  <div className={`text-white
                    lg:text-2xl lg:mb-1
                    2xl:text-3xl 2xl:mb-1
                  `}>1</div>
                  <h3 className={`text-white font-bold
                    lg:text-xl lg:mb-1
                    2xl:text-2xl 2xl:mb-2
                  `}>Анонимность и свобода</h3>
                  <p className={`leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999]
                    lg:text-lg
                    2xl:text-2xl
                  `}>
                    Маска позволяла скрыть лицо, стирала границы между сословиями и дарила свободу действий без страха осуждения.
                  </p>
                </div>
              </div>
              <div className="relative hover:scale-110 transition duration-500">
                <div className="relative z-10 font-kreadon text-center">
                  <span className={`absolute inset-0 text-center font-gv text-[#FFFFFF]/10 w-full
                    lg:text-[25rem] lg:top-[-12rem] lg:left-[-1rem]
                    2xl:text-[35rem] 2xl:top-[-16rem] 2xl:left-[-2rem]
                  `}>2</span>
                  <div className={`text-white
                    lg:text-2xl lg:mb-1
                    2xl:text-3xl 2xl:mb-1
                  `}>2</div>
                  <h3 className={`text-white font-bold
                    lg:text-xl lg:mb-1
                    2xl:text-2xl 2xl:mb-2
                  `}>Театральность</h3>
                  <p className={`leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999]
                    lg:text-lg
                    2xl:text-2xl
                  `}>
                    Каждая маска (Арлекин, Колумбина, Панталоне и другие) – это характер и роль из комедии дель арте.
                  </p>
                </div>
              </div>
              <div className="relative hover:scale-110 transition duration-500">
                <div className="relative z-10 font-kreadon text-center">
                  <span className={`absolute inset-0 text-center font-gv text-[#FFFFFF]/10 w-full
                    lg:text-[25rem] lg:top-[-12rem] lg:left-[-1rem]
                    2xl:text-[35rem] 2xl:top-[-16rem] 2xl:left-[-2rem]
                  `}>3</span>
                  <div className={`text-white
                    lg:text-2xl lg:mb-1
                    2xl:text-3xl 2xl:mb-1
                  `}>3</div>
                  <h3 className={`text-white font-bold
                    lg:text-xl lg:mb-1
                    2xl:text-2xl 2xl:mb-2
                  `}>Историческая символика</h3>
                  <p className={`leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999]
                    lg:text-lg
                    2xl:text-2xl
                  `}>
                    Например, «Чумной доктор» – маска, которая раньше использовалась врачами для защиты от болезни.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Третий блок */}
      <section className={`bg-[#0A0A0A] w-full relative mx-auto
        lg:max-w-[1200px]
        2xl:max-w-[1770px]
      `}>
        <img
          src={rombs}
          alt="rombs"
          className={`relative mx-auto w-5/5
            lg:mt-[0.5rem]
            2xl:mt-[2rem]
          `}
        />
        
        <h2 className={`text-center text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#c9c9c9] to-[#999999] font-gv drop-shadow-lg
          lg:text-[4rem] lg:mt-[-8rem]
          2xl:text-[5rem] 2xl:mt-[-11rem]
        `}>
          Популярные маски
        </h2>

        <div className={`flex items-center justify-center px-4
          lg:mt-[4rem] lg:gap-6
          2xl:mt-[5.5rem] 2xl:gap-8
        `}>
          {/* Левая стрелка */}
          <button onClick={goToLeft} className="text-[#C5A059] hover:text-white transition z-20 p-2 flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`lg:w-10 lg:h-10 2xl:w-12 2xl:h-12`}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Три маски */}
          <div className="flex items-center justify-center gap-2 overflow-hidden relative">
            {/* Левая */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`left-${masks[prevIndex].id}`}
                initial={{ x: -150, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 0.6, scale: 0.8 }}
                exit={{ x: -150, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="cursor-pointer"
                onClick={goToLeft}
              >
                <img
                  src={masks[prevIndex].image}
                  alt={masks[prevIndex].title}
                  className={`h-auto object-cover rounded-xl border-2 border-transparent hover:border-[#C5A059]/50 p-2 transition duration-200
                    lg:w-[14rem]
                    2xl:w-[18rem]
                  `}
                />
              </motion.div>
            </AnimatePresence>

            {/* Центральная */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`center-${masks[current].id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="z-8"
              >
                <img
                  src={masks[current].image}
                  alt={masks[current].title}
                  className={`h-auto object-cover shadow-2xl
                    lg:w-60
                    2xl:w-80
                  `}
                />
              </motion.div>
            </AnimatePresence>

            {/* Правая */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`right-${masks[nextIndex].id}`}
                initial={{ x: 150, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 0.6, scale: 0.8 }}
                exit={{ x: 150, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="cursor-pointer"
                onClick={goToRight}
              >
                <img
                  src={masks[nextIndex].image}
                  alt={masks[nextIndex].title}
                  className={`h-auto object-cover rounded-xl border-2 border-transparent hover:border-[#C5A059]/50 p-2 transition duration-200
                    lg:w-[14rem]
                    2xl:w-[18rem]
                  `}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Правая стрелка */}
          <button onClick={goToRight} className="text-[#C5A059] hover:text-white transition z-20 p-2 flex-shrink-0">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className={`lg:w-10 lg:h-10 2xl:w-12 2xl:h-12`}
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Название и описание (анимированная смена) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-8 px-8"
          >
            <h3 className={`text-[#C5A059] font-gv
              lg:text-3xl lg:mb-2
              2xl:text-5xl 2xl:mb-2
            `}>{masks[current].title}</h3>
            <p className={`text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 font-kreadon leading-relaxed mx-auto
              lg:text-base lg:max-w-2xl
              2xl:text-2xl 2xl:max-w-3xl
            `}>
              {masks[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className='flex justify-center'>
          <button
            className={`font-sf italic text-[#f0d29a] bg-[#8B1E1E] rounded-full hover:scale-110 hover:bg-[#C5A059] hover:text-[#8B1E1E] transition duration-300
              lg:text-[1.3rem] lg:px-[10rem] lg:mt-[2rem]
              2xl:text-[1.5rem] 2xl:px-[13rem] 2xl:mt-[2.5rem]
            `}
            onClick={() => navigate('/shop')}
          >
            Перейти в магазин
          </button>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default MasksPagePC