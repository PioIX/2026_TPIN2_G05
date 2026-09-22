"use client"
import {  useState } from 'react';
import Input from "./components/Input"
import Boton from './components/Boton';
import { useRouter } from "next/navigation";


export default function Home() {
  const [correo, setCorreo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contra, setContra] = useState("");
  const [foto, setFoto] = useState("");
  const [logeado, setLogeado] = useState("");

  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const router = useRouter();




  const updateCorreo = (event) => {
    setCorreo(event.target.value)

  };
  const updateUser = (event) => {
    setUsuario(event.target.value)

  };
  const updateContra = (event) => {
    setContra(event.target.value)

  };

  const updateFoto = (event) => {
    setFoto(event.target.value)

  };



  function logear() {



    fetch(`http://localhost:4000/login?correo=${correo}&contra=${contra}`)
      .then(response => response.json())
      .then(data => router.push(`/menuDeChats?id_user=${data[0].id_user}&&correo=${data[0].correo}`));

  }


  function registrar(){
    if(correo=="" || contra == "" || usuario == "" || foto == ""){
      alert("Datos invalidos")
      return
    }
    const user ={
      usuario: usuario,
      correo: correo,
      contra: contra, 
      foto: foto
    }
    
    fetch('http://localhost:4000/registrar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {

      if(!data.ok){
        alert("El usuario ya existe")

      }else{
        logear()
        
      }

    });

  }







  function mostrar(){
    setMostrarRegistro(true)
    
  }


  return (
    <div>
      <Input tipo="text" funcion={updateCorreo} text="Ingrese su correo"></Input>
      <Input tipo="password" funcion={updateContra} text="Ingrese su contraseña"></Input>

      <Boton funcion={logear} text="Iniciar sesion"></Boton>

      <div>

        {!mostrarRegistro &&
          <Boton funcion={mostrar} text="Crear cuenta"></Boton>
          
        }

        {mostrarRegistro &&

          <div>
            <Input tipo="text" funcion={updateUser} text="Ingrese su usuario"></Input>          
            <Input tipo="text" funcion={updateFoto} text="Url de tu imagen"></Input>          
            <Boton funcion={registrar} text="Registrarse"></Boton>  

          </div>
        }
      </div>


    </div>
  );
}
          