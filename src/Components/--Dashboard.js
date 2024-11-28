import React from 'react'
import Header from './Layouts/Dashboard/header';
import Main from './Layouts/Dashboard/main';
import '../assets/style/styleDashboard.css';


const Dashboard = () => {
  const nombre = "Usuario";
  const rol = 1
  return (
    <>
    <Header rol={rol} />
    <Main nombre={nombre} />
    </>
  )
}


export default Dashboard;
