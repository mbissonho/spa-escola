export class Turma {
    id: number;
    nomeDoProfessor: string;
    serie: string;
    titulo: string;
    quantidadeDeAlunos: number;
}

export class Aluno {
    id: number;
    nome: string;
    quantidadeDeFaltas: number;
    mediaDeNotas: number;
    turma = new Turma();
}