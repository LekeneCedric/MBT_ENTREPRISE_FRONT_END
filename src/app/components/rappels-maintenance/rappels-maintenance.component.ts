import { AgenceService } from './../../../services/agence.service';
import { SalleService } from './../../../services/salle.service';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { AgentsService } from './../../../services/agents.service';
import { Isalle } from './../../../models/salle';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { Iagence } from './../../../models/agence';
import { INotification } from './../../../models/notification';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rappels-maintenance',
  templateUrl: './rappels-maintenance.component.html',
  styleUrls: ['./rappels-maintenance.component.scss']
})
export class RappelsMaintenanceComponent implements OnInit{
constructor(
  private notifServ:NotificationService,
  private agenceServ:AgenceService,
  private possessionServ:PossessionEquipementService,
  private salleServ:SalleService
){}
statut:number = 0;
agencesList:Iagence[] = [];
selected_agence_id:number = 0;
salles_list:Isalle[]=[];
selected_salle_id:number=0;
notifications_list : INotification[] = [];
private id_entreprise:number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
ngOnInit(): void {
    this.notifServ.getNotificationsEntreprise(this.id_entreprise).subscribe((data)=>
    {
      this.notifications_list = data;
    });
    this.agenceServ.getAgencesEntreprise(this.id_entreprise).subscribe((data)=>
    {
      this.agencesList = data;
    });
}
filterByStatut = ()=>
{
  this.notifServ.getNotificationsEntreprise(this.id_entreprise).subscribe((data)=>
  {
    this.notifications_list = data;
    console.log(data);
  });
  if(this.statut==1)
  {
    this.notifications_list.filter((notif)=>
    {
      return notif.retard.invert==1
    })
  }
  else if (this.statut==2)
  {
    this.notifications_list.filter((notif)=>
    {
      return notif.retard.invert!=1
    })
  }
  else
  {
    this.notifications_list.filter((notif)=>
    {
      return true;
    })
  }
}
filterByAgence = ()=>
{
  this.salleServ.getSalleByAgence(this.selected_agence_id).subscribe((data)=>
  {
    this.salles_list = data;  
  })
  this.notifServ.getNotificationsAgence(this.selected_agence_id).subscribe((data)=>
  {
    this.notifications_list = data;
  })
}
filterBySalle = ()=>
{
  this.notifServ.getNotificationsSalle(this.selected_salle_id).subscribe((data)=>
  {
    this.notifications_list = data;
  })
}
}
