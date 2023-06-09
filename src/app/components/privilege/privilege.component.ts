import { IPrivilege, IRole } from './../../../models/role';
import { RoleService } from './../../../services/role.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-privilege',
  templateUrl: './privilege.component.html',
  styleUrls: ['./privilege.component.scss']
})
export class PrivilegeComponent {
  public i:number = 0;
  public selectedIntitule:string = ""
  public roles : IRole[] = [];
  public privileges : IPrivilege[] = [];
    public searchOperation : string = "";
  public selectedElement:IRole = {} ;
  constructor(private roleServ : RoleService){}
  ngOnInit(): void {
    this.selectedIntitule = '';
    this.roleServ.getList().subscribe((data)=>
    {
      this.roles = data;
    });
    this.roleServ.getListPrivilege().subscribe((data)=>
    {
      this.privileges = data;
    });
  }

  saveordeleve(idrole:any,idpriv:any){
    this.roleServ.addPriv(idrole,idpriv).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  ischecked(idrole:any,tabrole:any){
    if(tabrole.filter((item:any) => item.role_id == idrole).length == 0){
      return false;
    }
    else{
      return true;
    }
  }
}
