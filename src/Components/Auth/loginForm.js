<<<<<<< HEAD
import React from 'react'
import style from '../../assets/style/Login.module.css';
const loginForm = 
(
    {
        handleInputChange,
        handleLogin,
        loginData,
        loading,
        togglePasswordVisibility,
        toggleForgotPassword,
    }) => {
        const handleLoginClick = (e) => {
            e.preventDefault();
            handleLogin(e);
        };

  return (
    <form onSubmit={handleLoginClick} className={style['sign-in-form']}>
        <h2 className={style.title}>Iniciar sesion</h2>
        <div className={style['input-field']}>
            <i className='fas fa-envelope'></i>
            <input 
                type='email'
                id='correo'                 
                name='correo'
                value={loginData.correo}
                onChange={(e) => handleInputChange(e)}
                placeholder='Correo electronico'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i 
                className='fas fa-eye toggle-password'
                onClick={() => togglePasswordVisibility('contrasena')}
            />
            <input
                type='password'
                id='contrasena'
                name='contrasena'
                value={loginData.contrasena}
                onChange={(e) => handleInputChange(e)}
                placeholder='Contraseña'
                required
            />
        </div>
        {/* BOTON INICIO DE SESION */}
        <button 
            type='submit'
            className={style.btn + " " + style.btn + " " + style.solid}
            id='botonalerta'
            disabled={loading}
        >
          {loading ? "Cargando..." : "Iniciar sesion"}
        </button>
        {/* Enlace para "¿Olvidaste tu contraseña?" */}
        <button
            type="button"
            className={style['forgot-password-link']}
            onClick={toggleForgotPassword}
        >
            ¿Olvidaste tu contraseña?
        </button>

        <p className={style['social-text']}>Conoce mas de nosotros:</p>
        <div className={style['social-media']}>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-facebook'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-twitter'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className={style['social-icon']}>
                <i className='fab fa-tiktok'></i>
            </a>
        </div>
    </form>
  )
};
=======
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../assets/img/logo.png';
import style from '../../assets/style/Login.module.css';
import api from '../../Utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../Context/AuthContext';

const LoginForm = ({
    handleInputChange,
    loginData,
    loading,
    setLoading,
    toggleForgotPassword,
    togglePasswordVisibility,
}) => {
    const navigate = useNavigate();
    const { login } = useAuth();
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        /*BORRAR*/
        console.log("Datos enviados al backend", {
            correo: loginData.correo,
            contrasena: loginData.contrasena
        });

        try {
            const response = await api.post("/auth/login", loginData);
            const data = response.data;

            /*BORRAR*/
            console.log("Respuesta del servidor: ", data);

            if (data.status === "success") {

                const decodeToken = jwtDecode(data.token);
                //BORRAR
                console.log('Datos del token: ', decodeToken);

                login(decodeToken, data.token);
                localStorage.setItem('token', data.token);

                const { rol, nombre } = decodeToken;

                if (rol === 1 || rol === 2) {
                    Swal.fire({
                        title: `Bienvenido, ${nombre}`,
                        text: 'Bienvenido a Fastcabs, disfruta de tu viaje.',
                        imageUrl: Logo,
                        imageWidth: 200,
                        imageHeight: 200,
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    }).then(() => {
                        navigate('/Dashboard');
                    });
                } else if (rol === 3) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        },
                    });
                    Toast.fire({
                        icon: 'success',
                        title: 'Inició sesión exitosamente',
                        text: `Bievenido a Fastcabs ${nombre}`,
                    }).then(() => {
                        navigate('/Cliente');
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Error desconocido.',
                });
            }
        } catch (error) {
            if (error.response) {
                const { status, data } = error.response;
                const message = data?.message || 'Ocurrio un error inesperado';
                switch (status) {
                    case 401:
                        Swal.fire({
                            icon: 'error',
                            title: 'Error de autenticación',
                            text: 'Las credenciales no son válidas. Por favor, inténtalo de nuevo.',
                        });
                        break;
                    case 404:
                        Swal.fire({
                            icon: 'error',
                            title: 'Usuario no encontrado',
                        });
                        break;
                    default:
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: message,
                        });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema con la autenticación. Intenta de nuevo más tarde.',
                });
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleLogin} className={style['sign-in-form']}>
            <h2 className={style.title}>Iniciar sesion</h2>
            <div className={style['input-field']}>
                <i className='fas fa-envelope'></i>
                <input
                    type='email'
                    id='correo'
                    name='correo'
                    value={loginData.correo}
                    onChange={handleInputChange}
                    placeholder='Correo electronico'
                    required
                />
            </div>
            <div className={style['input-field']}>
                <i
                    className='fas fa-eye toggle-password'
                    onClick={() => togglePasswordVisibility('contrasena')}
                />
                <input
                    type='password'
                    id='contrasena'
                    name='contrasena'
                    value={loginData.contrasena}
                    onChange={handleInputChange}
                    placeholder='Contraseña'
                    required
                />
            </div>
            {/* BOTON INICIO DE SESION */}
            <button
                type='submit'
                className={style.btn + " " + style.btn + " " + style.solid}
                id='botonalerta'
                disabled={loading}
            >
                {loading ? "Cargando..." : "Iniciar sesion"}
            </button>
            {/* Enlace para "¿Olvidaste tu contraseña?" */}
            <button
                type="button"
                className={style['forgot-password-link']}
                onClick={toggleForgotPassword}
            >
                ¿Olvidaste tu contraseña?
            </button>

            <p className={style['social-text']}>Conoce mas de nosotros:</p>
            <div className={style['social-media']}>
                <a href='#' className={style['social-icon']}>
                    <i className='fab fa-facebook'></i>
                </a>
                <a href='#' className={style['social-icon']}>
                    <i className='fab fa-twitter'></i>
                </a>
                <a href='#' className={style['social-icon']}>
                    <i className='fab fa-instagram'></i>
                </a>
                <a href='#' className={style['social-icon']}>
                    <i className='fab fa-tiktok'></i>
                </a>
            </div>
        </form>
    )
}

export default LoginForm