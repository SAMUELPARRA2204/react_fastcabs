import React, { useEffect } from 'react'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DashCliente from '../Components/DashboardCliente/BaseDashCliente';

const DashboardCliente = () => {
    const { user, logOut } = useAuth();
    const { nombre, rol } = user || {};
    const navigate = useNavigate();

    useEffect(() => {
        const handlePopState = event => {
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
    }, [navigate, logOut]);
    
    return (
        <DashCliente />
    )
}

export default DashboardCliente
