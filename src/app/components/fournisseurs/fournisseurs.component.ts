import { IFournisseur } from './../../../models/fournisseur';
import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/services/fournisseur.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit{
  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public searchF:string = "";
  public fournisseurs_list : IFournisseur[] = [];
  public fournisseurs_list_temp : IFournisseur[] = [];
  public new_fournisseur : IFournisseur = {};
  public selected_fournisseur : IFournisseur = {};
  constructor(private fournisseurService:FournisseurService){}
  ngOnInit(): void {
    this.fournisseurs_list = [];
    this.fournisseurs_list_temp = [];
      this.fournisseurService.getFournisseur().subscribe(
        (data)=>
        {
          this.fournisseurs_list = data;
          this.fournisseurs_list_temp = data;
        }
      )
  }
  public filterListF()
  {
    this.fournisseurs_list = this.fournisseurs_list_temp;
    this.fournisseurs_list = this.fournisseurs_list.filter((fourn)=>
    {
      return fourn.nom?.trim().toLowerCase().includes(this.searchF.toLowerCase()) || fourn.adresse?.trim().toLocaleLowerCase().includes(this.searchF.toLowerCase()) || this.searchF == "";
    })
  }
  public selectFournisseur(fournisseur:IFournisseur)
  {
    this.selected_fournisseur = fournisseur;
  }

  public removeFournisseur()
  {
    this.fournisseurService.deleteFournisseur(this.selected_fournisseur.id!).subscribe(
      (data)=>{
        this.ngOnInit();
      }
    )
  }
  public addFournisseur()
  {
    this.fournisseurService.createFournisseur(this.new_fournisseur).subscribe(
      (data)=>{
        this.ngOnInit();
      }
    )
  }
  public updateFournisseur()
  {
    this.fournisseurService.updateFournisseur(this.selected_fournisseur,this.selected_fournisseur.id!).subscribe(
      (data)=>{
        this.ngOnInit();
      }
    )
  }

}
