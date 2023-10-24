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
    const headers = new HttpHeaders({
      'Authorization': '4|8QGwgrSAETNQodopxnoffbBEVOWaGiP3G01aysXS5b78b5a5'
    });
    
    this.jobCrud.getAllJobs({ headers }).subscribe( (res)=>{
      this.jobs = res;
      console.log(this.jobs);
      })
      
  }
  
}
