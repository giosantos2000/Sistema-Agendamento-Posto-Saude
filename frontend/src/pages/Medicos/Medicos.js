import "./Medicos.css";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

function Medicos() {
  const navigate = useNavigate();

  const [medicos, setMedicos] = useState([]);
  const [nome, setNome] = useState("");
  const [crm, setCrm] = useState("");
  const [telefone, setTelefone] = useState("");
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const buscarMedicos = useCallback(async () => {
    try {
      const token = localStorage.getItem("tokenFuncionario");

      if (!token) {
        navigate("/loginfuncionario");
        return;
      }

      const resposta = await fetch(
        "http://sistema-agendamento-posto-saude-production.up.railway.app/medicos",
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
        throw new Error(dados.mensagem || "Erro ao buscar médicos.");
      }

      setMedicos(dados);
    } catch (error) {
      console.error("Erro ao buscar médicos:", error);
      setErro(error.message || "Não foi possível carregar os médicos.");
    }
  }, [navigate]);

  useEffect(() => {
    buscarMedicos();
  }, [buscarMedicos]);

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
        "http://sistema-agendamento-posto-saude-production.up.railway.app/medicos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            nome,
            crm,
            telefone,
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
        throw new Error(dados.mensagem || "Erro ao cadastrar médico.");
      }

      setMensagem("Médico cadastrado com sucesso!");

      setNome("");
      setCrm("");
      setTelefone("");

      await buscarMedicos();
    } catch (error) {
      console.error("Erro ao cadastrar médico:", error);
      setErro(error.message || "Erro ao cadastrar médico.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="medicos">
      <h1>Cadastro de Médicos</h1>

      <form onSubmit={handleCadastrar}>
        <label>Nome Completo</label>

        <input
          type="text"
          placeholder="Digite o nome do médico"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <label>CRM</label>

        <input
          type="text"
          placeholder="Digite o CRM"
          value={crm}
          onChange={(e) => setCrm(e.target.value)}
          required
        />

        <label>Telefone</label>

        <input
          type="text"
          placeholder="Digite o telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
        />

        {erro && <p className="erro">{erro}</p>}

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button type="submit" disabled={carregando}>
          {carregando ? "Cadastrando..." : "Cadastrar Médico"}
        </button>
      </form>

      <h2>Médicos Cadastrados</h2>

      {medicos.length === 0 ? (
        <p>Nenhum médico cadastrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CRM</th>
              <th>Telefone</th>
            </tr>
          </thead>

          <tbody>
            {medicos.map((medico) => (
              <tr key={medico.id_medico}>
                <td>{medico.nome}</td>
                <td>{medico.crm}</td>
                <td>{medico.telefone || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Medicos;
