import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { useScrollOnMount } from '../hooks/useScrollOnMount'
import { formatPrice } from '../utils/formatPrice'
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));
const Footer = lazy(() => import('./Footer'));

const API_URL = 'https://bauta-backend.onrender.com';

const paymentLabels = {
  card: 'Банковская карта',
  sbp: 'СБП',
  yoomoney: 'ЮMoney',
  sberpay: 'SberPay',
  tinkoff: 'Tinkoff Pay',
};

const CartPage = () => {

  useScrollOnMount()

  const navigate = useNavigate()
  const {
    items,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('checkout')
  const [orderResult, setOrderResult] = useState(null)
  const [orders, setOrders] = useState([])

  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  // Загрузка истории заказов
  const loadOrders = useCallback(async () => {
    if (token) {
      try {
        const res = await fetch(`${API_URL}/api/orders/`, {
          headers: { Authorization: `Token ${token}` },
        });
        const data = await res.json();
        setOrders(Array.isArray(data) ? data : []);
      } catch {
        setOrders([]);
      }
    }
  }, [token]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        loadOrders();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [loadOrders]);

  const totalPrice = getTotalPrice()

  const handleOpenCheckout = () => {
    setModalType('checkout')
    setError('')
    setModalOpen(true)
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()
    if (!address.trim()) {
      setError('Пожалуйста, укажите адрес доставки')
      return
    }
    if (!token) {
      alert('Войдите, чтобы оформить заказ')
      navigate('/login')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/orders/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify({
          address: address.trim(),
          payment_method: paymentMethod,
          items: items.map(item => ({
            product: item.product.id,
            size: item.size,
            quantity: item.quantity,
          })),
          total_price: totalPrice,
        }),
      })
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.detail || 'Ошибка сервера')
      }
      const newOrder = await response.json()
      setOrderResult({
        ...newOrder,
        items: items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          price: item.discounted_price / item.quantity,
        })),
      })
      clearCart()
      setModalType('success')
      await loadOrders()
    } catch (err) {
      setError(err.message || 'Не удалось оформить заказ')
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const renderOrderHistory = () => {
    if (orders.length === 0) return null
    return (
      <div className="mt-12 mb-8 px-4">
        <h2 className="text-[#C5A059] font-gv lg:text-6xl text-3xl lg:mb-5 mb-3">
          История заказов
        </h2>
        <div className="space-y-4">
          {orders.map((order, idx) => (
            <div
              key={order.id}
              className="bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl p-4 md:p-6"
            >
              <p className="text-[#C5A059] font-sf text-lg">
                Заказ №{orders.length - idx} от{' '}
                {new Date(order.created_at).toLocaleDateString('ru-RU')}
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Адрес: {order.address}
              </p>
              <p className="text-gray-400 text-sm">
                Оплата: {paymentLabels[order.payment_method] || order.payment_method}
              </p>
              <ul className="mt-2 text-gray-300 text-sm list-disc list-inside">
                {order.items?.map((item, idx) => {
                  const productId = item.product?.id || item.product;
                  return (
                    <li key={idx}>
                      {productId ? (
                        <Link to={`/product/${productId}`} className="text-[#C5A059] hover:underline">
                          {item.product_name || item.product?.name || 'Товар'}
                        </Link>
                      ) : (
                        item.product_name || item.product?.name || 'Товар'
                      )}
                      {' '}–{' '}
                      {item.quantity} шт. ({item.size}) – {formatPrice(item.price)} ₽/шт
                    </li>
                  );
                })}
              </ul>
              <p className="text-white font-sf lg:text-lg mt-2">
                Сумма: {formatPrice(order.total_price)} ₽
              </p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center lg:pt-[1.3rem] 2xl:pt-[2rem]">
        <Helmet>
          <title>Корзина – Баута</title>
          <meta name="description" content="Оформление заказа в интернет-магазине Баута." />
        </Helmet>

        <section className="relative w-full mx-auto lg:max-w-[1400px] 2xl:max-w-[1770px]">
          <div className="absolute top-5 left-0 w-full z-30 p-4 max-md:top-2 max-md:p-2">
            <div className="ml-[1.5rem] max-md:ml-0">
              <Suspense fallback={null}>
                <Header />
              </Suspense>
            </div>
          </div>
          <div className="max-md:pt-28 text-center lg:pt-[12rem] 2xl:pt-[13rem]">
            <h1 className="text-[#9c875e] font-gv max-md:text-[2.5rem] max-md:mb-1 mb-4 mr-4 text-8xl">
              Корзина пуста
            </h1>
            <Link
              to="/shop"
              className="text-[#C5A059] underline text-xl max-md:text-base font-sf hover:text-red-800 duration-200 transition"
            >
              Перейти в каталог
            </Link>
          </div>
          {renderOrderHistory()}
        </section>
        <Footer />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center lg:pt-[1.3rem] 2xl:pt-[2rem]">
      <Helmet>
        <title>Корзина – Баута</title>
        <meta name="description" content="Оформление заказа в интернет-магазине Баута." />
      </Helmet>

      <section className="relative w-full mx-auto lg:max-w-[1400px] 2xl:max-w-[1770px]">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-[11.2rem] left-5 z-40 text-[#C5A059] hover:text-white transition-colors duration-200 max-md:top-[4rem] max-md:left-2"
          aria-label="Назад"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 max-md:w-6 max-md:h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="absolute left-0 w-full z-30 p-4 lg:top-2 2xl:top-3 max-md:top-2 max-md:p-2">
          <div className="ml-[1.5rem] max-md:ml-0">
            <Suspense fallback={null}>
              <Header />
            </Suspense>
          </div>
        </div>

        <div className="max-md:pt-[5rem] px-4 w-full max-w-6xl mx-auto lg:pt-[10.5rem] 2xl:pt-[12rem]">
          <h1 className="text-[#C5A059] font-gv max-md:text-4xl text-center mb-8 max-md:mb-6 mr-4 lg:text-7xl 2xl:text-8xl">
            Корзина
          </h1>

          <div className="flex flex-col gap-6 max-md:gap-4">
            {items.map(item => {
              const unitPrice = item.discounted_price
                ? item.discounted_price / item.quantity
                : item.product.price
              const hasDiscount = item.discounted_price && item.discounted_price < item.product.price * item.quantity

              return (
                <div
                  key={item.id}
                  className="flex items-start md:items-center gap-6 max-md:gap-3 bg-[#1A1A1A] border border-[#C5A059]/30 rounded-xl p-6 max-md:p-4"
                >
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-24 h-24 max-md:w-16 max-md:h-16 object-cover rounded-lg hover:opacity-70 transition"
                    />
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link to={`/product/${item.product.id}`} className="block">
                      <h3
                        className="text-[#C5A059] font-gv text-4xl max-md:text-xl hover:text-[#dfb872] transition overflow-hidden whitespace-nowrap leading-tight"
                        style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}
                      >
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-gray-400 max-md:text-xs mt-1 max-md:mt-0">Размер: {item.size}</p>

                    <div className="mt-2 max-md:mt-3">
                      {hasDiscount ? (
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <span className="text-white font-sf text-lg max-md:text-sm">
                            {formatPrice(unitPrice)} ₽ / шт
                          </span>
                          <span className="text-gray-400 line-through text-sm max-md:text-xs">
                            {formatPrice(item.product.price)} ₽
                          </span>
                          <span className="text-red-400 text-xs font-semibold ml-1">
                            Скидка
                          </span>
                        </div>
                      ) : (
                        <span className="text-white font-sf text-lg max-md:text-sm">
                          {formatPrice(unitPrice)} ₽ / шт
                        </span>
                      )}
                    </div>

                    <div className="flex md:hidden items-center justify-between mt-3 max-md:mt-2">
                      <div className="flex items-center gap-2 max-md:gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 max-md:px-2 max-md:py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full max-md:text-[0.7rem]"
                        >
                          −
                        </button>
                        <span className="text-white w-8 text-center max-md:w-6 max-md:text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 max-md:px-2 max-md:py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full max-md:text-[0.7rem]"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center gap-3 ml-auto">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 border border-[#C5A059] text-[#C5A059] rounded-full"
                      >
                        −
                      </button>
                      <span className="text-white w-8 text-center text-lg">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 border border-[#C5A059] text-[#C5A059] rounded-full"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-400 hover:text-red-300 mr-4 ml-4"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 max-md:mt-6 text-right">
            <p className="text-white text-3xl max-md:text-lg font-sf">
              Итого: {formatPrice(totalPrice)} ₽
            </p>
            <button
              onClick={handleOpenCheckout}
              className="mt-5 max-md:mt-3 bg-[#8B1E1E] text-[#f0d29a] px-[6rem] max-md:px-16 py-1 rounded-full font-sf text-xl max-md:text-sm hover:bg-[#C5A059] hover:text-[#8B1E1E] transition"
            >
              Перейти к оплате
            </button>
          </div>

          {renderOrderHistory()}
        </div>
      </section>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={modalType === 'success' ? undefined : closeModal}
          >
            <motion.div
              className="bg-[#1A1A1A] border border-[#C5A059]/40 rounded-2xl p-6 w-full max-w-md relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={e => e.stopPropagation()}
            >
              {modalType === 'checkout' ? (
                <>
                  <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                  <h2 className="text-[#C5A059] font-gv text-3xl mb-4">Оформление заказа</h2>
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div>
                      <label className="text-white font-sf block mb-1">Адрес доставки</label>
                      <input
                        type="text"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        placeholder="Город, улица, дом, квартира"
                        className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white font-sf"
                      />
                    </div>
                    <div>
                      <label className="text-white font-sf block mb-1">Способ оплаты</label>
                      <select
                        value={paymentMethod}
                        onChange={e => setPaymentMethod(e.target.value)}
                        className="w-full bg-[#0A0A0A] border border-[#C5A059]/30 rounded-xl p-3 text-white font-sf"
                      >
                        <option value="card">Банковская карта</option>
                        <option value="sbp">СБП</option>
                        <option value="yoomoney">ЮMoney</option>
                        <option value="sberpay">SberPay</option>
                        <option value="tinkoff">Tinkoff Pay</option>
                      </select>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white font-sf text-lg">
                        Итого: {formatPrice(totalPrice)} ₽
                      </span>
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-[#8B1E1E] text-[#f0d29a] py-2 rounded-full font-sf text-lg hover:bg-[#C5A059] hover:text-[#8B1E1E] transition disabled:opacity-50"
                    >
                      {submitting ? 'Оформление...' : 'Подтвердить заказ'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center">
                  <h2 className="text-[#C5A059] font-gv text-3xl mb-4">Заказ принят</h2>
                  {orderResult && (
                    <div className="text-left space-y-2 text-gray-300 font-sf">
                      <p><span className="text-white">Адрес:</span> {orderResult.address}</p>
                      <p>
                        <span className="text-white">Оплата:</span>{' '}
                        {paymentLabels[orderResult.payment_method] || orderResult.payment_method}
                      </p>
                      <p className="text-white font-semibold mt-4">Товары:</p>
                      <ul className="list-disc list-inside">
                        {orderResult.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} — {item.quantity} шт. ({item.size}) — {formatPrice(item.price)} ₽/шт
                          </li>
                        ))}
                      </ul>
                      <p className="text-white font-bold mt-4">
                        Итого: {formatPrice(orderResult.total_price)} ₽
                      </p>
                    </div>
                  )}
                  <button
                    onClick={closeModal}
                    className="mt-6 bg-[#C5A059] text-black px-6 py-2 rounded-full font-sf hover:bg-[#dfb872] transition"
                  >
                    Вернуться в корзину
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CartPage