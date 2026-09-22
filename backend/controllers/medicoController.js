const medicoModel = require("../models/medicoModel");

const listarMedicos = (req, res) => {
  medicoModel.listarMedicos((erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar médicos:", erro);

      return res.status(500).json({
        mensagem: "Erro ao buscar médicos.",
      });
    }

    return res.status(200).json(resultados);
  });
};

const cadastrarMedico = (req, res) => {
  const { nome, crm, telefone } = req.body;

  if (!nome || !crm) {
    return res.status(400).json({
      mensagem: "Nome e CRM são obrigatórios.",
    });
  }

  const medico = {
    nome,
    crm,
    telefone: telefone || null,
  };

  medicoModel.cadastrarMedico(medico, (erro, resultado) => {
    if (erro) {
      console.error("Erro ao cadastrar médico:", erro);

      if (erro.code === "ER_DUP_ENTRY") {
        return res.status(400).json({
          mensagem: "Este CRM já está cadastrado.",
        });
      }

      return res.status(500).json({
        mensagem: "Erro ao cadastrar médico.",
      });
    }

    return res.status(201).json({
      mensagem: "Médico cadastrado com sucesso!",
      id_medico: resultado.insertId,
    });
  });
};

module.exports = {
  listarMedicos,
  cadastrarMedico,
};
