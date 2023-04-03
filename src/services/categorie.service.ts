import { Observable } from 'rxjs';
import { EnvironmentService } from './environment.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategorie } from 'src/models/categorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http:HttpClient,private environment:EnvironmentService) {}
  
  public header:Object = {headers:this.environment.httpHeader}
  public getCategories():Observable<ICategorie[]>
  {
    return this.http.get<ICategorie[]>(`${this.environment.api}/categorie`,this.header);
  }

  public getOneCategorie(id:number):Observable<ICategorie>
  {
    return this.http.get<ICategorie>(`${this.environment.api}/categorie/${id}`,this.header);
  }

  public getSubCategories(id_categorie:number):Observable<ICategorie[]>
  {
    return this.http.get<ICategorie[]>(`${this.environment.api}/categorie/sub/${id_categorie}`,this.header);
  }

  public addCategorie(data:ICategorie):Observable<any>
  {
    return this.http.post<any>(`${this.environment.api}/categorie`,data,this.header);
  }
  
  public editCategorie(data:ICategorie,id_cat:number):Observable<ICategorie>
  {
    return this.http.post<ICategorie>(`${this.environment.api}/categorie/${id_cat}`,data,this.header);
  }

  public deleteCategorie(id:number):Observable<ICategorie>
  {
    return this.http.delete<ICategorie>(`${this.environment.api}/categorie/${id}`,this.header)
  }
}
