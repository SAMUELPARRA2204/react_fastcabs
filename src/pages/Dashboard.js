  import React, { useEffect } from 'react';
  import Dash from '../Components/Dashboard/BaseDashboard';
  import { useNavigate } from 'react-router-dom';
  import { Outlet } from 'react-router-dom';
  import { useUserContext } from '../Context/UserContext';
  import '../assets/style/styleDashboard.css';

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