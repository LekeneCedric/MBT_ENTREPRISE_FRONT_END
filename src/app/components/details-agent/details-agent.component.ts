import { Imaintenance } from 'src/models/maintenance';
import { MaintenanceService } from 'src/services/maintenance.service';
import { AgentsService } from 'src/services/agents.service';
import { IAgent } from 'src/models/agent';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-agent',
  templateUrl: './details-agent.component.html',
  styleUrls: ['./details-agent.component.scss']
})
export class DetailsAgentComponent implements OnInit{
private id_agent : number = Number(this.router.snapshot.paramMap.get('id'));
public agent : IAgent = {};
public maintenances_list : Imaintenance[] = [];
constructor(
private router : ActivatedRoute,
private agentServ : AgentsService,
private maintenanceServ : MaintenanceService
){}
ngOnInit(): void {
    this.agentServ.getAgent(this.id_agent).subscribe((data)=>
    {
      this.agent = data;
    });
    this.maintenanceServ.getHistoriqueMaintenanceByAgent(this.id_agent).subscribe((data)=>
    {
      this.maintenances_list = data;
    })
}
}
