const express = require("express");

const router = express.Router();

const funcionarioController = require("../controllers/funcionarioController");

router.post("/", funcionarioController.cadastrarFuncionario);

router.post("/login", funcionarioController.loginFuncionario);

router.get("/", funcionarioController.listarFuncionarios);

module.exports = router;
