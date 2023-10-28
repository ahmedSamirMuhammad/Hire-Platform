import { Component } from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";

@Component({
	selector: "app-summary",
	templateUrl: "./summary.component.html",
	styleUrls: ["./summary.component.scss"],
})

export class SummaryComponent {
	jobsNumber!: number;
	reviewsNumber!: number;
	constructor(private dashboardHttpService: DashboardHttpService) {}
	ngOnInit() {
		this.getSummary();
	}
	getSummary() {
		this.dashboardHttpService.getSummary().subscribe((response: any) => {
			if (response.status === 200) {
				this.jobsNumber = response.data.jobs_number || 0;
				this.reviewsNumber = response.data.reviews_number || 0;
				console.log(response);
			} else {
				console.error(response.message);
			}
		});
	}

}
