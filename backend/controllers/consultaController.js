const consultaModel = require("../models/consultaModel");

const criarConsulta = (req, res) => {
  const consulta = {
    id_paciente: req.body.id_paciente,
    id_medico: req.body.id_medico,
    id_horario: req.body.id_horario,
    data_consulta: req.body.data_consulta,
  };

  consultaModel.verificarDisponibilidade(consulta, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao verificar disponibilidade:", erro);

      return res.status(500).json({
        mensagem: "Erro ao verificar disponibilidade do horário.",
      });
    }

    if (resultados.length > 0) {
      return res.status(400).json({
        mensagem: "Este horário já está ocupado. Escolha outro horário.",
      });
    }

    consultaModel.criarConsulta(consulta, (erro, resultado) => {
      if (erro) {
        console.error("Erro ao criar consulta:", erro);

        return res.status(500).json({
          mensagem: "Erro ao criar consulta.",
        });
      }

      return res.status(201).json({
        mensagem: "Consulta agendada com sucesso!",
        id_consulta: resultado.insertId,
      });
    });
  });
};

const listarConsultasPorPaciente = (req, res) => {
  const idPaciente = req.params.id;

  consultaModel.listarConsultasPorPaciente(idPaciente, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar consultas:", erro);

      return res.status(500).json({
        mensagem: "Erro ao buscar consultas.",
      });
    }

    return res.status(200).json(resultados);
  });
};

const listarConsultasAgenda = (req, res) => {
  const dataConsulta = req.query.data;

  if (!dataConsulta) {
    return res.status(400).json({
      mensagem: "A data da agenda é obrigatória.",
    });
  }

  consultaModel.listarConsultasAgenda(dataConsulta, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar agenda:", erro);

      return res.status(500).json({
        mensagem: "Erro ao buscar agenda.",
      });
    }

    return res.status(200).json(resultados);
  });
};

const cancelarConsulta = (req, res) => {
  const idConsulta = req.params.id;

  consultaModel.cancelarConsulta(idConsulta, (erro, resultado) => {
    if (erro) {
      console.error("Erro ao cancelar consulta:", erro);

      return res.status(500).json({
        mensagem: "Erro ao cancelar consulta.",
      });
    }

    return res.status(200).json({
      mensagem: "Consulta cancelada com sucesso!",
    });
  });
};

module.exports = {
  criarConsulta,
  listarConsultasPorPaciente,
  listarConsultasAgenda,
  cancelarConsulta,
};
