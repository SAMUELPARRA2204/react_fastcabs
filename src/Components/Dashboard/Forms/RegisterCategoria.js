import React, { useState } from 'react'
import api from '../../../Utils/axiosConfig';


const RegisterCategoria = () => {
  // REGISTRO CATEGORIA
  const [registerData, setRegisterData] = useState ({descripcion: ""});

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
    console.log("Datos enviados al backend: ",{
      registerData
    });

    try{
      const response = await api.post("/categoria", registerData);

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
        <label htmlFor="descripcion" className="form-label">Descripción</label>
        <input 
          type="text" 
          className="form-control" 
          id="descripcion" 
          name="descripcion" 
          value={registerData.descripcion}
          onChange={handleInputChange}
          placeholder='Descripcion'
          required 
          />
      </div>
      <div className="col-12">
        <button className="btn btn-success" type="submit">Registrar</button>
      </div>
    </form>
  )
}

export default RegisterCategoria