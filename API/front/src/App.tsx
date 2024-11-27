import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import TarefaCadastro from "./components/pages/tarefa/TarefaCadastro";
import TarefaLista from "./components/pages/tarefa/TarefaLista";
import TarefaAlterar from "./components/pages/tarefa/TarefaAlterar";
import TarefaListaConcluidas from "./components/pages/tarefa/TarefaListaConcluidas";
import TarefaListaNaoConcluidas from "./components/pages/tarefa/TarefaListaNaoConcluidas";

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/listar">Listar Tarefas</Link>
            </li>
            <li>
              <Link to="pages/tarefa/concluidas">Listar Tarefas Concluidas</Link>
            </li>
            <li>
              <Link to="pages/tarefa/naoconcluidas">Listar Tarefas Não Concluidas</Link>
            </li>
            <li>
              <Link to="/pages/tarefa/cadastrar">
                Cadastrar Tarefa
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TarefaLista />} />
          <Route
            path="/pages/tarefa/listar"
            element={<TarefaLista />}
          />
          <Route
            path="/pages/tarefa/cadastrar"
            element={<TarefaCadastro />}
          />
          <Route
            path="/pages/tarefa/alterar/:id"
            element={<TarefaAlterar />}
          />
          <Route
            path="/pages/tarefa/concluidas"
            element={<TarefaListaConcluidas />}
          />
          <Route
            path="/pages/tarefa/naoconcluidas"
            element={<TarefaListaNaoConcluidas />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
