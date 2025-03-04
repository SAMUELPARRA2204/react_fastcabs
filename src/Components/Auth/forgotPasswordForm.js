import React from 'react'
<<<<<<< HEAD
import style from '../../assets/style/Login.module.css';

const forgotPasswordForm = 
(
    {
        handleInputChange,
        handleForgotPassword,
        emailData,
        loading,
        toggleForgotPassword,
    }) => {
        const handleForgotPasswordClick = (e) =>{
            e.preventDefault();
            handleForgotPassword(e)
        }
  return (
    <form onSubmit={handleForgotPasswordClick} className={style['forgot-password-form']}>
=======
import api from '../../Utils/axiosConfig';
import Swal from 'sweetalert2';
import style from '../../assets/style/Login.module.css';


const ForgotPasswordForm = ({
        handleInputChange,
        emailData,
        loading,
        setLoading,
        toggleForgotPassword,
    }) => {
// ENVIO DE RECUPERAR CONTRASENA 
const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await api.post('/auth/recuperar', { correo: emailData.correo });
        const data = response.data;

        if (data.status === 'success') {
            Swal.fire({
                icon: 'success',
                title: 'Código enviado',
                text: 'Revisa tu correo para el código de recuperación.',
            });
        } else if (data.status === 'error' && data.message === 'Se han generado demasiados códigos. Inténtelo más tarde.') {
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
  return (
    <form onSubmit={handleForgotPassword} className={style['forgot-password-form']}>
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
        <h2>Recuperar Contraseña</h2>
        <div className={style['input-field']}>
            <i className='fas fa-envelope'></i>
            <input
                type="email"
                id='correo'
                name="correo"
                value={emailData.correo}
                onChange={handleInputChange}
                required
                placeholder='Correo registrado'
            />
        </div>
<<<<<<< HEAD
        <button  className={style.btn} disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar código'}
        </button>
        {/* <button className="btn-secundary" type="button" onClick={(e) => {e.preventDefault(); toggleForgotPassword();}}>
            Cancelar
        </button> */}
    </form>
  );
};
export default forgotPasswordForm
=======
        <button  className={style.btn} disabled={loading} onClick={(e) => {e.preventDefault(); toggleForgotPassword(); }}>
            {loading ? 'Enviando...' : 'Recuperar'}
        </button>
        <button className={style.btn} type="button" onClick={(e) => {e.preventDefault(); toggleForgotPassword();}}>
            Cancelar
        </button>
    </form>
  );
};
export default ForgotPasswordForm
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
