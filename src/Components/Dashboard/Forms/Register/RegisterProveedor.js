import React, { useState } from 'react';
import api from '../../../../Utils/axiosConfig';
import style from '../../../../assets/style/Dashboard.module.css';
import Swal from 'sweetalert2';


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

  //ENVIO DATOS DE REGISTRO PROVEEDOR
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

    // BORRAR
    console.log("Datos enviados al backend: ", {
      registerData
    });

    try {
      const response = await api.post("/proveedores/registerProveedor",
        registerData
      );
      const data = response.data;

      // BORRAR
      console.log("Respuesta del servidor: ", response.data);
      if (data.status === "200") {
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado con exito',
          showConfirmButton: true,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.log("Estructura del error: ", error.response.data);
        const errorMessage = error.response.data.message || 'Ha ocurrido un error inesperado o el proveedor ya esta registrado.';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
        })
      }
    } finally {
      setRegisterData({
        nit: "",
        nombre: "",
        celular: "",
        direccion: "",
        correo: "",
      });
      setLoading(false)
    }
  };

  return (
    <form className={style.formulario} onSubmit={handleRegister}>
      <div className={style.formGroup}>
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
      <div className={style.formGroup}>
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
      <div className={style.formGroup}>
        <label htmlFor="celular" className="form-label">Celular</label>
        <input type="number"
          className="form-control"
          id="celular"
          name="celular"
          value={registerData.celular}
          onChange={handleInputChange}
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
          value={registerData.direccion}
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