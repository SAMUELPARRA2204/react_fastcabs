import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Carrito from './Carrito';


const Header = () => {
  return (
    <header>
      <div className="container-hero">
        <div className="container hero">
          <div className="customer-support">
            <i className="fa-solid fa-headset"></i>
            <div className="content-customer-support">
              <span className="text">Soporte al cliente</span>
              <span className="number">123-456-7890</span>
            </div>
          </div>
          {/* CONTENEDOR LOGO */}
          <div className="container-logo">
            <i className="fa-solid fa-cart-plus"></i>
            <h1 className="logo">
              <Link to="/">
                Fastcabs
              </Link>
            </h1>
          </div>
          {/* CONTENEDOR CARRITO */}
          <Carrito />
        </div>
      </div>
      {/* BARRA DE NEVEGACION */}
      <Nav />
    </header >
  );
}

export default Header;