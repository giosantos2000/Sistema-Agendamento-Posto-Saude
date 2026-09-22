const jwt = require("jsonwebtoken");

const protegerFuncionario = (req, res, next) => {
  const autorizacao = req.headers.authorization;

  if (!autorizacao) {
    return res.status(401).json({
      mensagem: "Token não informado.",
    });
  }

  const partes = autorizacao.split(" ");

  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return res.status(401).json({
      mensagem: "Formato do token inválido.",
    });
  }

  const token = partes[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "chave_secreta",
    );

    req.funcionario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      mensagem: "Token inválido ou expirado.",
    });
  }
};

module.exports = protegerFuncionario;
