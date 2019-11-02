import { Turma } from './../models';


import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TurmaDataService {

  private resourceUrl = `${environment.apiUrl}/v1/turma`;

  constructor(
    private http: HttpClient
  ) { }

  load(){
    return this.http.get(this.resourceUrl).toPromise();
  }

  save(turma: Turma){
    return this.http.post(this.resourceUrl, turma).toPromise();
  }

  update(turma: Turma){
    return this.http.put(`${this.resourceUrl}/${turma.id}`, turma).toPromise();
  }

  delete(turmaId: number){
    return this.http.delete(`${this.resourceUrl}/${turmaId}`).toPromise();
  }

}
