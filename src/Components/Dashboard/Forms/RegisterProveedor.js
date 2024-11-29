import React, { useState } from 'react';
import api from '../../../Utils/axiosConfig';


const RegisterProveedor = () => {
  // REGISTRO PROVEEDOR
  const [registerData, setRegisterData] = useState
    ({
      nit: "",
      nombre: "",
      celular: "",
      direccion: "",
      correo: ""
    });

  // BOTON LOADING
  const [loading, setLoading] = useState(false);

  // FUNCIONES
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)
  
    // BORRAR
    console.log("Datos enviados al backend: ", {
      registerData
    });
  
    try {
      const response = await api.post("/proveedor/registerProveedor",
        registerData
      );
  
      // BORRAR
      console.log("Respuesta del servidor: ", response.data);
    } catch (error) {
      console.error("Error en el registro: ", error.message);
    } finally {
      setLoading(false)
    }
  };

  return (
    <form className="row g-3 needs-validation" validate onSubmit={handleRegister}>
      <div className="col-md-4">
        <label htmlFor="nit" className="form-label">Nit</label>
        <input
          type="number"
          className="form-control"
          id="nit"
          name="nit"
          value={registerData.nit}
          onChange={handleInputChange}
          placeholder='Nit'
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input type="text"
          className="form-control"
          id="nombre"
          name="nombre"
          value={registerData.nombre}
          onChange={handleInputChange}
          placeholder='Nombre'
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="celular" className="form-label">Celular</label>
        <input type="number"
          className="form-control"
          id="celular"
          name="celular"
          value={registerData.celular}
          onChange={handleInputChange}
          maxlength="10"
          placeholder='Celular'
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="direccion" className="form-label">Direccion</label>
        <input type="text"
          className="form-control"
          id="direccion"
          name="direccion"
          value={registerData.direccion}
          onChange={handleInputChange}
          placeholder='Direccion'
          required
        />
      </div>
      <div className="col-md-4">
        <label htmlFor="correo" className="form-label">Correo</label>
        <input type="email"
          className="form-control"
          id="correo"
          name="correo"
          value={registerData.correo}
          onChange={handleInputChange}
          placeholder='Correo'
          required
        />
      </div>
      <div className="col-12">
        <button className="btn btn-success" type="submit" disabled={loading}>
        {loading ? "Registrando..." : "Registrar"}
        </button>
      </div>
    </form>
  )
};

export default RegisterProveedor