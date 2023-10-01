import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  data :any
  token : any
  name : any

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router ,
    private dataService:DataService ,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
       email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
     });
  }

  



  selectedAccountType: string = 'company'; // Default to 'company' if none selected

  submit(): void {
    if (this.form.valid) {
      if (this.selectedAccountType === 'employee') {
        this.dataService.EmployeeLogin(this.form.value)
          .subscribe(
            (res) => {
              this.data = res;
              if (this.data.status === 200) {
                this.token = this.data.data.token;
                this.name = this.data.data.name;
                localStorage.setItem('token', this.token);
                localStorage.setItem('name', this.name);
                this.router.navigate(['/']);
                this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
                  timeOut: 2000,
                  progressBar: true,
                });
              }
            },
            (error) => {
              // Handle error here
              this.toastr.error('Error with your credentials', '401', {
                timeOut: 5000,
                progressBar: true,
              });
            }
          );
      } else if (this.selectedAccountType === 'company') {
        this.dataService.CompanyLogin(this.form.value)
          .subscribe(
            (res) => {
              this.data = res;
              if (this.data.status === 200) {
                this.token = this.data.data.token;
                localStorage.setItem('token', this.token);
                this.router.navigate(['/']);
                this.toastr.success(JSON.stringify(this.data.msg), JSON.stringify(this.data.status), {
                  timeOut: 2000,
                  progressBar: true,
                });
              }
            },
            (error) => {
              // Handle error here
              this.toastr.error('Error with your credentials', '401', {
                timeOut: 5000,
                progressBar: true,
              });
            }
          );
      }
    } else {
      this.toastr.error('Email and Password', 'Invalid Form', {
        timeOut: 2000,
        progressBar: true,
      });
    }
  }
  
}