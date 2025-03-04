import React from 'react'
<<<<<<< HEAD
import style from '../../assets/style/Login.module.css';

const registerForm = 
(
    {
        handleInputChange,
        handleRegister,
        registerData,
        loading,
        togglePasswordVisibility,        
    }) => {
        const handleRegisterClick = (e) =>{
            e.preventDefault();
            handleRegister(e)
        }
  return (
    <form onSubmit={handleRegisterClick} className={style['sign-up-form']}>
        <h2 className={style.title}>Registrarse</h2>
        <div className={style['input-field']}>
            <i className='fas fa-hashtag'></i>
            <input 
                type='number'
                id='numeroDocumento'
                name='numeroDocumento'
                value={registerData.numeroDocumento}
                onChange={handleInputChange}
                placeholder='N° Documento'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i className='fas fa-user'></i>
            <input 
                type='text'
                id='nombre'
                name='nombre'
                value={registerData.nombre}
                onChange={handleInputChange}
                placeholder='Nombre'
                maxLength='10'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i className='fas fa-user'></i>
            <input 
                type='text'
                id='apellido'
                name='apellido' 
                value={registerData.apellido}
                onChange={handleInputChange}
                placeholder='Apellido'
                maxLength='10'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i className='fas fa-phone'></i>
            <input 
                type='number'
                id='celular'
                name='celular'
                value={registerData.celular}
                onChange={handleInputChange}
                placeholder='Celular'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i className='fas fa-envelope'></i>
            <input 
                type='email'
                id='correoRegistro'                 
                name='correoRegistro'
                value={registerData.correoRegistro}
                onChange={handleInputChange}
                placeholder='Correo electronico'
                required
            />
        </div>
        <div className={style['input-field']}>
            <i 
                className='fas fa-eye toggle-password'
                onClick={() => togglePasswordVisibility('contrasenaRegistro')}
            />
            <input
                type='password'
                id='contrasenaRegistro'
                name='contrasenaRegistro'
                value={registerData.contrasenaRegistro}
                onChange={handleInputChange}
                placeholder='Contraseña'
                minLength='8'
                required
            />
        </div>
        <button
            type='submit'
            className={style.btn}
            disabled={loading}
        >
        {loading ? "Cargando..." : "Registrarse"}    
        </button>
    </form>
  )
=======
import { useNavigate } from 'react-router-dom';
import style from '../../assets/style/Login.module.css';
import Swal from 'sweetalert2';
import api from '../../Utils/axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../Context/AuthContext';
import { faSmileWink } from '@fortawesome/free-regular-svg-icons';

const RegisterForm = ({
    handleInputChange,
    registerData,
    setRegisterData,
    loading,
    setLoading,
    togglePasswordVisibility,
}) => {
    const navigate = useNavigate();
    const { login } = useAuth();

    // ENVIO DATOS DE REGISTRO CLIENTE
    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)

        const inputs = [registerData.nombre, registerData.apellido];
        const Regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

        const sonValidos = inputs.every(input => Regex.test(input));
        
        
        if(!sonValidos){
            const Toast = Swal.mixin({
                toast: true,
                position: "top",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseenter = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: 'error',
                title: 'Nombre o apellido no validos',
                text: 'Los campos nombre y apellido deben contener solo letras.',
            });
            setLoading(false);
            return;
        }

        const password = registerData.contrasenaRegistro;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if(!passwordRegex.test(password)){
            Swal.fire({
                icon: 'error',
                title: 'Contraseña no válida',
                text: 'Debe tener al menos 8 caracteres, una mayúscula, una minuscula y un número.',
            });
            setLoading(false);
            return;
        }

        
        /*BORRAR*/
        console.log("Datos enviados al backend:", registerData);

        try {
            const response = await api.post("/usuarios/registerCliente", {
                numeroDocumento: registerData.numeroDocumento,
                nombre: registerData.nombre,
                apellido: registerData.apellido,
                celular: registerData.celular,
                correo: registerData.correoRegistro,
                contrasena: registerData.contrasenaRegistro
            });

            const data = response.data;
            /*BORRAR*/
            console.log("Respuesta del servidor:", data);

            if (data.status === "success" && data.token) {
                const decodeToken = jwtDecode(data.token);
                //BORRAR
                console.log('Datos del token cliente: ', decodeToken);

                login(decodeToken, data.token);
                localStorage.setItem('token', data.token);

                const nombre = decodeToken.nombre;

                Swal.fire({
                    icon: 'success',
                    title: `Te haz registrado con exito. Bienvenid@, ${nombre}`,
                    showConfirmButton: true,
                    timer: 1500
                }).then(() => {
                    navigate('/')
                });
            } else {
                throw new Error("No se recibío un token válido.");
            }
        } catch (error) {
            console.error("Error en el registro: ", error.message);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Las credenciales no son validas. Por favor, intentalo de nuevo.',
            });
        } finally {
            setRegisterData({
                numeroDocumento: "",
                nombre: "",
                apellido: "",
                celular: "",
                correoRegistro: "",
                contrasenaRegistro: ""
            });
            setLoading(false)
        }
    };

    return (
        <form onSubmit={handleRegister} className={style['sign-up-form']}>
            <h2 className={style.title}>Registrarse</h2>
            <div className={style['input-field']}>
                <i className='fas fa-hashtag'></i>
                <input
                    type='number'
                    id='numeroDocumento'
                    name='numeroDocumento'
                    value={registerData.numeroDocumento}
                    onChange={handleInputChange}
                    placeholder='N° Documento'
                    min='1000000'
                    max='99999999999'
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Debe tener entre 8 y 12 digitos")}
                    onInput={(e) => e.target.setCustomValidity("")}
                />
            </div>
            <div className={style['input-field']}>
                <i className='fas fa-user'></i>
                <input
                    type='text'
                    id='nombre'
                    name='nombre'
                    value={registerData.nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre'
                    maxLength='20'
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Debe tener solo letras")}
                    onInput={(e) => e.target.setCustomValidity("")}
                />
            </div>
            <div className={style['input-field']}>
                <i className='fas fa-user'></i>
                <input
                    type='text'
                    id='apellido'
                    name='apellido'
                    value={registerData.apellido}
                    onChange={handleInputChange}
                    placeholder='Apellido'
                    maxLength='20'
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Debe tener solo letras")}
                    onInput={(e) => e.target.setCustomValidity("")}
                />
            </div>
            <div className={style['input-field']}>
                <i className='fas fa-phone'></i>
                <input
                    type='number'
                    id='celular'
                    name='celular'
                    value={registerData.celular}
                    onChange={handleInputChange}
                    placeholder='Celular'
                    min='1000000'
                    max='9999999999'
                    required
                    onInvalid={(e) => e.target.setCustomValidity("Debe tener entre 7 y 10 digitos")}
                    onInput={(e) => e.target.setCustomValidity("")}
                />
            </div>
            <div className={style['input-field']}>
                <i className='fas fa-envelope'></i>
                <input
                    type='email'
                    id='correoRegistro'
                    name='correoRegistro'
                    value={registerData.correoRegistro}
                    onChange={handleInputChange}
                    placeholder='Correo electronico'
                    maxLength='20'
                    required
                />
            </div>
            <div className={style['input-field']}>
                <i
                    className='fas fa-eye toggle-password'
                    onClick={() => togglePasswordVisibility('contrasenaRegistro')}
                />
                <input
                    type='password'
                    id='contrasenaRegistro'
                    name='contrasenaRegistro'
                    value={registerData.contrasenaRegistro}
                    onChange={handleInputChange}
                    placeholder='Contraseña'
                    minLength='8'
                    required
                />
            </div>
            <button
                type='submit'
                className={style.btn}
                disabled={loading}
            >
                {loading ? "Cargando..." : "Registrarse"}
            </button>
        </form>
    )
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
};

export default RegisterForm;