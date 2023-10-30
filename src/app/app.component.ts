import { Component } from "@angular/core";
import Echo from "laravel-echo";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent {
	title = "HirePlatform";
	ngOnInit() {
		const echo = new Echo({
			broadcaster: "pusher",
			key: "12341234512386",
			cluster: "mt1",
			wsHost: window.location.hostname,
			wsPort: 6001,
			forceTLS: false, // Important Line
			disableStats: true,
		});
		echo.channel("chat").listen("ChatEvent", (res: any) => {
			console.log("Chat Event Data : ", res);
		});
	}
}
