import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iagence } from 'src/models/agence';
@Injectable({
  providedIn: 'root'   
})
export class AgenceService {
  
  private localData :any ; 
  private httpHeader:HttpHeaders | undefined;
  constructor(private http:HttpClient,private environment:EnvironmentService) {
    this.httpHeader =new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest'
    })
   }

   /*
   Visibilite : Super Administrateur ( World Dev )
   Utilite : Recuperer toutes les agences disponibles
   */

  public getAgences():Observable<Iagence[]>{
    return this.http.get<Iagence[]>(this.environment.api + "/agence");
  }

  /*
  Visibilite : Super Administrateur ( World Dev ) | Administrateur client 
  Utilite : Recuperer toutes les agences d'une entreprise 
  */

  public getAgencesEntreprise(id_entreprise:number):Observable<Iagence[]>
  {
    return this.http.get<Iagence[]>(this.environment.api+"/agence/entreprise/"+id_entreprise);
  }

  /*
  Visibilite : SuperAdmin ( World Dev ) | Administrateur client
  Utilite : Recuper une agence particuliere
  */
 
  public getAgence(id_agence:number):Observable<Iagence>
  {
    return this.http.get<Iagence>(this.environment.api+"/agence/"+id_agence);
  }

  //Creer une agence ( Visible par l'administrateur du systeme et l'adiministrateur de l'entreprise)
  public createAgence(dataAgence:Iagence):Observable<any>
  {
    return this.http.post<Iagence>(this.environment.api+"/agence/",dataAgence);
  }

  //Modifier une agence 
  public updateAgence(dataAgence:Iagence,id_agence:number):Observable<Iagence>
  {
    return this.http.post<Iagence>(this.environment.api+"/agence/"+id_agence,dataAgence);
  }

  public deleteAgence(id_agence:number):Observable<Iagence>
  {
    return this.http.delete<Iagence>(this.environment.api+"/agence/"+id_agence);
  }



}
