import { Component } from "@angular/core";
import { DashboardHttpService } from "src/app/services/dashboard-http.service";
import { NotificationService } from "src/app/notification.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
	selector: "app-summary",
	templateUrl: "./summary.component.html",
	styleUrls: ["./summary.component.scss"],
})

export class SummaryComponent {
	jobsNumber!: number;
	jobsApplied!: number;
	reviewsNumber!: number;
	location:'string';
	about:'string';
	name: 'string';
	logo: string = '';
	quantity: number = 100;
	userType;
	notifications;

	constructor(private dashboardHttpService: DashboardHttpService,private notificationService: NotificationService,private spinner:NgxSpinnerService) {}
	ngOnInit() {
		this.userType = localStorage.getItem("role");
		this.getSummary();
		this.loadNotifications();
	}
	getSummary() {
		this.spinner.show();
		this.dashboardHttpService.getSummary().subscribe((response: any) => {
			if (response.status === 200) {
				this.jobsApplied = response.data.jobs_applied || 0;
				this.jobsNumber = response.data.jobs_number || 0;
				this.reviewsNumber = response.data.reviews_number || 0;
				this.location = response.data.location;
				this.name = response.data.name;
				this.about = response.data.about;
				this.logo = response.data.logo;
				this.quantity = response.data.quantity;
				console.log(response);
				this.spinner.hide();
			} else {
				console.error(response.message);
				this.spinner.hide();

			}
		});
	}
		loadNotifications() {
		this.notificationService.getNotifications().subscribe((data: any) => {
			this.notifications = data.data;
			console.log(this.notifications);
		});
	}


}
