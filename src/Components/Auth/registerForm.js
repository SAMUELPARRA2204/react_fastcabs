import React from 'react'

const registerForm = 
(
    {
        togglePasswordVisibility,
        handleInputChange,
        handleRegister,
        registerData,
        loading
    }) => {
  return (
    <form onSubmit={handleRegister} className='sign-up-form'>
        <h2 className='title'>Registrarse</h2>
        <div className='input-field'>
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
        <div className='input-field'>
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
        <div className='input-field'>
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
        <div className='input-field'>
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
        <div className='input-field'>
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
        <div className='input-field'>
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
            className='btn'
            disabled={loading}
        >
        {loading ? "Cargando..." : "Registrarse"}    
        </button>
    </form>
  )
};

export default registerForm;