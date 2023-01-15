import { INotification } from './../models/notification';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EnvironmentService } from './environment.service';
import { Injectable } from '@angular/core';
import { Imaintenance } from 'src/models/maintenance';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private env:EnvironmentService,private http:HttpClient) { }

  getOneNotification = (id_notif:number):Observable<INotification[]>=>
  {
    return this.http.get<INotification[]>(`${this.env.api}/notification/${id_notif}`,{headers:this.env.httpHeader});
  }
  getNotificationsEntreprise = (id_entreprise:number):Observable<INotification[]>=>
  {
    return this.http.get<INotification[]>(`${this.env.api}/notification/entreprise/${id_entreprise}`,{headers:this.env.httpHeader});
  }
  getNotificationsAgence = (id_agence:number):Observable<INotification[]>=>
  {
    return this.http.get<INotification[]>(`${this.env.api}/notification/agence/${id_agence}`,{headers:this.env.httpHeader});
  }
  getNotificationsSalle = (id_salle:number):Observable<INotification[]>=>
  {
    return this.http.get<INotification[]>(`${this.env.api}/notification/salle/${id_salle}`,{headers:this.env.httpHeader});
  }
  getAllMaintenanceEquipement = (id_possession:number):Observable<Imaintenance[]>=>
  {
    return this.http.get<Imaintenance[]>(`${this.env.api}/notification/historique/${id_possession}`,{headers:this.env.httpHeader});
  }

}
