import React from 'react';
import Header from '../Components/Home/--header';
import Index from '../Components/Layouts/Contenido';
import Footer from '../Components/Home/--footer';
import "bootstrap/dist/css/bootstrap.min.css";
import '../assets/style/styleSupermercado.css';


const Home = () => {
  return (
  <>
    <Header />
    <Index />
    <Footer />
  </>
  )
}

export default Home;
