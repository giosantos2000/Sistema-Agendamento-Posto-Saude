const conexao = require("../config/db");

const criarConsulta = (consulta, callback) => {
  const sql = `
    INSERT INTO consulta
    (id_paciente, id_medico, id_horario, data_consulta)
    VALUES (?, ?, ?, ?)
  `;

  const valores = [
    consulta.id_paciente,
    consulta.id_medico,
    consulta.id_horario,
    consulta.data_consulta,
  ];

  conexao.query(sql, valores, callback);
};

const verificarDisponibilidade = (consulta, callback) => {
  const sql = `
    SELECT *
    FROM consulta
    WHERE id_medico = ?
      AND id_horario = ?
      AND data_consulta = ?
      AND status = 'Agendada'
  `;

  const valores = [
    consulta.id_medico,
    consulta.id_horario,
    consulta.data_consulta,
  ];

  conexao.query(sql, valores, callback);
};

const listarConsultasPorPaciente = (idPaciente, callback) => {
  const sql = `
    SELECT
      c.id_consulta,
      c.data_consulta,
      c.status,
      m.nome AS medico,
      h.dia_semana,
      h.hora_inicio,
      h.hora_fim
    FROM consulta c
    INNER JOIN medico m
      ON c.id_medico = m.id_medico
    INNER JOIN horario h
      ON c.id_horario = h.id_horario
    WHERE c.id_paciente = ?
    ORDER BY c.data_consulta ASC, h.hora_inicio ASC
  `;

  conexao.query(sql, [idPaciente], callback);
};

const listarConsultasAgenda = (dataConsulta, callback) => {
  const sql = `
    SELECT
      c.id_consulta,
      c.data_consulta,
      c.status,
      p.nome AS paciente,
      m.nome AS medico,
      h.dia_semana,
      h.hora_inicio,
      h.hora_fim
    FROM consulta c
    INNER JOIN paciente p
      ON c.id_paciente = p.id
    INNER JOIN medico m
      ON c.id_medico = m.id_medico
    INNER JOIN horario h
      ON c.id_horario = h.id_horario
    WHERE c.data_consulta = ?
    ORDER BY h.hora_inicio ASC
  `;

  conexao.query(sql, [dataConsulta], callback);
};

const cancelarConsulta = (idConsulta, callback) => {
  const sql = `
    UPDATE consulta
    SET status = 'Cancelada'
    WHERE id_consulta = ?
  `;

  conexao.query(sql, [idConsulta], callback);
};

module.exports = {
  criarConsulta,
  verificarDisponibilidade,
  listarConsultasPorPaciente,
  listarConsultasAgenda,
  cancelarConsulta,
};
