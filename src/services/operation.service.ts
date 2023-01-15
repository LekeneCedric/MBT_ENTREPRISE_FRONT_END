import { Ioperation } from './../models/operation';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(private env : EnvironmentService,private http:HttpClient) { }

  public getList():Observable<Ioperation[]>
  {
    return this.http.get<Ioperation[]>(`${this.env.api}/operation/${JSON.parse(localStorage.getItem("entreprise")!).id}`,{headers:this.env.httpHeader});
  }
  public add(data:Ioperation):Observable<Ioperation>
  {
    return this.http.post<Ioperation>(`${this.env.api}/operation`,data,{headers:this.env.httpHeader});
  }
  public update(data:Ioperation,id:number):Observable<Ioperation>
  {
    return this.http.post<Ioperation>(`${this.env.api}/operation/${id}`,data,{headers:this.env.httpHeader});
  }
  public delete(id:number):Observable<Ioperation>
  {
    return this.http.delete<Ioperation>(`${this.env.api}/operation/${id}`,{headers:this.env.httpHeader});
  }
}
