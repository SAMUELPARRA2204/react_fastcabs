<<<<<<< HEAD
import React from 'react';

const Pedidos = () => {
  return (
    <div>Pedidos</div>
=======
import React from 'react'
import style from '../../../assets/style/Dashboard.module.css';
import Card from '../CartsReportes/ProductoCartRepor'
import TablePedido from '../Tables/TablePedido';

import { Link } from 'react-router-dom';



const Pedidos = () => {
  return (
    <>
      <center><h1>Gestión de pedidos</h1></center>
      {/* CARDS */}
      <div className={style.cardBox}>
        <Link className={style.card}>
          <Card />
          <div className={style.iconBx}>
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </Link>
        <div className={style.card}>
          <Link to="/Dashboard/inicio">
            <div className={style.numbers}>284</div>
            <div className={style.cardName}>Inicio</div>
          </Link>

          <div className={style.iconBx}>
            <ion-icon name="cash-outline"></ion-icon>
          </div>
        </div>

      </div>
      {/* <!-- CONTENIDO --> */}
      <section>
        <TablePedido />
      </section>
    </>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
  )
}

export default Pedidos