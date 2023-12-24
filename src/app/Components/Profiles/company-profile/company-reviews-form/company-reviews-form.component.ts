import { Component, Input, OnInit } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-company-reviews-form',
	templateUrl: './company-reviews-form.component.html',
	styleUrls: ['./company-reviews-form.component.scss'],
})
export class CompanyReviewsFormComponent implements OnInit {
	@Input() closeModal: any;
	companyId: number;
	reviewData = {
		rating: '',
		name: '',
		title: '',
		comment: '',
	};

	constructor(
		private route: ActivatedRoute,
		private reviewService: ReviewService,
		private toastr: ToastrService
	) {}

	ngOnInit() {
		// get the company ID from the route
		this.companyId = +this.route.snapshot.paramMap.get('id');
	}

	onSubmit() {
		// Ensure that the company ID is set correctly
		const companyId = this.companyId.toString();

		// Send the review data to the service
		this.reviewService.addReview(companyId, this.reviewData).subscribe(
			(response) => {
				this.toastr.success('Review added successfully', '200', {
					timeOut: 2000,
					progressBar: true,
				});

				// Clear the reviewData object for a new review
				this.reviewData = {
					rating: '',
					name: '',
					title: '',
					comment: '',
				};

				this.closeModal();
			},
			(error) => {
				this.toastr.error(
					'You sent a review for this company before',
					'401',
					{
						timeOut: 2000,
						progressBar: true,
					}
				);
			}
		);
	}
}
