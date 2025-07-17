import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

export default function SurveyPage() {
  const user = localStorage.getItem("username");
  const [fecha, setFecha] = useState("");
  const [respuestas, setRespuestas] = useState({
    "Pregunta 1": "",
    "Pregunta 2": "",
    "Pregunta 3": "",
    "Pregunta 4": ""
  });
  const [mensaje, setMensaje] = useState("");

  const handleChangeRespuesta = (pregunta, opcion) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta]: opcion
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fecha || Object.values(respuestas).includes("")) {
      setMensaje("Por favor responde todas las preguntas y selecciona una fecha.");
      return;
    }

    const encuesta = {
      fecha,
      ...respuestas
    };

    try {
      const response = await axios.post(
        "https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/survey",
        {
          user,
          survey: JSON.stringify(encuesta)
        }
      );
      console.log("Encuesta enviada:", response.data);
      setMensaje("Encuesta enviada con éxito.");
    } catch (error) {
      console.error("Error al enviar encuesta:", error.response?.data || error.message);
      setMensaje("Error al enviar la encuesta.");
    }
  };

  return (
    <div>
        <Header/>
        <h2>Encuesta</h2>
        {mensaje && <p>{mensaje}</p>}
        <form onSubmit={handleSubmit}>
            <div>
            <label>Fecha:</label><br />
            <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
            />
            </div>
            {Object.keys(respuestas).map((pregunta, idx) => (
            <div key={idx}>
                <p>{pregunta}</p>
                {["A", "B", "C", "D"].map((opcion) => (
                <label key={opcion}>
                    <input
                    type="radio"
                    name={pregunta}
                    value={opcion}
                    checked={respuestas[pregunta] === opcion}
                    onChange={() => handleChangeRespuesta(pregunta, opcion)}
                    required
                    />
                    {opcion}
                </label>
                ))}
            </div>
            ))}
            <button type="submit">Enviar</button>
        </form>
    </div>
  );
}
