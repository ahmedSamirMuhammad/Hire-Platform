import { Component } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
	selector: "app-sidebar",
	templateUrl: "./sidebar.component.html",
	styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
	constructor(private userService: UserService) {}
	userType?: string;

	ngOnInit() {
		this.userType = localStorage.getItem("user_type");
	}
}
