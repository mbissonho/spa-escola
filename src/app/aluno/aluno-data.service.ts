import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluno } from './aluno-master-detail/aluno-master-detail.component';

@Injectable({
  providedIn: 'root'
})
export class AlunoDataService {

  private resourceUrl = `${environment.apiUrl}/v1/aluno`;

  constructor(
    private http: HttpClient
  ) { }

  loadByTurma(turmaId: number){
    return this.http.get(`${this.resourceUrl}/turma/${turmaId}`).toPromise();
  }

  save(aluno: Aluno){
    return this.http.post(this.resourceUrl, aluno).toPromise();
  }

  update(aluno: Aluno){
    return this.http.put(`${this.resourceUrl}/${aluno.id}`, aluno).toPromise();
  }

  delete(alunoId: number){
    return this.http.delete(`${this.resourceUrl}/${alunoId}`).toPromise();
  }
}
