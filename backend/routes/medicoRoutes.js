const express = require("express");

const router = express.Router();

const medicoController = require("../controllers/medicoController");

const protegerFuncionario = require("../middleware/authFuncionario");

router.get("/", medicoController.listarMedicos);

router.post("/", protegerFuncionario, medicoController.cadastrarMedico);

module.exports = router;
