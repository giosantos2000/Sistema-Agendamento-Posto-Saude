const express = require("express");

const router = express.Router();

const consultaController = require("../controllers/consultaController");

const protegerFuncionario = require("../middleware/authFuncionario");
const protegerPaciente = require("../middleware/authPaciente");

router.post("/", consultaController.criarConsulta);

router.get(
  "/paciente/:id",
  protegerPaciente,
  consultaController.listarConsultasPorPaciente,
);

router.get(
  "/agenda",
  protegerFuncionario,
  consultaController.listarConsultasAgenda,
);

router.put(
  "/:id/cancelar",
  protegerPaciente,
  consultaController.cancelarConsulta,
);

router.put(
  "/:id/cancelar-funcionario",
  protegerFuncionario,
  consultaController.cancelarConsulta,
);

module.exports = router;
