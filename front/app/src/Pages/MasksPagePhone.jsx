import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import bgmasks from '../img/bgmasksphone.webp';
import goldenmask from '../img/goldenmask.webp';
import rombs from '../img/rombsphone.webp';
import mask1 from '../img/mask1.webp';
import mask2 from '../img/mask2.webp';
import mask3 from '../img/mask3.webp';
import mask4 from '../img/mask4.webp';
import mask5 from '../img/mask5.webp';
import mask6 from '../img/mask6.webp';

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

const MasksPagePhone = () => {

  useScrollOnMount();

  const navigate = useNavigate();

  const [current, setCurrent] = useState(0);
  const total = masks.length;

  const goToLeft = () => setCurrent((prev) => (prev - 1 + total) % total);
  const goToRight = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] text-white pt-16 overflow-x-hidden">
      <Helmet>
        <title>Маски и персонажи Венецианского карнавала</title>
        <meta name="description" content="Баута, Венецианская дама, Кот, Вольто и другие легендарные маски. Значение, история и костюмы для каждого образа. Выберите свою роль для карнавала!" />
      </Helmet>

      <Suspense fallback={null}>
      	<Header />
      </Suspense>

        {/* Главный блок */}
      <section className="px-4 pt-4">
        <div className="grid grid-cols-1 grid-rows-1">
          <img src={bgmasks} alt="bg" className="w-full h-auto col-start-1 row-start-1 object-cover" />
          <div className="col-start-1 row-start-1 flex flex-col items-center justify-center text-center mt-[23rem]">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#8d7134] via-[#C5A059] to-[#8d7134] text-[7.6rem] font-younglove drop-shadow-lg ml-[3rem]">
              Маски⠀
            </h1>
            <h2 className="mt-[-5rem] text-transparent bg-clip-text bg-gradient-to-r from-[#8d7134] via-[#C5A059] to-[#8d7134] text-5xl font-younglove drop-shadow-lg">
              и персонажи
            </h2>
          </div>
        </div>
      </section>

      {/* Второй блок */}
      <section className="px-6 ">
        <div className="flex flex-col items-center">
          <p className="mt-6 text-justify text-sm font-kreadon text-transparent bg-clip-text bg-gradient-to-r from-[#796a4f] via-[#DBBE84] to-[#796a4f]">
            <span className="font-gv text-xl leading-none">М</span>
            аски – ключевой элемент венецианского карнавала, который имеет глубокое историческое и культурное значение. Они не просто скрывают лицо, но и несут в себе сложную систему смыслов, связанных с анонимностью, театральностью, социальными изменениями и праздничной атмосферой.
          </p>
          <img src={rombs} alt="rombs" className="w-full h-auto object-cover relative z-10 mt-[1rem]"/>
          <img src={goldenmask} alt="goldenmask" className="w-2/4 max-w-xs mx-auto relative z-0 mt-[-0.9rem]" />
        </div>

        <h2 className="text-center text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999] font-younglove text-5xl mt-6 mb-4">
          Основные значения масок
        </h2>

        <div className="grid grid-cols-1 gap-6 mt-4 font-kreadon">
          <div className="text-center">
            <span className="text-6xl font-gv text-white/25">1</span>
            <h3 className="text-[#C5A059] font-bold text-lg mt-[-0.2rem]">Анонимность и свобода</h3>
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999] mt-1">
              Маска позволяла скрыть лицо, стирала границы между сословиями и дарила свободу действий без страха осуждения.
            </p>
          </div>
          <div className="text-center">
            <span className="text-6xl font-gv text-white/25">2</span>
            <h3 className="text-[#C5A059] font-bold text-lg mt-[-0.2rem]">Театральность</h3>
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999] mt-2">
              Каждая маска (Арлекин, Колумбина, Панталоне и другие) – это характер и роль из комедии дель арте.
            </p>
          </div>
          <div className="text-center">
            <span className="text-6xl font-gv text-white/25">3</span>
            <h3 className="text-[#C5A059] font-bold text-lg mt-[-0.2rem]">Историческая символика</h3>
            <p className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#ebebeb] to-[#999999] mt-2">
              Например, «Чумной доктор» – маска, которая раньше использовалась врачами для защиты от болезни.
            </p>
          </div>
        </div>
      </section>

      {/* Третий блок */}
      <section className="mt-10 px-4">
        <img src={rombs} alt="rombs" className="w-full mx-auto" />
        <h2 className="text-center text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#999999] via-[#c9c9c9] to-[#999999] font-gv drop-shadow-lg mt-8">
          Популярные маски
        </h2>

        <div className="flex items-center justify-center mt-6 gap-2">
          {/* Левая стрелка */}
          <button onClick={goToLeft} className="text-[#C5A059] p-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Центральная маска */}
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={masks[current].image}
              alt={masks[current].title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="w-48 h-auto object-cover rounded-xl"
            />
          </AnimatePresence>

          {/* Правая стрелка */}
          <button onClick={goToRight} className="text-[#C5A059] p-2">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center mt-4"
          >
            <h3 className="text-[#C5A059] font-gv text-3xl">{masks[current].title}</h3>
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-200 to-gray-400 font-kreadon text-[0.8rem] leading-relaxed mt-2">
              {masks[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center mt-6 mb-8">
          <button
            className="font-sf italic text-[#f0d29a] bg-[#8B1E1E] rounded-full text-sm px-12 active:scale-95 transition"
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
  );
};

export default MasksPagePhone;