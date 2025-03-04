import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';  
import style from '../../../assets/style/Dashboard.module.css';
import api from '../../../Utils/axiosConfig';

const CardReportes = () => {
  const navigate = useNavigate();  

  const generarReporte = async (event) => {
    event.preventDefault();  

    try {
      const response = await api.get('/reportes/producto',
        { 
        responseType: 'blob',  
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Reporte de Productos.pdf'); 
      document.body.appendChild(link);
      link.click();

      Swal.fire({
        title: '¡Reporte generado!',
        text: 'El reporte de productos se ha generado correctamente.',
        icon: 'success',
      }).then(() => {
        navigate('/Dashboard/producto'); 
      });

    } catch (error) {
      console.error("Error al generar el reporte", error);
      Swal.fire({
        title: 'Error',
        text: 'No fue posible generar el reporte, por favor intente de nuevo.',
        icon: 'error',
      });
    }
  };

  return (
    <div>
      <div className={style.cardContainer} onClick={generarReporte}>
        <div className={style.numbers}>284</div>
        <div className={style.cardName}>Reportes</div>
      </div>
    </div>
  );
};

export default CardReportes;
