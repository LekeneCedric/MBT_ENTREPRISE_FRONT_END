import { ICategorie } from 'src/models/categorie';
import { CategorieService } from './../../../services/categorie.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private categorieService: CategorieService) {

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
        this.ngOnInit()
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
    const data :ICategorie = 
    {
      idparent:0,
      intitule:this.selectedIntitule
    }
    this.categorieService.addCategorie(data).subscribe(
      (data)=>
      {
        this.ngOnInit()
      }
    )
  }
  public addSubCategorie()
  {
    const data : ICategorie = 
    {
      idparent:this.selectedCategorie?.id!,
      intitule:this.selectedIntitule
    }
    this.categorieService.addCategorie(data).subscribe(
      (data)=>
      {
        this.ngOnInit();
      }
    )
  }
  public editCategorie()
  {
    const data : ICategorie = 
      {
        idparent:this.selectedCategorie?.idparent!,
        intitule:this.selectedIntitule
      }
    this.categorieService.editCategorie(data,this.selectedCategorie?.id!).subscribe(
    (data)=>
    {
      this.ngOnInit();
    }
    )
  }

}
