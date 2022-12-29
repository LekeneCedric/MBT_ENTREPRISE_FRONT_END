import { AgenceService } from 'src/services/agence.service';
import { Iagence } from 'src/models/agence';
import { IAgent } from 'src/models/agent';
import { Component, OnInit } from '@angular/core';
import { AgentsService } from 'src/services/agents.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit{
  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public agents : IAgent[] | undefined;
  public agentsTemp : IAgent[] | undefined;
  public selected_agent : IAgent = {};
  public new_agent : IAgent = {};
  public agences : Iagence[] | undefined;
  public searchAgent:string  = "";
  constructor(private agenceService : AgenceService,private agentService:AgentsService){}
  ngOnInit(): void {
    this.agenceService.getAgencesEntreprise(this.entreprise_id).subscribe((data)=>
    {
      this.agences = data;
    })
    this.agentService.getAgentsByEntreprise(this.entreprise_id).subscribe((data)=>
    {
      this.agentsTemp = data;
      this.agents = data;
    })
  }
  public selectAgent(agent:IAgent)
  {
    this.selected_agent = agent;
  }
 public filterAgent ()
  {
    this.agents = this.agentsTemp;
    this.agents = this.agents?.filter((agent)=>{
      return agent!.nom!.toLowerCase().includes(this.searchAgent.toLowerCase()) || agent!.email!.toLowerCase().includes(this.searchAgent.toLowerCase()) || agent!.agence!.nom!.toLowerCase().includes(this.searchAgent) || this.searchAgent == "";
    })
  }
 public createAgent()
  {
    this.agentService.addAgent(this.new_agent).subscribe(
      (data)=>
      {
        this.ngOnInit()
      }
    )
  }
  public removeAgent()
  {
    this.agentService.removeAgent(this.selected_agent.id!).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }

  public updateAgent()
  {
    this.agentService.editAgent(this.selected_agent,this.selected_agent.id!).subscribe(
      (data)=>
      {
        console.log(data);
      }
    )
  }
  public specialites : string[] = [
    'Manager',
    'Maintenancier',
    'caissier',
    'developpeur',
    'reparateur',
    'gardien',
    'cuisinier',
    'manoeuvre',
  ];
}
