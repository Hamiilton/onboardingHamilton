import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";


export default function DasboardPage(){
    const navigate = useNavigate();

    return (
        <div>
            <Header/>
            <h2>Bienvenido usuario</h2>
            <p>¿Que deseas hacer hoy?</p>
            <ul>
                <li onClick={() => navigate("/survey")}>Realizar encuesta</li>
                <li onClick={() => navigate("/my-surveys")}>Visualizar encuestas realizadas</li>
            </ul>
        </div>
    )
}