import "./DashboardPaciente.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DashboardPaciente() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Painel do Paciente</h1>

      <p>Bem-vindo ao Sistema de Agendamento.</p>

      <div className="menu">
        <Link to="/agendamento">
          <button>Agendar Consulta</button>
        </Link>

        <Link to="/minhasconsultas">
          <button>Minhas Consultas</button>
        </Link>

        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default DashboardPaciente;
