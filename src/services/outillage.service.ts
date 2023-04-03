import { Ioutillage } from './../models/outillage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class OutillageService {

  constructor(private env : EnvironmentService,private http:HttpClient) { }

  public getList():Observable<Ioutillage[]>
  {
    return this.http.get<Ioutillage[]>(`${this.env.api}/outillage/${JSON.parse(localStorage.getItem("entreprise")!).id}`,{headers:this.env.httpHeader});
  }
  public add(data:Ioutillage):Observable<Ioutillage>
  {
    return this.http.post<Ioutillage>(`${this.env.api}/outillage`,data,{headers:this.env.httpHeader});
  }
  public update(data:Ioutillage,id:number):Observable<Ioutillage>
  {
    return this.http.post<Ioutillage>(`${this.env.api}/outillage/${id}`,data,{headers:this.env.httpHeader});
  }
  public delete(id:number):Observable<Ioutillage>
  {
    return this.http.delete<Ioutillage>(`${this.env.api}/outillage/${id}`,{headers:this.env.httpHeader});
  }
}
