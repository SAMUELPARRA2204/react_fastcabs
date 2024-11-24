import React from 'react';
import { IoMenuOutline, IoSearchOutline } from 'react-icons/io5';


const main = ({ nombre }) => {
    return (
        <main className="main">
            <section>
                <div className="topbar">
                    <div className="toggle">
                        <IoMenuOutline />
                    </div>
                    <div className="search">
                        <label>
                            <input type="text" placeholder="Buscar" />
                            <IoSearchOutline />
                        </label>
                    </div>
                    <div className="user">
                        <span className="title">{nombre}</span>
                        {/* <img src="rolAdmin/img.jpg" alt="usuario" /> */}
                    </div>
                </div>
                <div>
                    {/* {contenido} */}
                </div>
            </section>
        </main>
    )
}

export default main
