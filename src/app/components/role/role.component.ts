import { UserService } from 'src/services/user.service';
import { IRole } from './../../../models/role';
import { RoleService } from './../../../services/role.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent {
  public i:number = 0;
  public selectedIntitule:string = ""
  public roles : IRole[] = [];
    public searchOperation : string = "";
  public selectedElement:IRole = {} ;
  constructor(private roleServ : RoleService,public userServ:UserService){}
  ngOnInit(): void {
    this.selectedIntitule = '';
    this.roleServ.getList().subscribe((data)=>
    {
      this.roles = data;
    });
  }
  public selectRole(role:IRole)
  {
    this.selectedElement = role;
  }

  public add()
  {
    this.selectedElement.intitule = this.selectedIntitule;
    this.roleServ.add(this.selectedElement).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.roleServ.update(this.selectedElement,id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.roleServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }

}
