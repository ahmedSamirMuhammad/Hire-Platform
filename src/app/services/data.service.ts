import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  SignupUser(data){
    return this.http.post('http://127.0.0.1:8000/api/employee-register',data)
  }

  SignupCompany(data){
    return this.http.post('http://127.0.0.1:8000/api/company-register',data)
  }

  EmployeeLogin(data){
    return this.http.post('http://127.0.0.1:8000/api/employee-login',data)

  }
  CompanyLogin(data){
    return this.http.post('http://127.0.0.1:8000/api/company-login',data)

  }

   
}