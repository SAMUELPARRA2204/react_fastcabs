import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../../Context/CartContext';

const CardFeature = ({ icon, title, description }) => (
  <div className="card-feature">
    <i className={icon}></i>
    <div className="feature-content">
      <span>{title}</span>
      <p>{description}</p>
    </div>
  </div>
);

const CardProduct = ({ imgSrc, imgAlt, discount, title, price, oldPrice }) => {
  const { handleAddToCart } = useCart();
   
  return (
  <div className="card-product">
    <div className="container-img">
      <img src={imgSrc} alt={imgAlt} />
      {discount && <span className="discount">{discount}</span>}
      <div className="button-group">
        <span><i className="fa-regular fa-eye"></i></span>
        <span><i className="fa-regular fa-heart"></i></span>
        <span><i className="fa-solid fa-code-compare"></i></span>
      </div>
    </div>
    <div className="content-card-product">
      <h3>{title}</h3>
      <span className="add-cart" onClick={() => handleAddToCart (title, price, imgSrc)}>
        <i className="fa-solid fa-basket-shopping"></i></span>
      <p className="price">
        ${price} {oldPrice && <span>{oldPrice}</span>}
      </p>
    </div>
  </div>
  )
};

const PromotionCard = ({ imgSrc, imgAlt, title, date, description }) => {
    return (
      <div className="card-blog">
        <div className="container-img">
          <img src={imgSrc} alt={imgAlt} />
          <div className="button-group-blog">
            <span><i className="fa-solid fa-magnifying-glass"></i></span>
            <span><i className="fa-solid fa-link"></i></span>
          </div>
        </div>
        <div className="content-blog">
          <h3>{title}</h3>
          <span>{date}</span>
          <p>{description}</p>
          <div className="btn-read-more">Leer más</div>
        </div>
      </div>
    );
  };

