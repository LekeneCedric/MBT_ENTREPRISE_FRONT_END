import { Router } from '@angular/router';
import { EventsService } from 'src/services/event-service.service';
import { IAgent } from 'src/models/agent';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
constructor(
private eventService:EventsService,
private _router:Router
){}
user_connected : IAgent = {}
ngOnInit(): void {
    this.user_connected = JSON.parse(localStorage.getItem("entreprise")!).agent;
}
logout = ()=>{
  this.eventService.publish('is_login',false);
  localStorage.removeItem('entreprise');
  this._router.navigate(['signIn']);
}
}
