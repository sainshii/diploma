import React, { useEffect, useState, useRef, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const API_URL = 'https://bauta-backend.onrender.com';

const statusLabels = {
  pending: 'Принят',
  processing: 'В обработке',
  shipped: 'Отправлен',
  delivered: 'Доставлен',
  picked_up: 'Забран',
  cancelled: 'Отменён',
};

const statusColors = {
  pending: 'bg-[#C5A059]/30 border-[#C5A059]',
  processing: 'bg-[#C5A059]/30 border-[#C5A059]',
  shipped: 'bg-[#C5A059]/30 border-[#C5A059]',
  delivered: 'bg-[#C5A059]/30 border-[#C5A059]',
  picked_up: 'bg-[#C5A059]/30 border-[#C5A059]',
  cancelled: 'bg-[#C5A059]/30 border-[#C5A059]',
};

const Profile = () => {
  useScrollOnMount();

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const navigate = useNavigate()

  const [editFirstName, setEditFirstName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editingFirstName, setEditingFirstName] = useState(false)
  const [editingUsername, setEditingUsername] = useState(false)

  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const fileInputRef = useRef(null)

  const [lastOrder, setLastOrder] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)

  const token = localStorage.getItem('token')

  const loadOrders = useCallback(async () => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/api/orders/`, {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();
        const activeOrder = data.find(order => order.status !== 'picked_up');
        setLastOrder(activeOrder || null);
      } catch {
        setLastOrder(null);
      }
    }
  }, [token]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate(`/login?redirect=${encodeURIComponent('/profile')}`)
          return
        }
        const response = await fetch(`${API_URL}/profile/`, {
          headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/json',
          }
        })
        if (!response.ok) throw new Error('Запрос не дошёл')
        const data = await response.json()
        setUser(data)
        setEditFirstName(data.first_name || '')
        setEditUsername(data.username || '')
      } catch (error) {
        console.error('Ошибка загрузки профиля:', error)
        localStorage.removeItem('token')
        navigate(`/login?redirect=${encodeURIComponent('/profile')}`)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
    loadOrders()
  }, [navigate, loadOrders])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setSaveMessage('')
  }

  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()

      if (editFirstName !== (user?.first_name || '')) {
        formData.append('first_name', editFirstName)
      }
      if (editUsername !== (user?.username || '')) {
        formData.append('username', editUsername)
      }

      if (selectedFile) {
        formData.append('avatar', selectedFile)
      }

      if (!formData.has('first_name') && !formData.has('username') && !selectedFile) {
        setSaveMessage('Нет изменений для сохранения')
        setSaving(false)
        return
      }

      const response = await fetch(`${API_URL}/profile/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${token}`,
        },
        body: formData
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || err.username?.[0] || 'Ошибка сохранения')
      }

      const updatedUser = await response.json()
      setUser(updatedUser)
      setEditFirstName(updatedUser.first_name || '')
      setEditUsername(updatedUser.username || '')
      setSelectedFile(null)
      setPreviewUrl(null)
      setEditingFirstName(false)
      setEditingUsername(false)
      setSaveMessage('Изменения сохранены')
    } catch (err) {
      setSaveMessage(err.message)
    } finally {
      setSaving(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <p className="text-[#C5A059] font-gv text-3xl">Загрузка...</p>
      </div>
    )
  }

  const avatarSrc = previewUrl || user?.avatar_url

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
    lg:pt-[1.3rem]
    2xl:pt-[2rem]">
      <Helmet>
        <title>Профиль – Баута</title>
        <meta name="description" content="Личный кабинет в интернет-магазине Баута." />
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
        2xl:pt-[12rem]">

          {/* Статус активного заказа */}
          {lastOrder && lastOrder.status !== 'picked_up' && (
            <div className="w-full max-w-5xl mb-6">
              <div className="border border-[#C5A059]/40 rounded-2xl p-4 flex items-center justify-between">
                <p className="text-white font-sf lg:text-lg text-[0.8rem] flex items-center gap-2">
                  Статус заказа{' '}
                  <button
                    onClick={() => setShowOrderModal(true)}
                    className="text-[#C5A059] hover:underline font-bold"
                  >
                    №{lastOrder.id}
                  </button>
                  :{' '}
                  <span className={`lg:px-8 px-5 lg:py-1 py-[1px] rounded-full lg:text-sm text-[0.8rem] border ${statusColors[lastOrder.status] || 'bg-gray-600/30 text-gray-300 border-gray-500'}`}>
                    {statusLabels[lastOrder.status] || lastOrder.status}
                  </span>
                </p>
                <button
                  onClick={() => setShowOrderModal(true)}
                  className="text-[#C5A059] hover:text-white transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <h1 className="text-[#C5A059] font-gv md:text-4xl max-md:text-4xl drop-shadow-lg mb-10 max-md:mb-6 text-center mt-[1rem]
          lg:text-6xl lg:mt-[3rem]
          2xl:text-7xl 2xl:mt-[3rem]">
            Личный кабинет
          </h1>

          <div className="w-full 2xl:max-w-4xl lg:max-w-3xl bg-[#0A0A0A]/80 backdrop-blur-md border-2 border-[#C5A059]/70 rounded-3xl shadow-[0_0_30px_rgba(197,160,89,0.3)] p-8 md:p-12 max-md:p-6 flex flex-col items-center">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
              {/* Левая часть */}
              <div className="flex-shrink-0">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="relative 2xl:w-[12rem] 2xl:h-[12rem] lg:w-[10rem] lg:h-[10rem] max-md:w-[7rem] max-md:h-[7rem] rounded-full border-2 border-[#C5A059] overflow-hidden bg-[#1A1A1A]">
                    {avatarSrc ? (
                      <img src={avatarSrc} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#C5A059] text-6xl max-md:text-4xl font-gv">
                        {(editFirstName || user?.first_name || editUsername || user?.username)?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm font-sf font-semibold drop-shadow-lg text-center px-2">
                        Изменить фото
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Правая часть */}
              <div className="flex flex-col items-center md:items-start flex-grow mt-3 max-md:-mt-6">
                {/* Имя */}
                <div className="flex items-center gap-1 min-h-[2rem] ml-[1rem] 2xl:gap-2">
                  {editingFirstName ? (
                    <>
                      <input
                        type="text"
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        className="w-full max-w-xs px-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 
                        2xl:text-3xl 2xl:py-0
                        lg:text-2xl lg:py-0 
                        max-md:text-xl font-sf text-center py-0"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingFirstName(false)}
                        className="text-[#C5A059] hover:text-[#f0d29a] transition p-1 max-md:p-2 max-md:w-8 max-md:h-8 z-10"
                        title="Завершить редактирование"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-6 max-md:h-6">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[#C5A059] font-sf 
                      2xl:text-5xl 
                      lg:text-4xl 
                      max-md:text-2xl drop-shadow-xl shadow-[#C5A059]/100">
                        {editFirstName || 'Имя не указано'}
                      </h2>
                      <button
                        onClick={() => setEditingFirstName(true)}
                        className="text-[#C5A059]/70 hover:text-[#C5A059] transition p-1 max-md:p-2 max-md:w-8 max-md:h-8 z-10"
                        title="Редактировать имя"
                      >
                        <svg className='2xl:w-[1.7rem] 2xl:h-[1.7rem] lg:w-[1.5rem] lg:h-[1.5rem] max-md:w-4 max-md:h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Юзернейм */}
                <div className="flex items-center gap-1 max-md:mb-3 min-h-[2rem] ml-[1rem] lg:gap-2 lg:mt-1 lg:mb-5 2xl:mt-3 2xl:mb-5">
                  {editingUsername ? (
                    <>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                        className="w-full max-w-xs px-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-400 
                        2xl:text-2xl 2xl:py-0
                        lg:text-lg lg:py-0 
                        max-md:text-xl font-sf text-center py-0"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingUsername(false)}
                        className="text-[#C5A059] hover:text-[#f0d29a] transition p-1 max-md:p-2 max-md:w-8 max-md:h-8 z-10"
                        title="Завершить редактирование"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="max-md:w-6 max-md:h-6">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-400 font-sf 2xl:text-2xl lg:text-lg md:text-xl max-md:text-base">@{editUsername}</p>
                      <button
                        onClick={() => setEditingUsername(true)}
                        className="text-[#C5A059]/70 hover:text-[#C5A059] transition p-1 max-md:p-2 max-md:w-8 max-md:h-8 z-10"
                        title="Редактировать юзернейм"
                      >
                        <svg className='2xl:w-[1.5rem] 2xl:h-[1.5rem] lg:w-[1.3rem] lg:h-[1.3rem] max-md:w-4 max-md:h-4' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Кнопка Сохранить */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`2xl:px-[15rem] lg:px-[12rem] py-1 max-md:px-[5rem] max-md:py-0 max-md:text-[1rem] bg-[#8B1E1E] text-[#C5A059] rounded-full font-sf font-semibold 2xl:text-lg hover:bg-[#C5A059] hover:text-[#8B1E1E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>

                {saveMessage && (
                  <p className={`text-sm mt-2 w-full text-center ${saveMessage.includes('сохранены') ? 'text-green-400' : 'text-red-400'}`}>
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-[2rem] mt-8 max-md:gap-4 max-md:mt-6">
              <Link to="/shop" className="px-[6rem] py-2 max-md:px-8 border-2 border-[#C5A059] text-[#C5A059] rounded-full font-sf font-semibold hover:bg-[#C5A059] hover:text-[#8B1E1E] transition-all duration-300 shadow-lg shadow-[#C5A059]/30">
                Каталог
              </Link>
              <Link to="/cart" className="px-[6rem] py-2 max-md:px-8 border-2 border-[#C5A059] text-[#C5A059] rounded-full font-sf font-semibold hover:bg-[#C5A059] hover:text-[#8B1E1E] transition-all duration-300 shadow-lg shadow-[#C5A059]/30">
                Корзина
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showOrderModal && lastOrder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              className="bg-[#1A1A1A] border border-[#C5A059]/40 rounded-2xl p-6 w-full max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[#C5A059] font-gv lg:text-3xl text-2xl">Детали заказа №{lastOrder.id}</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="text-gray-400 hover:text-white text-xl"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-400 lg:text-lg text-sm mb-1">
                Адрес: {lastOrder.address}
              </p>
              <ul className="text-gray-300 lg:text-lg text-sm list-disc list-inside mb-5">
                {lastOrder.items?.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/product/${item.product?.id || item.product}`}
                      className="text-[#C5A059] hover:underline"
                      onClick={() => setShowOrderModal(false)}
                    >
                      {item.product_name || item.product?.name || 'Товар'}
                    </Link>
                    {' '}– {item.quantity} шт. ({item.size})
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowOrderModal(false)}
                className="w-full bg-[#8B1E1E] text-[#f0d29a] rounded-full lg:py-1 py-[1px] font-sf hover:bg-[#C5A059] hover:text-[#8B1E1E] transition"
              >
                Закрыть
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default Profile