import { Component, OnInit } from "@angular/core";
import { CompanyService } from "src/app/services/company.service";
import { JobService } from "src/app/services/job.service";
import { ReviewService } from "src/app/services/review.service";
import { ActivatedRoute } from "@angular/router";
@Component({
	selector: "app-company-profile",
	templateUrl: "./company-profile.component.html",
	styleUrls: ["./company-profile.component.scss"],
})
export class CompanyProfileComponent implements OnInit {
	company_data: Array<any> = [];
	open_jobs_list: Array<any> = [];
	company_reviews: Array<any> = [];
	companyId: number;
	reviewData = {
		rating: "",
		name: "",
		title: "",
		comment: "",
	};

	constructor(
		private companyService: CompanyService,
		private jobService: JobService,
		private route: ActivatedRoute,
		private reviewService: ReviewService
	) {}

	//<!---------- calling the function "getCompanyByID" from "company" service / Start -------------->
	ngOnInit() {
		// get the company ID from the route
		this.companyId = +this.route.snapshot.paramMap.get("id");

		// fetch company details by ID
		this.companyService.getCompanyByID(this.companyId).subscribe(
			(response: any) => {
				// assign data to variables
				this.company_data = response.data;
				this.open_jobs_list = response.data.open_jobs;
				this.company_reviews = response.data.reviews;
			},
			(error: any) => {
				console.error("Error fetching company data", error);
			}
		);
		//<!-------- calling the function "getCompanyByID" from "company" service  / End ---------------->
	}

	onSubmit() {
		// Ensure that the company ID is set correctly
		const companyId = this.companyId.toString();

		// Send the review data to the service
		this.reviewService.addReview(companyId, this.reviewData).subscribe(
			(response) => {
				// Handle success response here
				// console.log('Review added successfully', response);
				alert("Review added successfully!");

				// Clear the reviewData object for a new review
				this.reviewData = {
					rating: "",
					name: "",
					title: "",
					comment: "",
				};
			},
			(error) => {
				// Handle error response here
				console.error("Error adding review", error);
			}
		);
	}

	toggleBookmark(companyId: number, jobId: number) {
		// Send a request to toggle the job bookmark
		this.jobService.toggleJobBookmark(companyId, jobId).subscribe(
			(response) => {
				// Handle success response here
				if (
					response.msg === "Job bookmarked successfully" ||
					response.msg === "Job unbookmarked successfully"
				) {
					// Find the job in open_jobs_list array and update its is_bookmarked property
					const job = this.open_jobs_list.find((j) => j.id === jobId);
					if (job) {
						job.is_bookmarked = !job.is_bookmarked;
					}
				} else {
					// Handle other possible responses or show an error message
				}
			},
			(error) => {
				// Handle error response here
				console.error("Error toggling job bookmark", error);
			}
		);
	}
}
