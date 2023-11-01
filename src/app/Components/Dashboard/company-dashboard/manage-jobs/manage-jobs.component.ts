import { Component ,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { JobCrudService } from 'src/app/services/job-crud.service';
// import { FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent {
  constructor(private jobCrud:JobCrudService){

  }
  jobs:any = [];
  ngOnInit():void{
    
    
    this.jobCrud.getAllJobs().subscribe( (res)=>{
      this.jobs = res.data;
      console.log(this.jobs);
      })
      
  }
  
}
