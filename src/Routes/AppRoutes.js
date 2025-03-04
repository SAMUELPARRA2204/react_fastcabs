<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from 'react';
import { Navigate, Route,Routes } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';
import Supermercado from '../Pages/Supermercado';
import Index from '../Components/Supermercado/layouts/Index';
import Alimentos from '../Components/Supermercado/layouts/Alimentos';
import Congelados from '../Components/Supermercado/layouts/Categorias/Congelados';
import AseoHogar from '../Components/Supermercado/layouts/Categorias/AseoHogar';
import AseoPersonal from '../Components/Supermercado/layouts/Categorias/AseoPersonal';
import FrutasVerduras from '../Components/Supermercado/layouts/Categorias/FrutasVerduras';
import Mascotas from '../Components/Supermercado/layouts/Categorias/Mascotas';
import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
import Inicio from '../Components/Dashboard/layouts/Inicio';
import Proveedor from '../Components/Dashboard/layouts/Proveedor';
import Productos from '../Components/Dashboard/layouts/Productos';
import Pedidos from '../Components/Dashboard/layouts/Pedidos';
import Usuarios from '../Components/Dashboard/layouts/Usuarios';
<<<<<<< HEAD
=======
import DashboardCliente from '../Pages/DashboardCliente';



const ProtectedRoute = ({children}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesion expirada',
        text: 'Debes iniciar sesion para acceder a esta página.',
        showConfirmButton: true,
      }).then(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
   },[user]);

   if(loading){
    return <p>Cargando ...</p>;
   }
   if(!user){
    return <Navigate to="/login" />
   }  
  return children
};
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

const AppRoutes = () => {
  return (
    <Routes>
<<<<<<< HEAD
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
=======
      {/* RUTAS PRNCIPALES */}

      {/* RUTAS SUPERMERCADO */}
      <Route path='/' element={ <Supermercado /> } >
        <Route index element={<Index />} />
        <Route path='/Alimentos' element={<Alimentos />} />
        {/* <Route path='/Bebidas' element={<Alimentos />} /> */}
        <Route path='/Congelados' element={<Congelados />} />
        <Route path='/AseoHogar' element={<AseoHogar />} />
        <Route path='/AseoPersonal' element={<AseoPersonal />} />
        <Route path='/FrutasVerduras' element={<FrutasVerduras />} />
        <Route path='/Mascotas' element={<Mascotas />} />
      </Route>

      {/* LOGIN */}
      <Route path='/login' element={<Login />} />

      {/* RUTAS DEL DASHBOARD */}
      <Route path='/Dashboard' element={ <ProtectedRoute> <Dashboard/> </ProtectedRoute>} >
        <Route index element={<Inicio />} />
        <Route path='Inicio' element={<Inicio />} />
        <Route path='Proveedor' element={<Proveedor />} />
        <Route path='Producto' element={<Productos />} />
        <Route path='Pedido' element={<Pedidos />} />
        <Route path='Usuario' element={<Usuarios />} />
      </Route>

      {/* RUTAS DEL DASHBOARD CLIENTE*/}
      <Route path='/Cliente' element={<ProtectedRoute> <DashboardCliente/> </ProtectedRoute>} />
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    </Routes>
  )
}

export default AppRoutes;