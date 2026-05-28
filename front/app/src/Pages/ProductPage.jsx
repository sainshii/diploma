import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice'
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const ProductPage = () => {
  
  useScrollOnMount();

  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(() => {
    return localStorage.getItem(`selectedSize_${id}`) || ''
  })
  const [commentText, setCommentText] = useState('')
  const [commentRating, setCommentRating] = useState(5)
  const [commentError, setCommentError] = useState('')
  const { addToCart, updateQuantity, getCartItem, items } = useCart()
  const navigate = useNavigate()

  // Загрузка товара
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(res => res.json())
      .then(data => {
        console.log("ПОЛНЫЙ ОТВЕТ СЕРВЕРА:", data);
        setProduct(data)
        if (!selectedSize) {
          const cartItemForProduct = items.find(item => item.product.id === data.id)
          if (cartItemForProduct) {
            setSelectedSize(cartItemForProduct.size)
          }
        }
      })
      .catch(err => console.error('Ошибка загрузки товара:', err))
  }, [id, items, selectedSize])

  // Сохраняем размер
  useEffect(() => {
    if (selectedSize) {
      localStorage.setItem(`selectedSize_${id}`, selectedSize)
    }
  }, [selectedSize, id])

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Выберите размер')
      return
    }
    addToCart(product, selectedSize)
  }

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      alert('Войдите, чтобы оставить комментарий')
      navigate('/login')
      return
    }
    setCommentError('')
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${id}/comments/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify({
          text: commentText,
          rating: Number(commentRating)
        })
      })
      if (!response.ok) {
        let errorMsg = `Ошибка ${response.status}`
        try {
          const errorData = await response.json()
          errorMsg = errorData.rating?.[0] || errorData.text?.[0] || errorData.detail || errorMsg
        } catch {}
        throw new Error(errorMsg)
      }
      const newComment = await response.json()
      setProduct(prev => ({
        ...prev,
        comments: [newComment, ...(prev.comments || [])]
      }))
      setCommentText('')
      setCommentRating(5)
    } catch (err) {
      console.error('Ошибка отправки комментария:', err)
      setCommentError(err.message || 'Не удалось отправить комментарий')
    }
  }

  if (!product) return <div className="text-white text-center mt-20">Загрузка...</div>

  const cartItem = selectedSize ? getCartItem(product.id, selectedSize) : null
  const isInCart = !!cartItem

  // Расчёт скидки
  const hasDiscount = product.discounted_price && product.discounted_price < product.price
  const discountPercent = hasDiscount
    ? Math.round((1 - product.discounted_price / product.price) * 100)
    : 0
  const finalPrice = hasDiscount ? product.discounted_price : product.price

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center 
      lg:pt-[1.3rem]
      2xl:pt-[2rem]">
      <Helmet>
        <title>Описание товара – Баута</title>
        <meta name="description" content="Описание и покупка товара в магазине Баута" />
      </Helmet>

      <section className={`relative w-full mx-auto
      lg:max-w-[1400px] 
      2xl:max-w-[1770px]
      `}>
        {/* Кнопка "Назад" */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute z-40 text-[#C5A059] hover:text-white transition-colors duration-200
            top-[11.2rem] left-5
            lg:top-[8.5rem] lg:left-4
            2xl:top-[11.2rem] 2xl:left-5
            max-md:top-[4rem] max-md:left-2
          `}
          aria-label="Назад"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-12 h-12 max-md:w-6 max-md:h-6
              lg:w-10 lg:h-10 2xl:w-12 2xl:h-12
            `}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

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

        {/* Контент */}
        <div className={`pt-[16rem] max-md:pt-[6.5rem] px-4
          lg:pt-[12rem] 2xl:pt-[16rem]
        `}>
          <div className={`flex flex-col md:flex-row gap-10 max-md:gap-6
            lg:gap-8 2xl:gap-10
          `}>
            {/* Блок изображения с бейджем скидки */}
            <div className="relative">
              {hasDiscount && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm md:text-base font-sf font-bold px-3 py-1.5 rounded-full shadow-lg">
                  -{discountPercent}%
                </div>
              )}
              {/* Обёртка с overflow-hidden и скруглением, чтобы увеличение не выходило за границы */}
              <div
                className={`overflow-hidden rounded-3xl border-2 border-[#C5A059]/50
                  w-[35rem] h-[40rem] max-md:w-full max-md:h-64 max-md:rounded-2xl
                  lg:w-[26rem] lg:h-[30rem] 2xl:w-[35rem] 2xl:h-[40rem]
                `}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            <div className={`flex-1 flex flex-col
              mt-[5rem] max-md:mt-1
              lg:mt-[3rem] 2xl:mt-[5rem]
            `}>
              {/* Название */}
              <div className="flex items-center gap-8 mb-4 max-md:gap-4 max-md:order-1 max-md:mb-2">
                <h1 className={`text-[#C5A059] font-gv max-md:text-3xl max-md:text-center
                  text-6xl
                  lg:text-5xl 2xl:text-6xl
                `}>
                  {product.name}
                </h1>
                <div className="hidden md:flex items-center gap-2">
                  <span className="text-yellow-400 text-2xl max-md:text-xl">★</span>
                  <span className="text-white text-xl max-md:text-lg">{product.rating}</span>
                </div>
              </div>

              {/* Мобильная строка: цена со скидкой + рейтинг */}
              <div className="md:hidden flex items-center justify-between mb-6 max-md:mb-4 max-md:order-2">
                <div className="flex items-baseline gap-2 flex-wrap">
                  {hasDiscount ? (
                    <>
                      <span className="text-gray-400 line-through text-sm">
                        {formatPrice(product.price)} ₽
                      </span>
                      <span className="text-[#C5A059] font-bold text-xl">
                        {formatPrice(finalPrice)} ₽
                      </span>
                    </>
                  ) : (
                    <span className="text-[#d1d1d1] text-xl font-bold">
                      {formatPrice(product.price)} ₽
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 text-xl">★</span>
                  <span className="text-white text-lg">{product.rating}</span>
                </div>
              </div>

              {/* Описание */}
              <p className={`text-gray-300 font-sf mb-4 text-justify max-md:order-4
                text-2xl max-md:text-sm
                lg:text-lg 2xl:text-2xl
              `}>
                {product.description}
              </p>

              {/* Десктопная цена со скидкой */}
              <div className="hidden md:block mb-6">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-gray-400 line-through text-2xl">
                      {formatPrice(product.price)} ₽
                    </span>
                    <span className="text-[#C5A059] font-bold text-4xl">
                      {formatPrice(finalPrice)} ₽
                    </span>
                  </div>
                ) : (
                  <p className="text-[#C5A059] font-bold text-3xl max-md:text-2xl">
                    {formatPrice(product.price)} ₽
                  </p>
                )}
              </div>

              {/* Размеры */}
              <div className="mb-6 max-md:order-3 max-md:mb-4">
                <h3 className={`text-white font-sf mb-2
                  text-2xl max-md:text-lg
                  lg:text-xl 2xl:text-2xl
                `}>Размер:</h3>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size.name)}
                      className={`border-[2px] rounded-full font-sf transition
                        px-4 py-2 max-md:px-3 max-md:py-1 text-lg max-md:text-xs
                        lg:px-3 lg:py-1.5 lg:text-base 2xl:px-4 2xl:py-2 2xl:text-lg
                        ${
                          selectedSize === size.name
                            ? 'bg-[#C5A059] text-black border-[#C5A059]'
                            : 'border-[#C5A059]/50 text-[#C5A059]'
                        }
                      `}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Кнопка добавления в корзину */}
              <div className="max-md:order-5">
                {isInCart ? (
                  <div className="flex justify-between items-center gap-4 max-md:gap-2 max-md:flex-wrap">
                    <span className={`text-[#C5A059]/70 font-sf text-lg max-md:text-sm
                      lg:text-base 2xl:text-lg
                    `}>
                      Добавлено в корзину
                    </span>
                    <div className="flex items-center gap-2 max-md:gap-1">
                      <button
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                        className={`px-3 py-1 max-md:px-2 max-md:py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full hover:bg-[#C5A059]/10 max-md:text-[0.7rem]
                          lg:px-2.5 lg:py-0.5 2xl:px-3 2xl:py-1
                        `}
                      >
                        −
                      </button>
                      <span className={`text-white text-center
                        text-xl max-md:w-6 max-md:text-sm
                        lg:text-lg lg:w-7 2xl:text-xl 2xl:w-8
                      `}>{cartItem.quantity}</span>
                      <button
                        onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                        className={`px-3 py-1 max-md:px-2 max-md:py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full hover:bg-[#C5A059]/10 max-md:text-[0.7rem]
                          lg:px-2.5 lg:py-0.5 2xl:px-3 2xl:py-1
                        `}
                      >
                        +
                      </button>
                    </div>
                    <Link
                      to="/cart"
                      className={`underline text-center text-[#dfb872] hover:text-white text-lg max-md:text-xs max-md:w-full max-md:ml-0 max-md:mt-1
                        lg:text-base 2xl:text-lg
                      `}
                    >
                      Перейти в корзину
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className={`bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf font-semibold hover:bg-[#C5A059] hover:text-[#8B1E1E] transition
                      px-[20rem] py-3 max-md:w-full max-md:px-8 max-md:py-2 text-lg max-md:text-sm
                      lg:px-[14rem] lg:py-2.5 lg:text-base 2xl:px-[20rem] 2xl:py-3 2xl:text-lg
                    `}
                  >
                    Добавить в корзину
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Комментарии */}
          <section className={`mt-16 mb-16 max-md:mt-10 max-md:mb-10
            lg:mt-12 lg:mb-12 2xl:mt-16 2xl:mb-16
          `}>
            <h2 className={`text-[#C5A059] font-gv mb-3 max-md:text-4xl
              text-5xl
              lg:text-5xl 
              2xl:text-5xl
            `}>Отзывы</h2>
            {product.comments && product.comments.length > 0 ? (
              product.comments.map(comment => (
                <div
                  key={comment.id}
                  className={`border border-[#C5A059]/30 rounded-xl p-4 max-md:p-3 mb-4 bg-[#1A1A1A]
                    lg:p-3 2xl:p-4
                  `}
                >
                  <div className="flex items-center gap-3 mb-3 max-md:gap-2">
                    <div className={`rounded-full border border-[#C5A059] overflow-hidden bg-[#0A0A0A] flex-shrink-0
                      w-10 h-10 max-md:w-8 max-md:h-8
                      lg:w-8 lg:h-8 2xl:w-10 2xl:h-10
                    `}>
                      {comment.user?.avatar_url ? (
                        <img
                          src={comment.user.avatar_url}
                          alt={comment.user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#C5A059] font-gv
                          text-sm max-md:text-xs
                          lg:text-xs 2xl:text-sm
                        ">
                          {comment.user?.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                    </div>
                    <div>
                      <span className={`text-[#C5A059] font-sf font-semibold max-md:text-sm
                        lg:text-sm 2xl:text-base
                      `}>
                        {comment.user?.username || 'Пользователь'}
                      </span>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm max-md:text-xs">
                        {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                      </div>
                    </div>
                    <span className={`ml-auto text-gray-500 text-sm max-md:text-xs
                      lg:text-xs 2xl:text-sm
                    `}>
                      {comment.created_at
                        ? new Date(comment.created_at).toLocaleDateString('ru-RU')
                        : ''}
                    </span>
                  </div>
                  <p className={`text-gray-300 mt-2 max-md:text-sm
                    lg:text-sm 2xl:text-base
                  `}>{comment.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Пока нет отзывов.</p>
            )}

            {/* Форма отправки комментария */}
            <form
              onSubmit={handleCommentSubmit}
              className={`mt-6 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl p-6 max-md:p-4
                lg:p-4 2xl:p-6
              `}
            >
              <h3 className={`text-[#C5A059] font-sf mb-4
                text-xl max-md:text-lg
                lg:text-lg 2xl:text-xl
              `}>
                Оставить отзыв
              </h3>
              <div className="flex gap-4 mb-4 max-md:gap-2">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setCommentRating(n)}
                    className={`text-2xl max-md:text-xl ${
                      n <= commentRating ? 'text-yellow-400' : 'text-gray-500'
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                placeholder="Ваш отзыв..."
                rows="4"
                className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white mb-4 max-md:text-sm"
              />
              {commentError && (
                <p className="text-red-400 text-sm mb-2">{commentError}</p>
              )}
              <button
                type="submit"
                className={`bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf hover:bg-[#C5A059] hover:text-[#8B1E1E] transition
                  px-8 py-2 max-md:px-6 max-md:py-1.5
                  lg:px-6 lg:py-1.5 2xl:px-8 2xl:py-2
                `}
              >
                Отправить
              </button>
            </form>
          </section>
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default ProductPage