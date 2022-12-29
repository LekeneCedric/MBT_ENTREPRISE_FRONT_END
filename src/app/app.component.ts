
import { EnvironmentService } from './../services/environment.service';
import { Component } from '@angular/core';
import { EventsService } from 'src/services/event-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private eventService:EventsService,private _router:Router){
    this.eventService.subscribe('is_login',(data)=>{
      console.log(data)
      this.is_login = data;
    })
    
    setInterval(()=>{
      let id_entreprise =JSON.parse(localStorage.getItem("entreprise")!).id;
      if (typeof(id_entreprise)!=typeof(1))
      {
        this.eventService.publish('is_login',false);
        this._router.navigate(['signIn'])
      }
      else
      {
        this.eventService.publish('is_login',true);
      }
    },200);
    
  }
  public is_login:boolean|undefined;
  title = 'MBT_ENTREPRISE_FRONT_END';
  
}
