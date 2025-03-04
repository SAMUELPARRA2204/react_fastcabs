import React, { useEffect, useState } from 'react';
import style from '../../../../assets/style/Dashboard.module.css';
import api from '../../../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const RegisterProducto = () => {
  //ESTADOS DATOS SELECT
  const [proveedor, setProveedor] = useState([]);
  const [categoria, SetCategoria] = useState([]);

  //REGISTRO PRODUCTOS
  const [registerData, setRegisterData] = useState
    ({
      nombre: "",
      descripcion: "",
      fechaVencimiento: "",
      proveedor: "",
      valorCompra: "",
      descuento: "",
      stockActual: "",
      categoria: "",
      foto: null
    })

  const [loading, setLoading] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  // OBTENER INFORMACION PARA LOS SELECT
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [proveedorResponse, categoriaResponse] = await Promise.all([
          api.get("/proveedores"),
          api.get("/categorias"),
        ]);
        setProveedor(proveedorResponse.data);
        SetCategoria(categoriaResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos: ", error)
      }
    };
    fetchData();
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "proveedor") {
      setRegisterData((prevData) => ({
        ...prevData,
        proveedor: value,
      }));
    } else if (name === "categoria") {
      setRegisterData((prevData) => ({
        ...prevData,
        categoria: value,
      }));
    } else {
      setRegisterData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setRegisterData((prevData) => ({
      ...prevData,
      foto: e.target.files[0],
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true)

    const formData = new FormData();
    formData.append("nombre", registerData.nombre);
    formData.append("descripcion", registerData.descripcion);
    formData.append("fechaVencimiento", registerData.fechaVencimiento);
    formData.append("proveedor", registerData.proveedor);
    formData.append("valorCompra", registerData.valorCompra);
    formData.append("descuento", registerData.descuento)
    formData.append("stockActual", registerData.stockActual);
    formData.append("categoria", registerData.categoria);

    if (registerData.foto) {
      formData.append("foto", registerData.foto);
    }

    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    try {
      const response = await api.post("/productos/registerProducto", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      //BORRAR
      console.log("Respuesta del servidor: ", data);

      if (data.status === "200") {
        Swal.fire({
          icon: 'success',
          title: 'Producto registrado con exito',
          showConfirmButton: true,
          timer: 1500
        });
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
      setRegisterData({
        nombre: "",
        descripcion: "",
        fechaVencimiento: "",
        proveedor: "",
        valorCompra: "",
        descuento: "",
        stockActual: "",
        categoria: "",
        foto: null
      });
      setLoading(false)
    }
  };

  return (
    <form className={style.formulario} onSubmit={handleRegister}>
      <div className={style.formGroup}>
        <label htmlFor="nombre" className="form-label">Nombre</label>
        <input
          type="text"
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
      <div className={style.formGroup}>
        <label htmlFor="fechaVencimiento" className="form-label">Fecha Vencimiento</label>
        <input
          type="date"
          className="form-control"
          id="fechaVencimiento"
          name="fechaVencimiento"
          value={registerData.fechaVencimiento}
          onChange={handleInputChange}
          placeholder='Fecha de Vencimiento'
          min={today}
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="proveedor" className="form-label">Proveedor</label>
        <select
          className="form-select"
          id="proveedor"
          name="proveedor"
          value={registerData.proveedor}
          onChange={handleInputChange}
          required
        >
          <option value="" >Seleccione un proveedor</option>
          {proveedor.map((prov) => (
            <option key={prov.nit} value={prov.nit}>
              {prov.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className={style.formGroup}>
        <label htmlFor="valorCompra" className="form-label">Valor de compra</label>
        <input
          type="number"
          className="form-control"
          id="valorCompra"
          name="valorCompra"
          value={registerData.valorCompra}
          onChange={handleInputChange}
          max="9999999999"
          placeholder='Valor de Compra'
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="Descuento" className="form-label">Descuento</label>
        <input
          type="number"
          className="form-control"
          id="descuento"
          name="descuento"
          value={registerData.descuento}
          onChange={handleInputChange}
          max="9999999999"
          placeholder='Descuento'
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="stockActual" className="form-label">Stock Inical</label>
        <input
          type="number"
          className="form-control"
          id="stockActual"
          name="stockActual"
          value={registerData.stockActual}
          onChange={handleInputChange}
          max="9999999999"
          placeholder='Stock Inicial'
          required
        />
      </div>
      <div className={style.formGroup}>
        <label htmlFor="categoria" className="form-label">Categoría</label>
        <select
          className="form-select"
          id="categoria"
          name="categoria"
          value={registerData.categoria}
          onChange={handleInputChange}
          required
        >
          <option value="" >Seleccione una categoría</option>
          {categoria.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className={style.formGroup}>
        <label htmlFor="foto" className="form-label">Foto</label>
        <input
          type="file"
          className="form-control"
          id="foto"
          name="foto"
          accept="image/*"
          onChange={handleFileChange}
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
}

export default RegisterProducto