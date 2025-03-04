import React from 'react'
import style from '../../../assets/style/DashboardCliente.module.css'
import Cliente from '../Forms/Cliente'
import TableHistorialCompras from '../Tables/TableHistorialCompras'

const MiPerfil = () => {
    return (
        <section>
            <h2>Perfil del Cliente</h2>
            <div className={style.profileInfo}>
                <Cliente />
            </div>
            <h3>Historial de Compras</h3>
                <TableHistorialCompras/>
        </section>
    )
}

export default MiPerfil
