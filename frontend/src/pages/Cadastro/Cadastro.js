import "./Cadastro.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Cadastro() {
  const [formulario, setFormulario] = useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    endereco: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica se as senhas são iguais
    if (formulario.senha !== formulario.confirmarSenha) {
      alert("As senhas não são iguais.");
      return;
    }

    try {
      const resposta = await fetch(
        "http://sistema-agendamento-posto-saude-production.up.railway.app/pacientes",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            nome: formulario.nome,
            cpf: formulario.cpf,
            dataNascimento: formulario.dataNascimento,
            telefone: formulario.telefone,
            endereco: formulario.endereco,
            email: formulario.email,
            senha: formulario.senha,
          }),
        },
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Paciente cadastrado com sucesso!");

        // Limpa o formulário
        setFormulario({
          nome: "",
          cpf: "",
          dataNascimento: "",
          telefone: "",
          endereco: "",
          email: "",
          senha: "",
          confirmarSenha: "",
        });
      } else {
        alert(dados.mensagem || "Erro ao cadastrar paciente.");
      }
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro);

      alert(
        "Não foi possível conectar ao servidor. Verifique se o backend está funcionando.",
      );
    }
  };

  return (
    <div className="cadastro">
      <h1>Cadastro</h1>

      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <label htmlFor="nome">Nome Completo</label>

        <input
          id="nome"
          type="text"
          name="nome"
          placeholder="Digite seu nome completo"
          value={formulario.nome}
          onChange={handleChange}
          required
        />

        {/* CPF */}
        <label htmlFor="cpf">CPF</label>

        <input
          id="cpf"
          type="text"
          name="cpf"
          placeholder="Digite seu CPF"
          value={formulario.cpf}
          onChange={handleChange}
          required
        />

        {/* Data de nascimento */}
        <label htmlFor="dataNascimento">Data de Nascimento</label>

        <input
          id="dataNascimento"
          type="date"
          name="dataNascimento"
          value={formulario.dataNascimento}
          onChange={handleChange}
          required
        />

        {/* Telefone */}
        <label htmlFor="telefone">Telefone</label>

        <input
          id="telefone"
          type="tel"
          name="telefone"
          placeholder="(00) 00000-0000"
          value={formulario.telefone}
          onChange={handleChange}
          required
        />

        {/* Endereço */}
        <label htmlFor="endereco">Endereço</label>

        <input
          id="endereco"
          type="text"
          name="endereco"
          placeholder="Digite seu endereço"
          value={formulario.endereco}
          onChange={handleChange}
          required
        />

        {/* E-mail */}
        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Digite seu e-mail"
          value={formulario.email}
          onChange={handleChange}
          required
        />

        {/* Senha */}
        <label htmlFor="senha">Senha</label>

        <input
          id="senha"
          type="password"
          name="senha"
          placeholder="Digite sua senha"
          value={formulario.senha}
          onChange={handleChange}
          required
        />

        {/* Confirmar senha */}
        <label htmlFor="confirmarSenha">Confirmar Senha</label>

        <input
          id="confirmarSenha"
          type="password"
          name="confirmarSenha"
          placeholder="Confirme sua senha"
          value={formulario.confirmarSenha}
          onChange={handleChange}
          required
        />

        {/* Botão de cadastro */}
        <button type="submit">Cadastrar</button>
      </form>

      {/* Link para login */}
      <p>Já possui uma conta?</p>

      <Link to="/login">
        <button type="button">Login</button>
      </Link>
    </div>
  );
}

export default Cadastro;
