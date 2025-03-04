import React from 'react';
import style from '../../../assets/style/Dashboard.module.css';
<<<<<<< HEAD
import FormProveedor from '../Forms/RegisterProveedor';
import TableProveedor from '../Tables/TableProveedor';


const Proveedor = () => {
  return (
    <>
    <center><h1>Gestión de proveedores</h1></center>    
    {/* CARDS */}
    <div className={style.cardBox}>
        {/* <!-- Este enlace ahora activa el modal --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#proveedorModal">
            <div>
                <div className={style.numbers}>Nuevo</div>
                <div className={style.cardName}>Registrar Proveedor</div>
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
        {/* MODAL */}
        <div className="modal fade" id="proveedorModal" tabIndex="-1" aria-labelledby="proveedorModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="proveedorModalLabel">Registrar Proveedor</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <FormProveedor />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- CONTENIDO --> */}
    <section>
        <TableProveedor />
    </section>
    </>
  )
=======
import FormProveedor from '../Forms/Register/RegisterProveedor';
import Card from '../CartsReportes/ProveedorCartReport';
// import TableProveedores from '../DataTable/Tables/TableProveedores';
import TableProveedores from '../Tables/TableProveedor'



const Proveedor = () => {
    return (
        <>
            <center><h1>Gestión de proveedores</h1></center>
            {/* CARDS */}
            <div className={style.cardBox}>
                {/* <!-- Este enlace ahora activa el modal --> */}
                <div className={style.card} data-bs-toggle="modal" data-bs-target="#proveedorModal">
                    <div>
                        <div className={style.numbers}>Nuevo</div>
                        <div className={style.cardName}>Registrar Proveedor</div>
                    </div>
                </div>

                <a className={style.card}>
                    <Card />
                    <div className={style.iconBx}>
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </a>
                {/* MODAL */}
                <div className="modal fade" id="proveedorModal" tabIndex="-1" aria-labelledby="proveedorModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="proveedorModalLabel">Registrar Proveedor</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <FormProveedor />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- CONTENIDO --> */}
            <section>
                <TableProveedores />
            </section>
        </>
    )
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
}

export default Proveedor