const Index = () => {


  return (
    <>
      <section className="banner">
        <div className="content-banner">
          <p>TU MEJOR SUPERMERCADO</p>
          <h2>100% Rápido <br />Ahora sus puertas</h2>
          <Link to="/login">Pide ahora</Link>
        </div>
      </section>
      
      <main className="main-content">
        
        <section className="container container-features">
          <CardFeature icon="fa-solid fa-plane-up" title="Envío gratuito a nivel Bogotá" description="En pedido superior a $150.000" />
          <CardFeature icon="fa-solid fa-wallet" title="Contrareembolso" description="100% garantía de devolución de dinero" />
          <CardFeature icon="fa-solid fa-gift" title="Descuentos" description="Ofrece bonos especiales con descuentos" />
          <CardFeature icon="fa-solid fa-headset" title="Servicio al cliente 24/7" description="LLámenos 24/7 al 123-456-7890" />
        </section>

        <section className="container top-categories">
            <h1 className="heading-1">Mejores Categorías</h1>
            <div className="container-categories">
                <div className="card-category category-alimentos">
                    <p>Alimentos</p>
                    <Link to="/alimentos"><span>Ver más</span></Link>
                </div>
                <div className="card-category category-Aseo">
                    <p>Aseo</p>
                    <Link to="/productosLimpieza"><span>Ver más</span></Link>
                </div>
                <div className="card-category category-personal">
                    <p>Limpieza personal</p>
                    <Link to="/aseo"><span>Ver más</span></Link>
                </div>
            </div>
        </section>
        
        <section className="container top-products">
          <h1 className="heading-1">DESCUENTOS</h1>          
            <div className="container-options">
            <span className="active">Destacados</span>
            <span>Más recientes</span>
            <span>Mejores Vendidos</span>
            </div>
            <div className="container-products">
                <CardProduct 
                    imgSrc="../../../img/productos/vino-tinto-carmenere-reserva-quinta-las-cabras-750ml.jpg" 
                    imgAlt="Vino tinto" 
                    discount="-13%"   
                    title="VINO TINTO CARMENERE RESERVA QUINTA LAS CABRAS 750 ML" 
                    price="21990" 
                    oldPrice="30900"
                />
                
                <CardProduct 
                    imgSrc="../../../img/productos/BLANQUEADOR BRILLA KING 2000 ML.png" 
                    imgAlt="BLANQUEADOR BRILLA KING" 
                    discount="-22%" 
                    title="BLANQUEADOR BRILLA KING 2000 ML" 
                    price="4809" 
                    oldPrice="7300" 
                />
                
                <CardProduct 
                    imgSrc="../../../img/productos/Leche deslactosada colanta.png" 
                    imgAlt="Leche deslactosada colanta" 
                    title="LECHE DESLACTOSADA COLANTA BOLSA x6UND x1000ML" 
                    price="29800" 
                />
                
                <CardProduct 
                    imgSrc="../../../img/productos/Papel higienico.jpg" 
                    imgAlt="Papel higienico" 
                    title="PAPEL HIGIENICO SUAVE GOLD TRIPLE HOJA x12UND x32M" 
                    price="27990" 
                />
            </div>
        </section>

        {/* GALLERIA DE FOTOS */}
        <section className="gallery">
            <img 
                src="../../../img/galeria/comida congelada.jpg" 
                alt="Comida congelada" 
                className="gallery-img-1" 
            />
            <img 
                src="../../../img/galeria/productos de aseo.jpg" 
                alt="Productos de aseo" 
                className="gallery-img-2" 
            />
            <img 
                src="../../../img/galeria/Comida.jpg" 
                alt="Comida" 
                className="gallery-img-3" 
            />
            <img 
                src="../../../img/galeria/Frutas.jpeg" 
                alt="Frutas" 
                className="gallery-img-4" 
            />
            <img 
                src="../../../img/galeria/comida supermercado.jpg" 
                alt="Comida de supermercado" 
                className="gallery-img-5" 
            />
        </section>

        {/* PROMOCIONES */}
        <section className="container specials">
          <h1 className="heading-1">ESPECIALES</h1>
            <div className="container-products">
                <CardProduct 
                    imgSrc="../../../img/productos/Comida para perra.jpg" 
                    imgAlt="Comida para perra" 
                    discount="-13%" 
                    title="COMIDA PARA PERRA DOG CHOW ADULTOS MEDIANOS Y GRANDES X22.7KG" 
                    price="30500" 
                    oldPrice="50000" 
                />

                <CardProduct 
                    imgSrc="../../../img/productos/Chocolatina.jpg" 
                    imgAlt="Chocolatina" 
                    discount="-22%" 
                    title="CHOCOLATINA JET X 12 UND.X 144 G." 
                    price="8000" 
                    oldPrice="7360" 
                />

                <CardProduct 
                    imgSrc="../../../img/productos/whisky jack daniels honey.jpg" 
                    imgAlt="Whisky Jack Daniels Honey" 
                    discount="-30%" 
                    title="WHISKEY JACK DANIEL'S TENNESSEE HONEY X700ML" 
                    price="121900" 
                    oldPrice="145900" 
                />

                <CardProduct 
                    imgSrc="../../../img/productos/Detergente polvo.jpeg" 
                    imgAlt="Detergente polvo" 
                    title="DETERGENTE POLVO ARIEL X5KG" 
                    price="52990" 
                />
          </div>
        </section>

        <section className="container blogs">
            <h1 className="heading-1">PROMOCIONES</h1>
            <div className="container-blogs">
                <PromotionCard 
                    imgSrc="../../../img/promociones/promocion leche colanta.jpeg" 
                    imgAlt="promocion leche colanta" 
                    title="2 Pacas De Leche Con Un 10% De Descuento" 
                    date="18 Marzo 2024" 
                    description="Aprovecha hoy nuestra promoción de 2 pacas de leche colanta que tendrán un 10% de descuento en nuestra tienda hoy."
                />
                <PromotionCard 
                    imgSrc="../../../img/promociones/promocion de tipalia.png" 
                    imgAlt="promocion de tipalia" 
                    title="2 Filetes De Tilapia Precio Especial 810 G X2 Unds" 
                    date="17 Marzo 2024" 
                    description="Lleva 2 filetes de tilapia hoy con un precio especial."
                />
                <PromotionCard 
                    imgSrc="../../../img/promociones/promocion corona.png" 
                    imgAlt="promocion corona" 
                    title="2 Six Packs De Cerveza Y La 3 Es Gratis" 
                    date="18 Marzo 2024" 
                    description="Aproveche hoy esta súper promoción en cervezas y obtenga 3x2 en six pack de Corona."
                />
            </div>
        </section>
        
      </main>
    </>
  );
};

export default Index;
