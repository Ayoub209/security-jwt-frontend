import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   mode:number=0;
  constructor(private auth:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  onLogin(user){
    this.auth.authLogin(user).subscribe(resp=>{
      let jwt=resp.headers.get('Authorization');
      this.auth.saveToken(jwt);
      this.router.navigateByUrl("/tasks");
      
    },err=>{
      this.mode=1;
    })
  }

  onRegister(){
      this.router.navigateByUrl("/register");
  }
}
