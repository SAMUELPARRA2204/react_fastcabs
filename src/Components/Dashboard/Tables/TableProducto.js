import React from 'react'

const TableProducto = () => {
  return (
    <div className='container mt-4'>
        <table className='table'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha Vencimiento</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Valor compra</th>
                    <th scope="col">Valor venta</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">categoria</th>
                    <th scope="col">foto</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
  )
}

export default TableProducto