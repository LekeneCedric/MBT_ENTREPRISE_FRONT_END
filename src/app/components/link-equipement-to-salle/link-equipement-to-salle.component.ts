import { EquipementService } from 'src/services/equipement.service';
import { Isalle } from './../../../models/salle';
import { SalleService } from './../../../services/salle.service';
import { FournisseurService } from './../../../services/fournisseur.service';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { Iequipement } from 'src/models/equipement';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IFournisseur } from 'src/models/fournisseur';

@Component({
  selector: 'app-link-equipement-to-salle',
  templateUrl: './link-equipement-to-salle.component.html',
  styleUrls: ['./link-equipement-to-salle.component.scss']
})
export class LinkEquipementToSalleComponent implements OnInit{
constructor(
  private router:ActivatedRoute,
  private possEqServ:PossessionEquipementService,
  private salleServ:SalleService,
  private fournisseurService:FournisseurService,
  private equipementServ:EquipementService
){}
public currentSalle:Isalle = {}
public new_possessionEq:IPossessionEquipement = {};
public fournisseurs_list : IFournisseur[] = [];
public id_salle:number =  Number(this.router.snapshot.paramMap.get('id'));
public equipmentsListTemp : Iequipement[] = [];
public equipementsList : Iequipement[] = [];
public sub_equipementsList : Iequipement[] = [];
ngOnInit(): void {
    this.salleServ.getOneSalle(this.id_salle).subscribe((data)=>
    {
      this.currentSalle = data;
    });
    this.possEqServ.listLinkEquipementsBySalle(this.id_salle).subscribe((data)=>
    {
      this.equipementsList = data;
    });
    this.possEqServ.listLinkEquipementsBySalle(this.id_salle).subscribe((data)=>
    {
      this.equipmentsListTemp = data;
    });
    this.fournisseurService.getFournisseurByEntreprise().subscribe((data)=>
    {
      this.fournisseurs_list = data;
    });
    
}
link = ()=>
{
  console.log('debut de la liaison')
  var i = 0
  this.equipementsList.forEach((eq)=>
  {
    var pos = "0|0"
    /*Si initialement , l'\equipement n'etais pas lie mais maintenant est liee :Il faux le lier a la salle  */
    if (eq.isLink==true && this.equipmentsListTemp[i].isLink==false)
    {
      console.log("debut lisaison")
      let possession:IPossessionEquipement = {id_fournisseur:this.new_possessionEq.id_fournisseur,etat:this.new_possessionEq.etat};
      navigator.geolocation.getCurrentPosition((position)=>
      {
        pos = position.coords.latitude.toString()+"|"+position.coords.longitude.toString();
      })
      possession.position = pos;
      possession.id_equipement = eq.id;
      possession.id_entreprise = this.currentSalle.id_entreprise;
      possession.id_agence = this.currentSalle.id_agence;
      possession.id_salle = this.currentSalle.id;
      this.possEqServ.linkEquipementToAgence(possession).subscribe((data)=>
      {
        this.ngOnInit();
        console.log(data)
      });
      this.equipementServ.getAllSubEquipements(eq.id!).subscribe((data)=>
      {
        this.sub_equipementsList = data;
        this.sub_equipementsList.forEach((s_eq)=>
        {
          let possession:IPossessionEquipement = {id_fournisseur:this.new_possessionEq.id_fournisseur,etat:this.new_possessionEq.etat};
          navigator.geolocation.getCurrentPosition((position)=>
          {
            pos = position.coords.latitude.toString()+"|"+position.coords.longitude.toString();
          })
          possession.position = pos;
          possession.id_equipement = s_eq.id;
          possession.id_entreprise = this.currentSalle.id_entreprise;
          possession.id_agence = this.currentSalle.id_agence;
          possession.id_salle = this.currentSalle.id;
          this.possEqServ.linkEquipementToAgence(possession).subscribe((data)=>
            {
              console.log(data)
            });
        })
      });



    }
    /*Si initialement l'equipement etait lie , mais maintenant est delier : Il faux le delier de la salle */
    else if  (eq.isLink==false && this.equipmentsListTemp[i].isLink==true)
    {
      /*Instruction pour supprimer la liaison */
      this.possEqServ.delinkEquipement(this.currentSalle.id!,eq.id!).subscribe((data)=>
      {
        this.equipementServ.getAllSubEquipements(eq.id!).subscribe((data)=>
        {
          this.sub_equipementsList = data;
          this.sub_equipementsList.forEach((s_eq)=>
          {
            this.possEqServ.delinkEquipement(this.currentSalle.id!,s_eq.id!).subscribe((data)=>
            {
              console.log(data);
            })
          })
        })
      })
    }
    else 
    {
      console.log("aucune codition verifie")
    }
    i+=1;
    console.log(i)
  })
  this.ngOnInit();
}
}
