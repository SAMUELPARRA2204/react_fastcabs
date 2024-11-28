
import React from 'react';
import { IoPersonOutline, IoHomeOutline, IoGridOutline, IoCartOutline, IoBagHandleOutline, IoPeopleOutline, IoLogOutOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';

const Navigation =({ rol, nombre }) => {
  const { logoutUser } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    Swal.fire({
      title: 'Sesión Cerrada',
      text: 'Has cerrado sesión correctamente.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#c7a17a',
      allowOutsideClick: false
    }).then(() =>{
      navigate('/login');
    });
  };

  return (
    <nav className='navigation'>
      <ul>
        <li>
          <Link to="/Dashboard">
            <span className="title">fastcabs</span>
          </Link>
        </li>
        <li>  
          <Link to="/Dashboard" className="nav_link">
            <span className="icon">
              <IoPersonOutline />
            </span>
            <span className="title">Mi perfil</span>
          </Link>
        </li>
        {rol === 1 && (
          <>
          <li>
            <Link to="/Dashboard/Inicio" className="nav_link">
              <span className="icon">
                <IoHomeOutline />
              </span>
              <span className="title">Inicio</span>
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/Proveedor" className="nav_link">
              <span className="icon">
                <IoGridOutline />
              </span>
              <span className="title">Proveedor</span>
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/Productos" className="nav_link">
              <span className="icon">
                <IoCartOutline />
              </span>
              <span className="title">Productos</span>
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/Pedidos" className="nav_link">
              <span className="icon">
                <IoBagHandleOutline />
              </span>
              <span className="title">Pedidos</span>
            </Link>
          </li>
          <li>
            <Link to="/Dashboard/Usuarios" className="nav_link">
              <span className="icon">
                <IoPeopleOutline />
              </span>
              <span className="title">Usuarios</span>
            </Link>
          </li>
          </>
        )}
        {rol === 2 && (
          <li>
            <Link to="/Dashboard/Pedidos" className="nav_link">
              <span className="icon">
                <IoBagHandleOutline />
              </span>
              <span className="title">Pedidos</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/login" onClick={handleLogout} className="nav_link">
            <span className="icon">
              <IoLogOutOutline />
            </span>
            <span className="title">Salir</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;
