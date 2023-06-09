import { IauthUser } from './../../../models/authentication';
import { EventsService } from './../../../services/event-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{
  public login_data : IauthUser = {};
  constructor(
    private userSvc:UserService,
    private enventServ:EventsService,
    public router:Router,
    public toasrt:ToastrService
    ){}
  ngOnInit(): void {

  }
  public signIn()
  {
    if (this.login_data.password && this.login_data.pseudo) {
      this.userSvc.login(this.login_data).subscribe((data)=>{
        if(data.message==null)
        {
          localStorage.setItem('users',JSON.stringify(data));
          this.enventServ.publish('is_login',true);
          this.router.navigate(['/list_entreprise']);
        }
        else{
          this.toasrt.warning(data.message);
        }
      },
      error => {
        this.toasrt.error(error.error.message);
      });
    }
    else{
      this.toasrt.error("Veuillez tout remplir");
    }
  }
}
