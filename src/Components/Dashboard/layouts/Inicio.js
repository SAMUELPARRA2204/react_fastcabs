import React from 'react';
import style from '../../../assets/style/Dashboard.module.css';
<<<<<<< HEAD

const Inicio = () => {
  return (
    <>
    {/* CARDS */}
    <div className={style.cardBox}>
        <a className={style.card}>
            <div>
                <div className={style.numbers}>1,504</div>
                <div className={style.cardName}>Usuarios</div>
            </div>

            <div className={style.iconBx}>
                <ion-icon name="eye-outline"></ion-icon>
            </div>
        </a>

        <a className={style.card}>
            <div>
                <div className={style.numbers}>80</div>
                <div className={style.cardName}>Productos</div>
            </div>

            <div className={style.iconBx}>
                <ion-icon name="cart-outline"></ion-icon>
            </div>
        </a>

        <a className={style.card}>
            <div>
                <div className={style.numbers}>284</div>
                <div className={style.cardName}>Pedidos</div>
            </div>

            <div className={style.iconBx}>
                <ion-icon name="chatbubbles-outline"></ion-icon>
            </div>
        </a>

        <a className={style.card}>
            <div>
            <div className={style.numbers}>284</div>
                <div className={style.cardName}>Reportes</div>
            </div>

            <div className={style.iconBx}>
                <ion-icon name="cash-outline"></ion-icon>
            </div>
        </a>
    </div>
    {/* LISTA DE PEDIDOS */}
    <div className={style.details}>
        <div className={style.recentOrders}>
            <div className={style.cardHeader}>
                <h2>Pedidos recientes</h2>
                <a href="#" className={style.btn} aria-label='Ver todos los pedidos'>Ver todo</a>
            </div>
            <table>
                <thead>
                    <tr>
                        <td>Nombre</td>
                        <td>Precio</td>
                        <td>Pago</td>
                        <td>Estado</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cafe</td>
                        <td>$1200</td>
                        <td>Pagado</td>
                        <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                    </tr>
                    <tr>
                        <td>Clorox</td>
                        <td>$110</td>
                        <td>Pendiente</td>
                        <td><span className={`${style.status} ${style.pending}`}>Pendiente</span></td>
                    </tr>
                    <tr>
                        <td>Vino</td>
                        <td>$1200</td>
                        <td>Pagado</td>
                        <td><span className={`${style.status} ${style.return}`}>Devuelto</span></td>
                    </tr>
                    <tr>
                        <td>Comida de perro</td>
                        <td>$620</td>
                        <td>Pendiente</td>
                        <td><span className={`${style.status} ${style.pending}`}>En Progreso</span></td>
                    </tr>
                    <tr>
                        <td>Leche deslactosada</td>
                        <td>$1200</td>
                        <td>Pagado</td>
                        <td><span className={`${style.status} ${style.delivered}`}>Devuelto</span></td>
                    </tr>
                    <tr>
                        <td>Papel higienico</td>
                        <td>$110</td>
                        <td>Pendiente</td>
                        <td><span className={`${style.status} ${style.pending}`}>Pendiente</span></td>
                    </tr>
                    <tr>
                        <td>Chocolatina jet</td>
                        <td>$1200</td>
                        <td>Pagado</td>
                        <td><span className={`${style.status} ${style.return}`}>Devuelto</span></td>
                    </tr>
                    <tr>
                        <td>Whiskey</td>
                        <td>$620</td>
                        <td>Pagado</td>
                        <td><span className={`${style.status} ${style.pending}`}>En Progreso</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        {/* <!-- CLIENTES --> */}
        <div className={style.recentCustomers}>
            <div className={style.cardHeader}>
                <h2>Cliente reciente</h2>
            </div>
            <table>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>David <br /> <span>Italy</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>Amit <br /> <span>India</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>David <br /> <span>Italy</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>Amit <br /> <span>India</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>David <br /> <span>Italy</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>Amit <br/> <span>India</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>David <br /> <span>Italy</span></h4>
                    </td>
                </tr>
                <tr>
                    <td width="60px">
                        {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                    </td>
                    <td>
                        <h4>Amit <br /> <span>India</span></h4>
                    </td>
                </tr>
            </table>
        </div>
    </div>
    </>
  )
=======
import { Link, useNavigate } from 'react-router-dom';


const Inicio = () => {
    const navigate = useNavigate();
    return (
        <>
            {/* CARDS */}
            <div className={style.cardBox}>
                <div className={style.card} onClick={() => navigate("/Dashboard/proveedor")}>
                    <div>
                        <div className={style.numbers}>233</div>
                        <div className={style.cardName}>Proveedores</div>
                    </div>

                    <div className={style.iconBx}>
                        <ion-icon name="cash-outline"></ion-icon>
                    </div>
                </div>

                <div className={style.card} onClick={() => navigate("/Dashboard/producto")}>
                    <div>
                        <div className={style.numbers}>80</div>
                        <div className={style.cardName}>Productos</div>
                    </div>
                    <div className={style.iconBx}>
                        <ion-icon name="cart-outline"></ion-icon>
                    </div>
                </div>

                <div className={style.card} onClick={() => navigate("/Dashboard/pedido")}>
                    <div>
                        <div className={style.numbers}>284</div>
                        <div className={style.cardName}>Pedidos</div>
                    </div>

                    <div className={style.iconBx}>
                        <ion-icon name="chatbubbles-outline"></ion-icon>
                    </div>
                </div>

                <div className={style.card} onClick={() => navigate("/Dashboard/usuario")}>
                    <div>
                        <div className={style.numbers}>1,504</div>
                        <div className={style.cardName}>Usuarios</div>
                    </div>
                    <div className={style.iconBx}>
                        <ion-icon name="eye-outline"></ion-icon>
                    </div>
                </div>
            </div>
            {/* LISTA DE PEDIDOS */}
            <div className={style.details}>
                <div className={style.recentOrders}>
                    <div className={style.cardHeader}>
                        <h2>Pedidos recientes</h2>
                        <Link to="/Dashboard/pedido" className={style.btn} aria-label='Ver todos los pedidos'>Ver todo</Link>
                    </div>
                    
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Cliente</th>
                                <th scope="col">Pago Total</th>
                                <th scope="col">Fecha Entrega</th>
                                <th scope="col">Estado de Pago</th>
                                <th scope="col">Estado de Pedido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            <tr>
                                <td>Samuel</td>
                                <td>3000</td>
                                <td>28/02/2025</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Entregado</span></td>
                            </tr>
                            {/* <tr>
                                <td>Clorox</td>
                                <td>$110</td>
                                <td>Pendiente</td>
                                <td><span className={`${style.status} ${style.pending}`}>Pendiente</span></td>
                            </tr>
                            <tr>
                                <td>Vino</td>
                                <td>$1200</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.return}`}>Devuelto</span></td>
                            </tr>
                            <tr>
                                <td>Comida de perro</td>
                                <td>$620</td>
                                <td>Pendiente</td>
                                <td><span className={`${style.status} ${style.pending}`}>En Progreso</span></td>
                            </tr>
                            <tr>
                                <td>Leche deslactosada</td>
                                <td>$1200</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.delivered}`}>Devuelto</span></td>
                            </tr>
                            <tr>
                                <td>Papel higienico</td>
                                <td>$110</td>
                                <td>Pendiente</td>
                                <td><span className={`${style.status} ${style.pending}`}>Pendiente</span></td>
                            </tr>
                            <tr>
                                <td>Chocolatina jet</td>
                                <td>$1200</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.return}`}>Devuelto</span></td>
                            </tr>
                            <tr>
                                <td>Whiskey</td>
                                <td>$620</td>
                                <td>Pagado</td>
                                <td><span className={`${style.status} ${style.pending}`}>En Progreso</span></td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                {/* <!-- CLIENTES --> */}
                <div className={style.recentCustomers}>
                    <div className={style.cardHeader}>
                        <h2>Cliente reciente</h2>
                    </div>
                    <table>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>David <br /> <span>Italy</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>Amit <br /> <span>India</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>David <br /> <span>Italy</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>Amit <br /> <span>India</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>David <br /> <span>Italy</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>Amit <br /> <span>India</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer01.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>David <br /> <span>Italy</span></h4>
                            </td>
                        </tr>
                        <tr>
                            <td width="60px">
                                {/* <div className="imgBx"><img src="assets/imgs/customer02.jpg" alt=""></div> */}
                            </td>
                            <td>
                                <h4>Amit <br /> <span>India</span></h4>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
>>>>>>> 4405000 (Actualización de estructura y archivos del proyecto)
}

export default Inicio