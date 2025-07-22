import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SideBanner from "../components/SideBanner";
import "../styles/RegisterPage.css";



export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    user: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const payload = {
        email: form.email,
        user: form.user,
        phone: form.phone,
        password: form.password
      };
      const res = await axios.post(
        "https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/register",
        payload
      );
      console.log("Registro exitoso:", res.data);
      navigate("/"); // redirige al login
    } catch (err) {
    console.error("Error completo:", err);
    console.error("response data:", err.response?.data);
    }

  };

  return (

    <div className="register-container">
        <SideBanner
          title="Regístrate"
          subtitle="Te invitamos a crear tu cuenta"
          text="Si ya tienes una cuenta puedes"
          linkText="Iniciar sesión aquí!"
          linkHref="/"
          />
        <form className="register-form" onSubmit={handleSubmit}>
          <h2 className="register-title">Registrarse</h2>

          {/* Email */}
          <div className="input-register">
            <input
              type="text"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Usuario */}
          <div className="input-register">
            <input
              type="text"
              name="user"
              placeholder="Nombre de usuario"
              value={form.user}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Celular */}
          <div className="input-register">
            <input
              type="text"
              name="phone"
              placeholder="Número de celular"
              value={form.phone}
              onChange={handleChange}
              required
              className="input"
            />
          </div>

          {/* Contraseña */}
          <div className="input-register">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              required
              className="input"
            />
            <img
              src={showPassword ? "/img/icons/eyePassword.png" : "/img/icons/eyePassword.png"}
              alt="Mostrar/Ocultar contraseña"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Confirmar contraseña */}
          <div className="input-register">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="input"
            />
            <img
              src={showConfirmPassword ? "/img/icons/eyePassword.png" : "/img/icons/eyePassword.png"}
              alt="Mostrar/Ocultar contraseña"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          {/* Error */}
          {error && <p style={{ color: "red", marginBottom: "16px" }}>{error}</p>}

          {/* Botón */}
          <button type="submit" className="btn">Registrarte</button>
      <p className="login-or">O ingresa con</p>

      <div className="icons-login">
        <img src="/img/icons/facebook.png" alt="Facebook Logo" />
        <img src="/img/icons/apple.png" alt="Apple Logo"></img>
        <img src="/img/icons/google.png" alt="Google Logo" />
      </div>

      </form>


    </div>

  );
}
