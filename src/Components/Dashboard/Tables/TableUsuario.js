import React, { useEffect, useState } from 'react';
import api from '../../../Utils/axiosConfig';
<<<<<<< HEAD

const TableUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await api.get("/usuarios");

=======
import UpdateForm from '../Forms/Update/UpdateUsuario';
import Swal from 'sweetalert2';

const TableUsuario = () => {
  /* ESTADOS */
  const [usuarios, setUsuarios] = useState([]); //ESTADOS TABLA USUARIOS
  const [formData, setFormData] = useState({
    tipoDocumento: {},
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
  }); //REGISTRO FOMULARIO EDICION

  // CONSULTA TABLA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await api.get("/usuarios/rol");
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
        setUsuarios(await usuarios.data)
      } catch (error) {
        console.error("Error al caragr los datos: ", error);
      }
    };

    fetchData();
  }, [])
<<<<<<< HEAD
=======

  //FUNCION PARA MANDAR DATOS AL FOMRULARIO EDITAR 
  const handleEdit = (id) => {
    const usuario = usuarios.find(user => String(user.numeroDocumento) === String(id));
    if (!usuario) {
      console.error("Usuario no encontrado");
      return;
    }

    setFormData({
      tipoDocumento: usuario.tipoDocumento || {},
      numeroDocumento: usuario.numeroDocumento || "",
      nombre: usuario.nombre || "",
      apellido: usuario.apellido || "",
      nacionalidad: usuario.nacionalidad || {},
      fechaNacimiento: usuario.fechaNacimiento || "",
      direccion: usuario.direccion || "",
      celular: usuario.celular || "",
      correo: usuario.correo || "",
      genero: usuario.genero || "",
      rol: usuario.rol || {},
      contrasena: "",
    });
  };

  const handleDelete = async (numeroDocumento) => {
    Swal.fire({
      title: "¿Estás seguro de desactivar a este usuario?",
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
          const response = await api.delete(`/usuarios/${numeroDocumento}`);
          const data = response;
          if (data.status === 200) {
            Swal.fire({
              title: "¡Desactivación exitosa!",
              text: "El usuario se ha desactivado con éxito",
              icon: "success"
            });
            setUsuarios((prevUsuarios) =>
              prevUsuarios.filter(usuario => usuario.numeroDocumento !== numeroDocumento));
          };
        } catch (error) {
          Swal.fire({
            title: 'Error',
            text: 'No fue posible desactivar el usuario, comuníquese con el administrador',
            icon: 'error'
          });
        }
      }
    });
  };

>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
  return (
    <div className='container mt-4'>
      <table className='table'>
        <thead>
          <tr>
<<<<<<< HEAD
            
            <th scope="col">N° documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>            
=======
            <th scope="col">N° documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
            <th scope="col">Direccion</th>
            <th scope="col">Celular</th>
            <th scope="col">Correo</th>
            <th scope="col">Rol</th>
            <th scope="col">Editar</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
<<<<<<< HEAD
            <tr key={usuario.numeroDocumento}>              
=======
            <tr key={usuario.numeroDocumento}>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
              <td>{usuario.numeroDocumento}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.celular}</td>
              <td>{usuario.correo}</td>
<<<<<<< HEAD
              <td>{usuario.rol ? usuario.rol.descripcion : 'N/A'}</td>              
              <td><button className="btn btn-warning">Editar</button></td>
              <td><button className="btn btn-danger">Eliminar</button></td>
=======
              <td>{usuario.rol ? usuario.rol.descripcion : 'N/A'}</td>
              <td>
                <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#UpdateUsuarioModal" onClick={() => handleEdit(usuario.numeroDocumento)}>Editar</button>
              </td>
              <td><button className="btn btn-danger" onClick={() => handleDelete(usuario.numeroDocumento)}>Eliminar</button></td>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
            </tr>
          ))}
        </tbody>
      </table>
<<<<<<< HEAD
    </div>
  )
}
=======
      <div className="modal fade" id="UpdateUsuarioModal" tabIndex="-1" aria-labelledby="UpdateUsuarioModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="UpdateUsuarioModalLabel">Actualizar Usuario</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <UpdateForm
                setFormData={setFormData}
                formData={formData}
                setUsuarios={setUsuarios}
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

export default TableUsuario