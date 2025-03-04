import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className="container-navbar">
            <nav className="navbar container">
                <i className="fa-solid fa-bars"></i>
                <ul className="menu">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/Alimentos">Alimentos</Link>
                    </li>
                    <li>
                        <Link to="/Congelados">Congelados</Link>
                    </li>
                    <li>
                        <Link to="/AseoHogar">Aseo Hogar</Link>
                    </li>
                    <li>
                        <Link to="/AseoPersonal">Aseo Personal</Link>
                    </li>
                    <li>
                        <Link to="/FrutasVerduras">Frutas y verduras</Link>
                    </li>
                    <li>
                        <Link to="/Mascotas">Mascotas</Link>
                    </li>
                </ul>
                {/* BARRA DE BUSQUEDA */}
                <div className="search-form">
                    <input type="search" placeholder="Buscar..." />
                    <button className="btn-search">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
            </nav>
        </div>
    )
}

export default Nav
