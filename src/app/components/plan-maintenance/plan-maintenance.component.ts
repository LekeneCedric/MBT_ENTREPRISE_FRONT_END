import { EquipementService } from './../../../services/equipement.service';
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
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-plan-maintenance',
  templateUrl: './plan-maintenance.component.html',
  styleUrls: ['./plan-maintenance.component.scss']
})
export class PlanMaintenanceComponent implements OnInit{
  public loadingPlanMaintenance:boolean = false;
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
  public equipements_salle_ : Iequipement[] = [];
  public selected_salle_id : number = 0;
  public selected_agent_id:number = 0;
  public selected_agence_id:number = 0;
  public selected_possession_eq_name : string = "";
  public title:string = `Plan_classement_${new Date().toISOString()}`;
  constructor(
    private maintenanceService:MaintenanceService,
    private agenceService:AgenceService,
    private possessionEqServ : PossessionEquipementService,
    private salleService : SalleService,
    private equipementServ : EquipementService
    )
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

  public filterEquipementBySalle()
  {
    this.equipements_salle_ = [];
    this.plan_maintenance.id_equipement=0;
    this.possessionEqServ.listLinkEquipementsBySalle(this.plan_maintenance.id_salle!).subscribe(
      (data)=>
      {
        this.equipements_salle_ = data;
      }
    )
  }
  
  public filterBySalle()
  {
    this.maintenances = this.maintenances_temp;
    this.maintenances = this.maintenances.filter((maint)=>
    {
      return (maint.possession?.id_salle!=undefined && maint.possession?.id_salle==this.selected_salle_id) || this.selected_salle_id ==0
    })

  }
  // public filterMaintenance()
  // {
    
