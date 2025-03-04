import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext';
// import "bootstrap/dist/css/bootstrap.min.css";
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
// import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css'; 
import AppRoutes from './Routes/AppRoutes';
import { AuthProvider } from './Context/AuthContext';



function App() {
  return (
    <Router>
      <CartProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </CartProvider>
    </Router>
  );
}

export default App;
