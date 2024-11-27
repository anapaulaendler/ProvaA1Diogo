import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Categoria } from "../../../interfaces/ICategoria";
import { Tarefa } from "../../../interfaces/ITarefa";

function TarefaAlterar() {
  const { id } = useParams();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get<Tarefa>(
          `http://localhost:5000/api/tarefas/buscar/${id}`
        )
        .then((resposta) => {
          buscarCategorias();
        });
    }
  }, []);

  function buscarCategorias() {
    axios
      .get<Categoria[]>("http://localhost:5000/api/categoria/listar")
      .then((resposta) => {
        setCategorias(resposta.data);
      });
  }

  function enviarTarefa(e: any) {
    e.preventDefault();

    const tarefa : Tarefa = {
        titulo: titulo,
        descricao: descricao,
        categoriaId: categoriaId,
      };

    axios
      .put(`http://localhost:5000/api/tarefas/alterar/${id}`, tarefa)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div id="alterar-tarefa" className="container">
      <h1>Alterar Tarefa</h1>
      <form onSubmit={enviarTarefa}>

        <button type="submit">Atualizar Status de Tarefa</button>
      </form>
    </div>
  );
}

export default TarefaAlterar;
