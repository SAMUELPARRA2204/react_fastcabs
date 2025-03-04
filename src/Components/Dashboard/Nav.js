
import React from 'react';
import { IoPersonOutline, IoHomeOutline, IoGridOutline, IoCartOutline, IoBagHandleOutline, IoPeopleOutline, IoLogOutOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import style from '../../assets/style/Dashboard.module.css';
import { useAuth } from '../../Context/AuthContext';

const Navigation = ({ rol, nombre }) => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

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
        Swal.fire({
          title: 'Sesión cerrada',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#c7a17a',
          allowOutsideClick: false
        }).then(() => {
          navigate('/login');
        });
      }
    });
  };

  return (
    <nav className={style.navigation}>
      <ul>
        <li>
          <Link to="/Dashboard">
            <span className={style.title}>fastcabs</span>
          </Link>
        </li>
        <li>
          <Link to="/Dashboard" className={style.title}>
            <span className={style.icon}>
              <IoPersonOutline />
            </span>
            <span className={style.title}>Mi perfil</span>
          </Link>
        </li>
        {rol === 1 && (
          <>
            <li>
              <Link to="/Dashboard/Inicio" className={style.nav_link}>
                <span className={style.icon}>
                  <IoHomeOutline />
                </span>
                <span className={style.title}>Inicio</span>
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Proveedor" className={style.nav_link}>
                <span className={style.icon}>
                  <IoGridOutline />
                </span>
                <span className={style.title}>Proveedores</span>
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Producto" className={style.nav_link}>
                <span className={style.icon}>
                  <IoCartOutline />
                </span>
                <span className={style.title}>Productos</span>
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Pedido" className={style.nav_link}>
                <span className={style.icon}>
                  <IoBagHandleOutline />
                </span>
                <span className={style.title}>Pedidos</span>
              </Link>
            </li>
            <li>
              <Link to="/Dashboard/Usuario" className={style.nav_link}>
                <span className={style.icon}>
                  <IoPeopleOutline />
                </span>
                <span className={style.title}>Usuarios</span>
              </Link>
            </li>
          </>
        )}
        {rol === 2 && (
          <li>
            <Link to="/Dashboard/Pedido" className={style.nav_link}>
              <span className={style.icon}>
                <IoBagHandleOutline />
              </span>
              <span className={style.title}>Pedidos</span>
            </Link>
          </li>
        )}
        <li>
          <Link to="/login" onClick={handleLogout} className={style.nav_link}>
            <span className={style.icon}>
              <IoLogOutOutline />
            </span>
            <span className={style.title}>Salir</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;
