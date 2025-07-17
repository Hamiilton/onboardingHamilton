import React from "react";
import { useNavigate } from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/")
    }

    return (
        <header>
            <h3>Bienvenido, {localStorage.getItem("username") || "Usuario"}</h3>
            <button onClick={handleLogout}>Cerrar sesion</button>
        </header>
    )
}