import React, { useEffect, useState } from 'react';
import style from '../../../../assets/style/Dashboard.module.css';
import api from '../../../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap'

const UpdateUsuario = ({ setFormData, formData, setUsuarios }) => {
    //ESTADOS DATOS SELECT
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [nacionalidades, setNacionalidad] = useState([]);
    const [roles, setRol] = useState([]);
    const [loading, setLoading] = useState(false) //ESTADO DE CARGA 

    // OBTENER INFORMACION PARA LOS SELECT
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tiposDocResponse, nacionalidadesResponse, rolesResponse] = await Promise.all([
                    api.get("/tipoDocumento"),
                    api.get("/nacionalidad"),
                    api.get("/rol")
                ]);
                setTiposDocumento(tiposDocResponse.data);
                setNacionalidad(nacionalidadesResponse.data);
                setRol(rolesResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            }
        };
        fetchData();
    }, []);

    //CAMBIO DE DATOS EN EL FOMULARIO
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log("Datos a actualizar", formData)
        try {
            const updateFormData = { ...formData };
            if (!updateFormData.contrasena) {
                delete updateFormData.contrasena;
            }
            const response = await api.put(`/usuarios/update/${formData.numeroDocumento}`, updateFormData);
            const data = response;
            if (data.status === 200) {
                document.activeElement.blur();
                Swal.fire({
                    title: '¡Actualización exitosa!',
                    text: 'El usuario se ha actualizado con éxito',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true
                });

                setUsuarios((prevUsuarios) =>
                    prevUsuarios.map((usuario) =>
                        usuario.numeroDocumento === formData.numeroDocumento
                            ? { ...usuario, ...updateFormData } : usuario
                    )
                );

                const modalElement = document.getElementById("UpdateUsuarioModal");
                if (modalElement) {
                    const modal = Modal.getOrCreateInstance(modalElement);
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
                text: 'No fue posible actualizar el usuario, comuníquese con el administrador',
                icon: 'error'
            });
        } finally {
            setFormData({
                tiposDocumento: {},
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
            setLoading(false)
        };
    }

    return (
        <form className={style.formulario} onSubmit={handleUpdate}>
            <div className={style.formGroup}>
                <label htmlFor="tipoDocumento" className='form-label'>Tipo de documento</label>
                <select
                    className="form-select"
                    id="UpdatetipoDocumento"
                    name="tipoDocumento"
                    value={formData.tipoDocumento?.id || ""}
                    onChange={handleInputChange}
                    required
                    disabled
                >
                    <option value="" disabled>Seleccione su tipo de documento</option>
                    {tiposDocumento.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="numeroDocumento" className="form-label">N°. documento</label>
                <input
                    type="number"
                    className="form-control"
                    id="UpdatenumeroDocumento"
                    name="numeroDocumento"
                    max="9999999999"
                    value={formData.numeroDocumento}
                    onChange={handleInputChange}
                    required
                    disabled
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    id="Updatenombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                    type="text"
                    className="form-control"
                    id="Updateapellido"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="nacionalidad" className="form-label">Nacionalidad</label>
                <select
                    className="form-select"
                    id="Updatenacionalidad"
                    name="nacionalidad"
                    value={formData.nacionalidad?.id || ""}
                    onChange={handleInputChange}
                    required
                    disabled
                >
                    <option value="" disabled>Seleccione su nacionalidad</option>
                    {nacionalidades.map((nacionalidad) => (
                        <option key={nacionalidad.id} value={nacionalidad.id}>
                            {nacionalidad.descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="fechaNacimiento" className="form-label">Fecha Nacimiento</label>
                <input
                    type="date"
                    className="form-control"
                    id="UpdatefechaNacimiento"
                    name="fechaNacimiento"
                    value={formData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    disabled
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input
                    type="text"
                    className="form-control"
                    id="Updatedireccion"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="celular" className="form-label">Celular</label>
                <input
                    type="number"
                    className="form-control"
                    id="Updatecelular"
                    name="celular"
                    max="9999999999"
                    value={formData.celular}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                    type="email"
                    className="form-control"
                    id="Updatecorreo"
                    name="correo"
                    max="9999999999"
                    value={formData.correo}
                    onChange={handleInputChange}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="genero" className="form-label">Genero</label>
                <select
                    className="form-select"
                    id="Updategenero"
                    name="genero"
                    value={formData.genero}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>Seleccione su genero</option>
                    <option value="0" >Masculino</option>
                    <option value="1" >Femenino</option>
                    <option value="2" >Otro</option>
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="rol" className="form-label">Rol</label>
                <select
                    className="form-select"
                    id="Updaterol"
                    name="rol"
                    value={formData.rol?.id || ""}
                    onChange={handleInputChange}
                    disabled
                    required
                >
                    <option value="" disabled>Seleccione el rol</option>
                    {roles.map((rol) => (
                        <option key={rol.id} value={rol.id}>
                            {rol.descripcion}
                        </option>
                    ))}
                </select>
            </div>

            <div className={style.formGroup}>
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="Updatecontrasena"
                    name="contrasena"
                    value={formData.contrasena || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="col-12">
                <button
                    className="btn btn-success"
                    disabled={loading}
                >
                    {loading ? "Cargando..." : "Editar"}
                </button>
            </div>
        </form>
    )
}

export default UpdateUsuario