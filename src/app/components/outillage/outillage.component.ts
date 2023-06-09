import { UserService } from 'src/services/user.service';
import { Ioutillage } from './../../../models/outillage';
import { OutillageService } from './../../../services/outillage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-outillage',
  templateUrl: './outillage.component.html',
  styleUrls: ['./outillage.component.scss']
})
export class OutillageComponent {
  public i:number = 0;
  public selectedIntitule:string = ""
  public outillages : Ioutillage[]=[];
  public selectedElement:Ioutillage = {} ;
  public searchOutillage : string = "";
  constructor(private outillageServ:OutillageService,public userServ:UserService){}
  ngOnInit(): void {
    this.selectedIntitule = '';
    this.outillageServ.getList().subscribe((data)=>{
      this.outillages = data;
    });
  }
  public selectOutillage(outillage:Ioutillage)
  {
    this.selectedElement = outillage;
  }
  public add()
  {
    this.outillageServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.outillageServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.outillageServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
