import { Component } from '@angular/core';
import { IUser } from 'src/models/user';
import { RoleService } from 'src/services/role.service';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent {

  public selectedElement:IUser={};role=0;
  public users : any;public roles : any = [];
  nom='';pseudo='';email='';password='';
  unuser:IUser={};
  constructor(private userServ : UserService,public roleServ:RoleService){}
  ngOnInit(): void {
    this.nom='';this.pseudo='';this.email='';this.password='';this.role=0;
    this.userServ.getList().subscribe((data)=>
    {
      this.users = data;
    });
    this.roleServ.getList().subscribe((data)=>
    {
      this.roles = data;
    });
  }

  public selectUser(user:any)
  {
    this.selectedElement = user;
  }

  public add()
  {
    this.unuser.email = this.email;
    this.unuser.name = this.nom;
    this.unuser.pseudo = this.pseudo;
    this.unuser.password = this.password;
    this.unuser.idrole = this.role;
    this.userServ.add(this.unuser).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public edit(id:number)
  {
    this.userServ.update(this.selectedElement,id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }
  public delete(id:number)
  {
    this.userServ.delete(id).subscribe((data)=>
    {
      this.ngOnInit();
    });
  }

  public hasprivilege(name:string)
  {
    return this.userServ.hasprivilege(name)
  }
}
