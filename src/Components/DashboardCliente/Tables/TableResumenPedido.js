import React from 'react'
import style from '../../../assets/style/DashboardCliente.module.css'
import Swal from 'sweetalert2';
import api from '../../../Utils/axiosConfig';
import { useCart } from '../../../Context/CartContext';
import { useAuth } from '../../../Context/AuthContext';


const TableResumenPedido = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

const handlePagarMercadoPago = async () => {
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito Vacio",
        text: "Agregar productos antes de pagar.",
        icon: "warning",
        confirmButtonColor: "#c7a17a",
      });
      return;
    }

    Swal.fire({
      title: "Generando referencia de pago",
      text: "Espera un momento...",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const items = cart.map(item => ({
        title: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price), 
        currency_id: "COP"
      }));
      console.log("Items a enviar:", items);
      const response = await api.post(`/mercadoPago/crearPreferencia`, { 
        items,
        email: user.correo 
      });

      const data = response.data;
      if (data.sandbox_init_point) {
        window.location.href = data.sandbox_init_point;
      } else {
        Swal.fire({
          title: "Error",
          text: "No se pudo generar el pago.",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al conectarse con Mercado Pago.",
        icon: "error",
      });
    }
  }

  return (
    <>
      {cart.length === 0 ? (
        <p>El carrito esta vacio</p>
      ) : (
        <table className={style.clienteTable}>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.price.toLocaleString()}</td>
                <td>{(item.price * item.quantity).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}><strong>Total a pagar:</strong></td>
              <td><strong>${total.toLocaleString()}</strong></td>
            </tr>
          </tfoot>
        </table>
      )}

      <div className={style.navCliente}>
        <ul>
          {/* <li>
            <button onClick={handleFinalizarPedido}>
              Finalizar Pedido
            </button>
          </li> */}
          <li>
              <button onClick={handlePagarMercadoPago}>
                Pagar con Mercado Pago
              </button>
            </li>
        </ul>
      </div>
    </>
  );
};
export default TableResumenPedido


// const handleFinalizarPedido = async () => {
//   if (cart.length === 0) {
//     Swal.fire({
//       title: "Carrito Vacío",
//       text: "Agrega productos antes de finalizar el pedido.",
//       icon: "warning",
//       confirmButtonColor: "#c7a17a",
//     });
//     return;
//   }

//   const { value: formValues } = await Swal.fire({
//     title: "Completa la información de entrega",
//     html: `
//         <input id="swal-fechaEntrega" class="swal2-input" type="date" placeholder="Fecha de Entrega">
//         <input id="swal-barrio" class="swal2-input" placeholder="Barrio">
//         <input id="swal-direccion" class="swal2-input" placeholder="Dirección de Entrega">
//         <input id="swal-celular" class="swal2-input" placeholder="Celular">
//       `,
//     focusConfirm: false,
//     showCancelButton: true,
//     confirmButtonColor: "#c7a17a",
//     preConfirm: () => {
//       return {
//         fechaEntrega: document.getElementById("swal-fechaEntrega").value,
//         barrio: document.getElementById("swal-barrio").value,
//         direccionEntrega: document.getElementById("swal-direccion").value,
//         celular: document.getElementById("swal-celular").value,
//       };
//     },
//   });
//   if (!formValues) return;
//   Swal.fire({
//     title: "Registrando pedido...",
//     text: "Espera un momento...",
//     icon: "info",
//     allowOutsideClick: false,
//     showConfirmButton: false,
//     didOpen: () => {
//       Swal.showLoading();
//     },
//   });

//   try {
//     const pedidoData = {
//       usuarioId: user.numeroDocumento,
//       fechaEntrega: formValues.fechaEntrega,
//       barrio: formValues.barrio,
//       direccionEntrega: formValues.direccionEntrega,
//       celular: formValues.celular,
//       subTotal: total,
//       total: total,
//       domiciliarioEntrega: "1234567890", // Esto debería cambiarse dinámicamente
//       detalles: cart.map(item => ({
//         productoId: item.id,
//         cantidadProductos: item.quantity
//       }))
//     };

//     const response = await api.post("/pedidos", pedidoData);

//     if (response.status === 200) {
//       Swal.fire({
//         title: "Pedido registrado",
//         text: "Tu pedido ha sido registrado correctamente.",
//         icon: "success",
//         confirmButtonColor: "#c7a17a",
//       });
//     }
//   } catch (error) {
//     Swal.fire({
//       title: "Error",
//       text: "Hubo un problema al registrar el pedido.",
//       icon: "error",
//     });
//   }
// }
