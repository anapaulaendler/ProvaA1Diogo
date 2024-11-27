import { Categoria } from "./ICategoria";

export interface Tarefa {
    tarefaId? : string;
    titulo? : string;
    descricao? : string;
    criadoEm? : string;
    categoria? : Categoria;
    categoriaId? : string;
    status? : string;

    // o que e setado automaticamente no back n precisa botar no front
}