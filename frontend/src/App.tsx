import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import "./style.css";

const API_URL = "http://localhost:3000/api/usuarios";

interface Estudante {
  id: number;
  nome: string;
  email: string;
}

function App() {
  const [estudantes, setEstudantes] = useState<Estudante[]>([]);

  const [formData, setFormData] = useState({ id: "", nome: "", email: "" });

  const [editandoId, setEditandoId] = useState<number | null>(null);

  useEffect(() => {
    carregarEstudantes();
  }, []);

  async function carregarEstudantes() {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Falha ao buscar dados da API.");
      }
      const data: Estudante[] = await response.json();
      setEstudantes(data);
    } catch (error) {
      console.error("Erro ao carregar estudantes:", error);
    }
  }

  async function handleSalvar(event: FormEvent) {
    event.preventDefault();

    const { nome, email } = formData;
    const estudante = { nome, email };

    try {
      let response: Response;

      if (editandoId !== null) {
        response = await fetch(`${API_URL}/${editandoId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(estudante),
        });
      } else {
        response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(estudante),
        });
      }

      if (!response.ok) {
        throw new Error("Erro ao salvar estudante.");
      }

      alert("Estudante salvo com sucesso!");
      limparFormulario();
      carregarEstudantes();
    } catch (error) {
      console.error("Erro ao salvar estudante:", error);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
    }
  }

  async function deletarEstudante(id: number) {
    if (confirm(`Tem certeza que deseja deletar o estudante ${id}?`)) {
      try {
        const response = await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erro ao deletar estudante.");
        }

        alert("Estudante deletado com sucesso!");
        carregarEstudantes();
      } catch (error) {
        console.error("Erro ao deletar estudante:", error);
        alert("Ocorreu um erro ao deletar. Tente novamente.");
      }
    }
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function limparFormulario() {
    setFormData({ id: "", nome: "", email: "" });
    setEditandoId(null);
  }

  function handleEditar(estudante: Estudante) {
    setFormData({
      id: estudante.id.toString(),
      nome: estudante.nome,
      email: estudante.email,
    });
    setEditandoId(estudante.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="container">
      <h1>Gestão de Estudantes</h1>

      <form id="form-estudante" onSubmit={handleSalvar}>
        {}
        <input type="hidden" id="id" value={formData.id} />

        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            placeholder="Nome do estudante"
            value={formData.nome}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="email@dominio.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="botoes-form">
          <button type="submit" className="btn-salvar">
            {editandoId !== null ? "Atualizar" : "Salvar"}
          </button>
          <button
            type="button"
            id="btn-limpar"
            className="btn-limpar"
            onClick={limparFormulario}
          >
            Limpar
          </button>
        </div>
      </form>

      <hr />

      <h2>Lista de Estudantes</h2>

      <table id="tabela-estudantes">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody id="corpo-tabela">
          {estudantes.length === 0 ? (
            <tr>
              <td colSpan={4}>Nenhum estudante cadastrado.</td>
            </tr>
          ) : (
            estudantes.map((estudante) => (
              <tr key={estudante.id}>
                <td>{estudante.id}</td>
                <td>{estudante.nome}</td>
                <td>{estudante.email}</td>
                <td className="acoes">
                  <button
                    className="btn-editar"
                    onClick={() => handleEditar(estudante)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn-deletar"
                    onClick={() => deletarEstudante(estudante.id)}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  );
}

export default App;
