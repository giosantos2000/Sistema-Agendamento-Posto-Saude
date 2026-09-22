const express = require("express");

const router = express.Router();

const horarioController = require("../controllers/horarioController");

const protegerFuncionario = require("../middleware/authFuncionario");

router.get("/medico/:id", horarioController.listarHorariosPorMedico);

router.get(
  "/disponiveis/medico/:id",
  horarioController.listarHorariosDisponiveisPorData,
);

router.post("/", protegerFuncionario, horarioController.cadastrarHorario);

module.exports = router;
