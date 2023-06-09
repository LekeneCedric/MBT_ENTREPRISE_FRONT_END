import { IPrivilege, IRole } from './../models/role';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private env : EnvironmentService,private http:HttpClient) { }

  public getList():Observable<IRole[]>
  {
    return this.http.get<IRole[]>(`${this.env.api}/roles`,{headers:this.env.httpHeader});
  }

  public add(data:IRole):Observable<IRole>
  {
    return this.http.post<IRole>(`${this.env.api}/roles`,data,{headers:this.env.httpHeader});
  }

  public update(data:IRole,id:number):Observable<IRole>
  {
    return this.http.post<IRole>(`${this.env.api}/roles/${id}`,data,{headers:this.env.httpHeader});
  }

  public delete(id:number):Observable<IRole>
  {
    return this.http.delete<IRole>(`${this.env.api}/roles/${id}`,{headers:this.env.httpHeader});
  }

  public getListPrivilege():Observable<IPrivilege[]>
  {
    return this.http.get<IPrivilege[]>(`${this.env.api}/privileges`,{headers:this.env.httpHeader});
  }

  public addPriv(idrole:any,idpriv:any):Observable<IRole>
  {
    return this.http.post<IRole>(`${this.env.api}/savepriv`,{idrole:idrole,idpriv:idpriv},{headers:this.env.httpHeader});
  }

  public getListPrivilegeyUser():Observable<IPrivilege[]>
  {
    return this.http.get<IPrivilege[]>(`${this.env.api}/privilegesbyuser/${JSON.parse(localStorage.getItem("users")!).user.id}`,{headers:this.env.httpHeader});
  }
}
