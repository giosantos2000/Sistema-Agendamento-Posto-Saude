import "./Agendamento.css";
import { useEffect, useState } from "react";

function Agendamento() {
  const [medicos, setMedicos] = useState([]);
  const [horarios, setHorarios] = useState([]);

  const [medicoSelecionado, setMedicoSelecionado] = useState("");
  const [horarioSelecionado, setHorarioSelecionado] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");

  const [carregandoMedicos, setCarregandoMedicos] = useState(true);
  const [carregandoHorarios, setCarregandoHorarios] = useState(false);

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarMedicos = async () => {
      try {
        const resposta = await fetch("http://localhost:5000/medicos");

        if (!resposta.ok) {
          throw new Error("Erro ao buscar médicos.");
        }

        const dados = await resposta.json();

        setMedicos(dados);
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os médicos.");
      } finally {
        setCarregandoMedicos(false);
      }
    };

    buscarMedicos();
  }, []);

  useEffect(() => {
    if (!medicoSelecionado || !dataConsulta) {
      setHorarios([]);
      setHorarioSelecionado("");
      return;
    }

    const buscarHorarios = async () => {
      try {
        setCarregandoHorarios(true);
        setErro("");

        const resposta = await fetch(
          `http://localhost:5000/horarios/disponiveis/medico/${medicoSelecionado}?data=${dataConsulta}`,
        );

        if (!resposta.ok) {
          throw new Error("Erro ao buscar horários.");
        }

        const dados = await resposta.json();

        setHorarios(dados);
        setHorarioSelecionado("");
      } catch (error) {
        console.error(error);
        setErro("Não foi possível carregar os horários.");
      } finally {
        setCarregandoHorarios(false);
      }
    };

    buscarHorarios();
  }, [medicoSelecionado, dataConsulta]);

  const handleAgendar = async (e) => {
    e.preventDefault();

    setMensagem("");
    setErro("");

    const pacienteStorage = localStorage.getItem("paciente");

    if (!pacienteStorage) {
      setErro("Paciente não encontrado. Faça login novamente.");
      return;
    }

    const paciente = JSON.parse(pacienteStorage);

    if (!medicoSelecionado || !horarioSelecionado || !dataConsulta) {
      setErro("Preencha todos os campos.");
      return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataSelecionada = new Date(`${dataConsulta}T00:00:00`);

    if (dataSelecionada < hoje) {
      setErro("Não é possível agendar uma consulta para uma data passada.");
      return;
    }

    const horario = horarios.find(
      (item) => item.id_horario === Number(horarioSelecionado),
    );

    if (!horario) {
      setErro("Horário selecionado não encontrado.");
      return;
    }

    const diasSemana = [
      "Domingo",
      "Segunda-feira",
      "Terça-feira",
      "Quarta-feira",
      "Quinta-feira",
      "Sexta-feira",
      "Sábado",
    ];

    const diaSelecionado = diasSemana[dataSelecionada.getDay()];

    if (diaSelecionado !== horario.dia_semana) {
      setErro(
        `O horário selecionado está disponível somente às ${horario.dia_semana}.`,
      );
      return;
    }

    try {
      const resposta = await fetch("http://localhost:5000/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_paciente: paciente.id,
          id_medico: Number(medicoSelecionado),
          id_horario: Number(horarioSelecionado),
          data_consulta: dataConsulta,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao agendar consulta.");
      }

      setMensagem("Consulta agendada com sucesso!");
      setMedicoSelecionado("");
      setHorarioSelecionado("");
      setDataConsulta("");
      setHorarios([]);
    } catch (error) {
      console.error(error);
      setErro(error.message);
    }
  };

  const hojeFormatado = new Date().toISOString().split("T")[0];

  return (
    <div className="agendamento">
      <h1>Agendar Consulta</h1>

      {mensagem && <p>{mensagem}</p>}

      {erro && <p>{erro}</p>}

      <form onSubmit={handleAgendar}>
        <label>Médico</label>

        {carregandoMedicos ? (
          <p>Carregando médicos...</p>
        ) : (
          <select
            value={medicoSelecionado}
            onChange={(e) => {
              setMedicoSelecionado(e.target.value);
              setHorarioSelecionado("");
              setErro("");
              setMensagem("");
            }}
          >
            <option value="">Selecione um médico</option>

            {medicos.map((medico) => (
              <option key={medico.id_medico} value={medico.id_medico}>
                {medico.nome}
              </option>
            ))}
          </select>
        )}

        <label>Data</label>

        <input
          type="date"
          value={dataConsulta}
          min={hojeFormatado}
          onChange={(e) => {
            setDataConsulta(e.target.value);
            setHorarioSelecionado("");
            setErro("");
            setMensagem("");
          }}
          disabled={!medicoSelecionado}
        />

        <label>Horário</label>

        {carregandoHorarios ? (
          <p>Carregando horários...</p>
        ) : (
          <select
            value={horarioSelecionado}
            onChange={(e) => {
              setHorarioSelecionado(e.target.value);
              setErro("");
              setMensagem("");
            }}
            disabled={!medicoSelecionado || !dataConsulta}
          >
            <option value="">
              {!medicoSelecionado
                ? "Selecione primeiro um médico"
                : !dataConsulta
                  ? "Selecione primeiro uma data"
                  : horarios.length === 0
                    ? "Nenhum horário disponível"
                    : "Selecione um horário"}
            </option>

            {horarios.map((horario) => (
              <option key={horario.id_horario} value={horario.id_horario}>
                {horario.dia_semana} - {horario.hora_inicio.substring(0, 5)} às{" "}
                {horario.hora_fim.substring(0, 5)}
              </option>
            ))}
          </select>
        )}

        <button type="submit">Agendar Consulta</button>
      </form>
    </div>
  );
}

export default Agendamento;
