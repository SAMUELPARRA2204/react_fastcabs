import React, { useEffect, useState } from 'react'
import api from '../../../../Utils/axiosConfig';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import Swal from 'sweetalert2';
import DatatableComponent from '../DataTableComponent';
import UpdateProducto from '../../Forms/Update/UpdateProducto';
import { Modal } from 'bootstrap';

const TableProducto = () => {
    const [productos, setProductos] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        nombre: "",
        descripcion: "",
        fechaVencimiento: "",
        proveedor: null,
        valorCompra: "",
        cantidad: "",
        stockActual: "",
        stockMax: "",
        categoria: null,
        foto: null
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/productos");
                console.log("Productos cargados: ", response.data);
                setProductos(response.data);
            } catch (error) {
                console.error("Error al cargar los datos: ", error.message || error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (id) => {
        const productoSeleccionado = productos.find(producto => String(producto.id) === String(id));
        console.log("Producto a editar", productoSeleccionado);
        if (!productoSeleccionado) {
            console.error("Producto no encontrado");
            return;
        }
        setFormData(productoSeleccionado);

        const modalElement = document.getElementById("updateProductoModal");
        if (modalElement) {
            const modal = new Modal(modalElement);
            modal.show();
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/productos/${id}`);
            const data = response;
            if (data.status === 200) {
                Swal.fire({
                    title: '¡Desactivación exitosa!',
                    text: 'El producto ha sido desactivado con éxito.',
                    icon: 'success'
                });
                setProductos(prev => prev.filter(producto => producto.id !== id));
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'No fue posible desactivar el producto, comuniquese con el administrador.',
                icon: 'error'
            });
        }
    };

    const columns = [
        { header: "#", key: "id" },
        { header: "Nombre", key: "nombre" },
        { header: "Descripcion", key: "descripcion" },
        { header: "Fecha Vencimiento", key: "fechaVencimiento" },
        {
            header: "Proveedor",
            key: "proveedor",
            render: (row) => row.proveedor?.nombre || "N/A"
        },
        {
            header: "Categoria",
            key: "categoria",
            render: (row) => row.categoria?.descripcion || "N/A"
        },
        { header: "Valor compra", key: "valorCompra" },
        { header: "stock", key: "stockActual" },
        { header: "Acciones", key: "acciones" },
    ];

    return (
        <>
            <DatatableComponent
                id="productosTable"
                columns={columns}
                data={productos}
                rowIdKey="id"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* MODAL DE EDICION */}
            <div className="modal fade" id="updateProductoModal" tabIndex="-1" aria-labelledby="updateProductoModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateProductoModalLabel">Editar Producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">
                            <UpdateProducto
                                setFormData={setFormData}
                                formData={formData}
                                setProductos={setProductos}
                            />
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableProducto