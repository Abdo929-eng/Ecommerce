
import { jwtDecode } from "jwt-decode";
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Router } from "@angular/router";



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) { }
 
  private readonly router=inject(Router)

   userData:any=null
   

  sendRegisterForm(data:object):Observable<any>{
      return this.httpClient.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,data)
  }

  sendLoginForm(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)
}

safeUserData():void{
  
  if(localStorage.getItem('userToken')!==null){
    this.userData= jwtDecode(localStorage.getItem('userToken')!)
  }
}

logOut():void{
  if(localStorage.getItem('userToken')!==null){
  localStorage.removeItem('userToken');}
  this.userData=null;
  this.router.navigate(['/login'])

}



setVerifyEmail(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}


setVerifyCode(data:object):Observable<any>{
  return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}

setresetpassword(data:object):Observable<any>{
  return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}


}
