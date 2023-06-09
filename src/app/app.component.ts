
import { EnvironmentService } from './../services/environment.service';
import { Component } from '@angular/core';
import { EventsService } from 'src/services/event-service.service';
import { Router } from '@angular/router';
import { RoleService } from 'src/services/role.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public is_login:boolean|undefined;
  title = 'MBT_ENTREPRISE_FRONT_END';
  constructor(private eventService:EventsService,private _router:Router,public roleServ:RoleService){
    this.eventService.subscribe('is_login',(data)=>{
      this.is_login = data;
    });
    this.getpriv();

    setInterval(()=>{
      if (localStorage.getItem("users")) {
        this.eventService.publish('is_login',true);
      }
      else if (localStorage.getItem("users") === null) {
        this.eventService.publish('is_login',false);
        this._router.navigate(['signIn']);
      }
      else if (localStorage.getItem("entreprise") === null) {
        this._router.navigate(['list_entreprise']);
      }
    },200);
    setInterval(()=>{
      this.getpriv();
    },10000);

  }

  getpriv(){
    if(localStorage.getItem("users")){
      this.roleServ.getListPrivilegeyUser().subscribe((data)=>
      {
        localStorage.setItem('mespriv',JSON.stringify(data));
      });
    }

  }

}
