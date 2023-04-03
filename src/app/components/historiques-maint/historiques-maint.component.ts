import { Iequipement } from 'src/models/equipement';
import { AgentsService } from 'src/services/agents.service';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { Imaintenance } from 'src/models/maintenance';
import { ActivatedRoute } from '@angular/router';
import { INotification } from './../../../models/notification';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Iagence } from 'src/models/agence';
import { EquipementService } from 'src/services/equipement.service';

@Component({
  selector: 'app-historiques-maint',
  templateUrl: './historiques-maint.component.html',
  styleUrls: ['./historiques-maint.component.scss']
})
export class HistoriquesMaintComponent implements OnInit{

  constructor(
    private notifServ:NotificationService,
    private possessionServ:PossessionEquipementService,
    private agentServ : AgentsService,
    private equipementServ : EquipementService,
    private route:ActivatedRoute
  ){}
  agents_list : Iagence[] = [];
  notificationList : INotification[] = [];
  maintenancesList : Imaintenance[] = [];
  possession : IPossessionEquipement = {};
  sous_equipements : Iequipement [] = [];
  public selected_agent_id:number = 0 ; 
  public selected_id_eq : number = 0 ;
  private id_entreprise:number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  public id_possession:number = Number(this.route.snapshot.paramMap.get('id_possession')) ;
  public id_salle:number = Number(this.route.snapshot.paramMap.get('id_salle'));
  ngOnInit(): void {
    this.possessionServ.getOnePossession(this.id_possession).subscribe(
      (data)=>
      {
        this.possession = data;
        this.equipementServ.getAllSubEquipements(this.possession.equipement?.id!).subscribe((data)=>
      {
        
        this.sous_equipements = data;
        console.log(data)
      });
      }
    );
      this.agentServ.getAgents().subscribe((data)=>
      {
      this.agents_list = data;
      })
      this.notifServ.getAllMaintenanceEquipement(this.id_possession).subscribe(
        (data)=>
        {
          this.maintenancesList = data;
        }
      );
      
      
      
      
  }
  filterByAgent = ()=>
  {
    this.notifServ.getAllMaintenanceEquipement(this.id_possession).subscribe(
      (data)=>
      {
        this.maintenancesList = data;
        this.maintenancesList = this.maintenancesList.filter((maint)=>
         {
            return maint.agent?.id == this.selected_agent_id || this.selected_agent_id == 0 ;
         })
      }
    );
    
  } 
  filterBySubEquipement = ()=>
  {
    this.notifServ.getAllMaintenanceEquipement(this.id_possession).subscribe(
      (data)=>
      {
        this.maintenancesList = data;
        this.maintenancesList = this.maintenancesList.filter((maint)=>
        {
          return maint.equipement?.id == this.selected_id_eq || this.selected_id_eq==0;
        })
      }
    );
    
  }
}
