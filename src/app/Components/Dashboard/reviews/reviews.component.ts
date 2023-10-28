import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TimeService } from "src/app/services/time.service";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { BehaviorSubject } from "rxjs";


@Component({
	selector: "app-reviews",
	templateUrl: "./reviews.component.html",
	styleUrls: ["./reviews.component.scss"],
})
export class ReviewsComponent {
	reviews;
	userType = "company";
	paginationData: BehaviorSubject<any> = new BehaviorSubject({});
	constructor(
		private dashboardHttpService: DashboardHttpService,
		private time: TimeService,
		private activatedRoute: ActivatedRoute
	) {}
	ngOnInit() {
		this.userType = localStorage.getItem('user_type');
		this.getReviews();
		// console.log($('#small-dialog-1'));
	}
	getReviews() {
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
					this.paginationData.next( {
						current_page:response.data.current_page,
						last_page: response.data.last_page,
					});
				} else {
					console.error(response.message);
				}
			});
	}
}
