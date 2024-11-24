import React, { useState } from 'react';
import 'react-router-dom';
import Swal from 'sweetalert2';
import Logo from '../../assets/img/logo.png';
import api from '../../utils/axiosConfig';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import RegisterDialog from './registerDialog';
import LoginDialog from './loginDialog';




const Auth = () => {

    const[isSignUp, setIsSignUp] = useState(false);

    const [loginData, setLoginData] = useState ({ correo: "", contrasena: ""});
    const [registerData, setRegisterData] = useState
    ({
        numeroDocumento: "",
        nombre: "",
        apellido: "",
        celular: "",
        correoRegistro: "",
        contrasenaRegistro: ""  
    });

    const [loading, setLoading] = useState(false)

    const handleInputChange = (e,setData) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        // BORRAR
        console.log("Datos enviados al backend:", {
            correo: loginData.correo,
            contrasena: loginData.contrasena
        });

        try{
            const response = await api.post("/auth/login", {
                correo: loginData.correo,
                contrasena: loginData.contrasena
            });

            const data = response.data;
            
            //BORRAR
            console.log("Respuesta del servidor: ", data);

            if(data.status ==="success"){
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
                    window.location.href = '/';
                });
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message || 'Error desconocido.',
                });
            }
        } catch (error) {

            if(error.response){
                const status = error.response.status;
                const message = error.response.data?.message || 'Ocurrio un error inesperado';

                if(status === 401){
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de autenticación',
                        text: 'Las credenciales no son válidas. Por favor, inténtalo de nuevo.',
                    });
                } else if (status === 404){
                    Swal.fire({
                        icon: 'error',
                        title: 'Usuario no encontrado',
                    });    
                } else {
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
            setLoading(false)
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)

        //BORRAR
        console.log("Datos enviados al backend:", {
            registerData
        });

        const response = await api.post("/usuarios/registerCliente",{
            numeroDocumento: registerData.numeroDocumento,
            nombre: registerData.nombre,
            apellido: registerData.apellido,
            celular: registerData.celular,
            correo: registerData.correoRegistro,
            contrasena: registerData.contrasenaRegistro
        });

        // try{
        //     // const response = await api.post("/api/usuarios/registerCliente",{
        //     //     registerData
        //     // });

        //     console.log("Respuesta del servidor:", response.data);

        // } catch (error) {
        //     console.error("Error en el registro: ", error.message);
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Error',
        //         text: 'Las credenciales no son validas. Por favor, intentalo de nuevo.',
        //     });
        // } finally {
        //     setLoading(false)
        // }
    }

    const togglePasswordVisibility = (inputId) => {
        const passwordInput = document.getElementById(inputId);
        if(passwordInput.type === 'password'){
            passwordInput.type = 'text';
        } else {
            passwordInput.type = 'password';
        }
    };

    const handleSignUpClick = () => {
        setIsSignUp(true);
    };

    const handleSignInClick = () => {
        setIsSignUp(false)
    };

  return (
    <div className={`container1 ${isSignUp ? 'sign-up-mode' : ''}`}>
        <div className='forms-cotainer'>
            <div className='signin-signup'>
                {/* FORMULARIO INICIO DE SESION */}
                <LoginForm 
                    togglePasswordVisibility={togglePasswordVisibility}
                    handleInputChange={(e) => handleInputChange(e,setLoginData)}
                    handleLogin={handleLogin}
                    loginData={loginData}
                    loading={loading}
                />
                {/* FORMULARIO REGISTRO USUARIO CLIENTE */}
                <RegisterForm togglePasswordVisibility={togglePasswordVisibility}
                    handleInputChange={(e) => handleInputChange(e,setRegisterData)}
                    handleRegister={handleRegister}
                    registerData={registerData}
                    loading={loading}
                 />
            </div>
        </div>
        <div className='panels-container'>
            {/* DIALOGO REGISTRAR */}
            <RegisterDialog onClick={handleSignUpClick} />
            {/* DIALOGO INICIO SESION */}
            <LoginDialog onClick={handleSignInClick}/>
        </div>
    </div>
  )
}

export default Auth