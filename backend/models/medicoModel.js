const conexao = require("../config/db");

const listarMedicos = (callback) => {
  const sql = `
    SELECT
      id_medico,
      nome,
      crm,
      telefone
    FROM medico
    WHERE ativo = 1
    ORDER BY nome ASC
  `;

  conexao.query(sql, callback);
};

const cadastrarMedico = (medico, callback) => {
  const sql = `
    INSERT INTO medico
    (nome, crm, telefone)
    VALUES (?, ?, ?)
  `;

  const valores = [medico.nome, medico.crm, medico.telefone];

  conexao.query(sql, valores, callback);
};

module.exports = {
  listarMedicos,
  cadastrarMedico,
};
