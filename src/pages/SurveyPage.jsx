import { useState } from "react";
import axios from "axios";
import "../styles/SurveyPage.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale'; 
import SuccessModal from "../components/SuccessModal";


export default function SurveyPage() {
    const user = localStorage.getItem("username");
    const [startDate, setStartDate] = useState(new Date());
    const [setMensaje] = useState("");

    const [respuestas, setRespuestas] = useState({
      "Pregunta 1": "",
      "Pregunta 2": "",
      "Pregunta 3": "",
      "Pregunta 4": ""
    });
  
  const [showModal, setShowModal] = useState(false); 

  const handleChangeRespuesta = (pregunta, opcion) => {
    setRespuestas((prev) => ({
      ...prev,
      [pregunta]: opcion
    }));
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!startDate || Object.values(respuestas).includes("")) {
        setMensaje("Por favor responde todas las preguntas y selecciona una fecha.");
        return;
      }

      const encuesta = {
        fecha: startDate,
        ...respuestas
      };

      try {
        const response = await axios.post(
          "https://7wmbjxblzi.execute-api.us-east-1.amazonaws.com/survey",
          {
            user,
            survey: JSON.stringify(encuesta)
          });
          setShowModal(true)

        console.log("Encuesta enviada:", response.data);
      } catch (error) {
        console.error("Error al enviar encuesta:", error.response?.data || error.message);
      }
    };


  return (
    <>
      <div className="survey-container">
        <form onSubmit={handleSubmit} className="survey-form">
          <h2 className="survey-title">Encuesta</h2>
          
          
          <label className="label">Fecha</label>
          <div className="survey-field">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="MMMM d 'de' yyyy"
              className="custom-datepicker-input"
              calendarClassName="custom-calendar"
              popperPlacement="bottom"
              locale={es}
              
            />

          </div>

          {Object.keys(respuestas).map((pregunta, idx) => (
            <div className="survey-question" key={idx}>
              <p className="label">{pregunta}</p>
              <div className="options">
                {["A", "B", "C", "D"].map((opcion) => (
                  <label key={opcion} className="radio-option">
                    <input
                      type="radio"
                      name={pregunta}
                      value={opcion}
                      checked={respuestas[pregunta] === opcion}
                      onChange={() => handleChangeRespuesta(pregunta, opcion)}
                      required
                    />
                    <span>{opcion}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}


          <button type="submit" className="btn">Enviar</button>
        </form>
      </div>
            {/* MODAL DE ÉXITO */}
      {showModal && (
        <SuccessModal
          message="Tus respuestas se han guardado de manera correcta"
          buttonText="Terminar"
          onClose={() => setShowModal(false)}/>      )}


      
    </>
    
   );
}
