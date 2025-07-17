import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

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
    <div>
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {["email","user","phone","password","confirmPassword"].map(name => (
          <div key={name}>
            <label>{name === "confirmPassword" ? "Confirmar contraseña" :
              name.charAt(0).toUpperCase() + name.slice(1)}:</label><br />
            <input
              type={name.includes("password") ? "password" : "text"}
              name={name}
              placeholder={
                name === "user" ? "Nombre de usuario" :
                name === "phone" ? "Número de celular" : name.charAt(0).toUpperCase() + name.slice(1)
              }
              value={form[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}
