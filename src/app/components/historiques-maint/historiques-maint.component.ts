import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { Imaintenance } from 'src/models/maintenance';
import { ActivatedRoute } from '@angular/router';
import { INotification } from './../../../models/notification';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historiques-maint',
  templateUrl: './historiques-maint.component.html',
  styleUrls: ['./historiques-maint.component.scss']
})
export class HistoriquesMaintComponent implements OnInit{

  constructor(
    private notifServ:NotificationService,
    private possessionServ:PossessionEquipementService,
    private route:ActivatedRoute
  ){}
  notificationList : INotification[] = [];
  maintenancesList : Imaintenance[] = [];
  possession : IPossessionEquipement = {};
  private id_entreprise:number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  public id_possession:number = Number(this.route.snapshot.paramMap.get('id_possession')) ;
  public id_salle:number = Number(this.route.snapshot.paramMap.get('id_salle'));
  ngOnInit(): void {
      this.notifServ.getAllMaintenanceEquipement(this.id_possession).subscribe(
        (data)=>
        {
          this.maintenancesList = data;
        }
      );
      this.possessionServ.getOnePossession(this.id_possession).subscribe(
        (data)=>
        {
          this.possession = data;
        }
      )
  } 
}
