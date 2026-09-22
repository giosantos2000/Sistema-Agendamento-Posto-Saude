const horarioModel = require("../models/horarioModel");

const listarHorariosPorMedico = (req, res) => {
  const idMedico = req.params.id;

  horarioModel.listarHorariosPorMedico(idMedico, (erro, resultados) => {
    if (erro) {
      console.error("Erro ao buscar horários:", erro);

      return res.status(500).json({
        mensagem: "Erro ao buscar horários.",
      });
    }

    return res.status(200).json(resultados);
  });
};

const listarHorariosDisponiveisPorData = (req, res) => {
  const idMedico = req.params.id;
  const dataConsulta = req.query.data;

  if (!dataConsulta) {
    return res.status(400).json({
      mensagem: "A data da consulta é obrigatória.",
    });
  }

  horarioModel.listarHorariosDisponiveisPorData(
    idMedico,
    dataConsulta,
    (erro, resultados) => {
      if (erro) {
        console.error("Erro ao buscar horários disponíveis:", erro);

        return res.status(500).json({
          mensagem: "Erro ao buscar horários disponíveis.",
        });
      }

      return res.status(200).json(resultados);
    },
  );
};

const cadastrarHorario = (req, res) => {
  const { id_medico, dia_semana, hora_inicio, hora_fim } = req.body;

  if (!id_medico || !dia_semana || !hora_inicio || !hora_fim) {
    return res.status(400).json({
      mensagem:
        "Médico, dia da semana, horário inicial e horário final são obrigatórios.",
    });
  }

  if (hora_fim <= hora_inicio) {
    return res.status(400).json({
      mensagem: "O horário final deve ser maior que o horário inicial.",
    });
  }

  horarioModel.verificarHorarioExistente(
    id_medico,
    dia_semana,
    hora_inicio,
    hora_fim,
    (erro, resultados) => {
      if (erro) {
        console.error("Erro ao verificar horário existente:", erro);

        return res.status(500).json({
          mensagem: "Erro ao verificar o horário.",
        });
      }

      if (resultados.length > 0) {
        return res.status(400).json({
          mensagem: "Este horário já está cadastrado para este médico.",
        });
      }

      const horario = {
        id_medico,
        dia_semana,
        hora_inicio,
        hora_fim,
      };

      horarioModel.cadastrarHorario(horario, (erro, resultado) => {
        if (erro) {
          console.error("Erro ao cadastrar horário:", erro);

          return res.status(500).json({
            mensagem: "Erro ao cadastrar horário.",
          });
        }

        return res.status(201).json({
          mensagem: "Horário cadastrado com sucesso!",
          id_horario: resultado.insertId,
        });
      });
    },
  );
};

module.exports = {
  listarHorariosPorMedico,
  listarHorariosDisponiveisPorData,
  cadastrarHorario,
};
