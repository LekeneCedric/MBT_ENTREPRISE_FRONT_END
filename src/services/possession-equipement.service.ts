import { Iequipement } from 'src/models/equipement';
import { Observable } from 'rxjs';
import { IPossessionEquipement } from './../models/possessionEquipement';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PossessionEquipementService {

  constructor(private http:HttpClient,private environement:EnvironmentService) { }

  public getOnePossession(id_possession:number):Observable<IPossessionEquipement>
  {
    return this.http.get<IPossessionEquipement>(`${this.environement.api}/possessionEquipement/${id_possession}`,{headers:this.environement.httpHeader});
  }
  public linkEquipementToAgence(data:IPossessionEquipement):Observable<any>
  {
    return this.http.post<any>(`${this.environement.api}/possessionEquipement/assignerEquipement`,data,{headers:this.environement.httpHeader});
  }
  delinkEquipement = (id_salle:number,id_equipement:number):Observable<any>=>{
    return this.http.post<any>(`${this.environement.api}/possessionEquipement/delierEquipement`,{id_salle:id_salle,id_equipement:id_equipement},{headers:this.environement.httpHeader});
  }
  public listLinkEquipementsBySalle(id_salle:number):Observable<Iequipement[]>
  {
    return this.http.post<Iequipement[]>(`${this.environement.api}/possessionEquipement/listEquipementBySalle`,{id_salle:id_salle},{headers:this.environement.httpHeader});
  }
  public listEquipementByAgence(id_agence:number):Observable<IPossessionEquipement[]>
  {
    return this.http.get<IPossessionEquipement[]>(`${this.environement.api}/equipement/agence/${id_agence}`,{headers:this.environement.httpHeader});
  }

  public listEquipementByEntreprise(id_entreprise:number):Observable<IPossessionEquipement[]>
  {
    return this.http.get<IPossessionEquipement[]>(`${this.environement.api}/equipement/entreprise/${id_entreprise}`,{headers:this.environement.httpHeader});
  }
}
