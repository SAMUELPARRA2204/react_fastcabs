import React, { useState } from 'react'
import style from '../../assets/style/DashboardCliente.module.css'
import Nav from './Nav'
import MiPerfil from './Layouts/MiPerfil'
import ResumenPedido from './Layouts/ResumenPedido'
import { useAuth } from '../../Context/AuthContext'

const Main = () => {
  const [section, setSection] = useState('ResumenPedido')
  const { user } = useAuth();
  console.log(user);
  return (
    <div className={style.containerCliente}>
      <h1>Bienveido, {user?.nombre || 'Usuario'}</h1>
      <p className={style.welcomeMessage}>Estamos encantados de tenerte aquí. Explora tu perfil y realiza tus pagos de manera fácil y rápida.</p>
      <Nav setSection={setSection} />
      {section === 'ResumenPedido' ? (
        <div>
          <ResumenPedido />
        </div>
      ) : (
        <div>
          <MiPerfil />
        </div>
      )}
    </div>
  )
}

export default Main
