import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor() { }

  public api : string = "localhost:8000/api";
}
