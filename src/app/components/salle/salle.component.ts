import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { IFournisseur } from './../../../models/fournisseur';
import { FournisseurService } from './../../../services/fournisseur.service';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { Iequipement } from './../../../models/equipement';
import { EquipementService } from './../../../services/equipement.service';
import { IAgent } from './../../../models/agent';
import { AgentsService } from './../../../services/agents.service';
import { AgenceService } from './../../../services/agence.service';
import { Iagence } from './../../../models/agence';
import { Isalle } from './../../../models/salle';
import { SalleService } from './../../../services/salle.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salle',
  templateUrl: './salle.component.html',
  styleUrls: ['./salle.component.scss']
})
export class SalleComponent implements OnInit{
  public salles_list : Isalle[] = [];
  public salles_temp : Isalle[] = [];
  public agences_list : Iagence[] = [];
  public agents_list : IAgent[] = [];
  public equipements_list : Iequipement[] = [];
  public fournisseurs_list : IFournisseur[] = [];
  public new_possessionEq:IPossessionEquipement = {}
  public possessionsEq_list : IPossessionEquipement[] = [];
  public new_salle : Isalle = {};
  public select_salle : Isalle = {};
  public selected_agence_id:number=0;
  public searchSalle: string = "";
  public searchEquipement:string ="";
  constructor(private salleServ:SalleService,private agenceServ:AgenceService,private agentServ:AgentsService,
    private equipementService:EquipementService,private fournisseurService:FournisseurService,
    private possessionEqServ:PossessionEquipementService){}
  ngOnInit(): void {
      this.salleServ.getAllSalles().subscribe((data)=>
      {
        this.salles_list = data;
        this.salles_temp = data;
      });
      this.agenceServ.getAgencesEntreprise(JSON.parse(localStorage.getItem("entreprise")!).id).subscribe((data)=>
      {
        this.agences_list = data;
      })
     
      this.equipementService.getAllEquipments().subscribe((data)=>
    {
      this.equipements_list = data.filter((eq)=>{
        return eq.id_parent == 0;
      });
    });
    this.fournisseurService.getFournisseur().subscribe((data)=>
    {
      this.fournisseurs_list = data;
    });
    
  }
  public selectSalle(salle:Isalle)
  {
    this.select_salle = salle;
  }
  public filterSalle()
  {
    //filtre la liste des salles par le nom entree dans la barre de recherche 
    this.salles_list = this.salles_temp;
    this.salles_list = this.salles_list.filter((salle)=>{
      return salle.nom?.toLocaleLowerCase().includes(this.searchSalle.toLowerCase()) || this.searchSalle == "";
    })
  }
  public checkSalle(id:number)
  {

  }
  public createSalle()
  {
    this.new_salle.id_entreprise = JSON.parse(localStorage.getItem("entreprise")!).id;
    this.salleServ.storeSalle(this.new_salle).subscribe((data)=>
    {
      this.ngOnInit();
    })
  }
  public updateSalle()
  {
    this.salleServ.editSalle(this.select_salle).subscribe((data)=>
    {
      this.ngOnInit();
    })
  }
  public removeSalle()
  {
    this.salleServ.deleteSalle(this.select_salle.id!).subscribe((data)=>
    {
      this.ngOnInit()
    })
  }
  public linkEquipmentToSalle()
  {
    var lat:number=0,long:number=0;
    navigator.geolocation.getCurrentPosition((position)=>
    {
      lat =  position.coords.latitude;
      long = position.coords.longitude;
    })
    this.new_possessionEq.id_entreprise = this.select_salle.id_entreprise;
    this.new_possessionEq.id_agence = this.select_salle.id_agence;
    this.new_possessionEq.id_salle = this.select_salle.id;
    this.new_possessionEq.position = lat.toString() +"|"+ long.toString()
    this.possessionEqServ.linkEquipementToAgence(this.new_possessionEq).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }
  public filterByAgence()
  {
    this.salles_list = this.salles_temp;
    this.salles_list = this.salles_list.filter((salle)=>{
      return salle.id_agence == this.selected_agence_id || this.selected_agence_id==0;
    })
  }
}
