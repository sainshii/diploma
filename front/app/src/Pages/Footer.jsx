import React from 'react'
import { useNavigate } from 'react-router-dom'
import bg from '../img/footer.png'
import logo from '../img/logo1.png'

const Footer = () => {
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
    <div>
        <footer className='relative w-full'>
            <img src={bg} alt='bg' className='w-full h-auto object-cover mx-auto rounded-xl' />

            {/* Контейнер для левого и правого блока */}
            <div className='absolute flex justify-between items-start z-10 top-[10rem] left-[4rem] right-[4rem]'>

                {/* ЛЕВЫЙ БЛОК (Баута + навигация) — без изменений */}
                <div className='flex flex-col mt-[5rem]'>
                    <div className='flex ml-[6rem]'>
                        <img src={logo} alt='logo' className='w-[5rem] h-[5rem] mt-[2rem]'/>
                        <h2 className='text-[#8B1E1E] font-gv text-[6rem] underline decoration-2 underline-offset-[0.7rem]'>Баута</h2>
                    </div>
                    <div className='flex gap-[30px] text-[1.6rem] font-sf'>
                        <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={()=>CustomNavigation('/')}>
                            Главная 
                        </button>
                        <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={()=>CustomNavigation('/history')}>
                            История 
                        </button>
                        <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={()=>CustomNavigation('/masks')}>
                            Маски и персонажи 
                        </button>
                        <button className='text-[#0A0A0A] leading-[0rem] hover:text-[#8B1E1E] transition duration-200' onClick={()=>CustomNavigation('/shop')}>
                            Магазин 
                        </button>
                    </div>
                </div>

                {/* ПРАВЫЙ БЛОК (Контакты) — сдвинут выше, левее и выровнен по правому краю */}
                <div className='flex flex-col items-end pr-[10rem] mt-[1rem]'>
                    <h3 className='font-sf text-[#C5A059] text-[3rem] mb-2 text-right'>Контакты:</h3>
                    <div className='flex flex-col gap-1 items-end text-[1.5rem]'>
                        <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <span className='text-right'>bautavenicecarnival@gmail.com</span>
                        </p>
                        <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.574 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                            <span className='text-right'>+72211891054</span>
                        </p>
                        <p className='flex items-center gap-2 font-sf text-[#cccccc]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#C5A059">
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.084.534 4.045 1.472 5.76l-.985 3.648 3.648-.985A11.969 11.969 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 3.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17z"/>
                                <path d="M12 6.5a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11z"/>
                            </svg>
                            <span className='text-right'>@bautavenicecarnival</span> 
                        </p>
                    </div>
                </div>
            </div>

            <div className='bg-[#0A0A0A] absolute bottom-[-2.8rem] py-[0.5rem] left-0 right-0 text-center text-[#C5A059] font-sf text-[1.2rem]'>
                2026. Все права защищены
            </div>
        </footer>
    </div>
  )
}

export default Footer