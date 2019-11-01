
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

  save(){

  }

  update(){

  }

  delete(){

  }

}
