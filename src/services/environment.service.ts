import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }
  public httpHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json, text/plain, */*',
    'X-Requested-With': 'XMLHttpRequest'
  })
  public api : string = "http://entreprise.mybuildingtips.com/api";
  public apiimg : string = "http://entreprise.mybuildingtips.com/images/";

}
