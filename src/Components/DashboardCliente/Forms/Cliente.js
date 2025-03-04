import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../Context/AuthContext';
import api from '../../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import style from '../../../assets/style/Dashboard.module.css';

const Cliente = () => {
    const { user } = useAuth();
    // CONSULTA SELECT
    const [tiposDocumento, setTiposDocumento] = useState([]);
    const [nacionalidades, setNacionalidad] = useState([]);
    const [roles, setRol] = useState([]);
    const [fechaMaxima, setFechaMaxima] = useState("");
    // OBTENER USUARIO
    const [clienteData, setClienteData] = useState
        ({
            tipoDocumento: "",
            numeroDocumento: "",
            nombre: "",
            apellido: "",
            nacionalidad: "",
            fechaNacimiento: "",
            direccion: "",
            celular: "",
            correo: "",
            genero: "",
            rol: "",
            contrasena: "",
        });

    //CALCULAR FECHA MAXIMA PARA QUE SEA MAYOR DE EDAD
    useEffect(() => {
        const hoy = new Date();
        const fechaPermitida = new Date(hoy.getFullYear() - 18, hoy.getMonth(), hoy.getDate());
        const fechaFormateada = fechaPermitida.toISOString().split('T')[0];
        setFechaMaxima(fechaFormateada);
    }, []);

    // CARGAR DATOS DESDE EL BACK SELECTS
    useEffect(() => {
        const fetchData = async () => {
            try {
                const tiposDocResponse = await api.get("/tipoDocumento");
                const nacionalidadesResponse = await api.get("/nacionalidad");
                const rolesResponse = await api.get("/rol")

                setTiposDocumento(await tiposDocResponse.data);
                setNacionalidad(await nacionalidadesResponse.data);
                setRol(await rolesResponse.data);

            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            }

        };

        fetchData();
    }, []);

    const [modoEdicion, setModoEdicion] = useState(false);
    const [camposEditables, setCamposEditables] = useState({});
    const [clienteDataOriginal, setClienteDataOriginal] = useState(null);
    const [isFirstEdit, setIsFirstEdit] = useState(false);
    // BOTON LOADING
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    //CARGAR DATOS DEL CLIENTE 
    useEffect(() => {
        const cargarDatosCliente = async () => {
            console.log(user.sub)
            if (!user || !user.sub) return;
            try {
                const response = await api.get(`/usuarios/${user.sub}`);
                const data = response.data;

                const { contrasena, ...clienteDataSinContrasena } = data;
                setClienteData({
                    tipoDocumento: clienteDataSinContrasena.tipoDocumento || "",
                    numeroDocumento: clienteDataSinContrasena.numeroDocumento || "",
                    nombre: clienteDataSinContrasena.nombre || "",
                    apellido: clienteDataSinContrasena.apellido || "",
                    nacionalidad: clienteDataSinContrasena.nacionalidad || "",
                    fechaNacimiento: clienteDataSinContrasena.fechaNacimiento || "",
                    direccion: clienteDataSinContrasena.direccion || "",
                    celular: clienteDataSinContrasena.celular || "",
                    correo: clienteDataSinContrasena.correo || "",
                    genero: clienteDataSinContrasena.genero || "",
                    contrasena: "",
                });
                setClienteDataOriginal(clienteDataSinContrasena);
                setIsFirstEdit(true);
                let editables = {};
                Object.keys(clienteDataSinContrasena).forEach(key => {
                    editables[key] = clienteDataSinContrasena[key] === "" || clienteDataSinContrasena[key] === null;
                });

                setCamposEditables(editables);

            } catch (error) {
                console.error("Error al cargar los datos del usuario: ", error);
            }
        };

        cargarDatosCliente();
    }, [user]);

    const habilitarEdicion = () => {
        setCamposEditables(Object.keys(clienteData).reduce((acc, key) => {

            if(isFirstEdit && (key === "tipoDocumento" || key === "nacionalidad" || key === "fechaNacimiento" || key === "genero")){
                acc[key] = true;
            } else if (!isFirstEdit || key !== "tipoDocumento" && key !== "nacionalidad" && key !== "fechaNacimiento" && key !== "genero"){
                acc[key] = true;
            }
            return acc;
        }, {}));
        setModoEdicion(true)
    };

    const cancelarEdicion = () => {
        setModoEdicion(false);
        setClienteData(clienteDataOriginal);
        setCamposEditables([])
    };

    // FUNCIONES SELECT
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "tipoDocumento") {
            const tipoDocumentoSeleccionado = tiposDocumento.find(tipo => tipo.id === parseInt(value));
            setClienteData((prevData) => ({
                ...prevData,
                tipoDocumento: tipoDocumentoSeleccionado
            }));
        } else if (name === "nacionalidad") {
            const nacionalidadSeleccionado = nacionalidades.find(tipo => tipo.id === parseInt(value));
            setClienteData((prevData) => ({
                ...prevData,
                nacionalidad: nacionalidadSeleccionado,
            }));
        } else if (name === "rol") {
            const rolSeleccionado = roles.find(tipo => tipo.id === parseInt(value));
            setClienteData((prevData) => ({
                ...prevData,
                rol: rolSeleccionado,
            }));
        } else {
            setClienteData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    // ENVIO DATOS DE REGISTRO USUARIO
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)

        // BORRAR
        console.log("Datos enviados al backend", {
            clienteData
        });

        try {
            const response = await api.put(`/usuarios/updateCliente/${clienteData.numeroDocumento}`, clienteData);
            // BORRAR
            console.log("Respuesta del servidor: ", response);
            if (response.status === 200) {
                Swal.fire({
                    title: '¡Actualización exitosa!',
                    text: 'El usuario se ha actualizado con éxito',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true
                });
                setModoEdicion(false);
                setIsFirstEdit(false);
                setClienteDataOriginal(clienteData);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log("Estructura del error: ", error.response.data);
                const errorMessage = error.response.data.message || 'Ha ocurrido un error inesperado o el usuario ya esta registrado.';
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: errorMessage,
                });
            }
        } finally {
            setModoEdicion(false);
            setIsFirstEdit(false);
            setLoading(false);
        }
    };

    return (
        <form className={style.formulario} >
            <div className={style.formGroup}>
                <label htmlFor="tipoDocumento" className='form-label'>Tipo de documento</label>
                <select
                    className="form-select"
                    id="tipoDocumento"
                    name="tipoDocumento"
                    value={clienteData.tipoDocumento.id || ""}
                    onChange={handleInputChange}
                    required
                    disabled={!isFirstEdit || !camposEditables.tipoDocumento || !modoEdicion} 
                >
                    <option value="" disabled>Seleccione su tipo de documento</option>
                    {tiposDocumento.map((tipoDoc) => (
                        <option key={tipoDoc.id} value={tipoDoc.id}>
                            {tipoDoc.descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="numeroDocumento" className="form-label">N°. documento</label>
                <input
                    type="number"
                    className="form-control"
                    id="numeroDocumento"
                    name="numeroDocumento"
                    min='1000000'
                    max='9999999999'
                    value={clienteData.numeroDocumento}
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
                    id="nombre"
                    name="nombre"
                    maxLength='20'
                    value={clienteData.nombre}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.nombre}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="apellido" className="form-label">Apellido</label>
                <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    name="apellido"
                    maxLength='20'
                    value={clienteData.apellido}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.apellido}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="nacionalidad" className="form-label">Nacionalidad</label>
                <select
                    className="form-select"
                    id="nacionalidad"
                    name="nacionalidad"
                    value={clienteData.nacionalidad.id || ""}
                    onChange={handleInputChange}
                    required
                    disabled={!isFirstEdit || !camposEditables.nacionalidad || !modoEdicion}
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
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    min="1970-01-01"
                    max={fechaMaxima}
                    value={clienteData.fechaNacimiento}
                    onChange={handleInputChange}
                    required
                    disabled={!isFirstEdit || !camposEditables.fechaNacimiento || !modoEdicion}
                    // disabled={!camposEditables.fechaNacimiento}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="direccion" className="form-label">Direccion</label>
                <input
                    type="text"
                    className="form-control"
                    id="direccion"
                    name="direccion"
                    maxLength='20'
                    value={clienteData.direccion}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.direccion}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="celular" className="form-label">Celular</label>
                <input
                    type="number"
                    className="form-control"
                    id="celular"
                    name="celular"
                    min='1000000'
                    max='9999999999'
                    value={clienteData.celular}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.celular}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="correo" className="form-label">Correo</label>
                <input
                    type="email"
                    className="form-control"
                    id="correo"
                    name="correo"
                    maxLength='20'
                    value={clienteData.correo}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.correo}
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="genero" className="form-label">Genero</label>
                <select
                    className="form-select"
                    id="genero"
                    name="genero"
                    value={clienteData.genero}
                    onChange={handleInputChange}
                    required
                    disabled={!isFirstEdit || !camposEditables.genero || !modoEdicion}
                    // disabled={!camposEditables.genero}
                >
                    <option value="" disabled>Seleccione su genero</option>
                    <option value="0" >Masculino</option>
                    <option value="1" >Femenino</option>
                    <option value="2" >Otro</option>
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="contrasena" className="form-label">Contraseña</label>
                <input
                    type="password"
                    className="form-control"
                    id="contrasena"
                    name="contrasena"
                    minLength='8'
                    value={clienteData.contrasena}
                    onChange={handleInputChange}
                    required
                    disabled={!camposEditables.contrasena}
                />
            </div>
            <div className="col-12">
                {!modoEdicion ? (
                    <button type="button" onClick={habilitarEdicion} className="btn btn-warning">
                        Editar Información
                    </button>
                ) : (
                    <>
                        <button type='button' className='btn btn-success mt-3' onClick={handleUpdate} disabled={loading}>
                            {loading ? "Cargando..." : "Actualizar"}
                        </button>
                        <button type="button" className="btn btn-danger mt-3" onClick={cancelarEdicion}>
                            Cancelar
                        </button>
                    </>
                )}

            </div>
        </form>
    )
}

export default Cliente;