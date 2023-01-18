import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private env : EnvironmentService,
    private http:HttpClient
  ) { }
  private entreprise_id :number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  getStatistic = ():Observable<any>=>
  {
    return this.http.get(`${this.env.api}/entreprise/statistics/${this.entreprise_id}`,{headers:this.env.httpHeader});
  }
}
