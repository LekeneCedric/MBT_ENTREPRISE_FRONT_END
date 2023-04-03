import { AgenceService } from 'src/services/agence.service';
import { Iagence } from 'src/models/agence';
import { Ilog } from './../../../models/log';
import { Imaintenance } from 'src/models/maintenance';
import { MaintenanceService } from 'src/services/maintenance.service';
import { AgentsService } from 'src/services/agents.service';
import { IAgent } from 'src/models/agent';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/services/log.service';

@Component({
  selector: 'app-details-agent',
  templateUrl: './details-agent.component.html',
  styleUrls: ['./details-agent.component.scss']
})
export class DetailsAgentComponent implements OnInit{
private id_agent : number = Number(this.router.snapshot.paramMap.get('id'));
public agent : IAgent = {};
public agences : Iagence[] = []; 
public user_connected : IAgent = {}
public maintenances_list : Imaintenance[] = [];
public logs : Ilog[] = [];
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
constructor(
private agenceServ : AgenceService,
private logServ : LogService,
private router : ActivatedRoute,
private agentServ : AgentsService,
private maintenanceServ : MaintenanceService
){}
public periode : number = 0 ;
get periodeStr():string{
  return  this.periode == 0 ? "Aujourd'hui" : (this.periode == 1 ? "Cette semaine" : "Ce mois");
}
changePeriode(i : number )
{
  this.periode = i;
}
ngOnInit(): void {
    this.user_connected = JSON.parse(localStorage.getItem("entreprise")!).agent;
    this.agenceServ.getAgences().subscribe((data)=>
    {
      this.agences = data ; 
    })
    this.agentServ.getAgent(this.id_agent).subscribe((data)=>
    {
      this.agent = data;
    });
    this.maintenanceServ.getHistoriqueMaintenanceByAgent(this.id_agent).subscribe((data)=>
    {
      this.maintenances_list = data;
    });
    this.logServ.getLogbyAgent(this.id_agent).subscribe((data)=>
    {
      this.logs = data;
    })
};
public updateAgent()
  {
    this.agentServ.editAgent(this.agent,this.agent.id!).subscribe(
      (data)=>
      {
        this.logServ.setLogs(
          {
            id_entreprise:this.logServ.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Modification du profil de l'agent ${this.agent.nom} (${this.agent.specialite})`,
            group : 'Agent',
            user  : `${JSON.parse(localStorage.getItem("entreprise")!).agent.nom}`
          }
        ).subscribe((data)=>
        {
          this.ngOnInit();
        })
      }
    )
  }
}
