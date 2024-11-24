
import React from 'react';
import { IoPersonOutline, IoHomeOutline, IoGridOutline, IoCartOutline, IoBagHandleOutline, IoPeopleOutline, IoLogOutOutline } from 'react-icons/io5';

const Navigation = ({ rol }) => {

  return (
    <nav className="navigation">
      <ul>
        <li>
          <a href="#">
            <span className="title">fastcabs</span>
          </a>
        </li>
        <li>
          <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/perfil.php">
            <span className="icon">
              <IoPersonOutline />
            </span>
            <span className="title">Mi perfil</span>
          </a>
        </li>
        {rol === 1 && (
          <>
            <li>
              <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/inicio.php">
                <span className="icon">
                  <IoHomeOutline />
                </span>
                <span className="title">Inicio</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/proveedor.php">
                <span className="icon">
                  <IoGridOutline />
                </span>
                <span className="title">Proveedor</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/producto.php">
                <span className="icon">
                  <IoCartOutline />
                </span>
                <span className="title">Productos</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/pedido.php">
                <span className="icon">
                  <IoBagHandleOutline />
                </span>
                <span className="title">Pedidos</span>
              </a>
            </li>
            <li>
              <a href="#" className="nav_link" data-url="layouts/contenidoDashboard/usuario.php">
                <span className="icon">
                  <IoPeopleOutline />
                </span>
                <span className="title">Usuarios</span>
              </a>
            </li>
          </>
        )}
        {rol === 2 && (
          <li>
            <a href="#">
              <span className="icon">
                <IoBagHandleOutline />
              </span>
              <span className="title">Pedidos</span>
            </a>
          </li>
        )}
        <li>
          <a href="../controller/UserController/logout.php">
            <span className="icon">
              <IoLogOutOutline />
            </span>
            <span className="title">Salir</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
