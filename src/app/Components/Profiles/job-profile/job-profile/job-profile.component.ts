import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.scss']
})
export class JobProfileComponent implements OnInit{
 
  jobData: Array<any> = [];
  jobId: number; 

  constructor(private companyService: CompanyService, private jobService: JobService, private route: ActivatedRoute) {}


  //<!---------- calling the function "getJobByID" from "job" service / Start -------------->
  ngOnInit() {
    // get the job ID from the route
    this.jobId = +this.route.snapshot.paramMap.get('id');

    // fetch job details by ID
    this.jobService.getJobByID(this.jobId).subscribe(
      (response: any) => {
        // assign data to variables
        this.jobData = response.data;
      },
      (error: any) => {
        console.error('Error fetching job data', error);
      }
    );
  }
  //<!-------- calling the function "getJobByID" from "job" service  / End ---------------->




  toggleBookmark(jobId: number) {
    // Send a request to toggle the job bookmark
    this.jobService.JobBookmark(jobId).subscribe(
      (response) => {
        // Handle success response here
        if (response.msg === 'Job bookmarked successfully' || response.msg === 'Job unbookmarked successfully') {
          // Find the job in open_jobs_list array and update its is_bookmarked property
          const job = this.jobData.find((j) => j.id === jobId);
          if (job) {
            job.job_bookmarked = !job.job_bookmarked;
          }
        } else {
          // Handle other possible responses or show an error message
        }
      },
      (error) => {
        // Handle error response here
        console.error('Error toggling job bookmark', error);
      }
    );
  }
  



}
