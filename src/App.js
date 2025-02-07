import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; 
import { CartProvider } from './Context/CartContext';
import { UserProvider } from './Context/UserContext';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
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
