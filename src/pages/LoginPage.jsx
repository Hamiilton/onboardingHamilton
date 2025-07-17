import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [emailOrUser, setEmailOrUser] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

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
    navigate("/dashboard")

    } catch (error) {
    const msg = error.response?.data?.message || "Error al iniciar sesión";
    setErrorMessage(msg);
    }
};

    return (
    <div>
        <h2>Iniciar sesión</h2>
        {errorMessage && <p>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
            <div>
                <label>Email o nombre de usuario:</label><br />
                <input
                    type="text"
                    value={emailOrUser}
                    onChange={(e) => setEmailOrUser(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Contraseña:</label><br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
            <button type="submit">Iniciar sesión</button>
        </form>
    </div>
  );
}
