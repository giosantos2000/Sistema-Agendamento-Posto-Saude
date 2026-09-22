const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const pacienteRoutes = require("./routes/pacienteRoutes");
const authRoutes = require("./routes/authRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const medicoRoutes = require("./routes/medicoRoutes");
const horarioRoutes = require("./routes/horarioRoutes");
const funcionarioRoutes = require("./routes/funcionarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pacientes", pacienteRoutes);
app.use("/auth", authRoutes);
app.use("/consultas", consultaRoutes);
app.use("/medicos", medicoRoutes);
app.use("/horarios", horarioRoutes);
app.use("/funcionarios", funcionarioRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
