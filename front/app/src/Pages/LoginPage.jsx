import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Header from './Header'

const LoginPage = () => {
  const [errors, setErrors] = useState('')
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors('')
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
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
        setErrors('неверные данные')
        localStorage.removeItem('token')
        return
      }
      const data = await response.json()
      localStorage.setItem('token', data.token)
      navigate('/profile', { replace: true })
    } catch (error) {
      setErrors(error.message)
      localStorage.removeItem('token')
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center pt-[2rem] max-md:pt-0">
      <section className="relative w-full max-w-[1770px]">
        <div className="absolute top-5 left-0 w-full z-30 p-4 max-md:top-2 max-md:p-2">
          <div className="ml-[1.5rem] max-md:ml-0">
            <Header />
          </div>
        </div>

        <div className="flex flex-col items-center pt-[13rem] max-md:pt-24 px-4">
          <h2 className="text-[#C5A059] font-gv text-7xl md:text-8xl max-md:text-5xl drop-shadow-lg mb-8 max-md:mb-6 text-center">
            Вход
          </h2>

          <div className="w-full max-w-md bg-[#0A0A0A]/80 backdrop-blur-md border border-[#C5A059]/70 rounded-3xl shadow-2xl shadow-black/50 p-8 md:p-10 max-md:px-6 max-md:py-8">
            {/* Форма теперь motion.form с layout – она плавно меняет высоту */}
            <motion.form
              layout
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 max-md:gap-4"
            >
              {/* Поле Email */}
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

              {/* Поле Пароль */}
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

              {/* Анимированное сообщение об ошибке */}
              <AnimatePresence mode="wait">
                {errors && (
                  <motion.div
                    key="error"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="px-4 py-2 bg-[#8B1E1E]/20 border border-[#8B1E1E]/60 rounded-xl text-[#C5A059] text-sm text-center font-sf"
                  >
                    {errors}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Кнопка Войти – без layout, так как форма сама сдвигает её */}
              <button
                type="submit"
                className="w-full py-3 mt-2 bg-[#8B1E1E] text-[#f0d29a] font-sf font-semibold text-lg rounded-xl
                           hover:bg-[#C5A059] hover:text-[#8B1E1E] active:scale-95 transition-all duration-300 shadow-lg shadow-[#8B1E1E]/30
                           max-md:text-base max-md:py-2.5"
              >
                Войти
              </button>
            </motion.form>

            {/* Разделитель и ссылка на регистрацию без изменений */}
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
    </div>
  )
}

export default LoginPage