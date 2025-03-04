import React, { useState } from 'react';
import style from '../../../../assets/style/Dashboard.module.css';
import api from '../../../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';


const UpdateProveedor = ({ setFormData, formData, setProveedores }) => {
    const [loading, setLoading] = useState(false); //ESTADO DE CARGA

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // ENVIAR DATOS ACTUALIZADOS AL BACK
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)

        console.log("Datos a actualizar", formData)
        try {
            const response = await api.put(`/proveedores/update/${formData.nit}`, formData);
            const data = response;
            if (data.status === 200) {
                document.activeElement.blur();
                Swal.fire({
                    title: '¡Actualización exitosa!',
                    text: 'El proveedor se ha actualizado con éxito',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true
                });

                setProveedores((prevProveedores) =>
                    prevProveedores.map((proveedor) =>
                        proveedor.nit === formData.nit
                            ? { ...proveedor, ...formData } : proveedor
                    )
                );

                const modalElement = document.getElementById("UpdateProveedorModal");
                if (modalElement) {
                    const modal = Modal.getInstance(modalElement);
                    if (modal) {
                        modal.hide();
                    }
                }
                /* PRUEBA*/
                // 🔽 Elimina el backdrop de Bootstrap manualmente
                const modalBackdrops = document.getElementsByClassName("modal-backdrop");
                while (modalBackdrops.length > 0) {
                    modalBackdrops[0].parentNode.removeChild(modalBackdrops[0]);
                }
                document.body.classList.remove("modal-open"); // Asegura que el body no tenga la clase que lo bloquea
                document.body.style.overflow = "auto"; // Restaura el scroll si se bloqueó

            }
        } catch (error) {
            console.error("Error en la solicitud de actualización:", error);
            Swal.fire({
                title: 'Error',
                text: 'No fue posible actualizar el proveedor, comuníquese con el administrador',
                icon: 'error'
            });
        } finally {
            setFormData({
                nit: "",
                nombre: "",
                celular: "",
                direccion: "",
                correo: "",
            });
            setLoading(false)
        };
    };

    return (
        <form className={style.formulario} onSubmit={handleUpdate}>
            <div className={style.formGroup}>
                <label htmlFor="nit" className="form-label">Nit</label>
                <input
                    type="number"
                    className="form-control"
                    id="nit"
                    name="nit"
                    value={formData.nit}
                    onChange={handleInputChange}
                    placeholder='Nit'
                    disabled
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="celular" className="form-label">Celular</label>
                <input type="number"
                    className="form-control"
                    id="celular"
                    name="celular"
                    value={formData.celular}
                    onChange={handleInputChange}
                    inputMode="numeric"
                    maxLength="10"
                    placeholder='Celular'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    placeholder='Direccion'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="correo" className="form-label">Correo</label>
                <input type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    placeholder='Correo'
                    required
                />
            </div>
            <div className="col-12">
                <button className="btn btn-success" type="submit" disabled={loading}>
                    {loading ? "Actualizando..." : "Editar"}
                </button>
            </div>
        </form>
    )
}

export default UpdateProveedor