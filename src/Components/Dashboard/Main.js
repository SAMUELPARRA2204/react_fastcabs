import React, { useState } from 'react'
import { Outlet  } from 'react-router-dom';
import { IoMenuOutline } from 'react-icons/io5';
import style from '../../assets/style/Dashboard.module.css';

const Main = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }

  return (
    <main className={`${style.main} ${isMenuActive ? style.active : ''}`}>
        <section>
            <div className={style.topbar}>
                <div className={style.toggle} onClick={toggleMenu}>
                    <IoMenuOutline />
                </div>
                <div className={style.user}>
                    <span className={style.title}></span>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </section>
    </main>
  )
}

export default Main;