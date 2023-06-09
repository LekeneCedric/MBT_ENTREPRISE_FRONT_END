import { IFournisseur } from './../../../models/fournisseur';
import { Component, OnInit } from '@angular/core';
import { FournisseurService } from 'src/services/fournisseur.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.scss']
})
export class FournisseursComponent implements OnInit{
  private entreprise_id :number = Number(JSON.parse(localStorage.getItem("entreprise")!).id);
  public searchF:string = "";
  public fournisseurs_list : IFournisseur[] = [];
  public fournisseurs_list_temp : IFournisseur[] = [];
  public new_fournisseur : IFournisseur = {id_entreprise:this.entreprise_id};
  public selected_fournisseur : IFournisseur = {};
  constructor(private fournisseurService:FournisseurService,public userServ:UserService){}
  ngOnInit(): void {
    this.fournisseurs_list = [];
    this.fournisseurs_list_temp = [];
      this.fournisseurService.getFournisseurByEntreprise().subscribe(
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
    if (this.new_fournisseur.nom && this.new_fournisseur.adresse && this.new_fournisseur.telephone && this.new_fournisseur.nom.length > 4) {
      this.fournisseurService.createFournisseur(this.new_fournisseur).subscribe(
        (data)=>{
          this.ngOnInit();
        }
      )
    }
    else{
      alert("Veuillez remplir tous les champs avec l'etoile.")
    }
  }
  public updateFournisseur()
  {
    if (this.new_fournisseur.nom && this.new_fournisseur.adresse && this.new_fournisseur.telephone && this.new_fournisseur.nom.length > 4) {
      this.fournisseurService.updateFournisseur(this.selected_fournisseur,this.selected_fournisseur.id!).subscribe(
        (data)=>{
          this.ngOnInit();
        }
      )
    }
    else{
      alert("Veuillez remplir tous les champs avec l'etoile.")
    }
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
