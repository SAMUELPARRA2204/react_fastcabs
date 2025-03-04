import React from 'react'
import style from '../../assets/style/DashboardCliente.module.css'
import { useAuth } from '../../Context/AuthContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Nav = ({ setSection }) => {
  const { logOut } = useAuth();
  
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Cerrar sesión',
      text: '¿Estás seguro de que quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        logOut();
      }
    });
  };

  return (
    <nav className={style.navCliente}>
      <ul>
        <li>
          <button onClick={() => setSection('Miperfil')}>Mi perfil</button>
        </li>
        <li>
          <button onClick={() => setSection('ResumenPedido')}>Resumen Pedido</button>
        </li>
        <li>
          <button onClick={handleLogout}>Cerrar sesion</button>
        </li>
      </ul>
    </nav>

  )
}

export default Nav
