import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICategorie } from 'src/models/categorie';
import { Iequipement } from 'src/models/equipement';
import { CategorieService } from 'src/services/categorie.service';
import { EnvironmentService } from 'src/services/environment.service';
import { EquipementService } from 'src/services/equipement.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-subequipements',
  templateUrl: './subequipements.component.html',
  styleUrls: ['./subequipements.component.scss']
})
export class SubequipementsComponent implements OnInit{
  constructor(
    private equipementService:EquipementService,
    private CategorieService:CategorieService,
    private route:ActivatedRoute,public userServ:UserService,public environnement:EnvironmentService,public http:HttpClient,
    ){}
  public parentEq : Iequipement|undefined;
  public id_parent :number = Number(this.route.snapshot.paramMap.get('id'));
  public searchEquipement:string = "";
  public createEq:boolean = false;
  public updateEq:boolean = false;
  public equipements_parents_list : Iequipement[] = [];
  public equipements_list : Iequipement[] = [];
  public equipements_list_temp : Iequipement [] = [];
  public categories_list : ICategorie [] = [];
  public selectEquipement : Iequipement|undefined;
  public selectedCategorie : string = "";
  // Values for equipement Form
  public new_equipement:Iequipement = {};media='';lienimg = '';tabloimagefile:any = [];
  public new_eq_p_day:string = "1";
  public new_eq_p_periodicite:string = "day"

  ngOnInit(): void
  {
    this.new_equipement.id_parent = 0;
    this.new_equipement.period_is_for_child = 'true';
    this.tabloimagefile = new Array();
    this.lienimg = this.environnement.apiimg;this.media='';
    this.equipementService.getOneEquipment(this.id_parent).subscribe((data)=>
    {
      this.parentEq = data;
    })
      this.equipementService.getAllSubEquipements(Number(this.route.snapshot.paramMap.get('id'))).subscribe(
        (data)=>
        {
          this.equipements_list = data;
          this.equipements_list_temp = data ;
          this.equipements_parents_list = data.filter((equip)=>{
            return equip.id_parent==0;
          })
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
    return this.new_equipement.idcategorie != undefined && this.new_equipement.element!=undefined   && this.new_equipement.specialite!=undefined
  }
  public filterEquipementByCategorie()
  {
    this.equipements_list = this.equipements_list_temp;
    this.equipements_list = this.equipements_list.filter((cat)=>{
      return cat.categorie?.intitule == this.selectedCategorie || this.selectedCategorie==""
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
    this.new_equipement = {id_parent:this.parentEq?.id,idcategorie:this.parentEq?.idcategorie,id_entreprise:JSON.parse(localStorage.getItem("entreprise")!).id}
  }
  public select(equipement:Iequipement)
  {
    this.selectEquipement = equipement;
  }
  public selectWithId(event:any)
  {
    if (event.target.value == 0)
    {
      this.selectEquipement = {};
      this.new_equipement.id_parent = undefined;
    }
    this.equipements_list.forEach((eq)=>{
      if (eq.id == event.target.value)
      {
        this.selectEquipement = eq;
        this.new_equipement.idcategorie = eq.categorie?.id
      }
    })
  }
  public selectEdit(equipement:Iequipement)
  {
    this.createEq = false;
    this.updateEq = true;
    this.new_equipement = equipement;
  }
  public addEquipement()
  {
    // this.new_equipement.id_parent = 0;
    if (this.form_is_valid) {
      if (this.parentEq?.period_is_for_child == 'true')
      {
        this.new_equipement.periodicite = this.parentEq.periodicite;
      }
      else
      {
        this.new_equipement.periodicite = `${this.new_eq_p_day} ${this.new_eq_p_periodicite}`
      }

      if(this.new_equipement.id_parent == null || this.new_equipement.id_parent == undefined)
      {
        this.new_equipement.id_parent = 0;
      }
      this.equipementService.createEquipement(this.new_equipement).subscribe(
        (data:any)=>
        {
          var index = 0;
          if (this.tabloimagefile.length == 0) {
            this.ngOnInit();
          }
          else{
            const httpOptions = {
              headers: new HttpHeaders({
               "Content-Type": "multipart/form-data" // 👈
              })
            };
            this.tabloimagefile.forEach((element:any) => {
              let postData1 = new FormData;
              postData1.append('media',element);

              this.http.post<any>(this.environnement.api+'/addmedia/'+data.equipement.id+'/equipement', postData1).subscribe(data => {
                index ++;
                if (index == this.tabloimagefile.length) {
                  this.ngOnInit();
                }
              });
            });
          }
        }
      )
    }
    else{
      alert("Veuillez remplir tous les champs avec l'etoile.")
    }
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
    if (this.form_is_valid) {
      this.equipementService.editEquipement(this.new_equipement,this.new_equipement?.id!).subscribe(
        (data:any)=>
        {
          var index = 0;
          if (this.tabloimagefile.length == 0) {
            this.ngOnInit();
          }
          else{
            const httpOptions = {
              headers: new HttpHeaders({
               "Content-Type": "multipart/form-data" // 👈
              })
            };
            this.tabloimagefile.forEach((element:any) => {
              let postData1 = new FormData;
              postData1.append('media',element);

              this.http.post<any>(this.environnement.api+'/addmedia/'+data.id+'/equipement', postData1).subscribe(data => {
                index ++;
                if (index == this.tabloimagefile.length) {
                  this.ngOnInit();
                }
              });
            });
          }
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
  getfichiers(event:any){
    this.tabloimagefile = [];
    for (let index = 0; index < 4; index++) {
      this.tabloimagefile.push(event.target.files[index]);
    }
    this.new_equipement.media = this.tabloimagefile;
  }

  supprimerelt(id:any,idequip:any){
    this.http.delete<any>(this.environnement.api+'/deletemedia/'+id+'/'+idequip).subscribe(data => {
      this.selectEquipement = data;
    });
  }
}
