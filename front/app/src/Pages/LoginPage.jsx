import React, { useState } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const LoginPage = () => {
  useScrollOnMount();

  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/profile'

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Сброс пароля
  const [resetModalOpen, setResetModalOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetPassword, setResetPassword] = useState('')
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetError, setResetError] = useState('')
  const [resetSuccess, setResetSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors('')
    try {
      const response = await fetch(`${API_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      })
      if (!response.ok) {
        setErrors('Неверные данные')
        localStorage.removeItem('token')
        return
      }
      const data = await response.json()
      localStorage.setItem('token', data.token)
      window.dispatchEvent(new Event('token-changed'))

      console.log('Перенаправляю на:', redirectTo)
      navigate(redirectTo, { replace: true })
    } catch (error) {
      setErrors(error.message)
      localStorage.removeItem('token')
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setResetError('')
    setResetSuccess('')
    if (resetPassword !== resetConfirm) {
      setResetError('Пароли не совпадают')
      return
    }
    if (resetPassword.length < 6) {
      setResetError('Пароль должен быть не менее 6 символов')
      return
    }
    try {
      const response = await fetch(`${API_URL}/reset-password/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail,
          new_password: resetPassword
        })
      })
      if (!response.ok) {
        const data = await response.json()
        setResetError(data.error || 'Ошибка сброса пароля')
        return
      }
      setResetSuccess('Пароль успешно изменён. Теперь вы можете войти.')
      // Очистить поля
      setResetEmail('')
      setResetPassword('')
      setResetConfirm('')
      // Закрыть модальное окно через 2 секунды
      setTimeout(() => {
        setResetModalOpen(false)
        setResetSuccess('')
      }, 2000)
    } catch (error) {
      setResetError('Ошибка сети')
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>Вход – Баута</title>
        <meta name="description" content="Вход в аккаунт в интернет-магазине Баута." />
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
        2xl:pt-[13rem]">
          <h1 className="text-[#C5A059] font-gv md:text-8xl max-md:text-5xl drop-shadow-lg max-md:mb-6 text-center
          lg:text-[4.5rem] lg:mb-4
          2xl:text-7xl 2xl:mb-8">
            Вход
          </h1>

          <div className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C5A059]/70 rounded-3xl shadow-2xl shadow-black/50 p-8 md:p-10 max-md:px-6 max-md:py-8">
            <motion.form
              layout
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 max-md:gap-4"
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[#C5A059] font-sf text-sm uppercase tracking-wider ml-2 max-md:text-xs">
                  Почта
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Введите почту"
                  onChange={handleChange}
                  value={formData.email}
                  required
                  className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 placeholder-gray-600
                             focus:outline-none focus:border-[#C5A059] focus:ring-1 focus:ring-[#C5A059]/50 transition-all duration-300
                             max-md:text-sm max-md:py-2.5"
                />
              </div>

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

              <AnimatePresence mode="wait">
                {errors && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="px-4 rounded-xl text-red-400 text-sm text-center font-sf
                    lg:text-lg"
                  >
                    {errors}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#8B1E1E] text-[#f0d29a] font-sf font-semibold text-lg rounded-xl
                           hover:bg-[#C5A059] hover:text-[#8B1E1E] active:scale-95 transition-all duration-300 shadow-lg shadow-[#8B1E1E]/30
                           max-md:text-base max-md:py-2.5"
              >
                Войти
              </button>
            </motion.form>

            {/* Кнопка "Забыли пароль?" */}
            <div className="mt-5 text-center">
              <button
                onClick={() => setResetModalOpen(true)}
                className="text-[#C5A059]/80 font-sf text-sm hover:text-[#C5A059] underline underline-offset-2 transition
                lg:text-lg"
              >
                Забыли пароль?
              </button>
            </div>

            <div className="flex items-center gap-3 my-8 max-md:my-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
              <span className="text-[#C5A059]/50 font-sf text-xs uppercase">или</span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5A059]/40 to-transparent"></div>
            </div>

            <div className="text-center">
              <Link
                to="/register"
                className="inline-block px-6 py-2 border border-[#C5A059]/50 rounded-full text-[#C5A059] font-sf text-sm
                           hover:bg-[#C5A059]/10 hover:border-[#C5A059] transition-all duration-300
                           max-md:text-xs max-md:px-4 max-md:py-1.5"
              >
                Ещё нет аккаунта? Зарегистрироваться
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Модальное окно сброса пароля */}
      <AnimatePresence>
        {resetModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => { setResetModalOpen(false); setResetError(''); setResetSuccess(''); }}
          >
            <motion.div
              className="bg-[#1A1A1A] border border-[#C5A059]/40 rounded-2xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => { setResetModalOpen(false); setResetError(''); setResetSuccess(''); }}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
              <h2 className="text-[#C5A059] font-gv text-3xl mb-4">Сброс пароля</h2>

              {resetSuccess ? (
                <p className="text-green-400 text-center font-sf">{resetSuccess}</p>
              ) : (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div>
                    <label className="text-white font-sf block mb-1">Email</label>
                    <input
                      type="email"
                      value={resetEmail}
                      onChange={e => setResetEmail(e.target.value)}
                      placeholder="Введите email"
                      required
                      className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white font-sf"
                    />
                  </div>
                  <div>
                    <label className="text-white font-sf block mb-1">Новый пароль</label>
                    <input
                      type="password"
                      value={resetPassword}
                      onChange={e => setResetPassword(e.target.value)}
                      placeholder="Не менее 6 символов"
                      required
                      className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white font-sf"
                    />
                  </div>
                  <div>
                    <label className="text-white font-sf block mb-1">Подтвердите пароль</label>
                    <input
                      type="password"
                      value={resetConfirm}
                      onChange={e => setResetConfirm(e.target.value)}
                      placeholder="Повторите пароль"
                      required
                      className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white font-sf"
                    />
                  </div>
                  {resetError && (
                    <p className="text-red-400 text-sm">{resetError}</p>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-[#8B1E1E] text-[#f0d29a] py-2 rounded-full font-sf text-lg hover:bg-[#C5A059] hover:text-[#8B1E1E] transition"
                  >
                    Сменить пароль
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoginPage