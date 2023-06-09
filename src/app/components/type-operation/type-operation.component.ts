import { UserService } from 'src/services/user.service';
import { Ioperation } from './../../../models/operation';
import { OperationService } from './../../../services/operation.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-type-operation',
  templateUrl: './type-operation.component.html',
  styleUrls: ['./type-operation.component.scss']
})
export class TypeOperationComponent {
  public i:number = 0;
  public selectedIntitule:string = ""
  public operations : Ioperation[] = [];
    public searchOperation : string = "";
  public selectedElement:Ioperation = {} ;
  constructor(private operationServ : OperationService,public userServ:UserService){}
  ngOnInit(): void {
    this.selectedIntitule = '';
    this.operationServ.getList().subscribe((data)=>
    {
      this.operations = data;
    });
  }
  public selectOperation(operation:Ioperation)
  {
    this.selectedElement = operation;
  }

  public add()
  {
    this.operationServ.add({intitule:this.selectedIntitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)}).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.operationServ.update({intitule:this.selectedElement.intitule,id_entreprise:Number(JSON.parse(localStorage.getItem("entreprise")!).id)},id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.operationServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
