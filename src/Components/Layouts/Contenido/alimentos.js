import React, { useContext } from 'react';
import { useCart } from '../../../Context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as regularEye } from '@fortawesome/free-regular-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faBasketShopping, faStar, faCodeCompare } from '@fortawesome/free-solid-svg-icons';

const products = [
  {
    id: 1,
    image: 'img/productos/papas margarita natural x25gr.jpg',
    title: 'PAPAS MARGARITA NATURAL X10 UND',
    price: '21.990',
    oldPrice: '28.900',
    discount: '-13%',
    stars: '4',
  },
  {
    id: 2,
    image: 'img/productos/Rizadas papas fritas.jpg',
    title: 'RIZADAS PAPAS FRITAS 12 UND',
    price: '18.800',
    oldPrice: '25.300',
    discount: '-22%',
    stars: '3',
  },
  {
    id: 3,
    image: 'img/productos/Takis fuego 45g.jpg',
    title: 'TAKIS FUEGO 45G',
    price: '4000',
    stars: '5',
  },
  {
    id: 4,
    image: 'img/productos/Crispetas Maiz Caramelo POPETAS 44.4 gr.jpg',
    title: 'CRISPETAS MAIZ CARAMELO POPETAS 44.4 GR',
    price: '5.000',
    stars: '4',
  },
  {
    id: 5,
    image: 'img/productos/Six pack coca cola.jpg',
    title: 'SIX PACK COCA COLA',
    price: '20.990',
    oldPrice: '30.900',
    discount: '-15%',
    stars: '4',
  },
  {
    id: 6,
    image: 'img/productos/Six-Pack-Corona-355cc-1.jpg',
    title: 'SIX PACK CORONA CERVEZA',
    price: '25.800',
    oldPrice: '30.300',
    discount: '-10%',
    stars: '3',
  },
  {
    id: 7,
    image: 'img/productos/Del valle bebida naranja 1.5l.jpg',
    title: 'BEBIDA DEL VALLE NARANJA 1.5L',
    price: '10.500',
    stars: '5',
  },
  {
    id: 8,
    image: 'img/productos/jugo-hit-x-200.jpg',
    title: 'JUGOS HIT SIX PACK 200ML',
    price: '20.990',
    stars: '4',
  },
  {
    id: 9,
    image: 'img/productos/Arroz diana 500g.png',
    title: 'ARROZ DIANA 500G',
    price: '21.990',
    oldPrice: '30.900',
    discount: '-19%',
    stars: '4',
  },
  {
    id: 10,
    image: 'img/productos/lenteja-bolsa-1lb-comfandi.jpg',
    title: 'BOLSA DE LENTEJAS 1LB',
    price: '4.800',
    oldPrice: '7.300',
    discount: '-40%',
    stars: '4',
  },
  {
    id: 11,
    image: 'img/productos/Leche deslactosada colanta.png',
    title: 'LECHE DESLACTOSADA COLANTA BOLSA x6UND x1000ML',
    price: '29.800',
    stars: '5',
  },
  {
    id: 12,
    image: 'img/productos/frijol-el-trece-radical-bolsa-x460gr.jpg',
    title: 'FRIJOL EL TRECE RADICAL X460GR',
    price: '7.990',
    stars: '4',
  },
  {
    id: 13,
    image: 'img/productos/AZÚCAR-INCAUCA-MORENA-5KG.jpg',
    title: 'AZÚCAR INCAUCA MORENA 5KG',
    price: '4.990',
    oldPrice: '7.900',
    discount: '-55%',
    stars: '4',
  },
  {
    id: 14,
    image: 'img/productos/tomate-bolsa-1000g-fruco-cj-12-2.png',
    title: 'SALSA DE TOMATE FRUCO 1000G',
    price: '4.500',
    oldPrice: '8.500',
    discount: '-50%',
    stars: '4',
  },
  {
    id: 15,
    image: 'img/productos/MaizTierno.png',
    title: 'MAIZ TIERNO',
    price: '10.000',
    stars: '5',
  },
  {
    id: 16,
    image: 'img/productos/pan-blanco-tajado-bimbo-actidefens-bolsa-350gr-bimbo.jpg',
    title: 'PAN BIMBO TAJADO 350GR',
    price: '4.200',
    stars: '4',
  },
  {
    id: 17,
    image: 'img/productos/papas margarita natural x25gr.jpg',
    title: 'PAPAS MARGARITA NATURAL X10 UND',
    price: '21.990',
    oldPrice: '28.900',
    discount: '-13%',
    stars: '4',
  },
  {
    id: 18,
    image: 'img/productos/Rizadas papas fritas.jpg',
    title: 'RIZADAS PAPAS FRITAS 12 UND',
    price: '18.800',
    oldPrice: '25.300',
    discount: '-22%',
    stars: '3',
  },
  {
    id: 19,
    image: 'img/productos/Takis fuego 45g.jpg',
    title: 'TAKIS FUEGO 45G',
    price: '4.000',
    stars: '5',
  },
  {
    id: 20,
    image: 'img/productos/Crispetas Maiz Caramelo POPETAS 44.4 gr.jpg',
    title: 'CRISPETAS MAIZ CARAMELO POPETAS 44.4 GR',
    price: '5.000',
    stars: '4',
  },
];

const ProductCard = ({ product }) => {
  const { handleAddToCart } = useCart();
  
  const handleAddToCartClick = () => {
    handleAddToCart(product.title, product.price, product.image);
  };

  return (
    <div className="card-product">
      <div className="container-img">
        <img src={product.image} alt={product.title} />
        {product.discount && <span className="discount">{product.discount}</span>}
        <div className="button-group">
          <span>
            <FontAwesomeIcon icon={regularEye} />
          </span>
          <span>
            <FontAwesomeIcon icon={regularHeart} />
          </span>
          <span>
            <FontAwesomeIcon icon={faCodeCompare} />
          </span>
        </div>
      </div>
      <div className="content-card-product">
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <FontAwesomeIcon key={index} icon={index < product.stars ? faStar : regularHeart} />
          ))}
        </div>
        <h3>{product.title}</h3>
        <span className="add-cart" onClick={ handleAddToCartClick }>
          <FontAwesomeIcon icon={faBasketShopping} />
        </span>
        <p className="price">
          {product.price} {product.oldPrice && <span>{product.oldPrice}</span>}
        </p>
      </div>
    </div>
  );
};

const Alimento = () => {
  return (
    <div className="container-products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Alimento;
