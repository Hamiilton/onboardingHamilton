import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SurveyPage from '../pages/SurveyPage';
import Header from '../components/Header';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>}></Route>
        <Route path="survey" element={<SurveyPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
