import "./Horarios.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Horarios() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [diaSemana, setDiaSemana] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscarMedicos = async () => {
    try {
      const token = localStorage.getItem("tokenFuncionario");

      if (!token) {
        navigate("/loginfuncionario");
        return;
      }

      const resposta = await fetch(
        "http://sistema-agendamento-posto-saude-production.up.railway.app/medicos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dados = await resposta.json();

      if (resposta.status === 401) {
        localStorage.removeItem("tokenFuncionario");
        localStorage.removeItem("funcionario");
        navigate("/loginfuncionario");
        return;
      }

      if (!resposta.ok) {
        throw new Error("Erro ao buscar médicos.");
      }

      setMedicos(dados);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      setErro("Não foi possível carregar os médicos.");
    }
  };

  const buscarHorarios = async (idMedico) => {
    if (!idMedico) {
      setHorarios([]);
      return;
    }

    try {
      const resposta = await fetch(
        `http://sistema-agendamento-posto-saude-production.up.railway.app/horarios/medico/${idMedico}`,
      );

      if (!resposta.ok) {
        throw new Error("Erro ao buscar horários.");
      }

      const dados = await resposta.json();

      setHorarios(dados);
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
      setErro("Não foi possível carregar os horários.");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("tokenFuncionario");

    if (!token) {
      navigate("/loginfuncionario");
      return;
    }

    buscarMedicos();
  }, []);

  useEffect(() => {
    buscarHorarios(medicoSelecionado);
  }, [medicoSelecionado]);

  const handleCadastrar = async (e) => {
    e.preventDefault();

    setErro("");
    setMensagem("");
    setCarregando(true);

    try {
      const token = localStorage.getItem("tokenFuncionario");

      if (!token) {
        navigate("/loginfuncionario");
        return;
      }

      const resposta = await fetch(
        "http://sistema-agendamento-posto-saude-production.up.railway.app/horarios",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_medico: medicoSelecionado,
            dia_semana: diaSemana,
            hora_inicio: horaInicio,
            hora_fim: horaFim,
          }),
        },
      );

      const dados = await resposta.json();

      if (resposta.status === 401) {
        localStorage.removeItem("tokenFuncionario");
        localStorage.removeItem("funcionario");
        navigate("/loginfuncionario");
        return;
      }

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cadastrar horário.");
      }

      setMensagem("Horário cadastrado com sucesso!");

      setDiaSemana("");
      setHoraInicio("");
      setHoraFim("");

      await buscarHorarios(medicoSelecionado);
    } catch (error) {
      console.error("Erro ao cadastrar horário:", error);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="horarios">
      <h1>Cadastro de Horários</h1>

      <form onSubmit={handleCadastrar}>
        <label>Médico</label>

        <select
          value={medicoSelecionado}
          onChange={(e) => setMedicoSelecionado(e.target.value)}
          required
        >
          <option value="">Selecione um médico</option>

          {medicos.map((medico) => (
            <option key={medico.id_medico} value={medico.id_medico}>
              {medico.nome}
            </option>
          ))}
        </select>

        <label>Dia da Semana</label>

        <select
          value={diaSemana}
          onChange={(e) => setDiaSemana(e.target.value)}
          required
        >
          <option value="">Selecione um dia</option>
          <option value="Segunda-feira">Segunda-feira</option>
          <option value="Terça-feira">Terça-feira</option>
          <option value="Quarta-feira">Quarta-feira</option>
          <option value="Quinta-feira">Quinta-feira</option>
          <option value="Sexta-feira">Sexta-feira</option>
        </select>

        <label>Horário Inicial</label>

        <input
          type="time"
          value={horaInicio}
          onChange={(e) => setHoraInicio(e.target.value)}
          required
        />

        <label>Horário Final</label>

        <input
          type="time"
          value={horaFim}
          onChange={(e) => setHoraFim(e.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar Horário"}
        </button>
      </form>

      <h2>Horários do Médico</h2>

      {!medicoSelecionado ? (
        <p>Selecione um médico para visualizar os horários.</p>
      ) : horarios.length === 0 ? (
        <p>Nenhum horário cadastrado para este médico.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Dia</th>
              <th>Horário Inicial</th>
              <th>Horário Final</th>
            </tr>
          </thead>

          <tbody>
            {horarios.map((horario) => (
              <tr key={horario.id_horario}>
                <td>{horario.dia_semana}</td>
                <td>{horario.hora_inicio.substring(0, 5)}</td>
                <td>{horario.hora_fim.substring(0, 5)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Horarios;
