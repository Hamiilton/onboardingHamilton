import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import SurveyPage from '../pages/SurveyPage';
import DasboardPage from '../pages/DashboardPage';
import MySurveysPage from '../pages/MySurveysPage';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage/>}></Route>
        <Route path="survey" element={<SurveyPage/>}></Route>
        <Route path="dashboard" element={<DasboardPage/>}></Route>
        <Route path="my-surveys" element={<MySurveysPage/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
