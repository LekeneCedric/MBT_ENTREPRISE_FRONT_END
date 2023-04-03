import { LogService } from './../../../services/log.service';
import { Iequipement } from './../../../models/equipement';
import { EquipementService } from './../../../services/equipement.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { IFournisseur } from 'src/models/fournisseur';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { Component, OnInit } from '@angular/core';
import { Iagence } from 'src/models/agence';
import { IAgent } from 'src/models/agent';
import { AgenceService } from 'src/services/agence.service';
import { AgentsService } from 'src/services/agents.service';

@Component({
  selector: 'app-agences',
  templateUrl: './agences.component.html',
  styleUrls: ['./agences.component.scss']
})
export class AgencesComponent implements OnInit{
  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public equipements_list_child : Iequipement[] = [];
  public equipements_agence_list : IPossessionEquipement[] = [];
  public equipements_list : Iequipement[] = [];
  public selected_equipement: Iequipement = {};
  public fournisseurs_list : IFournisseur[] = [];
  public new_possessionEq : IPossessionEquipement = {};
  public selected_agence : Iagence = {entreprise_id:this.entreprise_id};
  public new_agence :Iagence = {entreprise_id:this.entreprise_id};
  public searchAgence:string  = "";
  public agences : Iagence[] | undefined;
  public agencesTemp: Iagence[] | undefined;
  public user_connected :IAgent = {};
  constructor(
    private agenceService : AgenceService,
    private agentService:AgentsService,
    private possessionEqServ:PossessionEquipementService,
    private fournisseurService:FournisseurService,
    private equipementService:EquipementService,
    private logServ:LogService
    )
  {}

  public ngOnInit(): void {
    this.user_connected = JSON.parse(localStorage.getItem("entreprise")!).agent;
    this.agenceService.getAgencesEntreprise(this.entreprise_id).subscribe((data)=>
    {
      this.agences = data;
      this.agencesTemp = data;
    });

    this.fournisseurService.getFournisseur().subscribe((data)=>
    {
      this.fournisseurs_list = data;
    });

    this.equipementService.getAllEquipments(this.entreprise_id).subscribe((data)=>
    {
      this.equipements_list = data.filter((eq)=>{
        return eq.id_parent == 0;
      });
    });
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  public selectAgence(agence:Iagence)
  {
    this.selected_agence = agence;
  }
  public filterAgence()
  {
    this.agences = this.agencesTemp;
    this.agences = this.agences?.filter((agence)=>{
      return agence!.nom!.toLowerCase().includes(this.searchAgence.toLowerCase()) || agence!.localisation!.toLowerCase().includes(this.searchAgence.toLowerCase()) || this.searchAgence == ""
    })
  }
  

  public createAgence()
  {
    this.agenceService.createAgence(this.new_agence).subscribe(
      (data)=>
      {
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Creation de l'agence ${this.new_agence.nom} `,
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
  public removeAgence()
  {
    this.agenceService.deleteAgence(this.selected_agence!.id!).subscribe(
      (data)=>
      {
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Suppression de l'agence ${this.selected_agence.nom} `,
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
  public updateAgence()
  {
    this.agenceService.updateAgence(this.selected_agence!,this.selected_agence!.id!).subscribe(
      (data)=>
      {
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Modification de l'agence ${this.selected_agence.nom} `,
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

  public selectEquipement(equipement:Iequipement)
  {
    this.selected_equipement = equipement
  }

  public linkEquipment()
  {
    var lat:number=0,long:number=0;
    navigator.geolocation.getCurrentPosition((position)=>
    {
      lat =  position.coords.latitude;
      long = position.coords.longitude;
    })
    this.new_possessionEq.id_entreprise = this.selected_agence.entreprise_id;
    this.new_possessionEq.id_agence = this.selected_agence.id;
    this.new_possessionEq.position = lat.toString() +"|"+ long.toString()
    this.possessionEqServ.linkEquipementToAgence(this.new_possessionEq).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }

}
