import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch("http://192.168.88.4:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      // Verifica se o login foi realizado com sucesso
      if (!resposta.ok) {
        alert(dados.mensagem || "Email ou senha inválidos.");
        return;
      }

      // Salva o token
      localStorage.setItem("token", dados.token);

      // Salva os dados do paciente
      localStorage.setItem("paciente", JSON.stringify(dados.paciente));

      console.log("Login realizado:", dados);

      navigate("/dashboardpaciente");
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>

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

        <button type="submit">Entrar</button>
      </form>

      <p>Ainda não possui uma conta?</p>

      <Link to="/cadastro">
        <button type="button">Criar Conta</button>
      </Link>
    </div>
  );
}

export default Login;
