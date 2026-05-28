import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const loadCart = useCallback(async () => {
    if (!token) {
      setItems([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/cart/`, {
        headers: { 'Authorization': `Token ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        const itemsWithDiscount = (data.items || []).map(item => ({
          ...item,
          discounted_price: item.discounted_price ?? (item.product.price * item.quantity)
        }));
        setItems(itemsWithDiscount);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error('Ошибка загрузки корзины:', err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const handleTokenChange = () => {
      const newToken = localStorage.getItem('token');
      setToken(newToken);
    };
    window.addEventListener('token-changed', handleTokenChange);
    return () => window.removeEventListener('token-changed', handleTokenChange);
  }, []);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = async (product, size) => {
    const currentToken = localStorage.getItem('token');
    if (!currentToken) {
      if (window.confirm('Войдите или зарегистрируйтесь, чтобы добавить товар в корзину')) {
        navigate(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      }
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/cart/add/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${currentToken}`
        },
        body: JSON.stringify({ product_id: product.id, size, quantity: 1 })
      });
      if (res.ok) {
        const updatedItem = await res.json();
        const itemWithDiscount = {
          ...updatedItem,
          discounted_price: updatedItem.discounted_price ?? (updatedItem.product.price * updatedItem.quantity)
        };
        setItems(prev => {
          const existing = prev.find(item => item.product.id === product.id && item.size === size);
          if (existing) {
            return prev.map(item =>
              item.product.id === product.id && item.size === size ? itemWithDiscount : item
            );
          }
          return [...prev, itemWithDiscount];
        });
        showNotification('Добавлено в корзину');
      } else {
        const error = await res.json();
        showNotification(error.error || 'Ошибка');
      }
    } catch (err) {
      showNotification('Ошибка сети');
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    const currentToken = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/cart/update/${itemId}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${currentToken}`
        },
        body: JSON.stringify({ quantity })
      });
      if (res.status === 204) {
        setItems(prev => prev.filter(item => item.id !== itemId));
      } else if (res.ok) {
        const updatedItem = await res.json();
        const itemWithDiscount = {
          ...updatedItem,
          discounted_price: updatedItem.discounted_price ?? (updatedItem.product.price * updatedItem.quantity)
        };
        setItems(prev => prev.map(item => item.id === itemId ? itemWithDiscount : item));
      }
    } catch (err) {
      console.error('Ошибка обновления корзины:', err);
    }
  };

  const removeFromCart = async (itemId) => {
    const currentToken = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_URL}/api/cart/remove/${itemId}/`, {
        method: 'DELETE',
        headers: { 'Authorization': `Token ${currentToken}` }
      });
      if (res.ok) {
        setItems(prev => prev.filter(item => item.id !== itemId));
      }
    } catch (err) {
      console.error('Ошибка удаления:', err);
    }
  };

  const clearCart = async () => {
    const currentToken = localStorage.getItem('token');
    setItems([]);
    if (currentToken) {
      try {
        await fetch(`${API_URL}/api/cart/clear/`, {
          method: 'DELETE',
          headers: { 'Authorization': `Token ${currentToken}` }
        });
      } catch (err) {
        console.error('Ошибка очистки корзины на сервере:', err);
      }
    }
  };

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const itemTotal = item.discounted_price ?? (item.product.price * item.quantity);
      return total + itemTotal;
    }, 0);
  };

  const getCartItem = (productId, size) =>
    items.find(item => item.product.id === productId && item.size === size) || null;

  const value = {
    items,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
    notification,
    getCartItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};