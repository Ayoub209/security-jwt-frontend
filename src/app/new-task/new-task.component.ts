import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../authentification.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  constructor(private auth:AuthentificationService,private router:Router) { }

  ngOnInit(): void {
  }

  addTask(task){
      this.auth.newTask(task).subscribe(resp=>{
        this.router.navigateByUrl("/tasks");
      },err=>{
        this.router.navigateByUrl("/login");
      });
  }

}
