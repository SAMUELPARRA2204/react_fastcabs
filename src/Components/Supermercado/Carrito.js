import React, { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useCart } from '../../Context/CartContext';
import { useAuth } from '../../Context/AuthContext';
import Swal from 'sweetalert2';

const Carrito = () => {

    const { cart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity, clearCart} = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const toggleOffCanvas = () => setShowOffCanvas(!showOffCanvas);

    const calculateSubtotal = () => {
        const subTotal = cart.reduce((total, item) => {
            const price = item.price;
            const quantity = item.quantity;
            if (!isNaN(price) && typeof quantity === "number") {
                return total + (price * quantity);
            } else {
                console.error("Error: El precio o la cantidad no son números válidos.");
                return total;
            }
        }, 0);

        return subTotal;
    };

    const calculateTotal = (subtotal) => {
        return subtotal * 1.19;
    };

    const subTotal = calculateSubtotal();
    const total = calculateTotal(subTotal);

    const handleCheckout = () => {
        if(user){
            navigate('/Cliente');
        } else {
            localStorage.setItem('cartData', JSON.stringify(cart));
            console.log(localStorage);
            Swal.fire({
                icon: 'warning',
                title: '¡Debes iniciar sesión!',
                text: 'Para confirmir el pedido, debes iniciar sesion',
                confirmButtonText: 'Iniciar sesión',
                confirmButtonColor: '#c7a17a',
                allowOutsideClick: false,
            }).then(() =>{
                navigate('/login')
            });
        }
    }

    return (
        <div className="container-user">
            <Link to="/login" target="_parent" rel="noopener noreferrer">
                <i className="fa-solid fa-user"></i>
            </Link>
            <i
                className="fa-solid fa-basket-shopping"
                onClick={toggleOffCanvas}
            ></i>
            <div
                className={`offcanvas offcanvas-end ${showOffCanvas ? 'show' : ''}`}
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
                        onClick={toggleOffCanvas}
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
                                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                                    <span>{item.name} - {item.price.toLocaleString()}</span>

                                    <div className="quantity-container">
                                        <button onClick={() => handleDecreaseQuantity(item.name)}>-</button>
                                        <span>Cantidad: {item.quantity}</span>
                                        <button onClick={() => handleIncreaseQuantity(item.name)}>+</button>
                                        <button onClick={() => handleRemoveFromCart(item.name)}>Eliminar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="cart-summary">
                        <p>Subtotal: ${subTotal.toLocaleString()}</p>
                        <p>Total: ${total.toLocaleString()}</p>
                        <button id="checkout-btn" onClick={handleCheckout}>Confirmar Pedido</button>
                    </div>
                    <button className='btn btn-danger' onClick={clearCart}>Vaciar Carrito</button>  
                </div>
            </div>

            <div className="content-shopping-cart">
                <span className="text">Compras</span>
                <span className="number">({cart.length})</span>
            </div>
        </div>
    )
}

export default Carrito