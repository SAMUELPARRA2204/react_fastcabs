<<<<<<< HEAD
  import React, { useEffect } from 'react';
  import Dash from '../Components/Dashboard/BaseDashboard';
  import { useNavigate } from 'react-router-dom';
  import { Outlet } from 'react-router-dom';
  import { useUserContext } from '../Context/UserContext';


  const Dashboard = () => {
    const { user } = useUserContext();
    const navigate = useNavigate();

    useEffect(() => {
      if (!user){
        navigate('/login');
      } else if (user.rol !== 1 && user.rol !== 2){
        navigate('/');
      }
    }, [user, navigate]);

    if (!user) return <div>Cargando...</div>

    const { nombre, rol } = user;

    return (
      <Dash nombre={nombre} rol={rol}>
        <Outlet />
      </Dash> 
    )
  }

  export default Dashboard
=======
import React, { useEffect } from 'react';
import Dash from '../Components/Dashboard/BaseDashboard';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import Swal from 'sweetalert2';

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const { nombre, rol } = user || {};
  const navigate = useNavigate();

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      Swal.fire({
        title: 'Cerrar sesión',
        text: '¿Estás seguro de que quieres cerrar sesión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          logOut();
          Swal.fire({
            title: 'Sesión cerrada',
            text: 'Has cerrado sesión correctamente.',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#c7a17a',
            allowOutsideClick: false
          }).then(() => {
            navigate('/login');
          });
        } else {
          window.history.pushState(null, "", window.location.href);
        }
      });      
    };

      window.history.pushState(null, "", window.location.href);
      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, [navigate, logOut]
  );
  return (
    <Dash nombre={nombre} rol={rol}>
      <Outlet />
    </Dash>
  )
}


export default Dashboard
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
