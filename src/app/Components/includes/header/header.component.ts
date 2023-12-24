// header.component.ts
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { NotificationService } from "src/app/notification.service";
import { HomeService } from "src/app/services/home.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	@ViewChild("userMenu") userMenu: ElementRef;

	storedRole: string = localStorage.getItem("role");
	name: string | null = null;
	token: string = "";
	notifications: any[] = [];
	isMenuOpened = false;
	id:any;
	settingsLink = localStorage.getItem('role')=='emp'?'user-settings':'company-settings';
	constructor(
		private router: Router,
		private notificationService: NotificationService,
		private homeService: HomeService

	) {}

	ngOnInit(): void {
		this.name = localStorage.getItem("name");
		//adding
		this.token = localStorage.getItem("token") || "";
		this.loadNotifications();
		this.homeService.headerUser().subscribe((res:any )=>{
			this.id = res;
			console.log(this.id)
		});

	}

	loadNotifications() {
		this.notificationService.getNotifications().subscribe((data: any) => {
			this.notifications = data.data;
			console.log(this.notifications);
		});
	}

	logout() {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		// this.token = ''; // Update the token property
		this.router.navigate(["/login"]);
	}
	open() {
		if (!this.isMenuOpened) {


			this.userMenu.nativeElement.classList.add("active");

			setTimeout(
				() => this.userMenu.nativeElement.classList.add("open"),
				100
			);
			this.isMenuOpened = true;
		} else {
			this.userMenu.nativeElement.classList.remove("open");
			setTimeout(
				() => this.userMenu.nativeElement.classList.remove("active"),
				100
			);
			this.isMenuOpened = false;
		}
	}
	goExploreJob() {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate(['/explore-jobs/-/1']); // navigate to same route
			});
	}
	goExploreCompanies() {
		this.router
			.navigateByUrl("/", { skipLocationChange: true })
			.then(() => {
				this.router.navigate(['/explore-companies/-/1']); // navigate to same route
			});
	}
}
