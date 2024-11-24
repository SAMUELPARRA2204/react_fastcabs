import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Login from './pages/Login';


// import Dashboard from './Components/Dashboard';
import Alimentos from './Components/Alimentos';
import Congelados from './Components/Congelados';
import Limpieza_Hogar from './Components/Limpieza_Hogar';
import Aseo_Personal from './Components/Aseo_Personal';
import Mascotas from './Components/Mascotas';
import Frutas_Verduras from './Components/Frutas_Verduras';



function App() {
  return (
    <CartProvider>
      <Router>  
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/Dashboard' element={<Dashboard />} /> */}
          <Route path='/Alimentos' element={<Alimentos />} />
          <Route path='/Congelados' element={<Congelados />} />
          <Route path='/Limpieza_Hogar' element={<Limpieza_Hogar />} />
          <Route path='/Aseo_Personal' element={<Aseo_Personal />} />
          <Route path='/Mascotas' element={<Mascotas />} />
          <Route path='/Frutas_Verduras' element={<Frutas_Verduras />} />
        </Routes>
      </Router>
    </CartProvider>
    
  );
}

export default App;
