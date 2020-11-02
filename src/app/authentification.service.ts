import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';





@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private host:string="http://localhost:8080";
  private jwtToken;
   roles:Array<any>;
   username;
 
  constructor(private http:HttpClient) { }

   authLogin(user){
     return this.http.post(this.host+"/login",user,{observe:'response'});

   }

   saveToken(jwt){
     this.jwtToken=jwt;
     localStorage.setItem('token',jwt);
     let helper=new JwtHelperService();
     this.roles=helper.decodeToken(this.jwtToken).roles;
     console.log(this.roles);
     this.username=helper.decodeToken(this.jwtToken).sub;
     console.log(this.username);

   }

   getTasks(){
     if(this.jwtToken==null) 
     this.loadToken();
     return this.http.get(this.host+"/task",{headers:new HttpHeaders({'Authorization':this.jwtToken})});
   }

   loadToken(){
     this.jwtToken=localStorage.getItem('token');
   }

   isAdmin(){
        for(let r of this.roles){
             if(r.authority=='ADMIN') return true;
        }
        return false;
   }

   Logout(){
     this.jwtToken=null;
     localStorage.removeItem('token');
   }

   newTask(task){
     return this.http.post(this.host+"/saveTask",task,{headers:new HttpHeaders({'Authorization':this.jwtToken})});
   }
   newUser(user){
    return this.http.post(this.host+"/register",user);
   }
   
}
