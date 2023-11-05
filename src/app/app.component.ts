import { Router, NavigationEnd } from "@angular/router";

import { Component, OnInit } from "@angular/core";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	token: string;
	title = "HirePlatform";
	constructor(private router: Router) {}
	footerShow = true;
	ngOnInit() {
		if (!sessionStorage.getItem("isPageRefreshed")) {
			sessionStorage.setItem("isPageRefreshed", "true");
			// This will reload page once prevent reloading of page again for that session.
			window.location.reload();
		}
		this.router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				let url: any = window.location.href;
				url = url.split("/");
				if (url.includes("dashboard")) {
					this.footerShow = false;
				} else {
					this.footerShow = true;
				}
			}
		});
	}
}
