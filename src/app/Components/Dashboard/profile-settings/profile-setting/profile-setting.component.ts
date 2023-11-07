import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from "ngx-toastr";
// import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: "app-profile-setting",
  templateUrl: "./profile-setting.component.html",
  styleUrls: ["./profile-setting.component.scss"],
})
export class ProfileSettingComponent {
	skillsArr: Array<any> = [];
	userType!: string;
	userForm: FormGroup;
  userFormData: FormData


	constructor(
	  public formBuilder: FormBuilder,
	  private router: Router,
	  private userService: UserService,
	  private toastr: ToastrService,
	  // private spinner:NgxSpinnerService
	) {



	  this.userForm = this.formBuilder.group({
		first_name:['', [Validators.required , Validators.minLength(2)]],
		last_name: ['', [Validators.required , Validators.minLength(2)]],
		email: ['', [Validators.required, Validators.email]],
		cv: [""],
		mobile_number: [''],
		title: [""],
		nationality: [""],
		about: [""],
		avatar: [""],
		skills: [[]], // Initialize 'skills' as an empty array
		password: [""],
		new_password: [""],
		confirmedPass: [""],
		twitter_account: [""],
		linkedin_account: [""],
		github_account: [""],
	  });
    
    this.userService.getUserSkills().subscribe( (res)=>{
      this.userSkills = res;
      // console.log(this.userSkills);
      })
  }


	 
	 AllSkills :any[];
	 userSkills : any[];

	  ngOnInit(): void {
	this.loadData();



	}


 	  data: any;

	onSubmit() {
    this.userFormData.append('first_name', this.userForm.get('first_name').value)
    this.userFormData.append('last_name', this.userForm.get('last_name').value)
    this.userFormData.append('email', this.userForm.get('email').value)
    this.userFormData.append('cv', this.userForm.get('cv').value)
    this.userFormData.append('mobile_number', this.userForm.get('mobile_number').value)
    this.userFormData.append('title', this.userForm.get('title').value)
    this.userFormData.append('nationality', this.userForm.get('nationality').value)
    this.userFormData.append('about', this.userForm.get('about').value)
    this.userFormData.append('avatar', this.userForm.get('avatar').value)
    this.userFormData.append('skills', this.userForm.get('skills').value)
    this.userFormData.append('password', this.userForm.get('password').value)
    this.userFormData.append('new_password', this.userForm.get('new_password').value)
    this.userFormData.append('confirmedPass', this.userForm.get('confirmedPass').value)
    this.userFormData.append('twitter_account', this.userForm.get('twitter_account').value)
    this.userFormData.append('linkedin_account', this.userForm.get('linkedin_account').value)
    this.userFormData.append('github_account', this.userForm.get('github_account').value)
     

		  console.log("hi");
	  console.log(this.userForm);

	  if(this.userForm.valid) {

		this.userService.updateUserData(this.userFormData).subscribe(
		  (res) => {
			this.data = res;
			//  console.log('edited successfully');
			//  this.router.navigate(['/dashboard/jobs']);

			if (this.data.status === 200) {
			  this.router.navigate(["/dashboard/jobs"]);
			  this.toastr.success(
				JSON.stringify(this.data.msg),
				JSON.stringify(this.data.status),
				{
				  timeOut: 2000,
				  progressBar: true,
				}
			  );
			}
		  },
		  (error) => {
			// Handle error here
			this.toastr.error("Error with your credentials", "401", {
			  timeOut: 5000,
			  progressBar: true,
			});
		  }
		);
	  }
	  else{
		this.toastr.error(
		  JSON.stringify("invalid data"),
		  JSON.stringify(403),
		  {
			timeOut: 2000,
			progressBar: true,
		  }
		);

	  }
	  }
	  



	loadData(){
	  // this.spinner.show();
	  this.userService.getAllSkills().subscribe( (res)=>{
		  this.AllSkills = res;
		  console.log(this.AllSkills);
		  setTimeout(() => {
			  /** spinner ends after 1 seconds */
			  // this.spinner.hide();
			}, 1000);

		  })

		  this.userService.getUserData().subscribe((res) => {
			  this.userForm.patchValue({
				first_name: res["first_name"],
				last_name: res["last_name"],
				email: res["email"],
				title: res["title"],
				cv: res["cv"],
				mobile_number: res["mobile_number"],
				nationality: res["nationality"],
				about: res["about"],
				avatar: res["avatar"],
				skills: res["skills"],
				// twitter_account: res["twitter_account"],
				// linkedin_account: res["linkedin_account"],
				// github_account: res["github_account"],
			  });
			  setTimeout(() => {
				  /** spinner ends after 1 seconds */
				  // this.spinner.hide();
				}, 1000);

			});


			this.userService.getUserSocials().subscribe( (res)=>{
			  const data = res[0];
			  this.userForm.patchValue({
				twitter_account: data["twitter_account"],
				linkedin_account: data["linkedin_account"],
				github_account: data["github_account"],

			  })
			  setTimeout(() => {
				  /** spinner ends after 5 seconds */
				  // this.spinner.hide();
				}, 1000);

		  })

	}



	removeSkill(id:any){
		this.userService.removeSkill(id).subscribe( (res=>{
		  console.log('deleted' );
		  const currentScrollPosition = window.scrollY;
		  console.log(currentScrollPosition);

		  this.router.navigate(['/dashboard/user-settings'])
			// Scroll back to the previous position after the route is reloaded
			// window.scrollTo(0,currentScrollPosition);


		}))
	  }

    selected(event: any) {
      const selectedFiles = event.target.files[0];
      console.log(selectedFiles)
      this.userFormData = new FormData
      this.userFormData.append('avatar', selectedFiles)
  
  
    }

    cv(event: any) {
      const selectedFiles = event.target.files[0];
      console.log(selectedFiles)
      this.userFormData = new FormData
      this.userFormData.append('cv', selectedFiles)
  
  
    }

}