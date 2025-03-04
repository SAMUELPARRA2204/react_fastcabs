import React, { useState } from 'react';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useUserContext } from '../../Context/UserContext';
import Logo from '../../assets/img/logo.png';
import style from '../../assets/style/Login.module.css';
import api from '../../Utils/axiosConfig';
=======
import style from '../../assets/style/Login.module.css';
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)

import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import RegisterDialog from './RegisterDialog';
import LoginDialog from './LoginDialog';
import ForgotPasswordForm from './ForgotPasswordForm';

<<<<<<< HEAD



const Auth = () => {

    const[isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const navigate = useNavigate();

    const { loginUser } = useUserContext();
    /* ESTADOS*/
    
    // LOGIN
    const [loginData, setLoginData] = useState ({ correo: "", contrasena: ""});
    // REGISTER
=======
const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    /*ESTADO FORMULARIOS*/
    const [loading, setLoading] = useState(false)
    const [loginData, setLoginData] = useState({ correo: "", contrasena: "" });
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    const [registerData, setRegisterData] = useState
    ({
        numeroDocumento: "",
        nombre: "",
        apellido: "",
        celular: "",
        correoRegistro: "",
<<<<<<< HEAD
        contrasenaRegistro: ""  
    });
    // RECUPERAR CONTRSEÑA
    const [emailData, setEmailData] = useState('');
    // BOTON LOADING
    const [loading, setLoading] = useState(false)

    /*FUNCIONES*/
    const handleInputChange = (e,setData) => {
=======
        contrasenaRegistro: ""
    });
    const [emailData, setEmailData] = useState('');
    /*FUNCIONES GENERALES*/
    // INPUT
    const handleInputChange = (e, setData) => {
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
<<<<<<< HEAD

    // ENVIO DATOS DEL LOGIN
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        // BORRAR
        console.log("Datos enviados al backend:", {
            correo: loginData.correo,
            contrasena: loginData.contrasena
        });

        try{
            const response = await api.post("/auth/login",loginData); 
            const data = response.data;
            
            //BORRAR
            console.log("Respuesta del servidor: ", data);

            if(data.status === "success" && (data.rol === 1 || data.rol === 2)){
                Swal.fire({
                    title: `Bienvenido, ${data.nombre}`,
                    text: 'Bienvenido a Fastcabs, disfruta de tu viaje.',
                    imageUrl: Logo,
                    imageWidth: 200,
                    imageHeight: 200,
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    loginUser({ nombre: data.nombre, rol: data.rol});
                    navigate('/Dashboard',{
                        state: {
                            nombre: data.nombre,
                            rol: data.rol
                        }
                    });
                });
            } else if (data.status === "success" && data.rol === 3){
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Inició sesión exitosamente',
                }).then(() => {                    
                    navigate('/',{
                        state: {
                            nombre: data.nombre,
                        },
                    });
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Error desconocido.',
                });
            }
        } catch (error) {

            if(error.response){
                const { status, data }  = error.response;
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

    // ENVIO DE RECUPERAR CONTRASENA 
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await api.post('/auth/recuperar', {correo: emailData.correo});
            const data = response.data;

            if (data.status === 'success') {
                Swal.fire({
                  icon: 'success',
                  title: 'Código enviado',
                  text: 'Revisa tu correo para el código de recuperación.',
                });
            } else if (data.status === 'error' && data.message === 'Se han generado demasiados códigos. Inténtelo más tarde.'){
                Swal.fire({
                    icon: 'error',
                    title: 'Damasiados intentos',
                    text: 'Has alcanzado el límite de intentos. Inténtalo más tarde.',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Ocurrió un error. Intenta más tarde.',
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo procesar la solicitud. Intenta más tarde.',
            });
        } finally {
            setLoading(false)
        }
    };

    // ENVIO DATOS DE REGISTRO CLIENTE
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)

        //BORRAR
        console.log("Datos enviados al backend:", {
            registerData
        });

        try{
            const response = await api.post("/usuarios/registerCliente",{
                numeroDocumento: registerData.numeroDocumento,
                nombre: registerData.nombre,
                apellido: registerData.apellido,
                celular: registerData.celular,
                correo: registerData.correoRegistro,
                contrasena: registerData.contrasenaRegistro
            });

            // BORRAR
            console.log("Respuesta del servidor:", response.data);

        } catch (error) {
            console.error("Error en el registro: ", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las credenciales no son validas. Por favor, intentalo de nuevo.',
            });
        } finally {
            setLoading(false)
        }
    }

    const togglePasswordVisibility = (inputId) => {
        const passwordInput = document.getElementById(inputId);
        if(passwordInput.type === 'password'){
=======
    // CONTRASEÑA
    const togglePasswordVisibility = (inputId) => {
        const passwordInput = document.getElementById(inputId);
        if (passwordInput.type === 'password') {
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };
<<<<<<< HEAD

=======
    // ANIMACION
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    const handleSignUpClick = () => {
        setIsSignUp(true);
        setIsForgotPassword(false)
    };
<<<<<<< HEAD

=======
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
    const handleSignInClick = () => {
        setIsSignUp(false)
        setIsForgotPassword(false)
    };
<<<<<<< HEAD

    const toggleForgotPassword = () => {
        setIsForgotPassword(!isForgotPassword);
    }

  return (
=======
    const toggleForgotPassword = () => {
        setIsForgotPassword(!isForgotPassword);
    }
    
    return (
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
        <div className={`${style['login-container']} ${isSignUp ? style['sign-up-mode'] : ''}`}>
            <div className={style['forms-container']}>
                <div className={style['signin-signup']}>
                    {/* FORMULARIO INICIO DE SESION */}
                    {!isSignUp && !isForgotPassword && (
<<<<<<< HEAD
                        <LoginForm 
                        togglePasswordVisibility={togglePasswordVisibility}
                        handleInputChange={(e) => handleInputChange(e,setLoginData)}
                        handleLogin={handleLogin}
                        loginData={loginData}
                        loading={loading}
                        toggleForgotPassword={toggleForgotPassword}
                    />
                    )}
                    {isSignUp && (
                        <RegisterForm togglePasswordVisibility={togglePasswordVisibility}
                        handleInputChange={(e) => handleInputChange(e,setRegisterData)}
                        handleRegister={handleRegister}
                        registerData={registerData}
                        loading={loading}
                    />
                    )}

                    {isForgotPassword && (
                        <ForgotPasswordForm 
                        toggleForgotPassword ={toggleForgotPassword}
                        handleInputChange={(e) => handleInputChange(e,setEmailData)}
                        handleForgotPassword={handleForgotPassword}
                        emailData={emailData}
                        loading={loading}
                    />
=======
                        <LoginForm
                            handleInputChange={(e) => handleInputChange(e, setLoginData)}
                            loginData={loginData}
                            loading={loading}
                            setLoading={setLoading}
                            togglePasswordVisibility={togglePasswordVisibility}
                            toggleForgotPassword={toggleForgotPassword}
                        />
                    )}
                    {isSignUp && (
                        <RegisterForm 
                            handleInputChange={(e) => handleInputChange(e, setRegisterData)}
                            registerData={registerData}
                            setRegisterData={setRegisterData}
                            loading={loading}
                            setLoading={setLoading}
                            togglePasswordVisibility={togglePasswordVisibility}
                        />
                    )}
                    {isForgotPassword && (
                        <ForgotPasswordForm
                            handleInputChange={(e) => handleInputChange(e, setEmailData)}
                            emailData={emailData}
                            setLoading={setLoading}
                            toggleForgotPassword={toggleForgotPassword}
                        />
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
                    )}
                </div>
            </div>
            <div className={style['panels-container']}>
                {/* DIALOGO REGISTRAR */}
                <RegisterDialog onClick={handleSignUpClick} />
                {/* DIALOGO INICIO SESION */}
<<<<<<< HEAD
                <LoginDialog onClick={handleSignInClick}/>
=======
                <LoginDialog onClick={handleSignInClick} />
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
            </div>
        </div>
    )
}

export default Auth