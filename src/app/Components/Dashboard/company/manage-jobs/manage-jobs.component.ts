import { Component ,NgZone } from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { JobCrudService } from 'src/app/services/job-crud.service';
import { UserService } from 'src/app/services/user.service';
import { TimeService } from "src/app/services/time.service";

// import { FormGroup , FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  templateUrl: './manage-jobs.component.html',
  styleUrls: ['./manage-jobs.component.scss']
})
export class ManageJobsComponent {
  constructor(private jobCrud:JobCrudService,
      private userService:UserService,
      private time: TimeService

    ){

  }
  jobs:any = [];
  getUserAppliedJobs:any = [];
	storedRole: string = localStorage.getItem("role");

  ngOnInit():void{


    this.jobCrud.getAllJobs().subscribe( (res)=>{
      this.jobs = res.data;
      this.jobs = res.data.map((job) => {
        job.created_at = this.time.timeAgo(
          job.created_at
        );
        return job;
      });
      console.log(this.jobs);
      })

    this.userService.getUserAppliedJobs().subscribe( (res)=>{
      this.getUserAppliedJobs = res.data;
      console.log(this.getUserAppliedJobs);
      })

  }



}
