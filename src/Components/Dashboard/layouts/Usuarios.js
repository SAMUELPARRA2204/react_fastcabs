import React from 'react';
import style from '../../../assets/style/Dashboard.module.css';
import FormUsuario from '../Forms/RegisterUsuario';
import TableUsuario from '../Tables/TableUsuario';


const Usuarios = () => {
  return (
    <>
    <center><h1>Gestión de usuarios</h1></center>    
    {/* CARDS */}
    <div className={style.cardBox}>
        {/* <!-- Este enlace ahora activa el modal --> */}
        <div className={style.card} data-bs-toggle="modal" data-bs-target="#usuarioModal">
            <div>
                <div className={style.numbers}>Nuevo</div>
                <div className={style.cardName}>Registrar Usuario</div>
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
        <div className="modal fade" id="usuarioModal" tabIndex="-1" aria-labelledby="usuarioModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="usuarioModalLabel">Registrar Usuario</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <FormUsuario />
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
        <TableUsuario />
    </section>
    </>
  )
}

export default Usuarios