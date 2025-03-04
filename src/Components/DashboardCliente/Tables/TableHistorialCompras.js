import React from 'react'
import style from '../../../assets/style/DashboardCliente.module.css'

const TableHistorialCompras = () => {
  return (
    <table className={style.clienteTable}>
      <thead>
        <tr>
          <th>Código de Pedido</th>
          <th>Fecha de Solicitud</th>
          <th>Fecha de Entrega</th>
          <th>Monto Total</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </table>
  )
}

export default TableHistorialCompras
