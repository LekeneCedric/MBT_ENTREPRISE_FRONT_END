import { LogService } from './../../../services/log.service';
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
import { UserService } from 'src/services/user.service';

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
  private id_entreprise = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  constructor(
    private logServ:LogService,
    private salleServ:SalleService,
    private agenceServ:AgenceService,
    private agentServ:AgentsService,
    private equipementService:EquipementService,
    private fournisseurService:FournisseurService,
    private possessionEqServ:PossessionEquipementService,public userServ:UserService){}
  ngOnInit(): void {
      this.salleServ.getSallesByEntreprise(this.id_entreprise!).subscribe((data)=>
      {
        this.salles_list = data;
        this.salles_temp = data;
      });
      this.agenceServ.getAgencesEntreprise(JSON.parse(localStorage.getItem("entreprise")!).id).subscribe((data)=>
      {
        this.agences_list = data;
      })

      this.equipementService.getAllEquipments(this.id_entreprise).subscribe((data)=>
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
    if (this.new_salle.nom && this.new_salle.tel && this.new_salle.indication && this.new_salle.id_agence && this.new_salle.nom .length > 4) {
      this.new_salle.id_entreprise = JSON.parse(localStorage.getItem("entreprise")!).id;
      this.salleServ.storeSalle(this.new_salle).subscribe((data)=>
      {
        this.ngOnInit();
        this.logServ.setLogs(
            {
              id_entreprise:this.logServ.entreprise_id,
              date : this.logServ.formatDate(new Date()),
              action : `Creation de la salle ${this.new_salle.nom} `,
              group : 'Agent',
              user  : `${JSON.parse(localStorage.getItem("users")!).user.nom}`
            }
          ).subscribe((data)=>
          {
            this.ngOnInit();
          })
      });
    }
    else{
      alert("Veuillez remplir tous les champs avec l'etoile. Et le nom doit avoir plus de 4 caracteres")
    }
  }
  public updateSalle()
  {
    if (this.new_salle.nom && this.new_salle.tel && this.new_salle.indication && this.new_salle.id_agence && this.new_salle.nom .length > 4) {
      this.salleServ.editSalle(this.select_salle).subscribe((data)=>
      {
        this.ngOnInit();
        this.logServ.setLogs(
            {
              id_entreprise:this.logServ.entreprise_id,
              date : this.logServ.formatDate(new Date()),
              action : `Modification de la salle ${this.select_salle.nom} `,
              group : 'Agent',
              user  : `${JSON.parse(localStorage.getItem("entreprise")!).agent.nom}`
            }
          ).subscribe((data)=>
          {
            this.ngOnInit();
          })
      });
    }
    else{
      alert("Veuillez remplir tous les champs avec l'etoile. Et le nom doit avoir plus de 4 caracteres")
    }
  }
  public removeSalle()
  {
    this.salleServ.deleteSalle(this.select_salle.id!).subscribe((data)=>
    {
      this.ngOnInit();
       this.logServ.setLogs(
          {
            id_entreprise:this.logServ.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Suppression de la salle ${this.select_salle.nom} `,
            group : 'Agent',
            user  : `${JSON.parse(localStorage.getItem("entreprise")!).agent.nom}`
          }
        ).subscribe((data)=>
        {
          this.ngOnInit();
        })
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
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }
}
