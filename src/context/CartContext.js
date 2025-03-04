import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() =>{
    const savedCart = localStorage.getItem('cartData');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartData',JSON.stringify(cart));
  }, [cart]);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cartData');
  };

  const handleDecreaseQuantity = (title) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === title
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    )
  }

  const handleIncreaseQuantity = (title) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.name === title
          ? { ...item, quantity: item.quantity + 1}
          : item
      )
    )
  }

  const handleAddToCart = (title, price, imgSrc) => {
    console.log('Producto agregado al carrito:', { title, price, imgSrc });
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === title);
      if (existingItem) {
        return prevCart.map(item =>
          item.name === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { name: title, price, image: imgSrc, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (title) => {
    setCart(prevCart => prevCart.filter(item => item.name !== title));
  };


  return (
    <CartContext.Provider value={{ cart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, handleAddToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
