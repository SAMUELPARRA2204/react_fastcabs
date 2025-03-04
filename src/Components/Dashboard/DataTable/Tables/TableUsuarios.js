import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import api from '../../../../Utils/axiosConfig';
import DatatableComponent from '../../DataTable/DataTableComponent';
import bootstrapBundleMin from 'bootstrap/dist/js/bootstrap.bundle.min';
import UpdateUsuario from '../../Forms/Update/UpdateUsuario';

const TableUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [formData, setFormData] = useState({
        tipoDocumento: {},
        numeroDocumento: "",
        nombre: "",
        apellido: "",
        nacionalidad: {},
        fechaNacimiento: "",
        direccion: "",
        celular: "",
        correo: "",
        genero: "",
        rol: {},
        contrasena: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/usuarios");
                setUsuarios(response.data);
            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            }
        };
        fetchData();
    }, []);

    // CARGAR LOS DATOS AL FORMULARIO DE EDITAR
    const handleEdit = (id) => {
        console.log(id)
        const usuarioSelccionado = usuarios.find(usuario => String(usuario.numeroDocumento) === String(id));
        if (!usuarioSelccionado) {
            console.error("Usuario no encontrado");
            return;
        }

        const { contrasena, ...usuarioSinContrasena } = usuarioSelccionado;
        setFormData(usuarioSinContrasena);

        const modalElement = document.getElementById("updateUsuarioModal");
        if (modalElement) {
            const modal = new bootstrapBundleMin.Modal(modalElement);
            modal.show();
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await api.delete(`/usuarios/${id}`);
            const data = response;
            if (data.status === 200) {
                Swal.fire({
                    title: '¡Desactivación exitosa!',
                    text: 'El usuario ha sido desactivado con éxito.',
                    icon: 'success'
                });
                setUsuarios(prev => prev.filter(Usuario => Usuario.numeroDocumento !== id));
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
        { header: "N° Documento", key: "numeroDocumento" },
        { header: "Nombre", key: "nombre" },
        { header: "Apellido", key: "apellido" },
        { header: "Dirección", key: "direccion" },
        { header: "Celular", key: "celular" },
        { header: "Correo", key: "correo" },
        {
            header: "Rol",
            key: "rol",
            render: (row) => {
                return row.rol ? row.rol.descripcion : "N/A"
            }
        },
        { header: "Acciones", key: 'acciones', },
    ];
    return (
        <>
            <DatatableComponent
                id="usuariosTable"
                columns={columns}
                data={usuarios}
                rowIdKey="numeroDocumento"
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {/* MODAL DE EDICION */}
            <div className="modal fade" id="updateUsuarioModal" tabIndex="-1" aria-labelledby="updateUsuarioModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="updateUsuarioModalLabel">Editar Usuario</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                        </div>
                        <div className="modal-body">
                            <UpdateUsuario
                                setFormData={setFormData}
                                formData={formData}
                                setUsuarios={setUsuarios}
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
};


export default TableUsuarios