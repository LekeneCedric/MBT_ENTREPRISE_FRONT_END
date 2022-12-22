import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFournisseur } from 'src/models/fournisseur';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  
  constructor(private http:HttpClient,private environmentService:EnvironmentService) { }

  public getFournisseur():Observable<IFournisseur[]>
  {
    return this.http.get<IFournisseur[]>(`${this.environmentService.api}/fournisseur`,{headers:this.environmentService.httpHeader});
  }

  public getOneFournisseur(id_f:number):Observable<IFournisseur>
  {
    return this.http.get<IFournisseur>(`${this.environmentService.api}/fournisseur/${id_f}`,{headers:this.environmentService.httpHeader});
  }

  public getFournisseursByAgence(id_a:number):Observable<IFournisseur>
  {
    return this.http.get<IFournisseur>(`${this.environmentService.api}/fournisseur/agence/${id_a}`,{headers:this.environmentService.httpHeader})
  }

  public createFournisseur(data:IFournisseur):Observable<IFournisseur>
  {
    return this.http.post<IFournisseur>(`${this.environmentService.api}/fournisseur`,data,{headers:this.environmentService.httpHeader});
  }

  public updateFournisseur(data:IFournisseur,id_f:number):Observable<IFournisseur>
  {
    return this.http.post<IFournisseur>(`${this.environmentService.api}/fournisseur/${id_f}`,data,{headers:this.environmentService.httpHeader}); 
  }

  public deleteFournisseur(id_f:number):Observable<IFournisseur>
  {
    return this.http.delete<IFournisseur>(`${this.environmentService.api}/fournisseur/${id_f}`,{headers:this.environmentService.httpHeader});
  }
}
