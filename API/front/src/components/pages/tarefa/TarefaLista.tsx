import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Tarefa } from "../../../interfaces/ITarefa";
import styles from "./TarefaLista.module.css";

function TarefaLista() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tarefas/listar")
      .then((resposta) => {
        return resposta.json();
      })
      .then((tarefas) => {
        setTarefas(tarefas);
      });
  });

  function deletar(id: string) {
    axios
      .delete(`http://localhost:5000/api/tarefas/deletar/${id}`)
      .then((resposta) => {
        console.log(resposta.data);
      });
  }

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>Título</th>
            <th>Descrição</th>
            <th>Criado Em</th>
            <th>Categoria</th>
            <th>Status</th>
            <th>Deletar</th>
            <th>Alterar</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((tarefa) => (
            <tr key={tarefa.tarefaId}>
              <td>{tarefa.tarefaId}</td>
              <td>{tarefa.titulo}</td>
              <td>{tarefa.descricao}</td>
              <td>{tarefa.criadoEm}</td>
              <td>{tarefa.categoria?.nome}</td>
              <td>{tarefa.status}</td>
              <td>
                <button onClick={() => deletar(tarefa.tarefaId!)}>
                  Deletar
                </button>
              </td>
              <td>
                <Link to={`/pages/tarefa/alterar/${tarefa.tarefaId}`}>
                  Alterar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TarefaLista;
