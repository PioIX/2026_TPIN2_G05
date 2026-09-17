"use client"
import React from "react";
import Image from "next/image";
import { useState } from "react";



export default function loginForm({setUsuario, setContra, setCorreo}) {


    const updateCorreo = (event) => {
        setCorreo(event.target.value)

    };
    
    const updateUser = (event) => {
        setUsuario(event.target.value)

    };

    const updateContra = (event) => {
        setContra(event.target.value)

    };


    return(
    <div>
        <input onChange={updateCorreo} placeholder="Correo"></input>
        <input onChange={updateContra} placeholder="Contraseña"></input>

        <button></button>


        <input onChange={updateUser} placeholder="Usuario"></input>
        <button></button>

    </div>
    );
}