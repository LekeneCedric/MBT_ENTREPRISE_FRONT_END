import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';
import { Ietat } from 'src/models/etat';

@Injectable({
  providedIn: 'root'
})
export class EtatService {

  constructor(private env : EnvironmentService,private http:HttpClient) { }

  public getList():Observable<Ietat[]>
  {
    return this.http.get<Ietat[]>(`${this.env.api}/etat/${JSON.parse(localStorage.getItem("entreprise")!).id}`,{headers:this.env.httpHeader});
  }
  public add(data:Ietat):Observable<Ietat>
  {
    return this.http.post<Ietat>(`${this.env.api}/etat`,data,{headers:this.env.httpHeader});
  }
  public update(data:Ietat,id:number):Observable<Ietat>
  {
    return this.http.post<Ietat>(`${this.env.api}/etat/${id}`,data,{headers:this.env.httpHeader});
  }
  public delete(id:number):Observable<Ietat>
  {
    return this.http.delete<Ietat>(`${this.env.api}/etat/${id}`,{headers:this.env.httpHeader});
  }
}
