export class Turma {
    id: number;
    nomeDoProfessor: string;
    serie: number;
    titulo: number;
    quantidadeDeAlunos: number;
    alunos: Aluno[] = [];
}

export class Aluno {
    id: number;
    nome: string;
    quantidadeDeFaltas: number;
    mediaDeNotas: number;
    turma = new Turma();
}