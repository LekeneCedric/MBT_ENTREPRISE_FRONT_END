import { Router } from '@angular/router';
import { EventsService } from './../../services/event-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent {
constructor(private eventService:EventsService,private _router:Router){}

public logout()
{
        this.eventService.publish('is_login',false);
        localStorage.removeItem("entreprise");
        this._router.navigate(['signIn']);
        
}
}
