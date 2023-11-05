import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeService } from 'src/app/services/time.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit{
  jobs: any[]=[];
constructor(private http:HttpClient , private timeJob:TimeService,     private router:Router){}

ngOnInit(){
  this.fetchJobs();
}


fetchJobs(){
  const API_URL = `${environment.API_URL}/Home/listJob`;
  this.http.get(API_URL).subscribe(
    (response: any) => {
	  this.jobs = response.data.map((job)=>{
		job.postJob = this.timeJob.timeAgo(job.postJob)
		console.log(job.postJob)
		return job;

	  })


    },
    (error) => {
      console.error('Failed to fetch jobs:', error);
    }

  )

}
navigateToJobProfile(id: number){
	this.router.navigate([`/job-profile/${id}`])
}
}
