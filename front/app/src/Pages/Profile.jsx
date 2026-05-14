import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Header from './Header'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Поля для редактирования
  const [editFirstName, setEditFirstName] = useState('')
  const [editUsername, setEditUsername] = useState('')
  const [editingFirstName, setEditingFirstName] = useState(false)
  const [editingUsername, setEditingUsername] = useState(false)

  // Аватарка
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const fileInputRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          navigate('/login')
          return
        }
        const response = await fetch('http://127.0.0.1:8000/profile/', {
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
        setError(error.message)
        localStorage.removeItem('token')
        navigate('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [navigate])

  const Logout = () => {
    localStorage.removeItem('token')
    navigate('/', { replace: true })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setSelectedFile(file)
    setPreviewUrl(URL.createObjectURL(file))
    setSaveMessage('')
  }

  // Сохранить всё
  const handleSave = async () => {
    setSaving(true)
    setSaveMessage('')
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()

      // Добавляем поля, если они изменились
      if (editFirstName !== (user?.first_name || '')) {
        formData.append('first_name', editFirstName)
      }
      if (editUsername !== (user?.username || '')) {
        formData.append('username', editUsername)
      }

      // Если есть новый файл аватарки, добавляем
      if (selectedFile) {
        formData.append('avatar', selectedFile)
      }

      // Если ничего не изменилось, не шлём запрос
      if (!formData.has('first_name') && !formData.has('username') && !selectedFile) {
        setSaveMessage('Нет изменений для сохранения')
        setSaving(false)
        return
      }

      const response = await fetch('http://127.0.0.1:8000/profile/', {
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
      // Синхронизируем локальные поля с данными с сервера
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

  const avatarSrc = previewUrl || user?.avatar

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center pt-[2rem] max-md:pt-0">
      <section className="relative w-full max-w-[1770px]">
        <div className="absolute top-5 left-0 w-full z-30 p-4 max-md:top-2 max-md:p-2">
          <div className="ml-[1.5rem] max-md:ml-0">
            <Header />
          </div>
        </div>

        <div className="flex flex-col items-center pt-[15rem] max-md:pt-24 px-4">
          <h2 className="text-[#C5A059] font-gv text-6xl md:text-8xl max-md:text-5xl drop-shadow-lg mb-10 max-md:mb-6 text-center">
            Профиль
          </h2>

          <div className="w-full max-w-4xl bg-[#0A0A0A]/80 backdrop-blur-md border-2 border-[#C5A059]/70 rounded-3xl shadow-[0_0_30px_rgba(197,160,89,0.3)] p-8 md:p-12 max-md:p-6 flex flex-col items-center">
            {/* Основной блок: аватарка слева, данные справа */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
              {/* Левая часть: аватарка */}
              <div className="flex-shrink-0">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="relative w-36 h-36 md:w-48 md:h-48 max-md:w-32 max-md:h-32 rounded-full border-2 border-[#C5A059] overflow-hidden bg-[#1A1A1A]">
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

              {/* Правая часть: имя, юзернейм, кнопка сохранить */}
              <div className="flex flex-col items-center md:items-start flex-grow mt-3 max-md:-mt-6">
                {/* Имя */}
                <div className="flex items-center gap-2 mb-2">
                  {editingFirstName ? (
                    <>
                      <input
                        type="text"
                        value={editFirstName}
                        onChange={(e) => setEditFirstName(e.target.value)}
                        className="w-full max-w-xs px-3 py-2 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-300 text-2xl md:text-3xl max-md:text-xl font-sf text-center"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingFirstName(false)}
                        className="text-[#C5A059] hover:text-[#f0d29a] transition"
                        title="Завершить редактирование"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-[#C5A059] font-sf text-4xl md:text-4xl max-md:text-3xl drop-shadow-xl shadow-[#C5A059]/100">
                        {editFirstName || 'Имя не указано'}
                      </h2>
                      <button
                        onClick={() => setEditingFirstName(true)}
                        className="text-[#C5A059]/70 hover:text-[#C5A059] transition"
                        title="Редактировать имя"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Юзернейм */}
                <div className="flex items-center gap-2 mb-6 max-md:mb-3">
                  {editingUsername ? (
                    <>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={(e) => setEditUsername(e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                        className="w-full max-w-xs px-3 py-2 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl text-gray-400 text-lg md:text-xl max-md:text-base font-sf text-center"
                        autoFocus
                      />
                      <button
                        onClick={() => setEditingUsername(false)}
                        className="text-[#C5A059] hover:text-[#f0d29a] transition"
                        title="Завершить редактирование"
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-400 font-sf text-lg md:text-xl max-md:text-base">@{editUsername}</p>
                      <button
                        onClick={() => setEditingUsername(true)}
                        className="text-[#C5A059]/70 hover:text-[#C5A059] transition"
                        title="Редактировать юзернейм"
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                  className={`px-[15rem] py-1 max-md:px-[5rem] max-md:py-0 max-md:text-[1rem] bg-[#8B1E1E] text-[#C5A059] rounded-full font-sf font-semibold text-lg hover:bg-[#C5A059] hover:text-[#8B1E1E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {saving ? 'Сохранение...' : 'Сохранить'}
                </button>

                {/* Сообщение о сохранении */}
                {saveMessage && (
                  <p className={`text-sm mt-2 w-full text-center ${saveMessage.includes('сохранены') ? 'text-green-400' : 'text-red-400'}`}>
                    {saveMessage}
                  </p>
                )}
              </div>
            </div>

            {/* Кнопки навигации по центру */}
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
    </div>
  )
}

export default Profile