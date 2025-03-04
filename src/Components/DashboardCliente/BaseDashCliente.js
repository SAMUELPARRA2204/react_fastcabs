import React, { useEffect } from 'react'
import Main from './Main'
import style from '../../assets/style/DashboardCliente.module.css'

const BaseDashCliente = () => {
  useEffect(() => {
    document.body.classList.add(style.cliente);
    return () => {
      document.body.classList.remove(style.cliente);
    };
  }, []);

  return (
    <Main />
  )
}

export default BaseDashCliente