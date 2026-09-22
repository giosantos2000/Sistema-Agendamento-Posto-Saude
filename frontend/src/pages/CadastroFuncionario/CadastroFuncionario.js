import "./CadastroFuncionario.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function CadastroFuncionario() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault();

    setErro("");
    setMensagem("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      const resposta = await fetch("http://localhost:5000/funcionarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar funcionário.");
      }

      setMensagem("Funcionário cadastrado com sucesso!");

      setNome("");
      setEmail("");
      setSenha("");
      setConfirmarSenha("");

      setTimeout(() => {
        navigate("/loginfuncionario");
      }, 1500);
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="cadastro-funcionario">
      <h1>Cadastro de Funcionário</h1>

      <form onSubmit={handleCadastro}>
        <label>Nome Completo</label>

        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome completo"
          required
        />

        <label>Email</label>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email"
          required
        />

        <label>Senha</label>

        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite a senha"
          required
        />

        <label>Confirmar Senha</label>

        <input
          type="password"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          placeholder="Digite a senha novamente"
          required
        />

        {erro && <p className="erro-cadastro-funcionario">{erro}</p>}

        {mensagem && <p className="sucesso-cadastro-funcionario">{mensagem}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar Funcionário"}
        </button>
      </form>

      <Link to="/loginfuncionario">Voltar para o login</Link>
    </div>
  );
}

export default CadastroFuncionario;
