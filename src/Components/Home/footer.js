import React from 'react';
import Pagos from '../../assets/img/payment.png';

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="custom-container-footer">
        <div className="custom-menu-footer">
          <div className="custom-contact-info">
            <p className="custom-title-footer">Información de Contacto</p>
            <ul>
              <li>Dirección: Cra. 104 #148 - 07, Bogotá</li>
              <li>Teléfono: 123-456-7890</li>
              <li>Fax: 55555300</li>
              <li>Email: FASTCABS@support.com</li>
            </ul>
            <div className="custom-social-icons">
              <span className="custom-facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </span>
              <span className="custom-twitter">
                <i className="fa-brands fa-twitter"></i>
              </span>
              <span className="custom-youtube">
                <i className="fa-brands fa-youtube"></i>
              </span>
              <span className="custom-pinterest">
                <i className="fa-brands fa-pinterest-p"></i>
              </span>
              <span className="custom-instagram">
                <i className="fa-brands fa-instagram"></i>
              </span>
            </div>
          </div>
        </div>
        <div className="custom-copyright">
          <p> &copy;2024 FASTCABS By Nicol Tovar, Juan Tovar, Samuel Parra</p>
          <img src={Pagos} alt="Pagos" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
