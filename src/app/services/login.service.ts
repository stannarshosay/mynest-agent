import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public hasLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http:HttpClient
  ) {
    if(localStorage.getItem("agentId")){
      this.hasLoggedIn.next(true);
    }
   }
   getLoginSetStatus():Observable<boolean>{
    return this.hasLoggedIn.asObservable();
  }
  login(username:string,password:string):Observable<any>{
    let params = {};
    params["username"] = username;
    params["password"] = password;
    return this.http.post("https://mynestonline.com/collection/api/authenticate/agent",params);
  }
  forgotPasswordOfAdmin(email:string,role:string):Observable<any>{
    return this.http.post("https://mynestonline.com/collection/api/forgot-pass?role="+role+"&email="+email,null);
  }
  changePassword(paramData:any){
    return this.http.post("https://mynestonline.com/collection/api/change-pass",paramData);
  }
  
}
