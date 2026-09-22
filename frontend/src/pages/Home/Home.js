import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Sistema de Agendamento</h1>

      <p>Bem-vindo ao sistema de agendamento do posto de saúde.</p>

      <h2>Área do Paciente</h2>

      <Link to="/login">
        <button>Entrar</button>
      </Link>

      <Link to="/cadastro">
        <button>Criar Conta</button>
      </Link>

      <h2>Área do Funcionário</h2>

      <Link to="/loginfuncionario">
        <button>Login do Funcionário</button>
      </Link>

      <Link to="/cadastrofuncionario">
        <button>Cadastrar Funcionário</button>
      </Link>
    </div>
  );
}

export default Home;
