import { Iagence } from 'src/models/agence';
import { AgenceService } from 'src/services/agence.service';
import { PossessionEquipementService } from './../../../services/possession-equipement.service';
import { Iequipement } from './../../../models/equipement';
import { IPossessionEquipement } from './../../../models/possessionEquipement';
import { EquipementService } from './../../../services/equipement.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipement-agence',
  templateUrl: './equipement-agence.component.html',
  styleUrls: ['./equipement-agence.component.scss']
})
export class EquipementAgenceComponent implements OnInit{
  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public equipements_list : IPossessionEquipement[] = [];
  public equipements_list_temp : IPossessionEquipement[] = [];
  public searchEquipement : String = "";
  public selected_equipement: Iequipement = {};
  public agence_list : Iagence[]= [];
  public select_agence_id : number = 0;
constructor(private agenceService:AgenceService,private possessionEquipement:PossessionEquipementService){}

ngOnInit(): void {
  this.possessionEquipement.listEquipementByEntreprise(this.entreprise_id).subscribe((data)=>
  {
    this.equipements_list = data;
    this.equipements_list_temp = data;
  });
  this.agenceService.getAgencesEntreprise(this.entreprise_id).subscribe((data)=>
  {
    this.agence_list = data;
  })
}
public selectEquipement(equipement:Iequipement)
{
  this.selected_equipement = equipement
}
public filterEquipement()
{
 this.equipements_list = this.equipements_list_temp;
 this.equipements_list = this.equipements_list.filter((eqp)=>
 {
  return eqp.equipement?.element?.toLocaleLowerCase().includes(this.searchEquipement.toLowerCase()) || 
  eqp.agence?.nom?.toLocaleLowerCase().includes(this.searchEquipement.toLowerCase()) || 
  this.searchEquipement == ""
 })
}
public filterEquipementWithAgence()
{
  this.equipements_list = this.equipements_list_temp;
 this.equipements_list = this.equipements_list.filter((eqp)=>
 {
  return eqp.agence?.id == this.select_agence_id || this.select_agence_id ==0;
 })
}
}
