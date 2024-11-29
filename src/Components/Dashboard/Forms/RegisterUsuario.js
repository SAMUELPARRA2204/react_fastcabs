import React, { useEffect, useState } from 'react'
import api from '../../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



const RegisterUsuario = () => {
  const [tiposDocumento, setTiposDocumeto] = useState([]);
  const [nacionalidades, setNacionalidad] = useState([]);
  const [roles, setRol] = useState([]);
  const navigate = useNavigate()

  // REGISTRO USUARIOS
  const [registerData, setRegisterData] = useState
  ({
    tipoDocumento: {},
    // tipoDocumento: "",
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

  const [loading, setLoading] = useState(false);

  // CARGAR DATOS DESDE EL BACK
  useEffect(() => {
    const fetchData = async () => {
      try{
        const tiposDocResponse = await api.get("/tipoDocumento");
        const nacionalidadesResponse = await api.get("/nacionalidad");
        const rolesResponse = await api.get("/rol")

        setTiposDocumeto(await tiposDocResponse.data);
        setNacionalidad(await nacionalidadesResponse.data);
        setRol(await rolesResponse.data);

      } catch (error){
        console.error("Error al cargar los datos: ",error);
      }        
      
    };

    fetchData();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoDocumento") {
      const tipoDocumentoSeleccionado = tiposDocumento.find(tipo => tipo.id === parseInt(value));
      setRegisterData((prevData) => ({
        ...prevData,
        tipoDocumento: tipoDocumentoSeleccionado
      }));
    } else if (name === "nacionalidad") {
      const nacionalidadSeleccionado = nacionalidades.find(tipo => tipo.id === parseInt(value));
      setRegisterData((prevData) => ({
        ...prevData,
        nacionalidad: nacionalidadSeleccionado,  
      }));
    } else if (name === "rol") {
      const rolSeleccionado = roles.find(tipo => tipo.id === parseInt(value));
      setRegisterData((prevData) => ({
        ...prevData,
        rol: rolSeleccionado,  
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

    // BORRAR
    console.log("Datos enviados al backend", {
      registerData
    });

    try {
      const response = await api.post("/usuarios/registerUsuario",registerData);
      const data = response.data;

      // BORRAR
      console.log("Respuesta del servidor: ", data);
      if(data.status === "200"){
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado con exito',
          showConfirmButton: true,
          timer: 1500
        }).then(() => {
          navigate('Dashboard/usuario')
        });
      }
    } catch (error){
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
      setLoading(false)
    }
  };

  return (
    <form className="row g-1 needs-validation" validate onSubmit={handleRegister}>
      <div className="col-md-4">
        <label htmlFor="tipoDocumento" className='form-label'>Tipo de documento</label>
        <select 
          className="form-select"
          id="tipoDocumento"
          name="tipoDocumento"
          value={registerData.tipoDocumento.id || ""}
          onChange={handleInputChange}
          required
          >
          <option value="" selected disabled>Seleccione su tipo de documento</option>
          {tiposDocumento.map((tipoDoc) => (
            <option key={tipoDoc.id} value={tipoDoc.id}>
              {tipoDoc.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="numeroDocumento" className="form-label">N°. documento</label>
        <input 
          type="number" 
          className="form-control" 
          id="numeroDocumento" 
          name="numeroDocumento" 
          max="9999999999"
          value={registerData.numeroDocumento}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input 
          type="text" 
          className="form-control"
          id="nombre" 
          name="nombre" 
          value={registerData.nombre}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="apellido" className="form-label">Apellido</label>
        <input 
          type="text" 
          className="form-control" 
          id="apellido" 
          name="apellido"
          value={registerData.apellido}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="nacionalidad" className="form-label">Nacionalidad</label>
        <select 
          className="form-select" 
          id="nacionalidad" 
          name="nacionalidad" 
          value={registerData.nacionalidad.id || ""}
          onChange={handleInputChange}
          required
          >
          <option value="" disabled>Seleccione su nacionalidad</option>
          {nacionalidades.map((nacionalidad) => (
            <option key={nacionalidad.id} value={nacionalidad.id}>
              {nacionalidad.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="fechaNacimiento" className="form-label">Fecha Nacimiento</label>
        <input 
          type="date"
          className="form-control" 
          id="fechaNacimiento" 
          name="fechaNacimiento"
          value={registerData.fechaNacimiento}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="direccion" className="form-label">Direccion</label>
        <input 
          type="text" 
          className="form-control" 
          id="direccion" 
          name="direccion" 
          value={registerData.direccion}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="celular" className="form-label">Celular</label>
        <input 
          type="number" 
          className="form-control" 
          id="celular" 
          name="celular" 
          max="9999999999" 
          value={registerData.celular}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="correo" className="form-label">Correo</label>
        <input 
          type="email" 
          className="form-control" 
          id="correo" 
          name="correo" 
          max="9999999999" 
          value={registerData.correo}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-md-4">
        <label htmlFor="genero" className="form-label">Genero</label>
        <select 
          className="form-select"
          id="genero"
          name="genero"
          value={registerData.genero}
          onChange={handleInputChange}
          required
          >
          <option value="" disabled>Seleccione su genero</option>
          <option value="0" >Masculino</option>
          <option value="1" >Femenino</option>
          <option value="2" >Otro</option>
        </select>
      </div>
      <div className="col-md-4">
        <label htmlFor="rol" className="form-label">Rol</label>
        <select 
          className="form-select" 
          id="rol" 
          name="rol"
          value={registerData.rol.id || ""}
          onChange={handleInputChange}
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

      <div className="col-md-4">
        <label htmlFor="contrasena" className="form-label">Contraseña</label>
        <input
          type="password" 
          className="form-control"
          id="contrasena" 
          name="contrasena"
          value={registerData.contrasena}
          onChange={handleInputChange}
          required
          />
      </div>
      <div className="col-12">
        <button className="btn btn-success" type="submit">Registrar</button>
      </div>
    </form>
  )
}

export default RegisterUsuario;