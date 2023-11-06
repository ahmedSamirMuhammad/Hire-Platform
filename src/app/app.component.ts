import { Component ,OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Router, NavigationEnd } from "@angular/router";
@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
	token: string;
	title = "HirePlatform";
	footerShow = true;
	constructor(private spinner: NgxSpinnerService, private router: Router) {}

	ngOnInit() {
		this.spinner.show();

		setTimeout(() => {
			/** spinner ends after 5 seconds */
			this.spinner.hide();
		  }, 2000);
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
