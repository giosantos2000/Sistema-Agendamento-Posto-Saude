import "./DashboardFuncionario.css";
import { Link, useNavigate } from "react-router-dom";

function DashboardFuncionario() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("tokenFuncionario");
    localStorage.removeItem("funcionario");

    navigate("/loginfuncionario");
  };

  return (
    <div className="dashboard-funcionario">
      <h1>Painel do Funcionário</h1>

      <p>Gerenciamento do Posto de Saúde</p>

      <div className="menu">
        <Link to="/medicos">
          <button>Cadastrar Médicos</button>
        </Link>

        <Link to="/horarios">
          <button>Cadastrar Horários</button>
        </Link>

        <Link to="/agenda">
          <button>Agenda do Dia</button>
        </Link>

        <button onClick={handleLogout}>Sair</button>
      </div>
    </div>
  );
}

export default DashboardFuncionario;
