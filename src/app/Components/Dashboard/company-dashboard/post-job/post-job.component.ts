import { Component ,NgZone } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';


import { Router } from '@angular/router';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { FormGroup , FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.scss']
})
export class PostJobComponent {
  jobForm:FormGroup;

  constructor(
    public formBuilder:FormBuilder,
    private router:Router,
    private ngZone:NgZone,
    private jobCrud:JobCrudService,
   
  ){
   this.jobForm= this.formBuilder.group({
    name:[''],
    type:[''],
    category:[''],
    location:[''],
    max_salary:[''],
    min_salary:[''],
    about:[''],
    logo:[''],
   })
  }  

  onSubmit(){
    this.jobCrud.addJob(this.jobForm.value).subscribe( ()=>{
      console.log('added successfully');
      this.ngZone.run( ()=>this.router.navigateByUrl('dashboard/manageJobs'))
    },(err)=>{
      console.log(err);
    }
    )
  }
}
