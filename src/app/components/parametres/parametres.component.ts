import { Ioutillage } from './../../../models/outillage';
import { Ietat } from './../../../models/etat';
import { Ioperation } from './../../../models/operation';
import { OutillageService } from './../../../services/outillage.service';
import { EtatService } from './../../../services/etat.service';
import { OperationService } from './../../../services/operation.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametres',
  templateUrl: './parametres.component.html',
  styleUrls: ['./parametres.component.scss']
})
export class ParametresComponent implements OnInit{
  public i:number = 0;
  public selectedIntitule:string = ""
  public operations : Ioperation[] = [];
    public searchOperation : string = "";
  public etats : Ietat[]=[];
    public searchEtat : string = ""; 
  public outillages : Ioutillage[]=[];
  public selectedElement:Ioperation | Ioutillage | Ietat = {} ;
  public searchOutillage : string = "";
  constructor(private operationServ : OperationService,private etatServ:EtatService,private outillageServ:OutillageService){}
  ngOnInit(): void {
    this.operationServ.getList().subscribe((data)=>
    {
      this.operations = data;
    });
    this.etatServ.getList().subscribe((data)=>
    {
      this.etats = data;
    });
    this.outillageServ.getList().subscribe((data)=>{
      this.outillages = data;
    });
  }
  /**---------------OPERATIONS */
  public wantToAddOperation()
  {
    this.i =1 
  }
  public selectOperation(operation:Ioperation)
  {
    this.i = 1;
    this.selectedElement = operation;
  }
  public filterOperation()
  {

  }
  /**---------------ETATS */
  public wantToAddEtat()
  {
    this.i =2 
  }
  public selectEtat(etat:Ietat)
  {
    this.i = 2;
    this.selectedElement = etat;
  }
  public filterEtat()
  {

  }
   /**---------------OUTILLAGES */
   public wantToAddOutillage()
   {
     this.i =3 
   }
  public selectOutillage(outillage:Ioutillage)
  {
    this.i = 3;
    this.selectedElement = outillage;
  }
  public filterOutillage()
  {

  }

  public add()
  {
    switch (this.i) {
      case 1:
        this.operationServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 2:
        this.etatServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 3:
        this.outillageServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      default:
        console.log('erreur lors de la creation')
        break;
    }
  }
  public edit(id:number)
  {
    switch (this.i) {
      case 1:
        this.operationServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 2:
        this.etatServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 3:
        this.outillageServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      default:
        console.log('erreur lors de la modification')
        break;
    }
  }
  public delete(id:number)
  {
    switch (this.i) {
      case 1:
        this.operationServ.delete(id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 2:
        this.etatServ.delete(id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      case 3:
        this.outillageServ.delete(id).subscribe((data)=>
        {
          this.ngOnInit();
        })
        break;
      default:
        console.log('erreur lors de la creation')
        break;
    }
  }
  
}
