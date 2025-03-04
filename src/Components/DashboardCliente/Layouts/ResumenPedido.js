import React from 'react'
import TableResumenPedido from '../Tables/TableResumenPedido'
import { Link } from 'react-router-dom'

const ResumenPedido = () => {
  return (
    <section>
        <h2>Resumen Pedido</h2>
        <TableResumenPedido />
        <Link to="/" className="btn btn-primary">Seguir Comprando</Link>
    </section>
  )
}

export default ResumenPedido