import "./LoginFuncionario.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function LoginFuncionario() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setErro("");
    setCarregando(true);

    try {
      const resposta = await fetch(
        "http://192.168.88.4:5000/funcionarios/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            senha,
          }),
        },
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Email ou senha inválidos.");
      }

      localStorage.setItem("tokenFuncionario", dados.token);

      localStorage.setItem("funcionario", JSON.stringify(dados.funcionario));

      navigate("/dashboardfuncionario");
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="login-funcionario">
      <h1>Login do Funcionário</h1>

      <form onSubmit={handleLogin}>
        <label>Email</label>

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Senha</label>

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p>{erro}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Entrando..." : "Entrar"}
        </button>
      </form>

      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default LoginFuncionario;
