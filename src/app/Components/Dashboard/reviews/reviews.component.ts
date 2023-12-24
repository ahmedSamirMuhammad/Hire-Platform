import { Component /*, ViewChild, ElementRef */} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TimeService } from "src/app/services/time.service";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { BehaviorSubject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"],
})
export class ReviewsComponent {
	// @ViewChild("btnReview") btnReview: ElementRef;
	editReviewParams = {
		id: '',
		getReviews: () => { }

	};
	modalOnInit;
	reviews;
	userType = "";
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});
	constructor(
		private dashboardHttpService: DashboardHttpService,
		private time: TimeService,
		private activatedRoute: ActivatedRoute,
		private spinner:NgxSpinnerService
	) {}
	ngOnInit() {

		this.userType = localStorage.getItem("role");
		this.getReviews();

	}
	setEditReviewId(id) {
		this.editReviewParams.id = id;
		this.editReviewParams.getReviews = this.getReviews;

	}
	// triggerClick() {
	// (this.btnReview.nativeElement as HTMLButtonElement).click();
	// }
	getReviews = () => {
		this.spinner.show();
		/*
		current_page
		last_page
		 */
		const page = this.activatedRoute.snapshot.params["page"];
		this.dashboardHttpService
			.getReviews(page)
			.subscribe((response: any) => {


				if (response.status === 200) {
					this.reviews = response.data.data.map((review) => {
						review.created_at = this.time.timeAgo(
							review.created_at
						);
						return review;
					});
					this.paginationData.next({
						current_page: response.data.current_page,
						last_page: response.data.last_page,
						onturn: this.getReviews,
						url: `/dashboard/reviews/1`,
						allowOnTurn: true,
						disable: false,
					});
					this.spinner.hide();
				} else {
					this.spinner.hide();
					console.error(response.message);
				}
			});
	}
deleteReview(id) {
		this.dashboardHttpService.deleteReview(id).subscribe((response: any) => {
			if (response.status === 200) {
				this.getReviews();
			} else {
				console.error(response.message);
			}
		});
	}

}
