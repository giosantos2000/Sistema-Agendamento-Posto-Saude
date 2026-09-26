import "./Agenda.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Agenda() {
  const navigate = useNavigate();

  const hoje = new Date().toISOString().split("T")[0];

  const [dataSelecionada, setDataSelecionada] = useState(hoje);
  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [cancelando, setCancelando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  const buscarAgenda = async () => {
    const token = localStorage.getItem("tokenFuncionario");

    if (!token) {
      navigate("/loginfuncionario");
      return;
    }

    if (!dataSelecionada) {
      return;
    }

    try {
      setCarregando(true);
      setErro("");
      setMensagem("");

      const resposta = await fetch(
        `http://sistema-agendamento-posto-saude-production.up.railway.app/consultas/agenda?data=${dataSelecionada}`,
        {
          method: "GET",
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
        throw new Error(
          dados.mensagem || `Erro ao buscar agenda: ${resposta.status}`,
        );
      }

      if (!Array.isArray(dados)) {
        throw new Error("Os dados da agenda estão em um formato inválido.");
      }

      setConsultas(dados);
    } catch (error) {
      console.error("Erro ao buscar agenda:", error);
      setConsultas([]);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    buscarAgenda();
  }, [dataSelecionada]);

  const cancelarConsulta = async (idConsulta) => {
    const confirmou = window.confirm(
      "Tem certeza que deseja cancelar esta consulta?",
    );

    if (!confirmou) {
      return;
    }

    const token = localStorage.getItem("tokenFuncionario");

    if (!token) {
      navigate("/loginfuncionario");
      return;
    }

    try {
      setCancelando(true);
      setErro("");
      setMensagem("");

      const resposta = await fetch(
        `http://sistema-agendamento-posto-saude-production.up.railway.app/consultas/${idConsulta}/cancelar-funcionario`,
        {
          method: "PUT",
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
        throw new Error(dados.mensagem || "Erro ao cancelar a consulta.");
      }

      setMensagem("Consulta cancelada com sucesso!");

      await buscarAgenda();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      setErro(error.message);
    } finally {
      setCancelando(false);
    }
  };

  return (
    <div className="agenda">
      <h1>Agenda do Dia</h1>

      <label>Selecione a data</label>

      <input
        type="date"
        value={dataSelecionada}
        onChange={(e) => setDataSelecionada(e.target.value)}
      />

      {carregando && <p>Carregando agenda...</p>}

      {erro && <p>{erro}</p>}

      {mensagem && <p>{mensagem}</p>}

      {!carregando && !erro && consultas.length === 0 && (
        <p>Não há consultas para esta data.</p>
      )}

      {!carregando && !erro && consultas.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Horário</th>
              <th>Paciente</th>
              <th>Médico</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>

          <tbody>
            {consultas.map((consulta) => (
              <tr key={consulta.id_consulta}>
                <td>
                  {consulta.hora_inicio.substring(0, 5)} -{" "}
                  {consulta.hora_fim.substring(0, 5)}
                </td>

                <td>{consulta.paciente}</td>

                <td>{consulta.medico}</td>

                <td>{consulta.status}</td>

                <td>
                  {consulta.status === "Agendada" && (
                    <button
                      type="button"
                      onClick={() => cancelarConsulta(consulta.id_consulta)}
                      disabled={cancelando}
                    >
                      {cancelando ? "Cancelando..." : "Cancelar"}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Agenda;
