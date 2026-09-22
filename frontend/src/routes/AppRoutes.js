import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import LoginFuncionario from "../pages/LoginFuncionario/LoginFuncionario";
import Cadastro from "../pages/Cadastro/Cadastro";
import CadastroFuncionario from "../pages/CadastroFuncionario/CadastroFuncionario";
import DashboardPaciente from "../pages/DashboardPaciente/DashboardPaciente";
import Agendamento from "../pages/Agendamento/Agendamento";
import DashboardFuncionario from "../pages/DashboardFuncionario/DashboardFuncionario";
import Medicos from "../pages/Medicos/Medicos";
import Horarios from "../pages/Horarios/Horarios";
import Agenda from "../pages/Agenda/Agenda";
import ProtectedRoute from "../components/ProtectedRoute";
import ProtectedFuncionarioRoute from "../components/ProtectedFuncionarioRoute";
import MinhasConsultas from "../pages/MinhasConsultas";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/loginfuncionario"
          element={<LoginFuncionario />}
        />

        <Route
          path="/cadastrofuncionario"
          element={<CadastroFuncionario />}
        />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboardpaciente"
          element={
            <ProtectedRoute>
              <DashboardPaciente />
            </ProtectedRoute>
          }
        />

        <Route
          path="/agendamento"
          element={
            <ProtectedRoute>
              <Agendamento />
            </ProtectedRoute>
          }
        />

        <Route
          path="/minhasconsultas"
          element={
            <ProtectedRoute>
              <MinhasConsultas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboardfuncionario"
          element={
            <ProtectedFuncionarioRoute>
              <DashboardFuncionario />
            </ProtectedFuncionarioRoute>
          }
        />

        <Route
          path="/medicos"
          element={
            <ProtectedFuncionarioRoute>
              <Medicos />
            </ProtectedFuncionarioRoute>
          }
        />

        <Route
          path="/horarios"
          element={
            <ProtectedFuncionarioRoute>
              <Horarios />
            </ProtectedFuncionarioRoute>
          }
        />

        <Route
          path="/agenda"
          element={
            <ProtectedFuncionarioRoute>
              <Agenda />
            </ProtectedFuncionarioRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;