import React from 'react';
import './App.css';
import {Helmet} from "react-helmet";
import Navbar from './components/Navbar';
import EspacioTiempo from './components/espacio-temporal';
import {BrowserRouter as Router} from 'react-router-dom';
import Tabla from './components/tabla';

function App(){

  const [state,setState] = React.useState({
    fechaIni: 'Wed Apr 08 2020 20:51:01 GMT-0500',
    fechaFin: 'Wed Sep 01 2021 20:00:01 GMT-0500',
    algoritmo: 0,
    valor:0
  })

  const pasarDatos = (e) => {
    setState({
      fechaIni: e.fechaIni,
      fechaFin: e.fechaFin,
      algoritmo: e.algoritmo,
      valor:1
    })
  }

  return(
    <Router>
      <Helmet>
        <style>{"body { background-color: #F6F7FF; }"}</style>
      </Helmet>
      <Navbar />
      <section className="contenido wrapper">
        <EspacioTiempo pasarDatos={pasarDatos}/>
        <Tabla estado={state}></Tabla>
      </section>      
    </Router>
  );
}

export default App;