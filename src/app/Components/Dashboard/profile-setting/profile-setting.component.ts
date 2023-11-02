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



  //holding skills data
   skillsArr : Array<any> = [];
   userType!: string;
  userForm : FormGroup;
   constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    // private activateRoute :ActivatedRoute,
    private ngZone:NgZone,
    private jobCrud:JobCrudService,
    private userService: UserService

  ){
  this.userService.getUserData().subscribe( res=>{
    this.userForm.setValue({
      first_name:res['first_name'],
      last_name:res['last_name'],
      email:res['email'],
      title:res['title'],
      nationality:res['nationality'],
      skills:res['skills'],
      about:res['about'],
      avatar:res['avatar'],
     })
  })

  this.userForm= this.formBuilder.group({
    first_name:[''],
    last_name:[''],
    email:[''],
    title:[''],
    nationality:[''],
    skills:[''],
    about:[''],
    avatar:[''],
   })

  }
   ngOnInit(): void {



   }

	//add new Skill into Skills section

  addToSkillsArr(skill:string){
    if(skill.trim()!== ''){

      this.skillsArr.push(skill);
      console.log(this.skillsArr);

    }
  }

;

	// Remove Skill From Skills section

	removeFromSkillsArr(skill: string, input: any) {
		if (skill.trim() !== "") {
			let newFilteredArr = this.skillsArr.filter((el) => el != skill);
			this.skillsArr = newFilteredArr;

			console.log(this.skillsArr);
			input.value = "";
		}
	}

	// Check newPassword is Repeated Correctly

  notMatched !: boolean; // flag to appear and disappear  sentence error
  CheckNewPass(newPass : string , repeatedNewPass:string){
    if(newPass==repeatedNewPass){
      this.notMatched=false;
    }else{
      this.notMatched=true;
    }
  };
  onSubmit(){
    this.userService.updateUserData(this.userForm.value).subscribe( ()=>{
      console.log('edited successfully');
      this.ngZone.run( ()=>this.router.navigateByUrl('dashboard/manageJobs'))
    },(err)=>{
      console.log(err);
    }
    )
  }






}
