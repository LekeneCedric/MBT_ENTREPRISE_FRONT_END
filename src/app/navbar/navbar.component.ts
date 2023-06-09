import { Router } from '@angular/router';
import { EventsService } from 'src/services/event-service.service';
import { IAgent } from 'src/models/agent';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/models/user';
import { IEntreprise } from 'src/models/entreprise';
import { EntrepriseService } from 'src/services/entreprise.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  name='';pseudo='';id='';public entreprises : any;unentreprise:IEntreprise={};
  constructor(
  private eventService:EventsService,
  private _router:Router,private entrepriseServ : EntrepriseService
  ){

  }
  ngOnInit(): void {
    this.unentreprise.user_id = JSON.parse(localStorage.getItem("users")!).user.id;
    this.entrepriseServ.getList(this.unentreprise).subscribe((data)=>
    {
      this.entreprises = data;
    });
    if (localStorage.getItem('users')) {
      let elt = JSON.parse(localStorage.getItem("users")!).user;
      this.name = elt.name;
      this.pseudo = elt.pseudo;
      this.id = elt.id;
    }
    if (localStorage.getItem('entreprise')) {
      this.unentreprise = JSON.parse(localStorage.getItem("entreprise")!);
    }
  }
  logout = ()=>{
    this.eventService.publish('is_login',false);
    localStorage.removeItem('entreprise');
    localStorage.removeItem('users');
    localStorage.clear();
    this._router.navigate(['signIn']);
  }
  getentreprise(entreprise:any){
    console.log(this.entreprises.filter((item:any) => item.id == entreprise.value)[0]);
    localStorage.setItem('entreprise',JSON.stringify(this.entreprises.filter((item:any) => item.id == entreprise.value)[0]));
    location.reload();
  }
}
