import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Swal from 'sweetalert2';

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false); 
  const [formData, setFormData] = useState({
    correo: '',
    contrasena: '',
    numeroDocumento: '',
    nombre: '',
    apellido: '',
    celular: '',
    correoRegistro: '',
    contrasenaRegistro: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = (inputId) => {
    const passwordInput = document.getElementById(inputId);
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar campos vacíos
    for (const [key, value] of Object.entries(formData)) {
      if (!value.trim()) {
        newErrors[key] = 'Este campo es obligatorio';
      }
    }

    // Validar correo electrónico
    if (formData.correoRegistro && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.correoRegistro)) {
      newErrors.correoRegistro = 'Por favor ingresa un correo electrónico válido';
    }

    // Validar número de documento
    if (formData.numeroDocumento && formData.numeroDocumento.length < 5) {
      newErrors.numeroDocumento = 'El número de documento debe tener al menos 5 dígitos';
    }

    // Validar celular
    if (formData.celular && formData.celular.length < 5) {
      newErrors.celular = 'El celular debe tener al menos 5 dígitos';
    }

    // Validar contraseña
    if (formData.contrasena && formData.contrasena.length < 5) {
      newErrors.contrasena = 'La contraseña debe tener al menos 5 caracteres';
    }

    return newErrors;
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Iniciar sesión',
        text: 'Usuario validado correctamente',
        confirmButtonText: 'Aceptar'
      });
    } else {
      setErrors(validationErrors);
      // Mostrar el error correspondiente con SweetAlert2
      for (const field in validationErrors) {
        Swal.fire({
          icon: 'error',
          title: `Error en el campo ${field}`,
          text: validationErrors[field],
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Te has registrado correctamente',
        confirmButtonText: 'Aceptar'
      });
    } else {
      setErrors(validationErrors);
      // Mostrar el error correspondiente con SweetAlert2
      for (const field in validationErrors) {
        Swal.fire({
          icon: 'error',
          title: `Error en el campo ${field}`,
          text: validationErrors[field],
          confirmButtonText: 'Aceptar'
        });
      }
    }
  };

  return (
    <div className={`container1 ${isSignUp ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* FORMULARIO INICIO SESION */}
          <form onSubmit={handleLoginSubmit} className="sign-in-form">
            <h2 className="title">Iniciar sesión</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="correo"
                placeholder="Correo electrónico"
                name="correo"
                value={formData.correo}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i
                className="fas fa-eye toggle-password"
                onClick={() => togglePasswordVisibility('contrasena')}
              ></i>
              <input
                type="password"
                id="contrasena"
                placeholder="Contraseña"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="btn btn solid" id="botonalerta">Iniciar sesión</button>
          </form>

          {/* FORMULARIO REGISTRO */}
          <form onSubmit={handleRegisterSubmit} className="sign-up-form">
            <h2 className="title">Registrarse</h2>
            <div className="input-field">
              <i className="fa fa-hashtag"></i>
              <input
                type="number"
                placeholder="Cédula"
                id="numeroDocumento"
                name="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={handleInputChange}
              />
              
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Apellido"
                id="apellido"
                name="apellido"
                value={formData.apellido}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="number"
                placeholder="Celular"
                id="celular"
                name="celular"
                value={formData.celular}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Correo electrónico"
                id="correo-"
                name="correoRegistro"
                value={formData.correoRegistro}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-field">
              <i
                className="fas fa-eye toggle-password"
                onClick={() => togglePasswordVisibility('contrasena-')}
              ></i>
              <input
                type="password"
                placeholder="Contraseña"
                id="contrasena-"
                name="contrasenaRegistro"
                value={formData.contrasenaRegistro}
                onChange={handleInputChange}
              />
            </div>
            <input type="submit" className="btn" value="Registrarse" />
          </form>
        </div>
      </div>

      {/* CONTENEDOR DIALOGO REGISTRAR */}
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Nuevo aquí?</h3>
            <p>
              ¡Únete a nosotros <b>FASTCABS</b> hoy mismo y disfruta de una experiencia única con nuestros servicios!
              <br></br>
              <Link to="/" className="inicio"><h5>Volver al inicio</h5></Link>
              <br></br>
              <b>¡NO TE PIERDAS ESTA OPORTUNIDAD!</b>
            </p>
            <button className="btn transparent" onClick={() => setIsSignUp(true)}>
              <b>Registrarse</b>
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
          <h3>¿Uno de nosotros?</h3>
            <p> ¡Bienvenido de vuelta a <b>FASTCABS</b>! Estamos encantados de verte de nuevo en nuestra comunidad. Iniciar
              sesión te brinda acceso a una experiencia personalizada y muchas ventajas exclusivas.
              <br />
              <Link to="/" className="inicio"><h5>Volver al inicio</h5></Link>
              <br />
              Inicia sesión con tus datos para seguir disfrutando de la experiencia en <b>FASTCABS</b>.
            </p>
            <button className="btn transparent" onClick={() => setIsSignUp(false)}>
              <b>Iniciar sesión</b>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
