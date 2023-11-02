import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-job-profile',
  templateUrl: './job-profile.component.html',
  styleUrls: ['./job-profile.component.scss']
})
export class JobProfileComponent implements OnInit{

  jobData: any = {};
  jobId: number;

  constructor(private companyService: CompanyService, private jobService: JobService, private route: ActivatedRoute, private toastr: ToastrService) {}

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

  //<!---------- calling the function "JobBookmark" from "job" service / Start -------------->
  toggleBookmark(jobId: number) {
    this.jobService.JobBookmark(jobId).subscribe({
      next: (response) => {
        // Handle success response here
        if (response.msg === 'Job bookmarked successfully' || response.msg === 'Job unbookmarked successfully') {

          this.jobData.job_bookmarked = !this.jobData.job_bookmarked;
          this.toastr.success(response.msg, '200', {
            timeOut: 2000,
            progressBar: true,
          });
        }
      },
      error: (error) => {
        this.toastr.error('Error toggling job bookmark', '401', {
          timeOut: 2000,
          progressBar: true,
        });
      },
    });
  }
  //<!---------- calling the function "JobBookmark" from "job" service / End -------------->
}
