import { Injectable } from '@angular/core';

 import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';




@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  SignupUser(data){
    return this.http.post('http://127.0.0.1:8000/api/employee-register',data)
  }

  SignupCompany(data){
	  return this.http.post('http://127.0.0.1:8000/api/company-register', data)
  }

  EmployeeLogin(data){
    return this.http.post('http://127.0.0.1:8000/api/employee-login',data)

  }
  CompanyLogin(data){
    return this.http.post('http://127.0.0.1:8000/api/company-login',data)

  }

  loginWithGoogle(){
    return this.http.get('http://127.0.0.1:8000/api/auth/google/redirect');
   }


   ForgetPassEmployee(data)
   {
    return this.http.post('http://127.0.0.1:8000/api/user/forget-password',data)

   }

   ForgetPassCompany(data)
   {
    return this.http.post('http://127.0.0.1:8000/api/company/forget-password',data)

   }

   EmployeeResetPassword(data)
   {
    return this.http.post('http://127.0.0.1:8000/api/user/reset-password',data)

   }

   CompanyResetPassword(data)
   {
    return this.http.post('http://127.0.0.1:8000/api/company/reset-password',data)

   }


}
