import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center">
      <div className="flex flex-col items-center justify-center flex-1 text-center px-4 mt-[-5rem]
      lg:mt-[-3rem] lg:mr-[3rem]
      2xl:mt-[-3rem] 2xl:mr-[3rem]">
        <h1
          className="text-[#C5A059] font-gv leading-none drop-shadow-lg
            text-[8rem]
            lg:text-[13rem]
            2xl:text-[18rem]"
        >
          404
        </h1>
        <h2
          className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-50 to-gray-400 font-gv
            inline-block py-1 leading-relaxed
            text-2xl mt-2
            lg:text-3xl lg:mt-3
            2xl:text-[2.4rem] 2xl:mt-2"
        >
          Страница не найдена
        </h2>
        <p
          className="text-gray-400 font-sf max-w-md
            text-sm
            lg:text-lg
            2xl:text-xl 2xl:mt-4"
        >
          Неправильно набран адрес или такой страницы больше не существует.
        </p>
        <Link
          to="/"
          className="mt-8 bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf hover:bg-[#C5A059] hover:text-[#8B1E1E] transition
            text-sm px-12 py-1
            lg:text-xl lg:px-12 lg:py-1
            2xl:text-xl 2xl:px-[4rem] 2xl:py-1"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage