import { Component } from '@angular/core';
import { CompanySettingsService } from 'src/app/services/company-settings.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgZone } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-company-settings',
  templateUrl: './company-settings.component.html',
  styleUrls: ['./company-settings.component.scss']
})
export class CompanySettingsComponent {

 cmpForm : FormGroup;
  constructor(
   public formBuilder:FormBuilder,
   private router:Router,
   // private activateRoute :ActivatedRoute,
   private ngZone:NgZone,
   private jobCrud:JobCrudService,
   private CmpService: CompanySettingsService
  
 ){
 this.CmpService.getCmpData().subscribe( res=>{
   this.cmpForm.setValue({
     first_name:res['first_name'],
     last_name:res['last_name'],
     company_name:res['company_name'],
     email:res['email'],
     title:res['title'],
     nationality:res['nationality'],
     location:res['location'],
     about:res['about'],
     logo:res['logo'],
    })
 })

 this.cmpForm= this.formBuilder.group({
   first_name:[''],
   last_name:[''],
   company_name:[''],
   email:[''],
   title:[''],
   nationality:[''],
   location:[''],
   about:[''],
   logo:[''],
  })

 }  
  ngOnInit(): void {
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
   this.CmpService.updateCmpData(this.cmpForm.value).subscribe( ()=>{
     console.log('edited successfully');
     this.ngZone.run( ()=>this.router.navigateByUrl('dashboard/manageJobs'))
   },(err)=>{
     console.log(err);
   }
   )
 }
 
}
