const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = require("../models/authModel");

const login = (req, res) => {
  const { email, senha } = req.body;

  // Verifica se os campos foram preenchidos
  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "E-mail e senha são obrigatórios.",
    });
  }

  authModel.buscarPacientePorEmail(email, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar paciente:", erro);

      return res.status(500).json({
        mensagem: "Erro interno do servidor.",
      });
    }

    // Paciente não encontrado
    if (resultados.length === 0) {
      return res.status(401).json({
        mensagem: "E-mail ou senha incorretos.",
      });
    }

    const paciente = resultados[0];

    // Compara a senha digitada com a senha criptografada
    bcrypt.compare(senha, paciente.senha, (erroSenha, senhaCorreta) => {
      if (erroSenha) {
        console.error("Erro ao verificar senha:", erroSenha);

        return res.status(500).json({
          mensagem: "Erro ao verificar senha.",
        });
      }

      if (!senhaCorreta) {
        return res.status(401).json({
          mensagem: "E-mail ou senha incorretos.",
        });
      }

      // Cria o token
      const token = jwt.sign(
        {
          id: paciente.id,
          nome: paciente.nome,
          email: paciente.email,
          tipo: "paciente",
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h",
        },
      );

      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        token: token,
        paciente: {
          id: paciente.id,
          nome: paciente.nome,
          email: paciente.email,
        },
      });
    });
  });
};

module.exports = {
  login,
};
