const conexao = require("../config/db");

const buscarPacientePorEmail = (email, callback) => {
  const sql = `
    SELECT
      id,
      nome,
      cpf,
      dataNascimento,
      telefone,
      endereco,
      email,
      senha
    FROM paciente
    WHERE email = ?
  `;

  conexao.query(sql, [email], callback);
};

module.exports = {
  buscarPacientePorEmail,
};
