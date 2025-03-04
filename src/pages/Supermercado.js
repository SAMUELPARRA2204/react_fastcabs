import React from 'react';
import Super from '../Components/Supermercado/BaseSupermercado';
import '../assets/style/styleSupermercado.css';
import { Outlet } from 'react-router-dom';

const Supermercado = () => {
  return (
    <Super>
        <Outlet />
    </Super>
  )
}

export default Supermercado
