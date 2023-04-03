import { Iequipement } from './../models/equipement';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {

  constructor(private environementService:EnvironmentService,private http:HttpClient) { }

  public createEquipement(data:Iequipement):Observable<Iequipement>
  {
    return this.http.post<Iequipement>(`${this.environementService.api}/equipement`,data,{headers:this.environementService.httpHeader})
  }
  public editEquipement(data:Iequipement,id:number):Observable<Iequipement>
  {
    return this.http.post<Iequipement>(`${this.environementService.api}/equipement/${id}`,data,{headers:this.environementService.httpHeader});
  }
  public deleteEquipement(id_eq:number):Observable<Iequipement>
  {
    return this.http.delete<Iequipement>(`${this.environementService.api}/equipement/${id_eq}`,{headers:this.environementService.httpHeader})
  }
  public getEquipmentsByAgence(id_agence:number):Observable<Iequipement[]>
  {
    return this.http.get<Iequipement[]>(this.environementService.api+`/equipement/agence/${id_agence}`)
  }

  public getAllEquipments(id:number):Observable<Iequipement[]>
  {
    return this.http.get<Iequipement[]>(this.environementService.api+`/equipement/all/entreprise/${id}`);
  }
  public getAllSubEquipements(id:number):Observable<Iequipement[]>
  {
    return this.http.get<Iequipement[]>(`${this.environementService.api}/equipement/sub/${id}`,{headers:this.environementService.httpHeader});
  }
  public getOneEquipment(id_equipement:number):Observable<Iequipement>
  {
    return this.http.get<Iequipement>(this.environementService.api+`/equipement/${id_equipement}`);
  }

  public linkEquipement(data_link:any):Observable<Iequipement>
  {
    return this.http.post<Iequipement>(this.environementService.api+"/equipement/link/",data_link);
  }

  public getEquipementByAgence(id_agence:number):Observable<Iequipement[]>
  {
    return this.http.get<Iequipement[]>(this.environementService.api+`/equipement/agence/${id_agence}`);
  }

  public getEquipementsAgenceByFournisseur(body:any):Observable<Iequipement[]>
  {
    return this.http.post<Iequipement[]>(this.environementService.api+`/equipement/fournisseur`,body);
  }


} 
