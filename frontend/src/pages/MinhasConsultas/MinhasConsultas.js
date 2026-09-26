import "./MinhasConsultas.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";

function MinhasConsultas() {
  const navigate = useNavigate();

  const [consultas, setConsultas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });
  };

  const formatarHora = (hora) => {
    return hora.substring(0, 5);
  };

  const buscarConsultas = useCallback(async () => {
    try {
      const paciente = JSON.parse(localStorage.getItem("paciente"));
      const token = localStorage.getItem("token");

      if (!paciente || !token) {
        navigate("/login");
        return;
      }

      const resposta = await fetch(
        `http://sistema-agendamento-posto-saude-production.up.railway.app/consultas/paciente/${paciente.id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dados = await resposta.json();

      if (resposta.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("paciente");
        navigate("/login");
        return;
      }

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao buscar consultas.");
      }

      setConsultas(dados);
      setErro("");
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
      setErro("Não foi possível carregar suas consultas.");
    } finally {
      setCarregando(false);
    }
  }, [navigate]);

  useEffect(() => {
    buscarConsultas();
  }, [buscarConsultas]);

  const cancelarConsulta = async (idConsulta) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta consulta?",
    );

    if (!confirmar) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const resposta = await fetch(
        `http://sistema-agendamento-posto-saude-production.up.railway.app/consultas/${idConsulta}/cancelar`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const dados = await resposta.json();

      if (resposta.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("paciente");
        navigate("/login");
        return;
      }

      if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao cancelar consulta.");
      }

      alert("Consulta cancelada com sucesso!");

      await buscarConsultas();
    } catch (error) {
      console.error("Erro ao cancelar consulta:", error);
      alert(error.message || "Não foi possível cancelar a consulta.");
    }
  };

  return (
    <div className="minhas-consultas">
      <h1>Minhas Consultas</h1>

      {carregando && <p>Carregando consultas...</p>}

      {erro && <p>{erro}</p>}

      {!carregando && !erro && consultas.length === 0 && (
        <p>Você ainda não possui consultas agendadas.</p>
      )}

      {!carregando && !erro && consultas.length > 0 && (
        <div className="lista-consultas">
          {consultas.map((consulta) => (
            <div className="card-consulta" key={consulta.id_consulta}>
              <h3>Consulta #{consulta.id_consulta}</h3>

              <p>
                <strong>Médico:</strong> {consulta.medico}
              </p>

              <p>
                <strong>Data:</strong> {formatarData(consulta.data_consulta)}
              </p>

              <p>
                <strong>Dia:</strong> {consulta.dia_semana}
              </p>

              <p>
                <strong>Horário:</strong> {formatarHora(consulta.hora_inicio)} -{" "}
                {formatarHora(consulta.hora_fim)}
              </p>

              <p>
                <strong>Status:</strong> {consulta.status}
              </p>

              {consulta.status === "Agendada" && (
                <button
                  type="button"
                  onClick={() => cancelarConsulta(consulta.id_consulta)}
                >
                  Cancelar Consulta
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Link to="/dashboardpaciente">
        <button type="button">Voltar</button>
      </Link>
    </div>
  );
}

export default MinhasConsultas;
