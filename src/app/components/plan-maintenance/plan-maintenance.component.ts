import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { Iagence } from 'src/models/agence';
import { AgenceService } from 'src/services/agence.service';
import { Imaintenance } from './../../../models/maintenance';
import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/services/maintenance.service';

@Component({
  selector: 'app-plan-maintenance',
  templateUrl: './plan-maintenance.component.html',
  styleUrls: ['./plan-maintenance.component.scss']
})
export class PlanMaintenanceComponent implements OnInit{
  public maintenances : Imaintenance[] = [];
  public maintenances_temp : Imaintenance[] = [];
  public maintenances_temp2 : Imaintenance[] = [];
  public searchEquipement : string = "";
  public selectedMaintenance : Imaintenance = {};
  public agencesList : Iagence[] = [];
  public possession_eq_list : string[] =[];
  public selected_agence_id:number = 0;
  public selected_possession_eq_name : string = "";
  constructor(private maintenanceService:MaintenanceService,private agenceService:AgenceService,private possessionEqServ : PossessionEquipementService)
  {

  }
  ngOnInit(): void {
      this.maintenanceService.getMaintenanceByEntreprise(1).subscribe((data)=>
      {
        this.maintenances = data ; 
        this.maintenances_temp = data;
        this.maintenances_temp2 = data;
      })
      this.agenceService.getAgencesEntreprise(1).subscribe((data)=>
      {
        this.agencesList = data;
      })
      this.possessionEqServ.listEquipementByEntreprise(1).subscribe((data)=>
      {
        data.forEach((possession)=>
        {
          if(!this.possession_eq_list.includes(possession.equipement?.element!))
          {
              this.possession_eq_list.push(possession.equipement?.element!)
          }
        })
      })
  }
  public selectMaintenance(maintenance:Imaintenance)
  {
    this.selectedMaintenance = maintenance;
  }
  public filterByAgence()
  {
    this.maintenances = this.maintenances_temp;
    this.selected_possession_eq_name = "";
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return maint.possession?.id_agence == this.selected_agence_id || this.selected_agence_id == 0;
    })
    this.maintenances_temp2 = this.maintenances;
    this.possessionEqServ.listEquipementByAgence(this.selected_agence_id).subscribe((data)=>
    {
      this.possession_eq_list = [];
      data.forEach((possession)=>
        {
          if(!this.possession_eq_list.includes(possession.equipement?.element!))
          {
              this.possession_eq_list.push(possession.equipement?.element!)
          }
        })
    })
  }
  public filterByEquipement()
  {
    this.maintenances = this.maintenances_temp2;
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return maint.possession?.equipement?.element == this.selected_possession_eq_name || this.selected_possession_eq_name == "";
    })
  }
  public filterMaintenance()
  {

  }

}
