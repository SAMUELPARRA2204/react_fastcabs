import React, { useEffect, useState } from 'react';
import api from '../../../Utils/axiosConfig';

const TableUsuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await api.get("/usuarios");

        setUsuarios(await usuarios.data)
      } catch (error) {
        console.error("Error al caragr los datos: ", error);
      }
    };

    fetchData();
  }, [])
  return (
    <div className='container mt-4'>
      <table className='table'>
        <thead>
          <tr>
            
            <th scope="col">N° documento</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>            
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
            <tr key={usuario.numeroDocumento}>              
              <td>{usuario.numeroDocumento}</td>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.direccion}</td>
              <td>{usuario.celular}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.rol ? usuario.rol.descripcion : 'N/A'}</td>              
              <td><button className="btn btn-warning">Editar</button></td>
              <td><button className="btn btn-danger">Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableUsuario