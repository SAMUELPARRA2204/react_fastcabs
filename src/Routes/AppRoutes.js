import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import Alimentos from '../Components/Alimentos';
import Congelados from '../Components/Congelados';
import Limpieza_Hogar from '../Components/Limpieza_Hogar';
import Aseo_Personal from '../Components/Aseo_Personal';
import Mascotas from '../Components/Mascotas';
import Frutas_Verduras from '../Components/Frutas_Verduras';

const AppRoutes = () => {
  return (
    <Routes>
        {/* RUTAS PRNCIPALES */}
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />

        {/* RUTAS SUPERMERCADO */}
        <Route path='/Alimentos' element={<Alimentos />} />
        <Route path='/Congelados' element={<Congelados />} />
        <Route path='/Limpieza_Hogar' element={<Limpieza_Hogar />} />
        <Route path='/Aseo_Personal' element={<Aseo_Personal />} />
        <Route path='/Mascotas' element={<Mascotas />} />
        <Route path='/Frutas_Verduras' element={<Frutas_Verduras />} />
        
        {/* RUTAS DEL DASHBOARD */}
        <Route path='/Dashboard' element={<Dashboard />}>
            <Route path='Inicio' element={<Alimentos />} />
            <Route path='Proveedor' element={<Congelados />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes;