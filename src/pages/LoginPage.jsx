import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SideBanner from "../components/SideBanner";
import "../styles/LoginPage.css"

export default function LoginPage() {
    const [emailOrUser, setEmailOrUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);


const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
        const response = await axios.post("https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/login", {
        emailOrUser,
        password,
    });

    const { user, mail } = response.data.data;
    localStorage.setItem("username", user);
    localStorage.setItem("email", mail);

    console.log("Sesión iniciada. Usuario:", user);
    navigate("/survey")

    } catch (error) {
    const msg = error.response?.data?.message || "Error al iniciar sesión";
    setErrorMessage(msg);
    }
};

    return (
    <div className="login-container">
        <SideBanner
        title="Bienvenido"
        subtitle="Ingresa y disfruta"
        text="Si aún no tienes cuenta puedes"
        linkText="Registrarte aquí!"
        linkHref="/register"
        />
        
    <div className="login-form-container">
      <h2 className="login-title">Iniciar sesión</h2>

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <input
            type="text"
            value={emailOrUser}
            onChange={(e) => setEmailOrUser(e.target.value)}
            required
            className="input"
            placeholder="Email o nombre de usuario"
          />
        </div>

    <div className="input-password">
      <input
          type={showPassword ? "text" : "password"}
          className="input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
      />
      <img
          src= "/img/icons/eyePassword.png"
          className="toggle-password"
          alt="Mostrar u ocultar contraseña"
          onClick={() => setShowPassword(!showPassword)}
      />
    </div>
    <div className="forgot-password-container">
      <a className="forgot-password-link">
        Olvidé mi contraseña
      </a>
    </div>

      {errorMessage && (
        <p className="error-message">{errorMessage}</p>
      )}


        <button type="submit" className="btn">Iniciar sesión</button>
      </form>

      <p className="login-or">O ingresa con</p>

      <div className="icons-login">
        <img src="/img/icons/facebook.png" alt="Facebook Logo" />
        <img src="/img/icons/apple.png" alt="Apple Logo"></img>
        <img src="/img/icons/google.png" alt="Google Logo" />
      </div>

    </div>

    </div>
);
}

