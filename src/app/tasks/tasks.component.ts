import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
    tasks;
    user;
  constructor(public auth:AuthentificationService,private router:Router) { }

  ngOnInit(){
    this.auth.getTasks().subscribe(data=>{
      this.tasks=data;
    },err=>{
         this.router.navigateByUrl("/login");
    })
  }
  onLogout(){
    this.auth.Logout();
    this.router.navigateByUrl('/login')
  }

  userAuthenticate(){
     this.user=this.auth.username;
     console.log(this.user);
  }
  onNewTask(){
    this.router.navigateByUrl("/new-task");
  }

}
