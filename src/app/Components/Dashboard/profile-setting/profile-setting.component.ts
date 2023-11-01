import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { ToastrService } from "ngx-toastr";


@Component({
  selector: "app-profile-setting",
  templateUrl: "./profile-setting.component.html",
  styleUrls: ["./profile-setting.component.scss"],
})
export class ProfileSettingComponent {
  skillsArr: Array<any> = [];
  userType!: string;
  userForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService,
    private toastr: ToastrService
  ) {

    this.userService.getAllSkills().subscribe( (res)=>{
      this.AllSkills = res;
      console.log(this.AllSkills);
      })

    this.userForm = this.formBuilder.group({
      first_name: [""],
      last_name: [""],
      email: [""],
      cv: [""],
      mobile_number: [""],
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
    });

    this.userService.getUserSocials().subscribe( (res)=>{
      const data = res[0];
      this.userForm.patchValue({
        twitter_account: data["twitter_account"],
        linkedin_account: data["linkedin_account"],
        github_account: data["github_account"],
      
      })
  })
}
  

   AllSkills :any[];
   userSkills : any[];
   
	ngOnInit(): void {
   this.userService.getAllSkills().subscribe( (res)=>{
    this.AllSkills = res;
    console.log(this.AllSkills);
    })
    
   this.userService.getUserSkills().subscribe( (res)=>{
    this.userSkills = res;
    // console.log(this.userSkills);
    })

   
    
  }


	data: any;

  onSubmit() {
		console.log("hi");

		this.userService.updateUserData(this.userForm.value).subscribe(
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

  removeSkill(){

  }
  

  



}
