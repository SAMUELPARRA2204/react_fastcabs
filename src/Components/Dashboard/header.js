import React from 'react';
import NavBar from './Nav';
import style from '../../assets/style/Dashboard.module.css';


const Header = ({ nombre, rol }) => {
  return (
    <header className={style.containerDashboard}>
        <NavBar nombre={nombre} rol={rol}/>        
    </header>
  )
}

export default Header;