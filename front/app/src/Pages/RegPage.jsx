import React, { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const RegPage = () => {

  useScrollOnMount();

  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    first_name: '',
    username: '',
    email: '',
    password: '',
  })
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/login';

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://127.0.0.1:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      })
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || data.username?.[0] || 'Такой пользователь уже существует')
      } else {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        window.dispatchEvent(new Event('token-changed'))
        navigate(redirectTo)
      }
    } catch (error) {
      setErrors(error.message)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>Регистрация – Баута</title>
        <meta name="description" content="Регистрация в интернет-магазине Баута." />
      </Helmet>

      <section className="relative w-full mx-auto
        lg:max-w-[1400px] 
        2xl:max-w-[1770px]">
        <div className="absolute left-0 w-full z-30 p-4
        lg:top-2
        2xl:top-3
        max-md:top-2 max-md:p-2">
          <div className="ml-[1.5rem] max-md:ml-0">
            <Suspense fallback={null}>
            	<Header />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col items-center max-md:pt-24 px-4
        lg:pt-[10rem]
        2xl:pt-[11.6rem]">
          <h1 className="text-[#C5A059] font-gv md:text-8xl max-md:text-5xl drop-shadow-lg mb-8 max-md:mb-6 text-center
          lg:text-[4.5rem]
          2xl:text-7xl">
            Регистрация
          </h1>

          <div className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C5A059]/70 rounded-3xl shadow-2xl shadow-black/50 p-8 md:p-10 max-md:px-6 max-md:py-8">

            {errors && (
                <div className="mb-6 px-4 text-red-400 text-lg text-center font-sf">
                  {errors}
                </div>
              )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-md:gap-4">
              {/* Имя */}
              <div className="flex flex-col gap-2">
                <label htmlFor="first_name" className="text-[#C5A059] font-sf text-sm uppercase tracking-wider ml-2 max-md:text-xs">
                  Имя
                </label>
                <input
                  id="first_name"
                  type="text"
                  name="first_name"
                  placeholder="Введите имя"
                  onChange={handleChange}
                  value={formData.first_name}
                  required
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 placeholder-gray-600
                             focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300
                             max-md:text-sm max-md:py-2.5"
                />
              </div>

              {/* Юзернейм */}
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-[#C5A059] font-sf text-sm uppercase tracking-wider ml-2 max-md:text-xs">
                  Юзернейм
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Только латиница и цифры"
                  onChange={handleChange}
                  value={formData.username}
                  required
                  pattern="[a-zA-Z0-9]+"
                  title="Только английские буквы и цифры"
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 placeholder-gray-600
                             focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300
                             max-md:text-sm max-md:py-2.5"
                />
              </div>

              {/* Почта */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#C5A059] font-sf text-sm uppercase tracking-wider ml-2 max-md:text-xs">
                  Почта
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@mail.ru"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 placeholder-gray-600
                             focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300
                             max-md:text-sm max-md:py-2.5"
                />
              </div>

              {/* Пароль */}
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[#C5A059] font-sf text-sm uppercase tracking-wider ml-2 max-md:text-xs">
                  Пароль
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Введите пароль"
                  onChange={handleChange}
                  value={formData.password}
                  required
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 placeholder-gray-600
                             focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300
                             max-md:text-sm max-md:py-2.5"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#8B1E1E] text-[#f0d29a] font-sf font-semibold text-lg rounded-xl
                           hover:bg-[#C5A059] hover:text-[#8B1E1E] active:scale-95 transition-all duration-300 shadow-lg shadow-[#8B1E1E]/30
                           max-md:text-base max-md:py-2.5"
              >
                Зарегистрироваться
              </button>
            </form>

            <div className="flex items-center gap-3 my-8 max-md:my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
              <span className="text-[#C5A059]/50 font-sf text-xs uppercase">или</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-block px-6 py-2 border border-[#C5A059]/50 rounded-full text-[#C5A059] font-sf text-sm
                           hover:bg-[#C5A059]/10 hover:border-[#C5A059] transition-all duration-300
                           max-md:text-xs max-md:px-4 max-md:py-1.5"
              >
                Уже есть аккаунт? Войти
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default RegPage