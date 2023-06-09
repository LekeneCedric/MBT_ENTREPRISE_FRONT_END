import { UserService } from 'src/services/user.service';
import { Ietat } from './../../../models/etat';
import { EtatService } from './../../../services/etat.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-etat-equipement',
  templateUrl: './etat-equipement.component.html',
  styleUrls: ['./etat-equipement.component.scss']
})
export class EtatEquipementComponent {
  public i:number = 0;
  public selectedIntitule:string = ""
  public etats : Ietat[]=[];
    public searchEtat : string = "";
  public selectedElement:Ietat = {} ;
  constructor(private etatServ:EtatService,public userServ:UserService){}
  ngOnInit(): void {
    this.selectedIntitule = '';
    this.etatServ.getList().subscribe((data)=>
    {
      this.etats = data;
    });
  }

  public selectEtat(etat:Ietat)
  {
    this.selectedElement = etat;
  }

  public add()
  {
    this.etatServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.etatServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.etatServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
