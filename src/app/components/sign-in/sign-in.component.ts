import { Iauth } from './../../../models/authentication';
import { EventsService } from './../../../services/event-service.service';
import { IEntreprise } from './../../../models/entreprise';
import { EntrepriseService } from './../../../services/entreprise.service';
import { EnvironmentService } from './../../../services/environment.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  public login_data : Iauth = {};
  constructor(private entrepriseServ:EntrepriseService,private enventServ:EventsService){}
  ngOnInit(): void {
      
  }
  public signIn()
  {
    this.entrepriseServ.loginEntreprise(this.login_data).subscribe((data)=>{
      if(data.message==null)
      {
        console.log(data)
        localStorage.setItem('entreprise',JSON.stringify(data));
        this.enventServ.publish('is_login',true);
      }
      else{
        console.log(data.message)
      }
    })
  }
}
