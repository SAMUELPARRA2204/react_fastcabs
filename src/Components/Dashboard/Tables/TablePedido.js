import React, { useEffect, useState } from 'react'
import api from '../../../Utils/axiosConfig';

const TablePedido = () => {
    /*ESTADOS*/
    const [pedidos, setPedidos] = useState([]); //ESTADOS TABLA PRODUCTOS

    //CONSULTA TABLA
    useEffect(() => {
        const fetchData = async () => {
            try {
                const pedidos = await api.get("/pedidos");
                setPedidos(await pedidos.data);
            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='container mt-4'>
            <table className='table'>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Cliente</th>
                        <th scope="col">Fecha Solicitud</th>
                        <th scope="col">Fecha Entrega</th>
                        <th scope="col">Direccion</th>
                        <th scope="col">Celular</th>
                        <th scope="col">Sub Total</th>
                        <th scope='col'>Total</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {pedidos.map((pedido) => (
                        <tr key={pedido.id}>
                            <td>{pedido.cliente.nombre || "No disponible"}</td>
                            <td>{pedido.fechaSolicitud}</td>
                            <td>{pedido.fechaEntrega}</td>
                            <td>{pedido.direccion}</td>
                            <td>{pedido.celular}</td>
                            <td>
                                {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(pedido.subTotal)}
                            </td>
                            <td>
                            {new Intl.NumberFormat("es-CO", {
                                    style: "currency",
                                    currency: "COP",
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0,
                                }).format(pedido.total)}
                            </td>
                            <td>
                            <button className="btn btn-warning">Editar</button>
                                {/* <button className="btn btn-warning"onClick={() => handleEdit(producto.id)}>Editar</button> */}
                            </td>
                            <td>
                            <button className="btn btn-danger">Eliminar</button>
                                {/* <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>Eliminar</button> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TablePedido