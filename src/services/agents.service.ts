import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgent } from 'src/models/agent';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  private httpHeader:HttpHeaders | undefined;
  constructor(private http:HttpClient,private environement:EnvironmentService) {
    this.httpHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'X-Requested-With': 'XMLHttpRequest'
    })
   }

   public getAgents():Observable<IAgent[]>
   {
    return this.http.get<IAgent[]>(this.environement.api+`/agent/`,{headers:this.httpHeader});
   }

   public getAgent(id_agent:number):Observable<IAgent>
   {
    return this.http.get<IAgent>(this.environement.api+`/agent/${id_agent}`,{headers:this.httpHeader});
   }

   public getAgentsByEntreprise(id_entreprise:number):Observable<IAgent[]>
   {
    return this.http.get<IAgent[]>(this.environement.api+`/agent/entreprise/${id_entreprise}`,{headers:this.httpHeader});
   }

   public addAgent(agent:IAgent):Observable<IAgent>
   {
    return this.http.post<IAgent>(this.environement.api+"/agent/",agent,{headers:this.httpHeader});
   }
   
   public editAgent(newAgent:IAgent,id_agent:number):Observable<IAgent>
   {
    return this.http.post<IAgent>(this.environement.api+`/agent/${id_agent}`,newAgent,{headers:this.httpHeader});
   }

   public removeAgent(id_agent:number):Observable<IAgent>
   {
    return this.http.delete<IAgent>(this.environement.api+`/agent/${id_agent}`,{headers:this.httpHeader});
   }
}
