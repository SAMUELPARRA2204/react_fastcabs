import React from 'react';
import Pagos from '../../assets/img/payment.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container container-footer">
        <div className="menu-footer">
          <div className="contact-info">
            <p className="title-footer">Información de Contacto</p>
            <ul>
              <li>Dirección: Cra. 104 #148 - 07, Bogotá</li>
              <li>Teléfono: 123-456-7890</li>
              <li>Fax: 55555300</li>
              <li>Email: FASTCABS@support.com</li>
            </ul>
            <div className="social-icons">
              <span className="facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </span>
              <span className="twitter">
                <i className="fa-brands fa-twitter"></i>
              </span>
              <span className="youtube">
                <i className="fa-brands fa-youtube"></i>
              </span>
              <span className="pinterest">
                <i className="fa-brands fa-pinterest-p"></i>
              </span>
              <span className="instagram">
                <i className="fa-brands fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p> &copy;2024 FASTCABS By Nicol Tovar, Juan Tovar, Samuel Parra</p>
          <img src={Pagos} alt="Pagos" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
