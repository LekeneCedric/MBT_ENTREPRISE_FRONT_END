import { Isalle } from './../models/salle';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalleService {

  constructor(private http:HttpClient, private env:EnvironmentService) { }
  
  public getAllSalles():Observable<Isalle[]>
  {
    return this.http.get<Isalle[]>(`${this.env.api}/salle`,{headers:this.env.httpHeader});
  }

  public getOneSalle(id_salle:number):Observable<Isalle>
  {
    return this.http.get<Isalle>(`${this.env.api}/salle${id_salle}`,{headers:this.env.httpHeader})
  }

  public getSallesByEntreprise(id_entreprise:number):Observable<Isalle[]>
  {
    return this.http.get<Isalle[]>(`${this.env.api}/salle/entreprise/${id_entreprise}`,{headers:this.env.httpHeader});
  }

  public getSalleByAgence(id_agence:number):Observable<Isalle[]>
  {
    return this.http.get<Isalle[]>(`${this.env.api}/salle/agence/${id_agence}`,{headers:this.env.httpHeader});
  }

  public storeSalle(salle:Isalle):Observable<Isalle>
  {
    return this.http.post<Isalle>(`${this.env.api}/salle/`,salle,{headers:this.env.httpHeader});
  }

  public editSalle(salle:Isalle):Observable<Isalle>
  {
    return this.http.post<Isalle>(`${this.env.api}/salle`,salle,{headers:this.env.httpHeader});
  }

  public deleteSalle(id_salle:number):Observable<Isalle>
  {
    return this.http.post<Isalle>(`${this.env.api}/salle/${id_salle}`,{Headers:this.env.httpHeader});
  }
}
