import React from 'react';
import { useCart } from '../../../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as regularEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping, faStar, faCodeCompare } from '@fortawesome/free-solid-svg-icons';

const ProductoCard = ({ product }) => {
    const { handleAddToCart } = useCart();

    const handleAddToCartClick = () => {
        handleAddToCart(
            product.nombre,
            product.valorVenta,
            product.fotoUrl
        );
    };
    return (
        <div className="card-product">
            <div className="container-img">
                <img src={product.fotoUrl} alt={product.descripcion} />
                {/* {product.discount && <span className="discount">{product.discount}</span>} */}
                <div className="button-group">
                    <span> <FontAwesomeIcon icon={regularEye} /> </span>
                    <span> <FontAwesomeIcon icon={regularHeart} /> </span>
                    <span> <FontAwesomeIcon icon={faCodeCompare} /> </span>
                </div>
            </div>
            <div className="content-card-product">
                {/* <div className="stars">
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon key={index} icon={index < product.stars ? faStar : regularHeart} />
                    ))}
                </div> */}
                <h3>{product.descripcion}</h3>
                <span className="add-cart" onClick={handleAddToCartClick}>
                    <FontAwesomeIcon icon={faBasketShopping} />
                </span>
                <p className="price">
                    {product.valorVenta} {product.oldPrice && <span>{product.oldPrice}</span>}
                </p>
            </div>
        </div>
    )
}

export default ProductoCard