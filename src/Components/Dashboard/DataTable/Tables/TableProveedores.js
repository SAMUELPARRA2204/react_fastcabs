    import React, { useEffect, useState } from 'react'
    import api from '../../../../Utils/axiosConfig';
    import DatatableComponent from '../../DataTable/DataTableComponent';
    import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
    import UpdateProveedor from '../../Forms/Update/UpdateProveedor';
    import Swal from 'sweetalert2';


    const TableProveedores = () => {
        const [proveedores, setProveedores] = useState([]);
        const [formData, setFormData] = useState({
            nit: "",
            nombre: "",
            celular: "",
            direccion: "",
            correo: ""
        });

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await api.get("/proveedores");
                    setProveedores(response.data);
                } catch (error) {
                    console.error("Error al cargar los datos: ", error)
                }
            };
            fetchData();
        }, []);

        // CARGAR LOS DATOS AL FORMULARIO DE EDITAR
        const handleEdit = (id) => {
            console.log(id)
            const proveedorSeleccionado = proveedores.find(proveedor => String(proveedor.nit) === String(id));
            if (!proveedorSeleccionado) {
                console.error("Proveedor no encontrado");
                return;
            }

            setFormData(proveedorSeleccionado);

            const modalElement = document.getElementById("updateProveedorModal");
            if (modalElement) {
                const modal = new bootstrapBundleMin.Modal(modalElement);
                modal.show();
            }
        };

        const handleDelete = async (id) => {
            try {
                const response = await api.delete(`/proveedore/${id}`);
                const data = response;
                if (data.status === 200) {
                    Swal.fire({
                        title: '¡Desactivación exitosa!',
                        text: 'El usuario ha sido desactivado con éxito.',
                        icon: 'success'
                    });
                    setProveedores(prev => prev.filter(Usuario => Usuario.numeroDocumento !== id));
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'No fue desactivar el usuario, comuniquese con el administrador.',
                    icon: 'error'
                });
            }
        };

        const columns = [
            { header: "Nit", key: "nit" },
            { header: "Nombre", key: "nombre" },
            { header: "Celular", key: "celular" },
            { header: "Direccion", key: "direccion" },
            { header: "Correo", key: "correo" },
            { header: "Acciones", key: 'acciones' }
        ];
        return (
            <>
                <DatatableComponent
                    id="proveedoresTable"
                    columns={columns}
                    data={proveedores}
                    rowIdKey="nit"
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
                {/* MODAL DE EDICION */}
                <div className="modal fade" id="updateProveedorModal" tabIndex="-1" aria-labelledby="updateProveedorModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="updateProveedorModalLabel">Editar Proveedor</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                            </div>
                            <div className="modal-body">
                                <UpdateProveedor
                                    setFormData={setFormData}
                                    formData={formData}
                                    setProveedores={setProveedores}
                                />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    export default TableProveedores
