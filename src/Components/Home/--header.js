import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';



const Header = () => {

  const { cart, handleRemoveFromCart } = useCart();

  const calculateSubtotal = () => {
    console.log("Carrito de compras:", cart);  
    
    const subtotal = cart.reduce((total, item) => {
    
      console.log(`Valor original de price: "${item.price}", Tipo de price: ${typeof item.price}`);
      const price = item.price;  
      const quantity = item.quantity;
      
      if (!isNaN(price) && typeof quantity === "number") {
        return total + (price * quantity);
      } else {
        console.error("Error: El precio o la cantidad no son números válidos.");
        return total;  
      }
    }, 0);  
    
    return subtotal;  
  };
  
  const calculateTotal = (subtotal) => {
    return subtotal * 1.19; 
  };

  const subtotal = calculateSubtotal();
  const total = calculateTotal(subtotal);


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
              <a href="/">Fastcabs</a>
            </h1>
          </div>
          {/* CONTENEDOR CARRITO */}
          <div className="container-user">
            <Link to="/login" target="_parent" rel="noopener noreferrer">
              <i className="fa-solid fa-user"></i>
            </Link>
            <i
              className="fa-solid fa-basket-shopping"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRight"
              aria-controls="offcanvasRight"
            ></i>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasRightLabel">
                  Carrito de Compras
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                {/* productos agregados al carrito */}
                {cart.length === 0 ? (
                  <p>El carrito está vacío</p>
                ) : (
                  <ul id="cart-list">
                    {cart.map((item) => (
                      <li key={item.name}>
                        <img src={item.image} alt={item.name} style={{ width: '90px', height: '90px' }} />
                        <span>{item.name} - {item.price.toLocaleString()}</span>
                        <div className="quantity-container">
                          <span>Cantidad: {item.quantity}</span>
                          <button onClick={() => handleRemoveFromCart(item.name)}>Eliminar</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="cart-summary">
                  <p>Subtotal: ${subtotal.toLocaleString()}</p>
                  <p>Total: ${total.toLocaleString()}</p>
                  <button id="checkout-btn">Comprar</button>
                </div>
              </div>
            </div>
            <div className="content-shopping-cart">
              <span className="text">Compras</span>
              <span className="number">({cart.length})</span>
            </div>
          </div>
        </div>
      </div>
      {/* BARRA DE NEVEGACION */}
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
              <Link to="/Limpieza_Hogar">productos Limpieza</Link>
            </li>
            <li>
              <Link to="/Aseo_Personal">Aseo Personal</Link>
            </li>
            <li>
              <Link to="/Mascotas">Mascotas</Link>
            </li>
            <li>
              <Link to="/Frutas_Verduras">Frutas y verduras</Link>
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
    </header >
  );
}

export default Header;