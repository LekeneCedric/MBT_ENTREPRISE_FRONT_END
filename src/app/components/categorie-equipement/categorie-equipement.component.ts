import { ICategorie } from 'src/models/categorie';
import { CategorieService } from './../../../services/categorie.service';
import { Component, OnInit } from '@angular/core';
import { LogService } from 'src/services/log.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-categorie-equipement',
  templateUrl: './categorie-equipement.component.html',
  styleUrls: ['./categorie-equipement.component.scss']
})
export class CategorieEquipementComponent implements OnInit {
  private entreprise_id :number = JSON.parse(localStorage.getItem("entreprise")!).id;
  public searchCategorie: string = "";
  public searchSubCategorie:string = "";
  public selectedIntitule:string = ""
  public categories: ICategorie[] = [];
  public categoriesTemp : ICategorie[] = [];
  public sub_categoriesTemp : ICategorie[] = [];
  public sub_categories: ICategorie[] = [];
  public selectedCategorie: ICategorie | undefined;
  constructor(
    private logServ:LogService,
    private categorieService: CategorieService,public userServ:UserService) {

  }
  ngOnInit(): void {
    console.log("refresh")
    this.selectedIntitule = ""
    this.selectedCategorie = undefined
    this.categories = [];
    this.sub_categories = [];
    this.categorieService.getCategories().subscribe(
      (data) => {
        data.forEach((cat) => {
          if (cat.idparent == 0) {
            this.categories.push(cat);
            this.categoriesTemp.push(cat);
          }
        })
      }
    )
  }
  public filterSubCategorie()
  {
    this.sub_categories = this.sub_categoriesTemp.filter((cat)=>
    {
      return cat.intitule.toLowerCase().includes(this.searchSubCategorie.toLowerCase()) || this.searchSubCategorie == "";
    })
  }
  public filterCategorie()
  {
    this.categories = this.categoriesTemp.filter((cat)=>
    {
      return cat.intitule.toLowerCase().includes(this.searchCategorie.toLowerCase()) || this.searchCategorie == "";
    })
  }
  public selectCategorie(categorie: ICategorie) {
    this.selectedCategorie = categorie;
    this.selectedIntitule = categorie.intitule;
  }
  public removeCategorie(id_categorie: number) {
    this.categorieService.deleteCategorie(id_categorie).subscribe(
      (data) => {
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Suppression de la ${this.selectedCategorie?.idparent==0 ? "Categorie" : "Sous Categorie"} ${this.selectedCategorie?.intitule}`,
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
  public seeSubCategorie(cat: ICategorie) {
    this.selectedCategorie = cat;
    this.categorieService.getSubCategories(cat.id!).subscribe(
      (data) => {
        this.sub_categories = data
        this.sub_categoriesTemp = data
      }
    )
  }
  public addCategorie()
  {
    const dataC :ICategorie =
    {
      idparent:0,
      intitule:this.selectedIntitule
    }
    this.categorieService.addCategorie(dataC).subscribe(
      (data)=>
      {
        this.selectedIntitule = ""
        this.ngOnInit();
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Ajout de la categorie ${dataC.intitule}`,
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
  public addSubCategorie()
  {
    const dataC : ICategorie =
    {
      idparent:this.selectedCategorie?.id!,
      intitule:this.selectedIntitule
    }
    this.categorieService.addCategorie(dataC).subscribe(
      (data)=>
      {
        this.selectedIntitule = ""
        this.ngOnInit();
        this.logServ.setLogs(
          {
            id_entreprise:this.entreprise_id,
            date : this.logServ.formatDate(new Date()),
            action : `Ajout de la sous categorie ${dataC.intitule}`,
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
  public editCategorie()
  {
    const dataC : ICategorie =
      {
        idparent:this.selectedCategorie?.idparent!,
        intitule:this.selectedIntitule
      }
    this.categorieService.editCategorie(dataC,this.selectedCategorie?.id!).subscribe(
    (data)=>
    {
      this.selectedIntitule = ""
      this.ngOnInit();
      this.logServ.setLogs(
        {
          id_entreprise:this.entreprise_id,
          date : this.logServ.formatDate(new Date()),
          action : `Modification de la ${dataC.idparent==0 ? "categorie" : "sous categorie"} ${dataC.intitule}`,
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

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
