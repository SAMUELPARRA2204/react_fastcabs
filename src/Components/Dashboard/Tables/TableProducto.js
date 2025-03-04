<<<<<<< HEAD
import React from 'react'

const TableProducto = () => {
  return (
    <div className='container mt-4'>
        <table className='table'>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha Vencimiento</th>
                    <th scope="col">Proveedor</th>
                    <th scope="col">Valor compra</th>
                    <th scope="col">Valor venta</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">categoria</th>
                    <th scope="col">foto</th>
                    <th scope="col">Editar</th>
                    <th scope="col">Eliminar</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
  )
}

export default TableProducto
=======
import React, { useEffect, useState } from 'react';
import api from '../../../Utils/axiosConfig';
import UpdateForm from '../Forms/Update/UpdateProducto';
import Swal from 'sweetalert2';

const TableProducto = () => {
  /*ESTADOS*/
  const [productos, setProductos] = useState([]); //ESTADOS TABLA PRODUCTOS
  const [formData, setFormData] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    fechaVencimiento: "",
    proveedor: {},
    valorCompra: "",
    descuento: "",
    stockActual: "",
    categoria: {},
    fotoUrl: null,
    stockMax: "",
  }); //REGISTRO FOMULARIO EDICION

  //CONSULA TABLA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productos = await api.get("/productos");
        setProductos(await productos.data);
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    const producto = productos.find(prod => String(prod.id) === String(id));
    if (!producto) {
      console.error("Proveedor no encontrado");
      return;
    }
    setFormData({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      fechaVencimiento: producto.fechaVencimiento,
      proveedor: { nit: producto.proveedor.nit },
      valorCompra: producto.valorCompra,
      valorVenta: producto.valorVenta,
      cantidad: producto.cantidad,
      categoria: { id: producto.categoria.id },
      fotoUrl: producto.fotoUrl || null,
      descuento: producto.descuento,
      stockActual: producto.stockActual,
      stockMin: producto.stockMin,
      stockMax: producto.stockMax,
    }); //DATOS QUE ENVIA AL FORMULARIO
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "¿Estás seguro de desactivar a este producto?",
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
          const response = await api.delete(`/productos/${id}`);
          const data = response;
          if (data.status === 200) {
            Swal.fire({
              title: "¡Desactivación exitosa!",
              text: "El producto se ha desactivado con éxito",
              icon: "success"
            });
            setProductos((prevProductos) =>
              prevProductos.filter(producto => producto.id !== id));
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
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Fecha Vencimiento</th>
            <th scope="col">Proveedor</th>
            <th scope="col">Valor compra</th>
            <th scope="col">Valor venta</th>
            <th scope='col'>Stock Actual</th>
            <th scope="col">Foto</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>{producto.descripcion}</td>
              <td>{producto.fechaVencimiento}</td>
              <td>{producto.proveedor.nombre || "No disponible"}</td>
              <td>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(producto.valorCompra)}
              </td>
              <td>
                {new Intl.NumberFormat("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(producto.valorVenta)}
              </td>
              <td>{producto.stockActual}</td>
              <td>
                {producto.fotoUrl && (
                  <img
                    src={producto.fotoUrl}
                    alt={producto.nombre}
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>
                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#UpdateProductoModal" onClick={() => handleEdit(producto.id)}>Editar</button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="modal fade" id="UpdateProductoModal" tabIndex="-1" aria-labelledby="UpdateProductoModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="UpdateProductoModalLabel">Actualizar Producto</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <UpdateForm
                setFormData={setFormData}
                formData={formData}
                setProductos={setProductos}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableProducto;
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
