import { CategorieService } from './../../../services/categorie.service';
import { ICategorie } from 'src/models/categorie';
import { EquipementService } from './../../../services/equipement.service';
import { Iequipement } from './../../../models/equipement';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipements',
  templateUrl: './equipements.component.html',
  styleUrls: ['./equipements.component.scss']
})
export class EquipementsComponent implements OnInit{

  public searchEquipement:string = "";
  public createEq:boolean = false;
  public updateEq:boolean = false;
  public equipements_list : Iequipement[] = [];
  public equipements_list_temp : Iequipement [] = [];
  public categories_list : ICategorie [] = [];
  public selectEquipement : Iequipement|undefined;
  public selectedCategorie : string = ""
  // Values for equipement Form 
  public new_equipement:Iequipement = {};
  constructor(private equipementService:EquipementService,private CategorieService:CategorieService){}
  ngOnInit(): void 
  {
    this.new_equipement.id_parent = 0;
      this.equipementService.getAllEquipments().subscribe(
        (data)=>
        {
          this.equipements_list = data;
          this.equipements_list_temp = data ; 
        }
      )
      this.CategorieService.getCategories().subscribe(
        (data)=>
        {
          this.categories_list = data ; 
        }
      )
  }
  get form_is_valid():boolean
  {
    return this.new_equipement.idcategorie != undefined && this.new_equipement.element!=undefined && this.new_equipement.operation!=undefined && this.new_equipement.chargePrevue!=undefined && this.new_equipement.periodicite!=undefined && this.new_equipement.specialite!=undefined
  }
  public filterEquipementByCategorie()
  {
    this.equipements_list = this.equipements_list_temp;
    this.equipements_list = this.equipements_list.filter((cat)=>{
      return cat.categorie?.intitule == this.selectedCategorie  
    })
  }
  public filterEquipement()
  {
    this.equipements_list = this.equipements_list_temp;
    this.equipements_list = this.equipements_list.filter((eq)=>{
      return eq.element?.toLowerCase().includes(this.searchEquipement.toLowerCase())
    })
  }
  public cleanNew()
  {
    this.updateEq = false;
    this.createEq = true;
    this.new_equipement = {}
  }
  public select(equipement:Iequipement)
  {
    this.selectEquipement = equipement;
  }
  public selectEdit(equipement:Iequipement)
  {
    this.createEq = false;
    this.updateEq = true;
    this.new_equipement = equipement;
  }
  public addEquipement()
  {
    this.new_equipement.id_parent = 0;
    this.equipementService.createEquipement(this.new_equipement).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
    
  }
  public removeEquipement()
  {
    this.equipementService.deleteEquipement(this.selectEquipement?.id!).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }
  public editEquipement()
  {
    this.equipementService.editEquipement(this.new_equipement,this.new_equipement?.id!).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }
}
