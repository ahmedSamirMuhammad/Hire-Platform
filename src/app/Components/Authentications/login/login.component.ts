import { Component, OnInit } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	Validators,
	ValidatorFn,
	AbstractControl,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { DataService } from "src/app/services/data.service";
import { ToastrService } from "ngx-toastr";
import { catchError, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
	form: FormGroup;
	data: any;
	token: any;
	name: any;
	email: any;

	constructor(
		private formBuilder: FormBuilder,
		private http: HttpClient,
		private router: Router,
		private dataService: DataService,
		private toastr: ToastrService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			email: ["", [Validators.required, Validators.email]],
			password: ["", [Validators.required]],
		});

		const token = this.route.snapshot.queryParamMap.get("token");
		const name = this.route.snapshot.queryParamMap.get("name");
    if (token) {
			// Token is present in the URL, save it to local storage
			localStorage.setItem("token", token);
			localStorage.setItem("name", name);

			// Navigate the user to the home page or another page as needed
			this.router.navigate(["/"]);
			setTimeout(function() {
				location.reload();
			  }, 1000);
		}
    const isAuth = this.canActivate();

		if (isAuth) {
			// User is not authenticated, you can proceed with other actions or leave this empty.
		} else {
			// User is authenticated, redirect to the home page
			this.router.navigate(["/"]);
		}

		
	}

	selectedAccountType: string = "company"; // Default to 'company' if none selected

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
                localStorage.setItem('role', 'emp');
                this.router.navigate(['/']);
				setTimeout(function() {
					location.reload();
				  }, 1000); // 1000 milliseconds = 1 second
				  
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
                localStorage.setItem('role', 'cmp');

                this.router.navigate(['/']);
				setTimeout(function() {
					location.reload();
				  }, 1000); // 1000 milliseconds = 1 second
				  
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




	// loginGoogle(): void {
	//   this.dataService.loginWithGoogle().subscribe(
	//     (response) => {
	//       // Handle a successful response from the server, which may contain user data or tokens.
	//       // You can redirect to a new page or perform other actions here.
	//       console.log('Login with Google successful!', response);
	//     },
	//     (error) => {
	//       // Handle errors if the login process fails.
	//       console.error('Login with Google failed!', error);
	//     }
	//   );
	// }

	loginGoogle() {
		// Create a unique state for the OAuth2 flow
		const state = Math.random().toString(36).substring(7);
		// Store the state in a session or a cookie for later verification

		// Construct the Google OAuth2 URL
		const oauthUrl = `http://127.0.0.1:8000/api/auth/google/redirect?state=${state}`;

		// Open a new tab with the OAuth2 URL
		const newTab = window.open(oauthUrl, "_blank");

		// Check for the token in the new tab's HTML content
	}

	loginGithub() {
		// Create a unique state for the OAuth2 flow
		const state = Math.random().toString(36).substring(7);
		// Store the state in a session or a cookie for later verification

		// Construct the Google OAuth2 URL
		const oauthUrl = `http://127.0.0.1:8000/api/auth/github/redirect?state=${state}`;

		// Open a new tab with the OAuth2 URL
		const newTab = window.open(oauthUrl, "_blank");

		// Check for the token in the new tab's HTML content
	}

  canActivate(): boolean {
		const check = localStorage.getItem("token");
		if (check) {
			// User is authenticated, so redirect to the home page
			this.router.navigate(["/"]);
			return false; // Prevent access to the route
		} else {
			return true; // User is not authenticated, allow access to the route
		}
	}
}

// not working also
// let me tell u the scenario in case u have better solution

// 1- user click on google button  that assioated with link http://127.0.0.1:8000/api/auth/google/redirect
// 2- a pop up display to login with his login account
// 3-there is a call back link http://127.0.0.1:8000/api/auth/google/callback
// that link display json response like that

// {
// "status": 200,
// "msg": "Login Successfully",
// "data": {
// "token": "114|r8wgBxyaCbfc69Rm480j61vHb2dNh0jxXQsuRP9N87a25ccc",
// "name": "Ahmed Ali",
// "email": "sionquinn1@gmail.com"
// }
// }

// or if there is something error it shows like that
// {
// "status": 401,
// "msg": "Error with your credentials",
// "data": ""
// }

// tell me what is the best thing to store that token from pop window to my app
