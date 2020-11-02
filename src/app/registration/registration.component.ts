import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private auth:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  addUser(user){
    this.auth.newUser(user).subscribe(resp=>{
      this.router.navigateByUrl("/login");
    },err=>{
      this.router.navigateByUrl("/login");
    });
  }
}
