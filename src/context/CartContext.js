import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (title, price, imgSrc) => {
    console.log('Producto agregado al carrito:', { title, price, imgSrc });  // Esto muestra el producto que se está agregando  
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.name === title);
      if (existingItem) {
        // Si el artículo ya existe en el carrito, aumenta su cantidad
        return prevCart.map(item =>
          item.name === title ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si el artículo no existe, lo agrega al carrito
        return [...prevCart, { name: title, price, image: imgSrc, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (title) => {
    setCart(prevCart => prevCart.filter(item => item.name !== title));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, handleAddToCart, handleRemoveFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
