import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from './Context/CartContext';
import { UserProvider } from './Context/UserContext';
import AppRoutes from './Routes/AppRoutes';



function App() {
  return (
    <UserProvider>
      <CartProvider>
        <Router>  
          <AppRoutes />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
