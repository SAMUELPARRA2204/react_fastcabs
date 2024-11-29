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
import Inicio from '../Components/Dashboard/layouts/Inicio';
import Proveedor from '../Components/Dashboard/layouts/Proveedor';
import Productos from '../Components/Dashboard/layouts/Productos';
import Pedidos from '../Components/Dashboard/layouts/Pedidos';
import Usuarios from '../Components/Dashboard/layouts/Usuarios';

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
            <Route index element={<Inicio />} />
            <Route path='Inicio' element={<Inicio />} />
            <Route path='Proveedor' element={<Proveedor />} />
            <Route path='Productos' element={<Productos />} />
            <Route path='Pedidos' element={<Pedidos />} />
            <Route path='Usuarios' element={<Usuarios />} />
        </Route>
    </Routes>
  )
}

export default AppRoutes;