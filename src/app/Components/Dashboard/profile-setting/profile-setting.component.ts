import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.scss']
})
export class ProfileSettingComponent {
   userType  : string='emp' ;
   skillsArr : Array<any> = []

   //change userType depend on click event

   setUserType (user:string) {
    this.userType = user ; 
    console.log(this.userType);
    
  };

  //add new Skill into Skills section

  addToSkillsArr(skill:string){
    if(skill.trim()!== ''){

      this.skillsArr.push(skill);
      console.log(this.skillsArr);
      
    }

  };

    // Remove Skill From Skills section

  removeFromSkillsArr(skill:string , input:any){
    if(skill.trim()!== ''){

      let newFilteredArr =  this.skillsArr.filter( (el)=>  el!=skill );
      this.skillsArr=newFilteredArr;

      console.log(this.skillsArr);
      input.value="";
      
    } 
  };

  // Check newPassword is Repeated Correctly

  notMatched !: boolean; // flag to appear and disappear  sentence error
  CheckNewPass(newPass : string , repeatedNewPass:string){
    if(newPass==repeatedNewPass){
      this.notMatched=false;
    }else{
      this.notMatched=true;
    }
  }

  



}
