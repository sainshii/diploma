import React from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../img/footer.webp'
import bgphone from '../img/footerphone.webp'
import logo from '../img/logo1.svg'
import logophone from '../img/logophone.svg'

const Footer = () => {
  const navigate = useNavigate();
  const CustomNavigation = (path) => {
    const token = localStorage.getItem('token')
    const protectedRoutes = ['/cart']
    if (protectedRoutes.includes(path) && !token) {
      if (window.confirm('Войдите')) {
        navigate('/login')
      }
    } else {
      navigate(path)
    }
  }

  return (
    <div>
      <footer className='relative w-full'>
        <img src={bg} alt='bg' className='hidden md:block w-full h-auto object-cover mx-auto rounded-xl' />

        {/* ПК версия */}
        <div className='hidden md:flex absolute justify-between items-start z-10
          lg:top-[7rem] lg:left-[3rem] lg:right-[3rem]
          2xl:top-[10rem] 2xl:left-[4rem] 2xl:right-[4rem]'
        >
          {/* Левый блок */}
          <div className='flex flex-col
            lg:mt-[5rem]
            2xl:mt-[5rem]'
          >
            <div className='flex
              lg:ml-[4rem]
              2xl:ml-[6rem]'
            >
              <img src={logo} alt='logo'
                className='
                  lg:w-[3.8rem] lg:h-[3.8rem] lg:mt-[1.5rem]
                  2xl:w-[5rem] 2xl:h-[5rem] 2xl:mt-[2rem]
                '
              />
              <h2 className='text-[#8B1E1E] font-gv underline
                lg:text-[4.8rem] lg:decoration-2 lg:underline-offset-[0.5rem]
                2xl:text-[6rem] 2xl:decoration-2 2xl:underline-offset-[0.7rem]'
              >
                Баута
              </h2>
            </div>
            <div className='flex font-sf
              lg:gap-[20px] lg:text-[1.4rem]
              2xl:gap-[30px] 2xl:text-[1.6rem]'
            >
              <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={() => CustomNavigation('/')}>
                Главная
              </button>
              <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={() => CustomNavigation('/history')}>
                История
              </button>
              <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={() => CustomNavigation('/masks')}>
                Маски и персонажи
              </button>
              <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={() => CustomNavigation('/shop')}>
                Каталог
              </button>
            </div>
          </div>

          {/* Правый блок */}
          <div className='flex flex-col items-end
            lg:pr-[7rem] lg:mt-[1.1rem]
            2xl:pr-[-20rem] 2xl:mt-[0.8rem]'
          >         
            <h3 className='font-sf text-[#C5A059] text-right
              lg:text-[2rem]
              2xl:text-[2.1rem] 2xl:mb-2'
            >
              Контакты:
            </h3>
            <div className='flex gap-[30px]
              lg:text-[1.2rem]
              2xl:text-[1.5rem]'
            >
              <div className='flex flex-col items-end
                lg:gap-1
                2xl:gap-1'
              >
                <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className='lg:w-[18px] lg:h-[18px] 2xl:w-[24px] 2xl:h-[24px]'
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className='text-right'>bautavenicecarnival@mail.ru</span>
                </p>

                <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className='lg:w-[18px] lg:h-[18px] 2xl:w-[24px] 2xl:h-[24px]'
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span className='text-right'>+7 (221) 189-10-54</span>
                </p>

                <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                  <svg xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C5A059"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className='lg:w-[18px] lg:h-[18px] 2xl:w-[24px] 2xl:h-[24px]'
                  >
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span className='text-right'>Владивосток, ул. Светланская 147</span>
                </p>

                <div className='flex items-center mt-2 gap-[20px]
                lg:gap-[15px]
                2xl:gap-[20px]'>
                  <a
                    href="https://max.ru/bautavenicecarnival"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#C5A059"
                      className='lg:w-[28px] lg:h-[28px] 2xl:w-[32px] 2xl:h-[32px]'
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.084.534 4.045 1.472 5.76l-.985 3.648 3.648-.985A11.969 11.969 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/>
                      <path d="M12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
                    </svg>
                  </a>

                  <a
                    href="https://vk.com/bautavenicecarnival"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="#C5A059"
                      className='lg:w-[28px] lg:h-[28px] 2xl:w-[32px] 2xl:h-[32px]'
                    >
                      <path d="M20.911 0h-9.823C2.124 0-.001 2.125-.001 11.089v9.823c0 8.964 2.125 11.089 11.089 11.089h9.823C29.875 32.001 32 29.876 32 20.912v-9.823C32 2.125 29.854 0 20.911 0m4.922 22.828H23.51c-.88 0-1.151-.698-2.734-2.302c-1.375-1.333-1.984-1.51-2.323-1.51c-.479 0-.615.135-.615.792v2.099c0 .563-.177.901-1.667.901c-2.464 0-5.198-1.49-7.115-4.266c-2.891-4.068-3.682-7.115-3.682-7.745c0-.339.135-.656.786-.656h2.328c.589 0 .813.271 1.042.901c1.151 3.323 3.068 6.234 3.859 6.234c.292 0 .427-.135.427-.88v-3.432c-.089-1.583-.922-1.719-.922-2.281c0-.271.224-.542.583-.542h3.661c.495 0 .677.271.677.854v4.63c0 .5.224.677.359.677c.292 0 .542-.177 1.083-.719c1.672-1.875 2.87-4.766 2.87-4.766c.156-.339.427-.656 1.016-.656h2.328c.698 0 .854.359.698.859c-.292 1.354-3.141 5.375-3.141 5.375c-.245.406-.339.583 0 1.036c.25.339 1.063 1.042 1.604 1.672c.995 1.13 1.76 2.078 1.964 2.734c.229.651-.109.99-.766.99z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Мобильная версия */}
        <div className='md:hidden relative w-screen left-1/2 -translate-x-1/2 mt-10'>
          <img src={bgphone} alt="bg" className="absolute inset-0 w-full h-full object-cover" />

          <div className="relative z-10 flex flex-col items-center pt-16 pb-8 px-3">

            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[-70%] flex items-center">
              <img src={logophone} alt="logophone" className="w-8 h-8"/>
              <h2 className="text-[#C5A059] font-gv text-3xl underline decoration-1 underline-offset-[0.4rem] mr-3">
                Баута
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-x-3 text-sm font-sf text-gray-300 mb-6 -translate-y-[10%]">
              <button onClick={() => CustomNavigation('/')} className="hover:text-[#8B1E1E]">
                Главная
              </button>
              <button onClick={() => CustomNavigation('/history')} className="hover:text-[#8B1E1E]">
                История
              </button>
              <button onClick={() => CustomNavigation('/masks')} className="hover:text-[#8B1E1E]">
                Маски
              </button>
              <button onClick={() => CustomNavigation('/shop')} className="hover:text-[#8B1E1E]">
                Каталог
              </button>
            </div>

            <div className='w-full max-w-xs text-center'>
              <h3 className='text-[#8B1E1E] font-sf text-xl mb-2 text-center font-bold ml-3 -translate-y-[-55%]'>Контакты:</h3>
              <div className='flex flex-col text-sm text-[#0A0A0A] items-center -translate-y-[-10%]'>
                <div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className='text-center'>bautavenicecarnival@gmail.com</span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>+7 (221) 189-10-54</span>
                </div>
                <div className='flex items-center gap-2'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <span>Владивосток, ул. Светланская 147</span>
                </div>

                <div className='flex items-center mt-2 gap-[10px]'>
                  <a
                    href="https://max.ru/bautavenicecarnival"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20"
                      viewBox="0 0 24 24"
                      fill="#8B1E1E"
                    >
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.084.534 4.045 1.472 5.76l-.985 3.648 3.648-.985A11.969 11.969 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/>
                      <path d="M12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
                    </svg>
                  </a>

                  <a
                    href="https://vk.com/bautavenicecarnival"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-80 transition-opacity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg"
                      width="20" height="20"
                      viewBox="0 0 32 32"
                      fill="#8B1E1E"
                    >
                      <path d="M20.911 0h-9.823C2.124 0-.001 2.125-.001 11.089v9.823c0 8.964 2.125 11.089 11.089 11.089h9.823C29.875 32.001 32 29.876 32 20.912v-9.823C32 2.125 29.854 0 20.911 0m4.922 22.828H23.51c-.88 0-1.151-.698-2.734-2.302c-1.375-1.333-1.984-1.51-2.323-1.51c-.479 0-.615.135-.615.792v2.099c0 .563-.177.901-1.667.901c-2.464 0-5.198-1.49-7.115-4.266c-2.891-4.068-3.682-7.115-3.682-7.745c0-.339.135-.656.786-.656h2.328c.589 0 .813.271 1.042.901c1.151 3.323 3.068 6.234 3.859 6.234c.292 0 .427-.135.427-.88v-3.432c-.089-1.583-.922-1.719-.922-2.281c0-.271.224-.542.583-.542h3.661c.495 0 .677.271.677.854v4.63c0 .5.224.677.359.677c.292 0 .542-.177 1.083-.719c1.672-1.875 2.87-4.766 2.87-4.766c.156-.339.427-.656 1.016-.656h2.328c.698 0 .854.359.698.859c-.292 1.354-3.141 5.375-3.141 5.375c-.245.406-.339.583 0 1.036c.25.339 1.063 1.042 1.604 1.672c.995 1.13 1.76 2.078 1.964 2.734c.229.651-.109.99-.766.99z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Копирайт: ПК */}
        <div className='hidden md:block bg-[#0A0A0A] absolute left-0 right-0 text-center text-[#C5A059] font-sf
          lg:bottom-[-2rem] lg:py-[0.3rem] lg:text-[1rem]
          2xl:bottom-[-2.8rem] 2xl:py-[0.5rem] 2xl:text-[1.2rem]'
        >
          © 2026 Баута. Все права защищены. Сайт является учебным.
        </div>
        {/* Копирайт: мобильный */}
        <div className='md:hidden bg-[#0A0A0A] text-center text-[#C5A059] font-sf text-[0.6rem] py-2 w-screen relative left-1/2 -translate-x-1/2'>
          © 2026 Баута. Все права защищены. Сайт является учебным.
        </div>
      </footer>
    </div>
  )
}

export default Footer