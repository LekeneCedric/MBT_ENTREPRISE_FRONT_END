import { Iauth } from './../models/authentication';
import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient,private environement:EnvironmentService) { }

  public login(auth:Iauth):Observable<IUser>
  {
    return this.http.post<IUser>(`${this.environement.api}/loginuser`,auth,{headers:this.environement.httpHeader});
  }
  public getList():Observable<IUser[]>
  {
    return this.http.get<IUser[]>(`${this.environement.api}/users`,{headers:this.environement.httpHeader});
  }
  public add(data:IUser):Observable<IUser>
  {
    return this.http.post<IUser>(`${this.environement.api}/users`,data,{headers:this.environement.httpHeader});
  }
  public update(data:IUser,id:number):Observable<IUser>
  {
    return this.http.post<IUser>(`${this.environement.api}/users/${id}?_method=PUT`,data,{headers:this.environement.httpHeader});
  }
  public delete(id:number):Observable<IUser>
  {
    return this.http.delete<IUser>(`${this.environement.api}/users/${id}`,{headers:this.environement.httpHeader});
  }
  public hasprivilege(name:string)
  {
    let mespriv = JSON.parse(localStorage.getItem('mespriv')!);
    if (mespriv) {
      if(mespriv.filter((item:any) => item.name == name).length == 0){
        return false;
      }
      else{
        return true;
      }
    }
    else{
      return false;
    }
  }
}
