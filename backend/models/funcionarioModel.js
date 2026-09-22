const conexao = require("../config/db");

const buscarPorEmail = (email, callback) => {
  const sql = `
    SELECT
      id_funcionario,
      nome,
      email,
      senha,
      ativo
    FROM funcionario
    WHERE email = ?
  `;

  conexao.query(sql, [email], callback);
};

const cadastrarFuncionario = (funcionario, callback) => {
  const sql = `
    INSERT INTO funcionario
    (nome, email, senha)
    VALUES (?, ?, ?)
  `;

  const valores = [funcionario.nome, funcionario.email, funcionario.senha];

  conexao.query(sql, valores, callback);
};

const listarFuncionarios = (callback) => {
  const sql = `
    SELECT
      id_funcionario,
      nome,
      email,
      ativo
    FROM funcionario
    ORDER BY nome ASC
  `;

  conexao.query(sql, callback);
};

module.exports = {
  buscarPorEmail,
  cadastrarFuncionario,
  listarFuncionarios,
};
