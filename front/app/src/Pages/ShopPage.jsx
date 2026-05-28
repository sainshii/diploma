import React, { useEffect, useState, useMemo } from 'react';
import { useScrollOnMount } from '../hooks/useScrollOnMount';
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/formatPrice';
import { Helmet } from 'react-helmet-async';
import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./Header'));

const Footer = lazy(() => import('./Footer'));

const ShopPage = () => {

  useScrollOnMount();

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [popular, setPopular] = useState([])
  const [discountedProducts, setDiscountedProducts] = useState([])
  const [activePromotionName, setActivePromotionName] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [expandedCategory, setExpandedCategory] = useState(null)
  const { notification, addToCart, getCartItem, updateQuantity } = useCart()

  // Новые состояния для сортировки и фильтрации
  const [sortOrder, setSortOrder] = useState('default'); // 'default', 'price-asc', 'price-desc'
  const [selectedSizes, setSelectedSizes] = useState([]); // пустой массив = все размеры

  const fetchProducts = (cat) => {
    let url = 'http://127.0.0.1:8000/api/products/'
    if (cat !== 'all') url += `?category=${cat}`
    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Не удалось загрузить товары:', err)
        setProducts([])
      })
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Не удалось загрузить категории:', err)
        setCategories([])
      })

    fetch('http://127.0.0.1:8000/api/products/?popular=true')
      .then(res => res.json())
      .then(data => setPopular(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Не удалось загрузить популярные товары:', err)
        setPopular([])
      })

    fetch('http://127.0.0.1:8000/api/products/?discounted=true')
      .then(res => res.json())
      .then(data => setDiscountedProducts(Array.isArray(data) ? data : []))
      .catch(err => {
        console.error('Не удалось загрузить товары со скидкой:', err)
        setDiscountedProducts([])
      })

    // Запрос на получение названия активной акции
    fetch('http://127.0.0.1:8000/api/active-promotion/')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('Нет активной акции')
      })
      .then(data => setActivePromotionName(data.name))
      .catch(() => setActivePromotionName(null))

    fetchProducts('all')
  }, [])

  // Компонент карточки товара
  const ProductCard = ({ product }) => {
    const defaultSize = product.sizes?.[0]?.name || 'универсальный'
    const cartItem = getCartItem(product.id, defaultSize)
    const isInCart = !!cartItem

    const hasDiscount = product.discounted_price && product.discounted_price < product.price
    const discountPercent = hasDiscount
      ? Math.round((1 - product.discounted_price / product.price) * 100)
      : 0

    const handleAdd = (e) => {
      e.preventDefault()
      addToCart(product, defaultSize)
    }

    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-[#1A1A1A] border border-[#C5A059]/30 rounded-2xl hover:border-[#C5A059] overflow-hidden hover:scale-105 transition duration-500 relative h-full flex flex-col group select-none"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-sm font-bold font-sf px-3 py-1 rounded-full shadow-lg">
            -{discountPercent}%
          </div>
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-500 group-hover:scale-110
            h-48 max-md:h-40 lg:h-40 2xl:h-48`}
        />
        <div className="p-4 max-md:p-3 lg:p-3 2xl:p-4">
          <h3
            className="text-[#C5A059] font-gv text-[1.7rem] max-md:text-xl overflow-hidden whitespace-nowrap pt-[1rem]
            lg:text-2xl
            2xl:text-[1.9rem]"
            style={{ maskImage: 'linear-gradient(to right, black 80%, transparent 100%)' }}
          >
            {product.name}
          </h3>
          <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
            <div className="flex items-baseline gap-2 flex-wrap">
              {hasDiscount ? (
                <>
                  <span className="text-gray-400 line-through text-sm max-md:text-xs">
                    {formatPrice(product.price)} ₽
                  </span>
                  <span className="text-[#C5A059] font-bold text-lg max-md:text-base">
                    {formatPrice(product.discounted_price)} ₽
                  </span>
                </>
              ) : (
                <span className="text-white text-lg max-md:text-base">
                  {formatPrice(product.price)} ₽
                </span>
              )}
            </div>
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1 text-sm max-md:text-xs">★</span>
              <span className="text-gray-400 text-sm max-md:text-xs lg:text-xs 2xl:text-sm">
                {product.rating}
              </span>
            </div>
          </div>
          <div className="mt-4 max-md:mt-3" onClick={(e) => e.preventDefault()}>
            {isInCart ? (
              <div className="flex items-center justify-between">
                <span className="text-[#C5A059]/70 text-sm max-md:text-[0.7rem] lg:text-xs 2xl:text-sm">
                  Добавлено
                </span>
                <div className="flex items-center gap-2 max-md:gap-[0.3rem]">
                  <button
                    onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                    className="px-2 py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full text-sm max-md:text-[0.7rem] lg:text-xs 2xl:text-sm"
                  >
                    −
                  </button>
                  <span className="text-white text-lg max-md:text-xs lg:text-base 2xl:text-lg">
                    {cartItem.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                    className="px-2 py-0.5 border border-[#C5A059] text-[#C5A059] rounded-full text-sm max-md:text-[0.7rem] lg:text-xs 2xl:text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="w-full py-2 max-md:py-0 bg-[#8B1E1E] text-[#f0d29a] rounded-full font-sf text-lg max-md:text-[0.7rem] hover:bg-[#C5A059] hover:text-[#8B1E1E] transition lg:py-1.5 lg:text-base 2xl:py-2 2xl:text-lg"
              >
                Добавить в корзину
              </button>
            )}
          </div>
        </div>
      </Link>
    )
  }

  const handleCategoryClick = (cat) => {
    if (cat.subcategories && cat.subcategories.length > 0) {
      setExpandedCategory(expandedCategory === cat.slug ? null : cat.slug)
      return
    }
    setActiveCategory(cat.slug)
    fetchProducts(cat.slug)
    setExpandedCategory(null)
  }

  const handleSubcategoryClick = (slug) => {
    setActiveCategory(slug)
    fetchProducts(slug)
  }

  // Сбор уникальных размеров из загруженных продуктов
  const availableSizes = useMemo(() => {
    const sizes = new Set();
    products.forEach(p => {
      p.sizes?.forEach(s => sizes.add(s.name))
    });
    return Array.from(sizes).sort();
  }, [products]);

  // Применяем фильтрацию по размерам и сортировку по цене
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Фильтр по размерам
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes?.some(size => selectedSizes.includes(size.name))
      );
    }

    // Сортировка по цене (используем discounted_price при наличии)
    if (sortOrder === 'price-asc') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.discounted_price && a.discounted_price < a.price ? a.discounted_price : a.price;
        const priceB = b.discounted_price && b.discounted_price < b.price ? b.discounted_price : b.price;
        return priceA - priceB;
      });
    } else if (sortOrder === 'price-desc') {
      filtered = [...filtered].sort((a, b) => {
        const priceA = a.discounted_price && a.discounted_price < a.price ? a.discounted_price : a.price;
        const priceB = b.discounted_price && b.discounted_price < b.price ? b.discounted_price : b.price;
        return priceB - priceA;
      });
    }

    return filtered;
  }, [products, selectedSizes, sortOrder]);

  return (
    <div className="w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center lg:pt-[1.3rem] 2xl:pt-[2rem]">
      <Helmet>
        <title>Каталог масок и костюмов – Баута</title>
        <meta name="description" content="Все товары магазина Баута: маски, костюмы, аксессуары и многое другое. Удобный выбор по категориям, быстрая доставка." />
      </Helmet>

      <section className="relative w-full mx-auto lg:max-w-[1400px] 2xl:max-w-[1770px]">
        <div className="absolute left-0 w-full z-30 p-4 lg:top-2 2xl:top-3 max-md:top-2 max-md:p-2">
          <div className="ml-[1.5rem] max-md:ml-0">
            <Suspense fallback={null}>
            	<Header />
            </Suspense>
          </div>
        </div>

        <div className="pt-[12rem] max-md:pt-[5rem] px-4 lg:pt-[10rem] 2xl:pt-[12rem]">
          {/* Раздел "Скидки" с динамическим названием */}
          <section className="mb-16 max-md:mb-10 lg:mb-12 2xl:mb-16">
            <h1 className="text-[#C5A059] font-gv mb-8 max-md:mb-2 text-center drop-shadow-lg text-5xl md:text-7xl max-md:text-4xl lg:text-6xl lg:mb-6 2xl:text-7xl 2xl:mb-8">
              {activePromotionName || 'Скидки'}
            </h1>
            <div className="flex overflow-x-auto justify-start lg:justify-center gap-6 max-md:gap-4 pb-4 py-4">
              {discountedProducts.length > 0 ? (
                discountedProducts.map(product => (
                  <div
                    key={product.id}
                    className="h-full p-3 max-md:p-2 w-[350px] max-md:min-w-[180px] lg:min-w-[200px] lg:p-2 2xl:min-w-[250px] 2xl:p-3"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center w-full">Нет товаров со скидкой</p>
              )}
            </div>
          </section>

          {/* Популярные товары с центрированием */}
          <section className="mb-16 max-md:mb-10 lg:mb-12 2xl:mb-16">
            <h1 className="text-[#C5A059] font-gv mb-8 max-md:mb-2 text-center drop-shadow-lg text-5xl md:text-7xl max-md:text-4xl lg:text-6xl lg:mb-6 2xl:text-7xl 2xl:mb-8">
              Популярные товары
            </h1>
            <div className="flex overflow-x-auto justify-start lg:justify-center gap-6 max-md:gap-4 pb-4 py-4">
              {popular.length > 0 ? (
                popular.map(product => (
                  <div
                    key={product.id}
                    className="h-full p-3 max-md:p-2 w-[350px] max-md:min-w-[180px] lg:min-w-[200px] lg:p-2 2xl:min-w-[250px] 2xl:p-3"
                  >
                    <ProductCard product={product} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center w-full">Нет популярных товаров</p>
              )}
            </div>
          </section>

          {/* Категории с плавным выдвижением подкатегорий */}
          <div className="flex items-start gap-4 max-md:gap-2 mb-8 pb-2 overflow-x-auto lg:gap-3 2xl:gap-4">
            <button
              onClick={() => {
                setActiveCategory('all')
                fetchProducts('all')
                setExpandedCategory(null)
              }}
              className={`px-6 py-2 max-md:px-4 max-md:py-1.5 rounded-full font-sf text-sm max-md:text-xs whitespace-nowrap transition-all duration-300 lg:px-4 lg:py-1.5 lg:text-sm 2xl:px-6 2xl:py-2 2xl:text-sm ${
                activeCategory === 'all'
                  ? 'bg-[#C5A059] text-black'
                  : 'border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black'
              }`}
            >
              Все товары
            </button>

            {categories.map(cat => (
              <React.Fragment key={cat.id}>
                <button
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-6 py-2 max-md:px-4 max-md:py-1.5 rounded-full font-sf text-sm max-md:text-xs whitespace-nowrap transition-all duration-300 lg:px-4 lg:py-1.5 lg:text-sm 2xl:px-6 2xl:py-2 2xl:text-sm ${
                    (cat.subcategories?.length > 0 && expandedCategory === cat.slug) ||
                    (cat.subcategories?.length === 0 && activeCategory === cat.slug)
                      ? 'bg-[#C5A059] text-black'
                      : 'border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059] hover:text-black'
                  }`}
                >
                  {cat.name}
                </button>

                <AnimatePresence initial={false}>
                  {expandedCategory === cat.slug && (
                    <motion.div
                      key="sub-wrapper"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      className="overflow-visible"
                      style={{ overflow: 'visible' }}
                    >
                      <motion.div
                        key="sub-slide"
                        initial={{ x: '-20%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-20%', opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut', delay: 0.05 }}
                        className="flex gap-4 max-md:gap-2 whitespace-nowrap"
                      >
                        {cat.subcategories?.map(sub => (
                          <button
                            key={sub.id}
                            onClick={() => handleSubcategoryClick(sub.slug)}
                            className={`px-6 py-2 max-md:px-4 max-md:py-1.5 rounded-full font-sf text-sm max-md:text-xs whitespace-nowrap transition-all duration-300 lg:px-4 lg:py-1.5 lg:text-sm 2xl:px-6 2xl:py-2 2xl:text-sm ${
                              activeCategory === sub.slug && expandedCategory === cat.slug
                                ? 'bg-[#C5A059] text-black'
                                : 'border border-[#C5A059]/50 text-[#C5A059]/70 hover:bg-[#C5A059] hover:text-black hover:border-[#C5A059]'
                            }`}
                          >
                            {sub.name}
                          </button>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}
          </div>

          {/* ========== СОРТИРОВКА И ФИЛЬТР ПО РАЗМЕРАМ ========== */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* Сортировка по цене */}
            <div className="flex items-center gap-2">
              <span className="text-[#C5A059] font-sf text-sm">Сортировка:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-[#1A1A1A] border border-[#C5A059]/30 rounded-full px-4 py-2 text-white font-sf text-sm outline-none focus:border-[#C5A059]"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Цена: по возрастанию</option>
                <option value="price-desc">Цена: по убыванию</option>
              </select>
            </div>

            {/* Фильтр по размерам */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[#C5A059] font-sf text-sm">Размер:</span>
              {availableSizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSizes(prev =>
                    prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
                  )}
                  className={`px-3 py-1 rounded-full font-sf text-sm border transition duration-200 ${
                    selectedSizes.includes(size)
                      ? 'bg-[#C5A059] text-black border-[#C5A059]'
                      : 'border-[#C5A059]/50 text-[#C5A059] hover:bg-[#C5A059] hover:text-black'
                  }`}
                >
                  {size}
                </button>
              ))}
              {selectedSizes.length > 0 && (
                <button
                  onClick={() => setSelectedSizes([])}
                  className="px-3 py-1 rounded-full font-sf text-sm border border-red-500/50 text-red-400 hover:bg-[#8B1E1E] hover:text-white transition duration-200"
                >
                  Сбросить
                </button>
              )}
            </div>
          </div>

          {/* Сетка товаров */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-md:gap-4 lg:grid-cols-3 lg:gap-4 2xl:grid-cols-4 2xl:gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="text-gray-500 col-span-full text-center">Товары не найдены</p>
            )}
          </div>
        </div>
      </section>

      {notification && (
        <div className="fixed bottom-8 right-8 max-md:bottom-4 max-md:right-4 bg-[#8B1E1E] text-[#f0d29a] px-6 py-3 max-md:px-4 max-md:py-2 rounded-xl shadow-lg z-50 font-sf flex gap-4 items-center text-sm max-md:text-xs">
          <span>{notification}</span>
          <Link to="/cart" className="underline text-[#dfb872] hover:text-white">Перейти в корзину</Link>
        </div>
      )}

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  )
}

export default ShopPage