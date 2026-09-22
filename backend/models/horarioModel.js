const conexao = require("../config/db");

const listarHorariosPorMedico = (idMedico, callback) => {
  const sql = `
    SELECT
      id_horario,
      id_medico,
      dia_semana,
      hora_inicio,
      hora_fim
    FROM horario
    WHERE id_medico = ?
      AND disponivel = 1
    ORDER BY
      FIELD(
        dia_semana,
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado',
        'Domingo'
      ),
      hora_inicio ASC
  `;

  conexao.query(sql, [idMedico], callback);
};

const listarHorariosDisponiveisPorData = (idMedico, dataConsulta, callback) => {
  const sql = `
    SELECT
      h.id_horario,
      h.id_medico,
      h.dia_semana,
      h.hora_inicio,
      h.hora_fim
    FROM horario h
    WHERE h.id_medico = ?
      AND h.disponivel = 1
      AND h.id_horario NOT IN (
        SELECT c.id_horario
        FROM consulta c
        WHERE c.data_consulta = ?
          AND c.status = 'Agendada'
      )
    ORDER BY h.hora_inicio ASC
  `;

  conexao.query(sql, [idMedico, dataConsulta], callback);
};

const verificarHorarioExistente = (
  idMedico,
  diaSemana,
  horaInicio,
  horaFim,
  callback,
) => {
  const sql = `
    SELECT id_horario
    FROM horario
    WHERE id_medico = ?
      AND dia_semana = ?
      AND hora_inicio = ?
      AND hora_fim = ?
      AND disponivel = 1
  `;

  conexao.query(sql, [idMedico, diaSemana, horaInicio, horaFim], callback);
};

const cadastrarHorario = (horario, callback) => {
  const sql = `
    INSERT INTO horario
    (id_medico, dia_semana, hora_inicio, hora_fim)
    VALUES (?, ?, ?, ?)
  `;

  const valores = [
    horario.id_medico,
    horario.dia_semana,
    horario.hora_inicio,
    horario.hora_fim,
  ];

  conexao.query(sql, valores, callback);
};

module.exports = {
  listarHorariosPorMedico,
  listarHorariosDisponiveisPorData,
  verificarHorarioExistente,
  cadastrarHorario,
};
