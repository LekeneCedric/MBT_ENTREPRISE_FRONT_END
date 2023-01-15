import { Iplan_maintenance } from './../../../models/plan_maintenance';
import { Iequipement } from './../../../models/equipement';
import { SalleService } from './../../../services/salle.service';
import { Isalle } from './../../../models/salle';
import { IAgent } from './../../../models/agent';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { Iagence } from 'src/models/agence';
import { AgenceService } from 'src/services/agence.service';
import { Imaintenance } from './../../../models/maintenance';
import { Component, OnInit } from '@angular/core';
import { MaintenanceService } from 'src/services/maintenance.service';
import * as xlsx from "xlsx";

@Component({
  selector: 'app-plan-maintenance',
  templateUrl: './plan-maintenance.component.html',
  styleUrls: ['./plan-maintenance.component.scss']
})
export class PlanMaintenanceComponent implements OnInit{
  public generated_plan_maint : any[]= [];
  public maintenance_plan : Imaintenance [] = [];
  public global_agence_list : Iagence[] = [];
  public global_agent_list : IAgent[] = [];
  public global_possession_eq_list : string[] = [];
  public global_possession_list : IPossessionEquipement[] = [];
  public global_salle_list : Isalle[] = [];
  public global_salle_list_temp : Isalle[] = [];
  public global_equipement_list : Iequipement[] = [];

  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public plan_maintenance : Iplan_maintenance = {};
  public maintenances : Imaintenance[] = [];
  public maintenances_temp : Imaintenance[] = [];
  public maintenances_temp2 : Imaintenance[] = [];
  public agents_maintient : IAgent[] = [];
  public salles_list : Isalle[] = [];
  public searchEquipement : string = "";
  public selectedMaintenance : Imaintenance = {};
  public agencesList : Iagence[] = [];
  public possession_eq_list : string[] =[];
  public selected_salle_id : number = 0;
  public selected_agent_id:number = 0;
  public selected_agence_id:number = 0;
  public selected_possession_eq_name : string = "";
  constructor(private maintenanceService:MaintenanceService,private agenceService:AgenceService,private possessionEqServ : PossessionEquipementService,
    private salleService : SalleService)
  {

  }
  ngOnInit(): void {
      this.maintenanceService.getMainteneurs().subscribe((data)=>{
        this.agents_maintient = data;
        this.global_agent_list = data;
      })
      this.maintenanceService.getMaintenanceByEntreprise(this.entreprise_id).subscribe((data)=>
      {
        this.maintenances = data ; 
        this.maintenances_temp = data;
        this.maintenances_temp2 = data;
      })
      this.agenceService.getAgencesEntreprise(this.entreprise_id).subscribe((data)=>
      {
        this.agencesList = data;
        this.global_agence_list = data;
      });
      
      this.possessionEqServ.listEquipementByEntreprise(this.entreprise_id).subscribe((data)=>
      {
        data.forEach((possession)=>
        {
          if(!this.possession_eq_list.includes(possession.equipement?.element!))
          {
              this.global_possession_list.push(possession)
              this.possession_eq_list.push(possession.equipement?.element!);
              this.global_possession_eq_list.push(possession.equipement?.element!);
          }
        })
      });
      this.salleService.getSallesByEntreprise(JSON.parse(localStorage.getItem("entreprise")!).id).subscribe((data)=>
      {
        this.global_salle_list = data;
        this.global_salle_list_temp = data;
      })
      
      
  }
  public selectMaintenance(maintenance:Imaintenance)
  {
    this.selectedMaintenance = maintenance;
  }
  public filterByAgence()
  {
    this.selected_agent_id =0;
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
    });
    this.salleService.getSalleByAgence(this.selected_agence_id).subscribe((data)=>
    {
      this.salles_list = data;
    })
  }
  public filterByEquipement()
  {
    this.selected_agent_id = 0;
    this.maintenances = this.maintenances_temp2;
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return maint.possession?.equipement?.element == this.selected_possession_eq_name || this.selected_possession_eq_name == "";
    })
    this.selected_salle_id=0;
  }
  public filterByAgents()
  {
    this.maintenances = this.maintenances_temp;
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return maint.id_agent == this.selected_agent_id || this.selected_agent_id ==0;
    });
    this.selected_salle_id=0;
  }

  public filterBySalle()
  {
    this.maintenances = this.maintenances_temp;
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return (maint.possession?.id_salle!=undefined && maint.possession?.id_salle==this.selected_salle_id) || this.selected_salle_id ==0
    })

  }
  public filterMaintenance()
  {
    
  }
  public selectAgencePlan()
  {
    this.global_salle_list = this.global_salle_list_temp;
    this.global_salle_list = this.global_salle_list.filter((salle)=>
    {
      return salle.id_agence == this.plan_maintenance.id_agence || this.plan_maintenance.id_agence ==0 ;
    })
  }
  // public exportAsPdf()
  // {
    
  // }
  public generate_plan()
  {
    this.maintenanceService.genereateClassmentPlanWithAgenceAndSalle(this.plan_maintenance.id_agence!,this.plan_maintenance.id_salle!).subscribe((data)=>
    {
      this.generated_plan_maint = data;
    })
    const element = document.querySelector("#excel_table");
    console.log(element)
    const ws:xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

    const wb:xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb,ws,'sheet_1');

    xlsx.writeFile(wb,"plan_maintenance.xlsx")
  }

}
