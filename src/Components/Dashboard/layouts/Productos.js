import React from 'react';
import style from '../../../assets/style/Dashboard.module.css';
<<<<<<< HEAD
import FormProducto from '../Forms/RegisterProducto';
import FormCategoria from '../Forms/RegisterCategoria';
import TableProducto from '../Tables/TableProducto';

=======
import FormProducto from '../Forms/Register/RegisterProducto';
import FormCategoria from '../Forms/Register/RegisterCategoria';
import Card from '../CartsReportes/ProductoCartRepor';
// import TableProducto from '../DataTable/Tables/TableProducto';
import TableProducto from '../Tables/TableProducto';

import { Link } from 'react-router-dom';

>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

const Productos = () => {
  return (
    <>
<<<<<<< HEAD
    <center><h1>Gestión de productos</h1></center>    
    {/* CARDS */}
    <div className={style.cardBox}>
        {/* <!-- Este enlace ahora activa el modal productos --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#productosModal">
            <div>
                <div className={style.numbers}>Nuevo</div>
                <div className={style.cardName}>Registrar productos</div>
            </div>
        </div>
        {/* <!-- Este enlace ahora activa el modal categorias --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#categoriasModal">
            <div>
                <div className={style.numbers}>Nuevo</div>
                <div className={style.cardName}>Crear categoría</div>
            </div>
        </div>

        <a className={style.card}>
            <div>
                <div className={style.numbers}>284</div>
                <div className={style.cardName}>Reportes</div>
            </div>
            <div className={style.iconBx}>
                <ion-icon name="cash-outline"></ion-icon>
            </div>
        </a>
=======
      <center><h1>Gestión de productos</h1></center>
      {/* CARDS */}
      <div className={style.cardBox}>
        {/* <!-- Este enlace ahora activa el modal productos --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#productosModal">
          <div>
            <div className={style.numbers}>Nuevo</div>
            <div className={style.cardName}>Registrar productos</div>
          </div>
        </div>
        {/* <!-- Este enlace ahora activa el modal categorias --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#categoriasModal">
          <div>
            <div className={style.numbers}>Nuevo</div>
            <div className={style.cardName}>Crear categoría</div>
          </div>
        </div>

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
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

        {/* MODAL PRODUCTOS */}
        <div className="modal fade" id="productosModal" tabIndex="-1" aria-labelledby="productosModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="prodcutosModalLabel">Registrar Productos</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <FormProducto />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        {/* MODAL CATEGORIAS */}
        <div className="modal fade" id="categoriasModal" tabIndex="-1" aria-labelledby="categoriasModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="categoriasModalLabel">Registrar Categorias</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <FormCategoria />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
              </div>
            </div>
          </div>
        </div>
<<<<<<< HEAD
        
    </div>
    {/* <!-- CONTENIDO --> */}
    <section>
        <TableProducto />
    </section>
=======

      </div>
      {/* <!-- CONTENIDO --> */}
      <section>
        <TableProducto />
      </section>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    </>
  )
}

export default Productos