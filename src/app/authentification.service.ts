import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private host:string="http://localhost:8080";
  private jwtToken;
  private roles:Array<any>;
  constructor(private http:HttpClient) { }

   authLogin(user){
     return this.http.post(this.host+"/login",user,{observe:'response'});

   }

   saveToken(jwt){
     localStorage.setItem('token',jwt);
     
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

}
