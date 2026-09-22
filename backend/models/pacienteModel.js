const conexao = require("../config/db");

const cadastrarPaciente = (paciente, callback) => {
  const sql = `
        INSERT INTO paciente
        (nome, cpf, dataNascimento, telefone, email, senha, endereco)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

  conexao.query(
    sql,
    [
      paciente.nome,
      paciente.cpf,
      paciente.dataNascimento,
      paciente.telefone,
      paciente.email,
      paciente.senha,
      paciente.endereco,
    ],
    callback,
  );
};

module.exports = {
  cadastrarPaciente,
};
