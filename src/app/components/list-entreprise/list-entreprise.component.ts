import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IEntreprise } from 'src/models/entreprise';
import { EntrepriseService } from 'src/services/entreprise.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-list-entreprise',
  templateUrl: './list-entreprise.component.html',
  styleUrls: ['./list-entreprise.component.scss']
})
export class ListEntrepriseComponent {

  public selectedElement:IEntreprise={};unentreprise:IEntreprise={};
  public entreprises : any;public roles : any = [];
  nom='';code='';email='';typ_entreprise='';tel=0;domaine='';description='';
  constructor(private entrepriseServ : EntrepriseService,public router:Router,public userServ:UserService){}
  ngOnInit(): void {
    this.unentreprise.user_id = JSON.parse(localStorage.getItem("users")!).user.id;
    this.entrepriseServ.getList(this.unentreprise).subscribe((data)=>
    {
      this.entreprises = data;
    });
  }

  public selectUser(entreprise:any)
  {
    this.selectedElement = entreprise;
  }

  public add()
  {
    this.unentreprise.email = this.email;
    this.unentreprise.nom = this.nom;
    this.unentreprise.code = this.code;
    this.unentreprise.type = this.typ_entreprise;
    this.unentreprise.type_entreprise = this.typ_entreprise;
    this.unentreprise.domaine = this.domaine;
    this.unentreprise.tel = this.tel;
    this.unentreprise.description = this.description;
    this.unentreprise.user_id = this.unentreprise.user_id;
    this.entrepriseServ.add(this.unentreprise).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.entrepriseServ.update(this.selectedElement,id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.entrepriseServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  getentreprise(entreprise:any){
    localStorage.setItem('entreprise',JSON.stringify(entreprise));
    this.router.navigate(['/dashboard']);
    setTimeout(() => {
      location.reload();
    }, 1500);
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
