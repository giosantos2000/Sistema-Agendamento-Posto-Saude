const bcrypt = require("bcrypt");
const pacienteModel = require("../models/pacienteModel");

const cadastrar = async (req, res) => {
  try {
    const paciente = req.body;

    console.log("Cadastro de paciente recebido.");

    if (
      !paciente.nome ||
      !paciente.cpf ||
      !paciente.dataNascimento ||
      !paciente.telefone ||
      !paciente.endereco ||
      !paciente.email ||
      !paciente.senha
    ) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios.",
      });
    }

    const senhaCriptografada = await bcrypt.hash(paciente.senha, 10);

    paciente.senha = senhaCriptografada;

    pacienteModel.cadastrarPaciente(paciente, (erro, resultado) => {
      if (erro) {
        console.error("Erro ao cadastrar paciente:", erro);

        if (erro.code === "ER_DUP_ENTRY") {
          if (erro.message.includes("paciente.email")) {
            return res.status(400).json({
              mensagem: "Este e-mail já está cadastrado.",
            });
          }

          if (erro.message.includes("paciente.cpf")) {
            return res.status(400).json({
              mensagem: "Este CPF já está cadastrado.",
            });
          }

          return res.status(400).json({
            mensagem: "Os dados informados já estão cadastrados.",
          });
        }

        return res.status(500).json({
          mensagem: "Erro ao cadastrar paciente.",
        });
      }

      console.log("Paciente cadastrado com sucesso!");

      res.status(201).json({
        mensagem: "Paciente cadastrado com sucesso!",
        id: resultado.insertId,
      });
    });
  } catch (erro) {
    console.error("Erro interno:", erro);

    res.status(500).json({
      mensagem: "Erro interno do servidor.",
    });
  }
};

module.exports = {
  cadastrar,
};
