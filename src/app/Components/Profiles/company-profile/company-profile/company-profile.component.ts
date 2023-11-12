import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from "ngx-toastr";
import { TimeService } from 'src/app/services/time.service';

@Component({
	selector: "app-company-profile",
	templateUrl: "./company-profile.component.html",
	styleUrls: ["./company-profile.component.scss"],
})
export class CompanyProfileComponent implements OnInit{
  userType = "cmp";
  addReviewParams: any
  company_data: any = {};
  open_jobs_list: Array<any> = [];
  company_reviews: Array<any> = [];
  companyId: number;

  constructor(private companyService: CompanyService, private jobService: JobService, private route: ActivatedRoute, private toastr: ToastrService, private time: TimeService) {}


  //<!---------- calling the function "getCompanyByID" from "company" service / Start -------------->
  ngOnInit() {
    // get the role of the current user
    this.userType = localStorage.getItem('role');
    // get the company ID from the route
    this.companyId = +this.route.snapshot.paramMap.get('id');

		// fetch company details by ID
		this.companyService.getCompanyByID(this.companyId).subscribe(
			(response: any) => {
				// assign data to variables
				this.company_data = response.data;
        this.company_reviews = response.data.reviews.map((review) => {
          review.date = this.time.timeAgo(review.date);
          return review;
        });
        this.open_jobs_list = response.data.open_jobs.map((job) => {
          job.post_date = this.time.timeAgo(job.post_date);
          return job;
        });
			},
			(error: any) => {
				console.error("Error fetching company data", error);
			}
		);
		//<!-------- calling the function "getCompanyByID" from "company" service  / End ---------------->
	}


  toggleBookmark(companyId: number, jobId: number) {
    // Send a request to toggle the job bookmark
    this.jobService.toggleJobBookmark(companyId, jobId).subscribe(
      (response) => {
        // Handle success response here
        if (response.msg === 'Job bookmarked successfully' || response.msg === 'Job unbookmarked successfully') {
          // Find the job in open_jobs_list array and update its is_bookmarked property
          const job = this.open_jobs_list.find((j) => j.id === jobId);
          if (job) {
            job.is_bookmarked = !job.is_bookmarked;
            this.toastr.success(
              response.msg,
              '200',
              {
                  timeOut: 2000,
                  progressBar: true,
              }
          );
          }
        } else {
          // Handle other possible responses or show an error message
        }
      },
      (error) => {
        this.toastr.error(
          "Error occurred while bookmarking job",
          '401',
          {
              timeOut: 2000,
              progressBar: true,
          }
      );
      }
    );
  }

    //<!---------- calling the function "companyFollow" from "company" service / Start -------------->
    toggleFollow(companyId: number) {
      this.companyService.companyFollow(companyId).subscribe({
        next: (response) => {
          // Handle success response here
          if (response.msg === 'Followed successfully' || response.msg === 'Unfollowed successfully') {
  
            this.company_data.is_followed = !this.company_data.is_followed;
            this.toastr.success(response.msg, '200', {
              timeOut: 2000,
              progressBar: true,
            });
          }
        },
        error: (error) => {
          this.toastr.error('Error toggling company follow', '401', {
            timeOut: 2000,
            progressBar: true,
          });
        },
      });
    }
    //<!---------- calling the function "companyFollow" from "company" service / End -------------->
}
