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
  public equipements_agence_list : IPossessionEquipement[] = [];
  public equipements_list : Iequipement[] = [];
  public fournisseurs_list : IFournisseur[] = [];
  public new_possessionEq : IPossessionEquipement = {};
  public selected_agent : IAgent = {}
  public selected_agence : Iagence = {entreprise_id:1};
  public new_agence :Iagence = {entreprise_id:1};
  public new_agent : IAgent = {};
  public searchAgence:string  = "";
  public searchAgent:string  = "";
  public agences : Iagence[] | undefined;
  public agencesTemp: Iagence[] | undefined;
  public agents : IAgent[] | undefined;
  public agentsTemp : IAgent[] | undefined;
  public agentsTemp2 : IAgent[] | undefined;
  public idSelectedAgences:number[] | undefined = [0];
  constructor(private agenceService : AgenceService,private agentService:AgentsService,private possessionEqServ:PossessionEquipementService,
    private fournisseurService:FournisseurService,private equipementService:EquipementService)
  {}

  public ngOnInit(): void {
      
    this.agenceService.getAgencesEntreprise(1).subscribe((data)=>
    {
      this.agences = data;
      this.agencesTemp = data;
    })
    this.agentService.getAgentsByEntreprise(1).subscribe((data)=>
    {
      this.agentsTemp = data;
    })

    this.fournisseurService.getFournisseur().subscribe((data)=>
    {
      this.fournisseurs_list = data;
    })

    this.equipementService.getAllEquipments().subscribe((data)=>
    {
      this.equipements_list = data;
    })
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
  }
  public selectAgence(agence:Iagence)
  {
    this.selected_agence = agence;
  }
  public selectAgent(agent:IAgent)
  {
    this.selected_agent = agent;
  }
  public filterAgent ()
  {
    this.agents = this.agentsTemp2;
    this.agents = this.agents?.filter((agent)=>{
      return agent!.nom!.toLowerCase().includes(this.searchAgent) || agent!.email!.toLowerCase().includes(this.searchAgent.toLowerCase()) || agent!.agence!.nom!.toLowerCase().includes(this.searchAgent.toLowerCase()) || this.searchAgent== ""
    })
  }
  public filterAgence()
  {
    this.agences = this.agencesTemp;
    this.agences = this.agences?.filter((agence)=>{
      return agence!.nom!.toLowerCase().includes(this.searchAgence.toLowerCase()) || agence!.localisation!.toLowerCase().includes(this.searchAgence.toLowerCase()) || this.searchAgence == ""
    })
  }
  public checkAgence(id_agence:number)
  {
    console.log("changement agents")
    console.log(this.idSelectedAgences);
    console.log(this.agentsTemp)
    console.log(this.agents)
    if(this.idSelectedAgences?.includes(id_agence))
    {
      console.log('include')
      const index = this.idSelectedAgences.indexOf(id_agence);
    if (index > -1) { // only splice array when item is found
        this.idSelectedAgences.splice(index, 1); // 2nd parameter means remove one item only
      }
    }
    else
    {
      this.idSelectedAgences?.push(id_agence);
    }
    this.agents = this.agentsTemp?.filter((agent)=>{
      return this.idSelectedAgences?.includes(agent!.id_agence!)
    })
    this.agentsTemp2 = this.agents;
    this.possessionEqServ.listEquipementByAgence(this.idSelectedAgences![1]).subscribe(
      (data)=>
      {
        this.equipements_agence_list = data;
      }
    )
  }

  public createAgence()
  {
    this.agenceService.createAgence(this.new_agence).subscribe(
      (data)=>
      {
       this.ngOnInit();
      }
    )
  }
  public removeAgence()
  {
    this.agenceService.deleteAgence(this.selected_agence!.id!).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }
  public updateAgence()
  {
    this.agenceService.updateAgence(this.selected_agence!,this.selected_agence!.id!).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
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
