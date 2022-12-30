import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Imaintenance } from 'src/models/maintenance';
import { IAgent } from 'src/models/agent';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {

  constructor(private http:HttpClient , private environment:EnvironmentService) { }

  public getAllMaintenance():Observable<Imaintenance[]>
  {
    return this.http.get<Imaintenance[]>(`${this.environment.api}/maintenance/`,{headers:this.environment.httpHeader});
  }

  public getMaintenance(id_maintenance:number):Observable<Imaintenance>
  {
    return this.http.get<Imaintenance>(`${this.environment.api}/maintenance/${id_maintenance}`,{headers:this.environment.httpHeader});
  }

  public getMainteneurs():Observable<IAgent[]>
  {
    return this.http.get<IAgent[]>(`${this.environment.api}/maintenance/mainteneurs/${JSON.parse(localStorage.getItem("entreprise")!).id}`,{headers:this.environment.httpHeader});
  }
  public getMaintenanceByEquipement(id_equipement:number):Observable<Imaintenance[]>
  {
    return this.http.get<Imaintenance[]>(`${this.environment.api}/maintenance/equipement/${id_equipement}`,{headers:this.environment.httpHeader});
  }
  public getMaintenanceByEntreprise(id_entreprise:number):Observable<Imaintenance[]>
  {
    return this.http.get<Imaintenance[]>(`${this.environment.api}/maintenance/entreprise/${id_entreprise}`,{headers:this.environment.httpHeader});
  }
  public getMaintenanceByAgence(id_agence:number):Observable<Imaintenance[]>
  {
    return this.http.get<Imaintenance[]>(`${this.environment.api}/maintenance/agence/${id_agence}`,{headers:this.environment.httpHeader});
  }

  public addMaintenance(data:Imaintenance):Observable<Imaintenance>
  {
    return this.http.post<Imaintenance>(`${this.environment.api}/maintenance`,data,{headers:this.environment.httpHeader});
  }

  public updateMaintenance(data:Imaintenance,id_maint:number):Observable<Imaintenance>
  {
    return this.http.post<Imaintenance>(`${this.environment.api}/maintenance/${id_maint}`,data,{headers:this.environment.httpHeader});
  }

  public deleteMaintenance(id_maint:number):Observable<Imaintenance>
  {
    return this.http.delete<Imaintenance>(`${this.environment.api}/maintenance/${id_maint}`,{headers:this.environment.httpHeader});
  }
}
