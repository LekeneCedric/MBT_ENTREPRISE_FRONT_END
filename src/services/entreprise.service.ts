import { Iauth } from './../models/authentication';
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

  public loginEntreprise(auth:Iauth):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/login`,auth,{headers:this.environement.httpHeader});
  }

  public login(auth:Iauth):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/loginuser`,auth,{headers:this.environement.httpHeader});
  }

  public getList(data:IEntreprise):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/searchEntreprise`,data);
  }

  public createEntreprise(data:IEntreprise):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/entreprise`,data);
  }
  public add(data:IEntreprise):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/entreprise`,data,{headers:this.environement.httpHeader});
  }
  public update(data:IEntreprise,id:number):Observable<IEntreprise>
  {
    return this.http.post<IEntreprise>(`${this.environement.api}/entreprise/${id}?_method=PUT`,data,{headers:this.environement.httpHeader});
  }
  public delete(id:number):Observable<IEntreprise>
  {
    return this.http.delete<IEntreprise>(`${this.environement.api}/entreprise/${id}`,{headers:this.environement.httpHeader});
  }
}