  // }
  public changeStatut(maintenance:Imaintenance,statut:number)
  {
    this.maintenanceService.changeStatutMaintenance(maintenance.id!,statut).subscribe((data)=>
    {
      this.ngOnInit();
    })
  }
  public selectAgencePlan()
  {
    this.equipements_salle_ = [];
    this.plan_maintenance.id_equipement!=null ? this.filterEquipementBySalle() : null ;
    this.global_salle_list = this.global_salle_list_temp;
    this.global_salle_list = this.global_salle_list.filter((salle)=>
    {
      return salle.id_agence == this.plan_maintenance.id_agence || this.plan_maintenance.id_agence ==0 ;
    })
  }
  public generate_plan()
  {
    this.loadingPlanMaintenance = true;
    let nb_sheet = 0 ;
    let workbook = new Workbook();
    this.maintenanceService.genereateClassmentPlanWithAgenceAndSalle(this.plan_maintenance).subscribe((data)=>
    {
      console.log(data)
      console.log(Object.entries(data));
      Object.entries(data).forEach((obj:Array<any>)=>
     {
      // if (obj[1].length>0)
      // {

      
      let sheet = workbook.addWorksheet(`${obj[0].split('|')[0]}`);
      
      sheet.mergeCells('A1','B3');
      sheet.mergeCells('C1','I3');
      sheet.mergeCells('J1','K1');
      sheet.mergeCells('J2','L2');
      sheet.mergeCells('J3','L3');
      sheet.mergeCells('A4','L4');
      sheet.mergeCells('A5','L5');
      sheet.mergeCells('A6','L6');
      sheet.mergeCells('A7','L7');
      sheet.mergeCells('A8','L8');
      sheet.mergeCells('A9','L9');
      sheet.mergeCells('A10','A11');
      sheet.mergeCells('B10','B11');
      sheet.mergeCells('C10','C11');
      sheet.mergeCells('D10','D11');
      sheet.mergeCells('E10','E11');
      sheet.mergeCells('F10','F11');
      sheet.mergeCells('G10','G11');
      sheet.mergeCells('H10','I10');
      sheet.mergeCells('J10','J11');
      sheet.mergeCells('K10','K11');
      sheet.mergeCells('L10','L11');
      let nb_sub_eq = obj[1].length;
      sheet.mergeCells('A12',`A${12+nb_sub_eq}`);
      for (let i of [1,2,3,4,5,6,7,8,9,10,11,12])
      {
        sheet.getColumn(i).width = 15;
      }   
      let arr_1 = ['A','C','A','A','A','A'];
      let num_1 = ['1','1','4','6','7','8'];
      let val_1 = [`${JSON.parse(localStorage.getItem("entreprise")!).nom.toUpperCase()}`,
                   `PLAN MAINTENANCE PREVENTIVE DES EQUIPEMENTS DE L'AGENCE ${this.agencesList.filter((agence)=>{return agence.id == this.plan_maintenance.id_agence})[0].nom}`,
                   `REDIGE PAR : `+`${obj[0].split('|')[3]}`.toUpperCase()+``,
                   `Abréviation:     Spécialité = M: Mécanicien,E:Electricien,EM:Electro-Mécanicien   Etat machine = A: Arrêt, M:Marche Condi,Systé=  Condi: Conditionnel  Systé: Systématique`,
                   `EQUIPEMENT:  `+`${obj[0].split('|')[0]}`.toUpperCase()+`          MISE EN MARCHE:  ${obj[0].split('|')[2]}`,
                   `FOURNISSEUR : `+`${obj[0].split('|')[1]}`.toUpperCase()];
      for (let i=0;i<arr_1.length;i++)
      {
        let elt = sheet.getCell(`${arr_1[i]}${num_1[i]}`);
        elt.value = val_1[i];
        elt.font = {
          name: 'Times New Roman',
          size: 10,
          bold: true
        };
        elt.alignment = {vertical: 'middle' , horizontal:'center'};
      }

 
      let arr = ['A','A','B','C','D','E','F','G','H','H','I','J','K','L']
      let num = ['12','10','10','10','10','10','10','10','10','11','11','10','10','10']
      let test = [`${obj[0].split('|')[0]}`.toUpperCase(),'Sous-ensembles','Element','Operation a effectuer',
                  'Charge Prevue','Periodicite','Etat Machine','Outillage','Echange pieces','Condi/Syste','Quantite et Des / ref','Gamme de maintenance',
                  'Specialite','Agent'];
      for (let i=0;i<arr.length;i++)
      {
        let elt = sheet.getCell(`${arr[i]}${num[i]}`);
        elt.value = test[i];
        elt.font = {
          name: 'Times New Roman',
          size: 9,
          bold: true
        };
        elt.alignment = {vertical: 'middle' , horizontal:'center'};
      }
      let pos = 12 // je recupere la position (ligne) qui contiendra les informations du premier element
      for (let elt of obj[1])
      {
        let arr = ['B','C','D','E','F','G','H','I','J','K','L'];
        let num = [`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`,`${pos}`]
        let val = [`${elt.equipement.element}`,`${elt.operation}`,`${elt.charge}`,`${elt.equipement.periodicite}`,`${elt.etat}`,
                   `${elt.outillage}`,`${elt.condi_syste}`,`${elt.equipement.designation}`,`${elt.gamme_maintenance}`,`${elt.equipement.specialite}`,
                   `${elt.agent.nom}`];
        for (let i=0;i<arr.length;i++)
          {
            let elt = sheet.getCell(`${arr[i]}${num[i]}`);
            elt.value = val[i];
            elt.font = {
              name: 'Times New Roman',
              size: 9,
              bold: false
                        };
            elt.alignment = {vertical: 'middle' , horizontal:'center'};
          }
          pos += 1 ;
      }
      nb_sheet +=1
    // }
     });
     setTimeout(()=>{
      workbook.xlsx.writeBuffer().then((data) => {
        let blob = new Blob([data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
       nb_sheet > 0 ? fs.saveAs(blob, `PLAN_MAINTENANCE_${JSON.parse(localStorage.getItem("entreprise")!).nom}_${this.agencesList.filter((agence)=>{return agence.id == this.plan_maintenance.id_agence})[0].nom}_${new Date().toUTCString()}` + '.xlsx') : null;
       this.loadingPlanMaintenance=false;
      });
     },3000);
    
    
     
    // const element = document.querySelector("#excel_table");
    // console.log(element)
    // const ws:xlsx.WorkSheet = xlsx.utils.table_to_sheet(element);

    // const wb:xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb,ws,'sheet_1');

    // xlsx.writeFile(wb,"plan_maintenance.xlsx")
  })
  setTimeout(()=>{
    this.loadingPlanMaintenance = false;
  },10000)
  }
}
