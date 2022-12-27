import { Observable } from 'rxjs';
import { IEntreprise } from './../models/entreprise';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  constructor(private http:HttpClient,private environement:EnvironmentService) { }

  public loginEntreprise(email:string,code:string):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/entreprise/login`,{email:email,code:code},{headers:this.environement.httpHeader});
  }

  public createEntreprise(data:IEntreprise):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/entreprise`,data);
  }
}
