import { Ilog } from './../models/log';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(
    private env:EnvironmentService,
    private http:HttpClient
  ) { }
  public entreprise_id :number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  getLogs = ():Observable<Ilog[]>=>
  {
    return this.http.get<Ilog[]>(`${this.env.api}/log/${this.entreprise_id}`,{headers:this.env.httpHeader});
  }
  getLogbyAgent = (id_agent:number):Observable<Ilog[]>=>
  {
    return this.http.get<Ilog[]>(`${this.env.api}/log/agent/${id_agent}`,{headers:this.env.httpHeader});
  }
  setLogs = (log:Ilog):Observable<Ilog>=>
  {
    log.id_agent = Number(JSON.parse(localStorage.getItem("entreprise")!).agent.id);
    return this.http.post<Ilog>(`${this.env.api}/log`,log,{headers:this.env.httpHeader});
  }
  formatDate(date:Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
}
