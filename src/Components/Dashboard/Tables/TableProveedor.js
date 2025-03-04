<<<<<<< HEAD
import React from 'react'

const TableProveedor = () => {
  return (
    <div className='container mt-4'>
        <table className='table'>
            <thead>
                <tr>
                    <th scope="col">Nit</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Celular</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Correo</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
=======
import React, { useEffect, useState } from 'react';
import api from '../../../Utils/axiosConfig';
import UpdateForm from '../Forms/Update/UpdateProveedor'
import Swal from 'sweetalert2';

const TableProveedor = () => {
  /*ESTADOS*/
  const [proveedores, setProveedores] = useState([]); //ESTADOS TABLA PROVEEDORES
  const [formData, setFormData] = useState({
    nit: "",
    nombre: "",
    celular: "",
    direccion: "",
    correo: "",
  }); // REGISTRO DATOS FORMULARIO EDICION

  // CONSULTA TABLA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const proveedores = await api.get("/proveedores")
        setProveedores(await proveedores.data)
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    };
    fetchData();
  }, [])

  // FUNCION PARA MANDAR DATOS AL FORMULARIO DE EDITAR
  const handleEdit = (id) => {
    const proveedor = proveedores.find(prov => String(prov.nit) === String(id));
    if (!proveedor) {
      console.error("Proveedor no encontrado");
      return;
    }

    setFormData({
      nit: proveedor.nit,
      nombre: proveedor.nombre,
      celular: proveedor.celular,
      direccion: proveedor.direccion,
      correo: proveedor.correo,
    });
  };

  const handleDelete = async (nit) => {
    console.log(nit);
    Swal.fire({
      title: "¿Estás seguro de desactivar a este proveedor?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await api.delete(`/proveedores/${nit}`);
          const data = response;
          if (data.status === 200) {
            Swal.fire({
              title: "¡Desactivación exitosa!",
              text: "El proveedor se ha desactivado con éxito",
              icon: "success"
            });
            setProveedores((prevProveedores) =>
              prevProveedores.filter(proveedor => proveedor.nit !== nit));
          };
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No fue posible desactivar el proveedor, comuníquese con el administrador',
            icon: 'error'
          });
        }
      }
    });
  };

  return (
    <div className='container mt-4'>
      <table className='table'>
        <thead>
          <tr>
            <th scope="col">Nit</th>
            <th scope="col">Nombre</th>
            <th scope="col">Celular</th>
            <th scope="col">Direccion</th>
            <th scope="col">Correo</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.nit}>
              <td>{proveedor.nit}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.celular}</td>
              <td>{proveedor.direccion}</td>
              <td>{proveedor.correo}</td>
              <td>
                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#UpdateProveedorModal" onClick={() => handleEdit(proveedor.nit)}>Editar</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(proveedor.nit)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal fade" id="UpdateProveedorModal" tabIndex="-1" aria-labelledby="UpdataProveedorModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="UpdateProveedorModalLabel">Registrar Proveedor</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <UpdateForm
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
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    </div>
  )
}

export default TableProveedor