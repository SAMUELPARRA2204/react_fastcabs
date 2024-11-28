import React, { useState } from 'react'
import { Outlet  } from 'react-router-dom';
import { IoMenuOutline, IoSearchOutline } from 'react-icons/io5';

const main = () => {
    const [isMenuActive, setIsMenuActive] = useState(false);

    const toggleMenu = () => {
        setIsMenuActive(!isMenuActive);
    }

  return (
    <main className={`main ${isMenuActive ? 'active' : ''}`}>
        <section>
            <div className='topbar'>
                <div className='toggle' onClick={toggleMenu}>
                    <IoMenuOutline />
                </div>
                <div className='search'>
                    <label>
                        <input type='text' placeholder='Buscar' />
                        <IoSearchOutline />
                    </label>
                </div>
                <div className='user'>
                    <span className='title'></span>
                </div>
            </div>
            <div>
                <Outlet />
            </div>
        </section>
    </main>
  )
}

export default main