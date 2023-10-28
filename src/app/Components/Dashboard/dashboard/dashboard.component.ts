import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent {
	constructor(private userService: UserService) { }
	renderComponent = false;
	userType?: string;
	ngOnInit() {
		this.initUserType();

	}
	initUserType() {
		if (this.userService.userType === "") {
			this.userType = this.userService.getUserType();
		} else {
			this.userType=this.userService.userType;
		}
		this.renderComponent = true;
	}
}
