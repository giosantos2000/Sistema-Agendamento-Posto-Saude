const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const funcionarioModel = require("../models/funcionarioModel");

const cadastrarFuncionario = (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({
      mensagem: "Nome, email e senha são obrigatórios.",
    });
  }

  funcionarioModel.buscarPorEmail(email, async (erro, resultados) => {
    if (erro) {
      console.error("Erro ao verificar funcionário:", erro);

      return res.status(500).json({
        mensagem: "Erro ao verificar funcionário.",
      });
    }

    if (resultados.length > 0) {
      return res.status(400).json({
        mensagem: "Este email já está cadastrado.",
      });
    }

    try {
      const senhaHash = await bcrypt.hash(senha, 10);

      const funcionario = {
        nome,
        email,
        senha: senhaHash,
      };

      funcionarioModel.cadastrarFuncionario(funcionario, (erro, resultado) => {
        if (erro) {
          console.error("Erro ao cadastrar funcionário:", erro);

          return res.status(500).json({
            mensagem: "Erro ao cadastrar funcionário.",
          });
        }

        return res.status(201).json({
          mensagem: "Funcionário cadastrado com sucesso!",
          id_funcionario: resultado.insertId,
        });
      });
    } catch (error) {
      console.error("Erro ao criptografar senha:", error);

      return res.status(500).json({
        mensagem: "Erro ao cadastrar funcionário.",
      });
    }
  });
};

const loginFuncionario = (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({
      mensagem: "Email e senha são obrigatórios.",
    });
  }

  funcionarioModel.buscarPorEmail(email, async (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar funcionário:", erro);

      return res.status(500).json({
        mensagem: "Erro ao realizar login.",
      });
    }

    if (resultados.length === 0) {
      return res.status(401).json({
        mensagem: "Email ou senha inválidos.",
      });
    }

    const funcionario = resultados[0];

    if (!funcionario.ativo) {
      return res.status(401).json({
        mensagem: "Funcionário inativo.",
      });
    }

    try {
      const senhaCorreta = await bcrypt.compare(senha, funcionario.senha);

      if (!senhaCorreta) {
        return res.status(401).json({
          mensagem: "Email ou senha inválidos.",
        });
      }

      const token = jwt.sign(
        {
          id_funcionario: funcionario.id_funcionario,
          email: funcionario.email,
        },
        process.env.JWT_SECRET || "chave_secreta",
        {
          expiresIn: "8h",
        },
      );

      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        token,
        funcionario: {
          id_funcionario: funcionario.id_funcionario,
          nome: funcionario.nome,
          email: funcionario.email,
        },
      });
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      return res.status(500).json({
        mensagem: "Erro ao realizar login.",
      });
    }
  });
};

const listarFuncionarios = (req, res) => {
  funcionarioModel.listarFuncionarios((erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar funcionários:", erro);

      return res.status(500).json({
        mensagem: "Erro ao buscar funcionários.",
      });
    }

    return res.status(200).json(resultados);
  });
};

module.exports = {
  cadastrarFuncionario,
  loginFuncionario,
  listarFuncionarios,
};
