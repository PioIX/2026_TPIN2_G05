"use client"
import { useEffect, useState } from 'react';
import Input from "./components/Input"
import Boton from './components/Boton';

export default function Home() {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");




  const updateCorreo = (event) => {
    setCorreo(event.target.value)

  };
  
  const updateUser = (event) => {
    setUsuario(event.target.value)

  };

  const updateContra = (event) => {
    setContra(event.target.value)

  };



  function logear(params) {

    if (correo == "" || contra == ""){
      
    }

    fetch('http://localhost:3001/estudiantes')
      .then(response => response.json())
      .then(data => console.log(data));
  }

  return (
    <div>
      <Input funcion={updateCorreo} text="Ingrese su correo"></Input>
      <Input funcion={updateContra} text="Ingrese su contraseña"></Input>

      <Boton funcion={logear} text="Iniciar sesion"></Boton>



      <Input funcion={updateUser} text="Ingrese su usuario"></Input>
      

    </div>
  );
}
          